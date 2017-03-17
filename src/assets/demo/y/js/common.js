$(window).load(function() {


	var wHeight = $(window).height();
	//屏幕高度
	$('.swiper , .wrap').css('height', wHeight);

    mySwiper = new Swiper('.swiper',{
        wrapperClass: 'sBox',
        mode: 'vertical',
        slideClass: 'sChild',
        slideVisibleClass:'active',
        onSlideChangeEnd : function(){
            var index = $(".active").index();
            var last = $(".sChild").length-1;

            if (index == last)
            {
                $("#upDownBtn").hide();
            }
            else{
                $("#upDownBtn").show();
            };
        }
    });

    mySwiper = new Swiper('.inSlide',{
        wrapperClass: 'inSlideBox',
        mode: 'horizontal',
        slideClass: 'inChild'
    });
    
});

/**
 * 微信分享相关
 * @param  {[type]} Api [description]
 * @return {[type]}     [description]
 */
WeixinApi.ready(function(Api) {
    // 微信分享的数据 朋友
    var wxData = {
        "appId": "", //服务号可以填写appId
        "imgUrl" : '', //分享图片url
        "link" : '',  //分享页面地址
        "desc" : '', //分享标题
        "title" : "" //分享简介
    };


    // 分享的回调
    var wxCallbacks = {
        // 分享操作开始之前
        ready : function() {
            // 你可以在这里对分享的数据进行重组
            //alert("准备分享");
            
        },
        // 分享被用户自动取消
        cancel : function(resp) {
            // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
            //alert("取消分享");
        },
        // 分享失败了
        fail : function(resp) {
            // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
            //alert("分享失败");
        },
        // 分享成功
        confirm : function(resp) {
        	//增加分享记录
        },
        // 整个分享过程结束
        all : function(resp) {
            // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
            //alert("抢");
        }
    };

    // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
    Api.shareToFriend(wxData, wxCallbacks);

    // 点击分享到朋友圈，会执行下面这个代码
    Api.shareToTimeline(wxData, wxCallbacks);

    // 点击分享到腾讯微博，会执行下面这个代码
    Api.shareToWeibo(wxData, wxCallbacks);
});