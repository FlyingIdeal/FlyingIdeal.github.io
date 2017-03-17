var verifyUrl = "http://182.92.236.178/verify";//验证码地址
var wh = getHeight();//全局页面高度
var focusFlag = false;//焦点标识
var request = null;//连接参数
var source = "";//来源数据
var showWantPiaoFlag = false;

$(function(){

	var mySwiper = new Swiper('.tab',{
		wrapperClass: 'tabBox',
		mode: 'vertical',
		slideClass: 'sildeChild',
		slideActiveClass:'outerLayer',
		useCSS3Transforms : true,
		speed : 800,
		moveStartThreshold : 100,
		onSlideChangeStart : function(){
			//$('.outerLayer').css({transform: 'scale(0.6,1)'});

			var preIndex = mySwiper.previousIndex;
			$('.sildeChild:eq('+preIndex+')').css({transform: 'scale(0.3,1)'});

			setTimeout(function(){
				$('.sildeChild:eq('+preIndex+')').css({transform: 'scale(1,1)'});
			},800);

		},
		onSlideChangeEnd : function(){
			var index = $('.tab .outerLayer').index();
			if( index == 3)
			{
				single_6.style.display="block";
				setTimeout(function(){
					$('#single_3').css({display : 'block'});
					$('#single_6').css({display : 'none'});
				},3000);
			}
			else{
				$('#single_3').css({display : 'none'});
				$('#single_6').css({display : 'none'});
			}
		}
	});


	//屏幕高度
	cHeight('.wrap');
	cHeight('.tab');
	cHeight('.posBox');
	cHeight('#qiang');



	
	//初始化流程操作
	initOperation();

	//获取url参数
	getUrlParameter();
	//初始化url信息
	initUrlOperation();

	//判断是否有key值，如果有则是从pc转到手机页面的，需要做相应处理
	if(!!request["key"])
	{
		pcToMobile();
	}
});

/**
 * 初始化url信息
 * @return {[type]} [description]
 */
function initUrlOperation()
{
	if(!!request["source"])
	{
		source = request["source"];
	}
}

/**
 * 从pc转到手机页
 * @return {[type]} [description]
 */
function pcToMobile()
{
	var key = request["key"];
	if(!key)
	{
		return false;
	}
	//获取用户信息
	getUserInfo(key);
}

/**
*设置高度
**/
function cHeight(obj)
{
	var wh = document.documentElement.clientHeight;
	$(obj).css({height:wh});

	return wh;
}

//字数逐个显示
/*
setTimeout(function(){
	$('.tab>div').show();
	changeText($("#font"),$("#font1"),200);
	clearInterval(Otimer);
},600);


function changeText(cont1,cont2,speed){
	var Otext=cont1.text();
	var Ocontent=Otext.split("");
	var i=0;
	function show(){
		if(i<Ocontent.length)
		{		
			cont2.append(Ocontent[i]);
			i=i+1;
		};
	};
	var Otimer=setInterval(show,speed);	
};
*/




/**
 * 初始化操作
 * @return {[type]} [description]
 */
