/**
*power by FlyIdeal
*time 2015/05/01
*contact 963161475@qq.com
***/

function initSlideHeight(){
	var slideHeight = $('#height a').css('height');
	$('#banner').css('height',slideHeight);
}


function initSlide(){
	var swiper = new Swiper('#banner', {
		wrapperClass : 'bd',
		slideClass : 'sli',
		loop: true,
        nextButton: '.next',
        prevButton: '.prev',
        autoHeight: true,
        pagination: '.hd',
        paginationElement : 'span',
	    bulletActiveClass : 'on'
    });
}

/**
 * 页面滑动到顶部
 * **/
var footRegFlag = true;
function scrollTop(){
	$(window).bind('scroll', function(){
		var scrollH = document.documentElement.scrollTop + document.body.scrollTop;
		
		if(scrollH > 50)
		{
			$('.upArrowBtn').fadeIn(100);
			if(footRegFlag){
				$('.footReg').fadeIn(100);
				footRegFlag = false;
			}
		}
		else{
			$('.upArrowBtn').fadeOut(100);
		}
	})
	
	$('.upArrowBtn a').bind('click', function(){
		$('html, body').animate({
			'scrollTop' : '0px'
		},200)
	})
}