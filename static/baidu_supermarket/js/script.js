var scrollFunc = function(e) {
	e = e || window.event;
	if (e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件               
		if($(window).scrollTop()==0){
			//$('.fbMap').css('top','20px');
			$('.filBtn a').first().addClass('on').siblings().removeClass('on');
		}
		/*
		if (e.wheelDelta > 0) { //当滑轮向上滚动时
			var index = $('.tab').find('.active').index();
			if (index > 0) {

				$('.active').prev().trigger('click');

			}
		}
		if (e.wheelDelta < 0) { //当滑轮向下滚动时
			$('.active').next().trigger('click');
		}*/
	} else if (e.detail) { //Firefox滑轮事件
		if($(window).scrollTop()==0){
			//$('.fbMap').css('top','20px');
			$('.filBtn a').first().addClass('on').siblings().removeClass('on');
		}
		/*
		if (e.detail > 0) { //当滑轮向上滚动时
			$('.active').next().trigger('click');
		}
		if (e.detail < 0) { //当滑轮向下滚动时

			$('.active').prev().trigger('click');
		}*/
	}
}

$(function() {

	
	
	//setTimeout(scrollFunc());

	
		//给页面绑定滑轮滚动事件  
		if (document.addEventListener) { //firefox  
			document.addEventListener('DOMMouseScroll', scrollFunc, false);
		}
		//滚动滑轮触发scrollFunc方法  //ie 谷歌  
		document.onmousewheel = scrollFunc;


/*
	//线路图跟随
	$('.filBtn a').bind('click',function(){
		var thisId=$(this).attr('id');
		switch (thisId){
			case "fb1":
				$('.fbMap').css('top','20px');
				break;
			case "fb2":
				$('.fbMap').css('top','475px');
				break;
			case "fb3":
				$('.fbMap').css('top','930px');
				break;
			default:
				break;
		}
	})
*/



	var windowWidth = $(window).width();
	if (windowWidth <= 1300) {
		$('#lineMap').css('left', '8px')
	}

	$('#leftSideBar ul li').bind('click', function() {
		var num = $(this).index();
		switch (num) {
			case 0:
				$('#lineMap').css('top', '1px');
				$('.tab_1 .sd li').first().trigger('click');
				break;
			case 1:
				$('#lineMap').css('top', '151px');
				$('.tab_2 .sd li').first().trigger('click');
				break;
			case 2:
				$('#lineMap').css('top', '301px');
				$('.tab_3 .sd li').first().trigger('click');
				break;
			case 3:
				$('#lineMap').css('top', '451px');
				$('.tab_4 .sd li').first().trigger('click');
				break;
			default:
				break;
		}
	});

	//点击线路图
	$("#lineMap a").bind('click', function() {
		$("#Map").show();
	});

	$("#Map .close a").bind('click', function() {
		$("#Map").hide();
	});



	/*

		//线路图icon在左侧
		halfBarWidth();

	    $(window).resize(function(){
	        halfBarWidth()
	    });


		
	*/

});
//halfBarWidth
function halfBarWidth() {
	var scrWidth = $(document).width();
	var w1200 = $(".w1200").width();
	var halfBarWidth = parseInt((scrWidth - w1200) / 2);
	var EleWidth = $("#lineMap").width();
	$("#lineMap").css({
		"left": (halfBarWidth - EleWidth)
	});
}