function initOperation()
{
	/**
	 * 弹出框关闭按钮
	 * @return {[type]} [description]
	 */
	$("a.coverClose").bind("click",function(){
		$(this).parent().parent().hide();
	});
	

	//抢票
	$("#page10 a.qiang").bind("click",function(){

		clearVerify();
		//设置验证码
		$("#qiang .qiang_2 img").attr("src",verifyUrl);

		$("#qiang").css("top","0px").show();
	});

	//兑换
	$("#page10 a.dui").bind("click",function(){
		clearVerify();
		//设置验证码
		$("#dui .dui_2 img").attr("src",verifyUrl);
		$("#dui").css("top","0px").show();
	});

	//真实抢票
	$("a.qiangBtn").bind("click",function(){

		var userName = $("#name").val() || $.cookie("name");
		var phone = $("#phone").val() || $.cookie("phone");
		var authCode = $("#code").val() || $.cookie("code");

		//登录
		login(userName,phone,authCode);
	});


	//兑奖按钮
	$("#dui a.duiBtn").bind("click",function(){
		conversionCode();
	});

	//未中奖 ok按钮
	$("#DontGet a.DontGetBtn").bind("click",function(){

		$("#code").val("");
		//$("#DontGet").hide();
		//showSharePage();
		$("#shareFriend img").attr("src","images/shareFriendCommon.png");
		$("#shareFriend").show();
	});

	//提示按钮
	$("#havaCode a.havacodeBtn").bind("click",function(){
		$("#havaCode").hide();
	});

	//最后一页分享到朋友圈
	$("#page13 .bujian_3 img,#sharePage .bujian_3 img").bind("click",function(){
		$("#shareFriend").show();
	});

	//票到手OK按钮
	$("#haTicket .haTicketBtn").bind("click",function(){
		$("#shareFriend img").attr("src","images/shareFriend_1.png");
		$("#haTicket").hide();
		$("#fill").show();
	});

	//填写地址OK按钮
	$("#fill .fillBtn").bind("click",function(){

		var province =  $("#province").val();
		var city =  $("#city").val();
		var street =  $("#street").val();
		if(!province)
		{
			alert("请输入省份！");
			return false;
		}
		if(!city)
		{
			alert("请输入城市名称！");
			return false;
		}
		if(!street)
		{
			alert("请输入街道名称！");
			return false;
		}
		var address = province + city + street;

		addAddress(address);
	});

	/**
	 * 点击加号，显示版权页面
	 * @return {[type]} [description]
	 */
	$(".bujian_jia").bind("click",function(){
		$("#page11").show();
	});

	//最后中奖提示按钮
	$("#sendYou .sendYouBtn").bind("click",function(){
		//$("#sendYou").css("display","none");
		//$("#page13").show();
		showSharePage();
	});

	//验证码图片点击事件
	$("img[name=verify]").bind("click",function(){
		this.src = verifyUrl;
	});

	/**
	 * 问号
	 * @return {[type]} [description]
	 */
	$(".wenhao").bind("click",function(){
		$("#page12").show();
	});

	/**
	 * 重试按钮的执行
	 * @return {[type]} [description]
	 */
	$("#excite .excite_2 img").bind("click",function(){
		showQiangDui();
	});
	//初始化弹窗手势
	//initTipTouch();


	//初始化数据
	initData();
	
	//提示信息
	window.alert = function(message){
		var tip = $("#havaCode");
		tip.find(".havacode_1").html(message);
		tip.show();
	}
	
	/**
	 * 当文本框获取焦点时，滑动页面无效
	 * @return {[type]} [description]
	 */
	$("input").bind("focusin",function(){
		focusFlag = true;
	}).bind("focusout",function(){
		focusFlag = false;
	});

	/**
	 * 页面改变大小
	 * @return {[type]} [description]
	 */
	$(window).resize(function(){
		/*
	  	cHeight('.wrap');
		cHeight('.tab');
		cHeight('.posBox');
		cHeight('.sildeChild');
		*/
	});
}

/**
 * 初始化数据
 * @return {[type]} [description]
 */
function initData()
{
	var name = $.cookie("name") || "";
	var phone = $.cookie("phone") || "";

	$("#name,#userName").val(name);
	$("#phone,#userPhone").val(phone);
}

/**
 * 初始化提示框手势
 * @return {[type]} [description]
 */
function initTipTouch()
{

	var tipArr = $("#qiang,#dui").get();
	var wh = cHeight('.wrap');
	touch.on(tipArr, 'swipeup', function(ev){
		if(focusFlag)
		{
			return false;
		}
		$(ev.currentTarget).animate({
			top : -wh + 'px',
			display : "none"
		});
	});
}



/**
 * 抢票
 * @param  {[type]} userName [description]
 * @param  {[type]} phone    [description]
 * @return {[type]}          [description]
 */
