var dataPosition = [
	//1
	[
		{'left' : '244px' , 'top' : '150px'},
		{'left' : '382px' , 'top' : '150px'},
		{'left' : '382px' , 'top' : '60px'},
		{'left' : '56px' , 'top' : '60px'}
	],
	//2
	[
		{'left' : '56px' , 'top' : '150px'},
		{'left' : '150px' , 'top' : '150px'},
		{'left' : '150px' , 'top' : '290px'},
		{'left' : '56px' , 'top' : '290px'},
		{'left' : '56px' , 'top' : '246px'}
	],
	//3
	[
		{'left' : '56px' , 'top' : '290px'},
		{'left' : '150px' , 'top' : '290px'},
		{'left' : '150px' , 'top' : '382px'},
		{'left' : '56px' , 'top' : '382px'}
	],
	//4
	[
		{'left' : '150px' , 'top' : '382px'},
		{'left' : '150px' , 'top' : '246px'},
		{'left' : '244px' , 'top' : '246px'},
		{'left' : '244px' , 'top' : '290px'}
	],
	//5
	[
		{'left' : '244px' , 'top' : '246px'},
		{'left' : '382px' , 'top' : '246px'},
		{'left' : '382px' , 'top' : '382px'},
		{'left' : '244px' , 'top' : '382px'}
	],
	//6
	[
		{'left' : '382px' , 'top' : '382px'},
		{'left' : '382px' , 'top' : '246px'},
		{'left' : '244px' , 'top' : '246px'},
		{'left' : '244px' , 'top' : '150px'}
	]
];

$(function(){

	//load gif图
	changeLoadImgPos();

	setupManifest();
	startPreload();

	page1();

	ajaxGetWeiXinConf();

	//阻止滑动
	$('body').on('touchmove', function(e){
		e.preventDefault();
	});

	//初始化高度
	initHeight();

	//初始化闪动
	initFlash();

	page2();

	page6();

 	$("#audioBtn").click(function(){
        var audioBtn = $(this);
        if(audioBtn.attr("class") == "soundStop")
        {
            audioBtn.removeClass("soundStop");
            playVid();
        }
        else
        {
            audioBtn.addClass("soundStop");
            pauseVid();
        }
    });


});


/*
*loading部分
***/
	
var manifest;
var preload;
//定义相关JSON格式文件列表
function setupManifest() {
    manifest = [
    	{src:'../images/audioBtn.png',id:'audioBtn'},
    	{src:'../images/ball.png',id:'ball'},
    	{src:'../images/ballShadow.png',id:'ballShadow'},
    	{src:'../images/Bg.jpg',id:'Bg'},
    	{src:'../images/car.png',id:'car'},
    	{src:'../images/closeBtn.png',id:'closeBtn'},
    	{src:'../images/diff_txt.png',id:'diff_txt'},
    	{src:'../images/eye.png',id:'eye'},
    	{src:'../images/findBtn.png',id:'findBtn'},
    	{src:'../images/finger-txt.png',id:'finger-txt'},
    	{src:'../images/FootprintBtn.png',id:'FootprintBtn'},
    	{src:'../images/Footprint-txt.png',id:'Footprint-txt'},
    	{src:'../images/jinrong.png',id:'jinrong'},
    	{src:'../images/line.png',id:'line'},
    	{src:'../images/linggan_txt.png',id:'linggan_txt'},
    	{src:'../images/load.gif',id:'loadgif'},
    	{src:'../images/load.jpg',id:'loadjpg'},
    	{src:'../images/logo.png',id:'logo'},
    	{src:'../images/logo2.png',id:'logo2'},
    	{src:'../images/mangmu-btn.png',id:'mangmu-btn'},
    	{src:'../images/migongBg.png',id:'migongBg'},
    	{src:'../images/migongPo.png',id:'migongPo'},
    	{src:'../images/migongBtn.png',id:'migongBtn'},
    	{src:'../images/out-txt.png',id:'out-txt'},
    	{src:'../images/people-decompose.png',id:'people-decompose'},
    	{src:'../images/product.png',id:'product'},
    	{src:'../images/productBg.jpg',id:'productBg'},
    	{src:'../images/selfBtn.png',id:'selfBtn'},
    	{src:'../images/self-finger.png',id:'self-finger'},
    	{src:'../images/self-txt.png',id:'self-txt'},
    	{src:'../images/share.jpg',id:'share'},
    	{src:'../images/shareMask.png',id:'shareMask'},
    	{src:'../images/submitBg.jpg',id:'submitBg'},
    	{src:'../images/submiticon.png',id:'submiticon'},
    	{src:'../images/tips_up.png',id:'tips_up'},
    	{src:'../images/water.png',id:'water'},
    	{src:'../images/weiwo.png',id:'weiwo'},
    	{src:'../images/wolf.png',id:'wolf'}
    ];

    for(var i=1; i<=36; i++)
    {
    	manifest.push({src:'../lib/sbl_'+i+'.jpg',id:'sbl_'+i});
    }

    for(var j=1; j<=10; j++)
    {
    	manifest.push({src:'../shan/shan_'+j+'.jpg',id:'shan_'+j});
    }

    for(var k=1; k<=22; k++)
    {
    	manifest.push({src:'../turn/turn_'+k+'.jpg',id:'turn_'+k});
    }

    for(var w=1; w<=28; w++)
    {
    	manifest.push({src:'../walk/walk_'+w+'.jpg',id:'walk_'+w});
    }

    manifest.push({src:'../sound/background.mp3',id:'background'});
    manifest.push({src:'../sound/boli.mp3',id:'boli'});
    manifest.push({src:'../sound/dianliu.mp3',id:'dianliu'});
    manifest.push({src:'../sound/zhuangpoqiang.mp3',id:'zhuangpoqiang'});
    manifest.push({src:'../sound/zhuangqiang.mp3',id:'zhuangqiang'});
    manifest.push({src:'../sound/zoulu.mp3',id:'zoulu'});

}

