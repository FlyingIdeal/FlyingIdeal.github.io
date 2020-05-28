/**
  *公共js文件 
  *auter
  *time
**/

$(function(){

	//匡恩动态
	initTrend();
	//初始化所有滑动
	initAllSlide();
	//初始化banner的left位置
	getBannerHalfWidth();
	
	//最新资讯
	jQuery(".bc-social-wrap").slide({
		mainCell:".bc-social-box",
		autoPlay:true,
		effect:"topLoop"
	});


	$(window).resize(function(){
	  	initAllSlide();
	  	getBannerHalfWidth();
	});
})
/*
 * 首页匡恩动态
 */
function initTrend()
{
	if(!isPC())
	{
		return false;
	}

	$(".kuangn-trend-child .kuangn-trend-circle").mouseover(function(){
		$(".kuangn-trend-img-active").removeClass("kuangn-trend-img-active").css("transform","none");

		var trendObj = $(this).parent().find(".kuangn-trend-img").addClass("kuangn-trend-img-active");
		trendObj.transition({scale: 1 }, 500, 'linear');
	});
}

/***
*banner的left和right按钮的位置
**/
function getBannerHalfWidth(){
	var scWidth = parseInt($(window).width());
	var halfWidth = parseInt((scWidth - 1280)/2);

	//alert(scWidth);
	if(scWidth > 1280)
	{
		$('.banner a.preLeft').css("left" , halfWidth + 'px');
		$('.banner a.preRight').css("right" , halfWidth + 'px');
	}
	else
	{
		$('.banner a.preLeft').css("left" , 0);
		$('.banner a.preRight').css("right" , 0);
	}

	
}

/**
*页面中所有的滑动
*/
function initAllSlide(){
	//banner
	var bannerConf = {
		mainCell : ".bannerBox",
		titCell : ".bannerFouceBox .sImg",
		effect : "left",
		delayTime : 200,
		pnLoop : false,
		prevCell : '.preLeft',
		nextCell : '.preRight'
	};
	initSlidePlugIn("#banner",bannerConf);
	//jQuery(".banner").slide()


	//匡恩焦点
	var jdConf = {
		mainCell : ".kuangn-focus-box",
		titCell : ".kuangn-focus-focus span",
		effect : "left",
		delayTime : 200,
		pnLoop : false,
		prevCell : '.focus-left-btn',
		nextCell : '.focus-right-btn'
	};
	initSlidePlugIn("#kuangn-focus-wrap",jdConf);
	//jQuery(".kuangn-focus-wrap").slide()

	//匡恩动态
	var dtConf = {
		mainCell : ".kuangn-trend-wrap-bd ul",
		titCell : ".kuangn-trend-focus span",
		effect : "left",
		delayTime : 200,
		pnLoop : false,
		prevCell : '.trend-left-btn',
		nextCell : '.trend-right-btn',
		endFun : function(i,c){
			$("#kuangn-trend-wrap ul li").eq(i).find(".kuangn-trend-circle:eq(0)").mouseover();
		}
	};
	initSlidePlugIn("#kuangn-trend-wrap",dtConf);
	//jQuery("#kuangn-trend-wrap").slide();
}