function rob(userName,phone,verify)
{
	$.ajax({
	   type: "post",
	   url: "http://182.92.236.178/rob",
	   data: {
		   name : userName,
		   phone : phone,
		   source : source,
		   verify : verify
	   },
	   dataType: "jsonp",
	   success: function(json){
	   		//更新验证码
			$("#qiang .qiang_2 img").attr("src",verifyUrl);

	   		var data = json.data;
	   		var shareNum = parseInt(data.shareNum);
	   		var robNum = parseInt(data.robNum);
	   		var showWantPiaoFlag = $.cookie("showWantPiaoFlag");

	   		//第二次转到兑换码信息页
	   		if(shareNum - robNum == 1 && (!showWantPiaoFlag || showWantPiaoFlag == "false"))
	   		{
	   			$.cookie("showWantPiaoFlag","true");
				$("#page12").show();
				$("#qiang").hide();
	   			return false;
	   		}
	   		//如已中奖未输入地址，则输入地址
	   		if(data.statu == "1" && !data.address)
	   		{
	   			$("#fill").show();
	   			return false;
	   		}
	   		else if(json.state != '0')
	   		{	
	   			//验证码错误
				if("验证码错误!" == json.message)
				{
					showTipStyle(json.message);
				}
	   			else if(json.key == "NOT_LOGIN")
	   			{
	   				//未登录
	   				$("#qiang").css("top","0px").show();
	   			}
	   			else if(json.key == "NO_CHANCE")
	   			{
	   				//没机会
	   				$("#DontGet").css("top","0px").show();
	   			}
	   			else if(json.key == "ROB_FAIL")
	   			{
	   				//未中奖
	   				$("#DontGet").css("top","0px").show();
	   			}
	   			else
	   			{
	   				alert(json.message);
	   			}
	   		    return false;
	   		}
	   		//中奖
	   		$("#haTicket").css("top","0px").show();
	   }
	});
}

/**
 * code兑换
 * @return {[type]} [description]
 */
function conversionCode()
{
	showTipStyle("jieshu")
	return false;

	var userName = $("#userName").val();
	var phone = $("#userPhone").val();
	var code = $("#duiCode").val();
	var verify = $("#userCode").val();
	if(!userName)
	{
		alert("请输入姓名！");
		return false;
	}

	if(!phone)
	{
		alert("请输入手机号码！");
		return false;
	}

	if(!code)
	{
		alert("请输入兑换码！");
		return false;
	}

	if(!verify)
	{
		alert("请输入验证码！");
		return false;
	}

	if(!checkPhone(phone))
	{
		alert("请输入正确的手机号！");
		return false;
	}

	if(code.toLowerCase().indexOf("it") > -1){
		showTipStyle("jieshu")
		return false;
	}
	
	$.ajax({
	   type: "post",
	   url: "http://182.92.236.178/login_code",
	   data: {
		   name : userName,
		   phone : phone,
		   code : code,
		   source : source,
		   verify : verify
	   },
	   dataType: "jsonp",
	   success: function(json){

	   		//更新验证码
			$("#dui .dui_2 img").attr("src",verifyUrl);

	   		if(json.state != '0'){

	   			if(json.message == "code错误!")
	   			{
	   				showTipStyle(json.message);
	   			}
	   			//验证码错误
				else if("验证码错误!" == json.message)
				{
					showTipStyle(json.message);
				}
				else if("该code已兑换过!" == json.message)
				{
					showTipStyle(json.message);
				}
	   			else
	   			{
	   				alert(json.message);
	   			}
	   		    return false;
	   		}

	   		$.cookie("phone",phone);
	   		$.cookie("name",userName);
	   		//重新初始化数据
	   		initData();

	   		//中奖
	   		$("#haTicket").css("top","0px").show();
	   }
	});
}
/**
 * 显示个性化提示框
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
function showTipStyle(type)
{
	console.log(type);
	var obj = null;
	//兑换码错误
	if("code错误!" == type)
	{
		obj = $("#excite");
		obj.find(".excite_1 img").attr("src","images/excite_2.png");
		obj.show();
	}
	//姓名与手机号不同
	else if("LOGIN_VALID_ERROR" == type)
	{
		obj = $("#excite");
		obj.find(".excite_1 img").attr("src","images/excite_1.png");
		obj.show();
	}
	//验证码错误
	else if("验证码错误!" == type)
	{
		obj = $("#excite");
		obj.find(".excite_1 img").attr("src","images/yzm_error.png");
		obj.show();
	}
	//兑换码已使用
	else if("该code已兑换过!" == type)
	{
		obj = $("#excite");
		obj.find(".excite_1 img").attr("src","images/hadDuima.png");
		obj.show();
	}
	//结束
	else if("jieshu" == type)
	{
		obj = $("#jieshu");
	//	obj.find(".excite_1 img").attr("src","images/hadDuima.png");
		obj.show();
	}
}

/**
 * 添加收件地址
 * @param {[type]} address [description]
 */