//开始预加载
function startPreload() {
    preload = new createjs.LoadQueue(true);
    //注意加载音频文件需要调用如下代码行
    preload.installPlugin(createjs.Sound);         
    preload.on("fileload", handleFileLoad);
    preload.on("progress", handleFileProgress);
    preload.on("complete", loadComplete);
    preload.on("error", loadError);
    preload.loadManifest(manifest);
 
}

//处理单个文件加载
function handleFileLoad(event) {
    //console.log("文件类型: " + event.item.type);
    /*if(event.item.id == "logo"){
        console.log("logo图片已成功加载");
    }*/
}
 
//处理加载错误：大家可以修改成错误的文件地址，可在控制台看到此方法调用
function loadError(evt) {
    console.log("加载出错！",evt.text);
}
 
//已加载完毕进度 
function handleFileProgress(event) {
    $('#loadpro').text((preload.progress*100|0) + " %");
}

//全度资源加载完毕
function loadComplete(event) {
    //console.log("已加载完毕全部资源");
    $('#load').fadeOut(500);
}


var changeLoadImgTime = null
function changeLoadImgPos(){
	var load_array = [0, 420, 840, 1260, 1680, 2100, 2520, 2940, 3360];
	var i = 0;
	clearInterval(changeLoadImgTime);
	changeLoadImgTime = setInterval(function(){
        $('#loadImg').css({
            "background-position" : '-'+ (load_array[i]) + 'px'
        });

        i++;

        if(i == load_array.length)
        {
        	i=0;
        }
    },100);
}

function playVid()
{
    $("#video_1").get(0).play();
}

function pauseVid()
{
    $("#video_1").get(0).pause();
}

function page1(){
	//不是谁都敢来点不一样
	touch.on('.diff-page', 'swipeup tap', function(){
		$('.diff-page').hide().next().fadeIn();
	})
}

/*
*yudian
*/
var showCarFlag = false;
var carTime = null;
function page2(){

	//雨滴页面
	touch.on('#water-findBtn', 'tap', function(){
		//眼睛眨两次之后隐藏
		$('#eye').fadeIn(200).delay(1600).fadeOut(200, function(){

			$('#water, #water-findBtn').fadeOut(200);
			$('#car, .water-page .tips_up, #linggan_txt').fadeIn(200);

			var water_array = [0, 640, 1280, 1920, 2560, 3200, 3840, 4480];
			var i = 0;

			clearInterval(carTime);
			carTime = setInterval(function(){
		        $('#car').css({
		            "background-position" : '-'+ (water_array[i]) + 'px'
		        });

		        i++;

		        if(i == water_array.length)
		        {
		        	clearInterval(carTime);
		        	showCarFlag = true;
		        }
		    },100);
		})
	});

	//雨滴页到下一页
	touch.on('.water-page', 'swipeup', function(){
		if(!showCarFlag)
		{
			return;
		}
		else
		{
			$('.water-page').hide().next().fadeIn();
			restorePage2();
			page3();
		}
	});

	touch.on('.water-page', 'swipedown', function(){
		if(!showCarFlag)
		{
			return;
		}
		else
		{
			$('.water-page').hide().prev().fadeIn();
			restorePage2();
		}
	});
}
/*
还原car第二页
*/
function restorePage2(){
	$('#car').css("background-position", '0px 0px');
	$('#car, #linggan_txt, .water-page .tips_up').hide();
	$('#water-findBtn, #water').show();
	showCarFlag = false;
}

