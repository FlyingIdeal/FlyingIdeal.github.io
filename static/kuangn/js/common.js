function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

function initSlidePlugIn(select,conf)
{
    if(!conf.isMobile)
    {
        conf.isMobile = "true";
    }
	if(isPC())
	{
        var rootDom = jQuery(select);
        if(!rootDom.data("mainCellHtml"))
        {
            rootDom.data("mainCellHtml",rootDom.find(conf.mainCell).clone(true));
            //jQuery(select).slide(conf);
            //return true;
        }
        else
        {
            var tmpWrap = rootDom.find(".tempWrap");
            var tmp = rootDom.data("mainCellHtml").clone(true);
            tmpWrap.replaceWith(tmp);
        }
        
        return jQuery(select).slide(conf);
	}
	else
	{
        if(!!conf.isMobile && conf.isMobile == "false")
        {
            return false;
        }
		conf.slideCell = select;
		return TouchSlide(conf);
	}
}

/**
 * 点击客服电话
 * @return {[type]} [description]
 */
function clickServicePhone()
{
    var currentTime = new Date();
    var currentDate = currentTime.getFullYear() + "-" + (currentTime.getMonth() + 1) + "-" + currentTime.getDate();

    var startTime = new Date(currentDate + " 08:00:00");
    var endTime = new Date(currentDate + " 18:00:00");
    
    if(startTime < currentTime && endTime > currentTime)
    {
        return true;
    }
    alert("非工作时间");
    return false;
}

/**
 * 初始化视频
 * @return {[type]} [description]
 */
function initVidwoEvent()
{
    $("body").on("click",".kuangn-video",function(){
        openVideo($(this).attr("data-video-url"));
    });
}

/**
 * 视频弹窗
 * @return {[type]} [description]
 */
function openVideo(url)
{
    //当前去除视频地址校验
    if(!url)
    {
        url = "http://player.youku.com/embed/XMTI1NDgxMzcxNg==";
    }
    $(".video-popup").remove();
    var _videoHtml = new Array();
    _videoHtml.push('<div class="video-popup">');
    _videoHtml.push('<div class="video-shade"></div>');
    _videoHtml.push('<iframe class="video-iframe" src="' + url + '" frameborder=0 allowfullscreen></iframe>');
    _videoHtml.push('<a class="video-popup-closeBtn" href="javascript:void(0);"><img src="images/video-popup-closeBtn.png" /></a>');
    _videoHtml.push('</div>');
    $("body").append(_videoHtml.join(""));
    //关闭按钮
    $(".video-popup-closeBtn,.video-shade").click(function(){
        $(".video-popup").remove();
    });
    //初始弹出
    videoResize();
    $(window).resize(function(){
        videoResize();
    });
}

function videoResize()
{
    var windowWidth = $(window).width();
    var iframeHeight = windowWidth / 1.6;
    if(iframeHeight > 400)
    {
        return false;
    }
    $(".video-iframe").css({
        height : iframeHeight,
        top : "calc(50% - " + (iframeHeight / 2) + "px)"
    });
}

$(function(){

    //初始化视频
    initVidwoEvent();

    //手机菜单按钮
	$(".kuangn-head-more-btn").click(function(){
        if($("#menuIndex").size() < 1)
        {
            $(".kuangn-head-nav ul").prepend('<li id="menuIndex"><a href="index.html">首页</a></li>');
        }
		$(".kuangn-head-nav").slideToggle(200);
	});

    //窗口改变大小时删除首页按钮
    $(window).resize(function(){
        if($(".kuangn-head-more-btn").is(":hidden"))
        {
            $("#menuIndex").remove();
            $(".kuangn-head-nav").show();
        }
        else
        {
            $(".kuangn-head-nav").hide();
        }
    });
    
});