function addAddress(address)
{
	$.ajax({
	   type: "post",
	   url: "http://182.92.236.178/address",
	   data: {
		   address : address
	   },
	   dataType: "jsonp",
	   success: function(json){
	   		if(json.state != '0'){
	   		    alert(json.message);
	   		    return false;
	   		}

	   		$("#fill").hide();
			$("#sendYou").show();
	   }
	});
}

/**
 * 分享执行
 * @return {[type]} [description]
 */
function share(target)
{
	$.ajax({
	   type: "post",
	   url: "http://182.92.236.178/share",
	   data: {
		   target : target
	   },
	   dataType: "jsonp",
	   success: function(json){
	   		$("#shareFriend").hide();
	   }
	});
}

/**
 * 登录
 * @return {[type]} [description]
 */
function login(userName,phone,authCode)
{
	
	if(!userName)
	{
		alert("请输入姓名！");
		return false;
	}

	if(!phone)
	{
		alert("请输入手机号码！");
		return false;
	}

	if(!authCode)
	{
		alert("请输入验证码！");
		return false;
	}

	if(!checkPhone(phone))
	{
		alert("请输入正确的手机号！");
		return false;
	}
	

	$.ajax({
	   type: "post",
	   url: "http://182.92.236.178/login",
	   data: {
		   name : userName,
		   phone : phone,
		   source : source,
		   verify : authCode
	   },
	   dataType: "jsonp",
	   success: function(json){
	   		if(json.state != '0'){

	   			if(json.key == "LOGIN_VALID_ERROR")
	   			{
	   				showTipStyle(json.key);
	   			}
	   			//验证码错误
				else if("验证码错误!" == json.message)
				{
					showTipStyle(json.message);
				}
	   			else
	   			{
	   				alert(json.message);
	   			}
	   		    return false;
	   		}
	   		var data = json.data;

	   		$.cookie("phone",phone);
	   		$.cookie("name",userName);

	   		//重新初始化数据
	   		initData();

	   		var data = json.data;
	   		//抢票
			rob(userName,phone,authCode);
	   }
	});
}

/**
 * 获取URl参数，已放入全局变量request中
 * @return {[type]} [description]
 */
function getUrlParameter()
{
	request = new Object();
	request = GetRequest();
}

/**
 * 根据key获取用户信息
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
function getUserInfo(key)
{
	if(!key)
	{
		alert("请输入正确的参数！");
		return false;
	}

	$.ajax({
	   type: "post",
	   url: "http://182.92.236.178/mobile",
	   async : false,
	   data: {
		   source : source,
		   key : key
	   },
	   dataType: "jsonp",
	   success: function(json){
	   		if(json.state != '0'){
	   			alert(json.message);
	   		    return false;
	   		}
	   		var data = json.data;

	   		$.cookie("phone",data.phone);
	   		$.cookie("name",data.name);

	   		//重新初始化数据
	   		initData();
	   }
	});
}

/**
 * 获取url参数
 */
function GetRequest() {
   var url = location.search; //获取url中"?"符后的字串
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
      }
   }
   return theRequest;
}

/*
 * 空值判断处理函数，当传入的对象为string时会做空字符校验
 * 需要依赖jquery的trim函数
 *
 * @param obj : 需要判断的对象
 * @return : 空位true，非空为false
 */