/*
*migong
*/
var page3Flag = false;
function page3(){
	//小球撞击迷宫
	ballImpactBox();
	//迷宫闪动
	ballImpactShake();

	//迷宫-xunzhao
	touch.on('#migongBtn', 'tap', function(){
		$(this).hide();
		$('.migong-center').css('background-position','0px 0px');

		clearInterval(ballImpactTime);
		$('#ball').stop(true).fadeOut(300,function(){
			$('#ball').css({
				'left' : 244,
				'top' : 150
			}).fadeIn(300,function(){
				page3Flag = true;
				findExport();
			});
		})
	});
}
/*寻找出口*/
function findExport(){

	changeMusic('zhuangpoqiang');
	$('#ball').removeClass('active');

	$('#ball').animate({
		'left' : 370,
		'top' : 495
	},300,function(){
		$('#out-txt , .migong-page .tips_up').fadeIn(400);

		touch.on('.migong-page', 'swipeup', function(){
			if (!page3Flag){
				return;
			}
			else{
				$('.migong-page').hide().next().fadeIn();
				restorePage3();
				page4();
			};
		});

		touch.on('.migong-page', 'swipedown', function(){
			if (!page3Flag){
				return;
			}
			else{
				$('.migong-page').hide().prev().fadeIn();
				restorePage3();
			};
		});
	});

	$('.overHide').animate({
		'width' : 355
	},300);
}
/*
*小球撞击路线
*/
function ballImpactBox(){

	for(var i = 0; i < dataPosition.length; i++)
	{
		for(var j = 0; j < dataPosition[i].length; j++)
		{
			var posLeft = dataPosition[i][j].left;
			var posTop = dataPosition[i][j].top;

			var isend = false;
			if(j + 1 == dataPosition[i].length){
				isend = true;
			};

			ballImpactBoxRun(isend,posLeft,posTop,i);
		}
	}
}
/*
*小球运动
**/
function playQiangVid()
{
    $("#video_3").get(0).play();
}

function pauseQiangVid()
{
    $("#video_3").get(0).pause();
}

function ballImpactBoxRun(isend,posLeft,posTop,i){

	var ball = $('#ball');
	ball.animate({
		'left' : posLeft,
		'top' :　posTop
	},400, function(){
		if(isend)
		{
			playQiangVid();

			ball.addClass('active');
			setTimeout(function(){
				ball.removeClass('active');
			},200);

            var iArr = [1440, 1920];
            ballImpactShake(iArr);

            if(i + 1 == dataPosition.length)
            {
            	ballImpactBox();
            }
		}
	});
	if(isend)
	{
        ball.delay(100);
	}
}

/*迷宫晃动*/
var ballImpactTime;
var ballImpactArray = [0,480,960];
function ballImpactShake(iArray)
{
	if(iArray){
		ballImpactArray = iArray;
	};
	var i = 0;

	clearInterval(ballImpactTime);
	ballImpactTime = setInterval(function(){
        $('.migong-center').css({
            "background-position" : '-'+ (ballImpactArray[i]) + 'px'
        });

        i++;

        if(i == ballImpactArray.length)
        {
        	i = 0;
        	ballImpactArray = [0,480,960];
        }
    },200);
}

/*
还原迷宫第3页
*/
function restorePage3(){
	$('#ball').stop(true).css({
		//小球位置还原 并且停止运动
		'left' : '244px',
		'top' : '150px'
	});
	clearInterval(ballImpactTime);
	$('#migongBtn').show();//寻找灵感显示
	page3Flag = false;
	$('#overHide').css('width',0);
	$('#out-txt, .migong-page .tips_up').hide();
}


