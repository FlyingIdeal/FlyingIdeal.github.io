$(function(){

	//右侧浮动二维码
	$('#attention').bind({
		mouseover : function(){
			$(this).find('.more').show();
		},
		mouseout : function(){
			$(this).find('.more').hide();	
		}	
	});
	
	$('#marketing-center').bind({
		mouseover : function()
		{
			$(this).find('.detail').show();	
		},
		mouseout : function()
		{
			$(this).find('.detail').hide();	
		}	
	})
	$('#weibo').bind({
		mouseover : function()
		{
			$(this).find('.detail').show();	
		},
		mouseout : function()
		{
			$(this).find('.detail').hide();	
		}	
	})
	$('#weico').bind({
		mouseover : function()
		{
			$(this).find('.detail').show();	
		},
		mouseout : function()
		{
			$(this).find('.detail').hide();	
		}	
	})

	//如何获取ID

	$('#howIDLink').hover(
		function(){
			$('#howID').show();
		},
		function(){
			$('#howID').hide();
		}
	);

})