function isNull(obj){
	var result = true;
	var type = typeof(obj);
	/*undefined or null return false*/
	if(type == "undefined"
		|| obj == null){
		result = true;
	} 
	/*type is string */
	else if (type == "string"){
		obj = $.trim(obj);
		if( obj==""
			|| obj == "undefined"){
			result = true;
		}else {
			result = false;
		}
	} 
	/*other object */
	else{
		result = false;
	}
	return result;
}

/**
 * 验证手机号
 * @param  {[type]} phone [description]
 * @return {[type]}       [description]
 */
function checkPhone(phone) {
	if(isNull(phone)){
		return false;
	}				 
	if (!phone.match(/^0?1[3|4|5|7|8][0-9]\d{8}$/)) {
		return false;
	}
	return true;
}

/**
 * 获取屏幕高度
 * @return {[type]} [description]
 */
function getHeight()
{
	return $(window).height();
}
/**
 * 清除验证码
 * @return {[type]} [description]
 */
function clearVerify()
{
	$("#code,#userCode").val("");
}

/**
 * 微信分享相关
 * @param  {[type]} Api [description]
 * @return {[type]}     [description]
 */
WeixinApi.ready(function(Api) {

    var descArr = [
		'Live smart演唱会前期信息爆出，粉丝热情瞬间爆棚，你还在等什么？',
		'求你别分享！Live smart 天生机智演唱会入场券有限，别来和我抢！'
	];
	var indexNum = Math.floor(Math.random() * ( descArr.length));
    // 微信分享的数据
    var wxData = {
        "appId": "", //服务号可以填写appId
        "imgUrl" : 'http://182.92.236.178/mobile/images/share.jpg',
        "link" : 'http://182.92.236.178/mobile/index.html',
        "desc" : descArr[indexNum],
        "title" : "smart中国五周年群星演唱会"
    };

    // 分享的回调
    var wxCallbacks = {
        // 分享操作开始之前
        ready : function() {
            // 你可以在这里对分享的数据进行重组
            //alert("准备分享");
            //wxData.desc = descArr[indexNum];
        },
        // 分享被用户自动取消
        cancel : function(resp) {
            // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
            //alert("分享被取消");
        },
        // 分享失败了
        fail : function(resp) {
            // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
            //alert("分享失败");
        },
        // 分享成功
        confirm : function(resp) {
            //增加分享记录
            share("wx");
        },
        // 整个分享过程结束
        all : function(resp) {
            // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
            showQiangDui();
        }
    };

    // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
    Api.shareToFriend(wxData, wxCallbacks);

    // 点击分享到朋友圈，会执行下面这个代码
    Api.shareToTimeline(wxData, wxCallbacks);

    // 点击分享到腾讯微博，会执行下面这个代码
    Api.shareToWeibo(wxData, wxCallbacks);
});
/**
 * 隐藏所有弹窗，转到最后分享页面
 * @return {[type]} [description]
 */
function showSharePage()
{
	//隐藏所有弹出层
    $("#qiang,#dui,#excite,#havaCode,#haTicket,#fill,#sendYou,#DontGet,#shareFriend,#jieshu").hide();

    //显示抢兑页面
    var tabBox = $(".tab .tabBox");
    var allHeight = parseInt(tabBox.css("height"));
    var oneHeight = allHeight / 11;
    tabBox.css("-webkit-transform" ,"translate3d(0px, -" + (allHeight - oneHeight) + "px, 0px)");
}
/**
 * 显示抢与兑页面
 * @return {[type]} [description]
 */
function showQiangDui()
{
	//隐藏所有弹出层
    $("#qiang,#dui,#excite,#havaCode,#haTicket,#fill,#sendYou,#DontGet,#shareFriend,#jieshu").hide();

    //显示抢兑页面
    var tabBox = $(".tab .tabBox");
    var allHeight = parseInt(tabBox.css("height"));
    var oneHeight = allHeight / 11;
    tabBox.css("-webkit-transform" ,"translate3d(0px, -" + (allHeight - oneHeight * 2) + "px, 0px)");
}