/*
盲目-行走在山上4
*/
var walkTime = null;
var walkx = -50;
var walky = 185;
var walkFlay = false;
var stopFlag = false;
var mangmuFlay = false;
function page4(){

	peopleWalk();
	peopleWalkPosFn();

	touch.on('#mangmu-btn', 'tap', function(){

		walkFlay = true;
		$(this).hide();

		var fingerTime = null;
		var picNum = 1;
		clearInterval(fingerTime);
		var shanImg = $("#shanImg");
		//$('<img id="shanImg" src="" />').appendTo('#finger');

		fingerTime = setInterval(function(){

			shanImg.attr("src",'shan/shan_'+ picNum +'.jpg')
			
			picNum++;

			if(picNum >= 10)
			{
				clearInterval(fingerTime);
				$('#finger-txt , .mangmu-page .tips_up').fadeIn(300);
				mangmuFlay = true;
			}

		},100);

		touch.on('#mangmu-page', 'swipeup', function(){
			if(!mangmuFlay)
			{
				return;
			}
			else
			{
				$('#mangmu-page').hide().next().fadeIn();
				page5();
				restorePage4();
			}
		})
		touch.on('.mangmu-page', 'swipedown', function(){
			if(!mangmuFlay)
			{
				return;
			}
			else
			{
				$('#mangmu-page').hide().prev().fadeIn();
				page3();
				restorePage4();
			}
		})
	});
	
}
/*
还原第4页
*/
function restorePage4(){
	clearInterval(walkTime);
	walkx = -50;
	walky = 185;
	$('#people-walk').css({'left' : 0, 'top' : '185'});
	$('#mangmu-btn').show();
	$('#finger-txt, .mangmu-page .tips_up').hide();
	$('#shanImg').attr("src",'shan/shan_1.jpg');
	walkFlay = false;
	stopFlag = false;
	mangmuFlay = false;
}

/*山上人 变换背景*/
var peopleWalkTime = null;
function peopleWalkPosFn(){
	var people_walk_array = [0, 110, 220, 330, 440, 550, 660];
	var i = 0;
	clearInterval(peopleWalkTime);
	peopleWalkTime = setInterval(function(){
        $('#people-walk').css({
            "background-position" : '-'+ (people_walk_array[i]) + 'px'
        });

        i++;

        if(i == people_walk_array.length)
        {
            i = 0;
        }

    },200);
}
/*人行走*/
function peopleWalk(){

	var audio=(document.getElementById("video_2"));
	audio.src="sound/zoulu.mp3";
	audio.load();
	audio.loop=true;
	audio.play();

	clearInterval(walkTime);
	walkTime = setInterval(function(){

		$('#people-walk').css({
			'left' : walkx + 'px',
			'top' : walky + 'px'
		});

		walkx+=1;
		walky-= 0.09;

		if(walkx > 750)
		{
			walkx = -50;
			walky = 185;
		}

		if(walkFlay)
		{
			if(stopFlag)
			{
				walkx = 495;
				walky = 140;
				//定格
				clearInterval(peopleWalkTime);
				$('#people-walk').css('background-position','-220px');
				audio.pause();
			}

			if(walkx < 495 && (walkx + 10) >= 495)
			{
				stopFlag = true;
			}
		}

	},5)
}

/**翻转脚印**/
var page5Flag = false;
function page5(){

	var audio=(document.getElementById("video_2"));
	audio.src="sound/zoulu.mp3";
	audio.load();
	audio.loop=true;
	audio.play();

	cyclePeopleWalk();

	touch.on('#turnFindBtn', 'tap', function(){
		$(this).hide();
		turnFootprint();
		audio.pause();
	});

	touch.on('#Footprint-walk-page', 'swipeup', function(){
		if (!page5Flag){
			return;
		}
		else{
			$('#Footprint-walk-page').hide().next().fadeIn();
			restorePage5();
		};
	});

	touch.on('#Footprint-walk-page', 'swipedown', function(){
		if (!page5Flag){
			return;
		}
		else{
			$('#Footprint-walk-page').hide().prev().fadeIn();
			page4();
			restorePage5();
		};
	});
}
function turnFootprint(){
	$('#foot-turn').show();
	var picNum = 1;
	var turnFootTime = null;
	clearInterval(turnFootTime);

	var turnImg = $("#turnImg");

	turnFootTime = setInterval(function(){

		turnImg.attr("src",'turn/turn_'+ picNum +'.jpg');

		picNum++;

		if(picNum >= 22){
			clearInterval(turnFootTime);
			$('#Footprint-txt, #Footprint-walk-page .tips_up').fadeIn(200);
			page5Flag = true;
		}

	},50);
}
/*脚印和人循环*/
var cyclePeopleTime = null;
function cyclePeopleWalk(){

	var picNum = 1;
	clearInterval(cyclePeopleTime);

	var footPeopleImg = $("#footPeopleImg");

	cyclePeopleTime = setInterval(function(){

		footPeopleImg.attr("src",'walk/walk_'+ picNum +'.jpg');

		picNum++;

		if(picNum >= 28)
		{
			footPeopleImg.attr("src",'walk/walk_1.jpg');
			cyclePeopleWalk();
		}

	},250)
}

/*还原翻转脚印页*/
function restorePage5(){
	clearInterval(cyclePeopleTime);

	$('#footPeopleImg').attr('src',"");
	$('#turnImg').attr('src','turn/turn_1.jpg');

	$('#turnFindBtn').show();
	$('#Footprint-txt, #Footprint-walk-page .tips_up,#foot-turn').hide();

	page5Flag = false;
}

/*改变音乐*/
function changeMusic(source){
	var audio=(document.getElementById("video_2"));
	audio.src="sound/"+ source +".mp3";
	audio.load();
	audio.loop=false;
	audio.play();
}

/*
*初始化页面闪动
*/
function initFlash(){

	//狼头上的文字闪动
    var diff_txt_array = [320,0, 320, 0, 0];
    initFlashFn(0, diff_txt_array, '.diff_txt', 150);

    //雨滴闪动
    var water_array = [0,534,1068];
	initFlashFn(0, water_array, '.water', 200);

	//雨滴闪动
    var linggan_txt_array = [363, 0, 363, 0, 0];
	initFlashFn(0, linggan_txt_array, '.linggan_txt', 150);

	//眼睛闪动
	var eye_array = [0, 0, 0, 72, 144];
	initFlashFn(0, eye_array, '.eye', 200);

    //按别人的指引盲目前进
    var finger_txt_array = [310, 0, 310, 0, 0];
    initFlashFn(0, finger_txt_array, '#finger-txt', 150);

    //踩在别人脚步上前进的人
    var Footprint_txt_array = [349, 0, 349, 0, 0];
    initFlashFn(0, Footprint_txt_array, '#Footprint-txt', 150);

    //迷宫页面的文字
    var out_txt_array = [360, 0, 360, 0, 0];
    initFlashFn(0, out_txt_array, '#out-txt', 150);

    //指纹
    var zhiwen_array = [215, 0, 215, 0, 0];
    initFlashFn(0, zhiwen_array, '#zhiwenTxt', 150);

    //唯我独型
    var weiwo_array = [350, 0, 350, 0, 0];
    initFlashFn(0, weiwo_array, '#weiwo', 150);
}

/**
*封装Flash函数
i 初始闪动位置
fArray闪动位置
Dom 元素
**/
function initFlashFn(i, fArray, Dom, time){
	setInterval(function(){
        $(Dom).css({
            "background-position" : '-'+ (fArray[i]) + 'px'
        });

        i++;

        if(i == fArray.length)
        {
            i = 0;
        }

    },time);
}

/*初始化屏幕高度 
 */
function initHeight(){
	var Vheight = parseInt(document.documentElement.clientHeight);
	$(".commonHeight").css("height" , Vheight);
}

/*
*序列帧
**/
var page6Flage = false;
function page6(){

	var yourselfTime = null;
	var picNum = 1;
	touch.on('#zhiwen', 'tap touchstart', function(){
		clearInterval(yourselfTime);

		var libImg = $("#libImg");

		yourselfTime = setInterval(function(){

			libImg.attr("src",'lib/sbl_'+ picNum +'.jpg');

			if(picNum == 16 || picNum == 24)
			{
				changeMusic('boli');
			}

			if(picNum >= 36)
			{
				clearInterval(yourselfTime);
				page6Flage = true;
				$('#zhiwen, #zhiwenTxt').hide();
				$('#selfBtn, #weiwo').show();
				picNum = 1;
				return;
			}

			if (picNum == 15){
				setTimeout(function(){
					picNum++;
				},400);
			}
			else{
				picNum++;
			}

		},150);
	})

	/*了解详情*/
	$('#selfBtn .btn_1').bind('click', function(){
		$('#product').show();
	})
	$('.closeBtnBox a').bind('click', function(){
		$(this).parent().parent().hide();
	});

	/*试乘试驾*/
	$('#selfBtn .btn_2').bind('click', function(){
		$('#submitWarp').show();
	});

	/*jin rong*/
	$('#selfBtn .btn_3').bind('click', function(){
		$('#jinrong').show();
	});
	$('#jinrong').bind('click', function(){
		$(this).hide();
	});

	/*分享*/
	touch.on('#selfBtn .btn_4', 'tap', function(){
		$('#shareMask').show();
	});
	touch.on('#shareMask', 'tap', function(){
		$(this).hide();
	});

	touch.on('#self-page-black', 'swipedown', function(){
		
		if(!page6Flage)
		{
			return;
		}
		else{
			$('#self-page-black').hide().prev().fadeIn();
			page5();
			restorePage6();
		}
	});
}
function restorePage6(){
	$('#libImg').attr("src",'');
	$('#selfBtn, #jinrong, #weiwo, #shareMask, #product, #submitWarp').hide();
	$('#zhiwen, #zhiwenTxt').show();
	page6Flage = false;
}


/**
 * 获取微信配置
 */
