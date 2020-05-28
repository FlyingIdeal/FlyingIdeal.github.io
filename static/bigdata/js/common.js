window.onload = function()
{

	//屏幕高度
	wheight = document.documentElement.clientHeight;
	ph = Math.ceil(wheight/9);

	var wrap = document.querySelector('.wrap');
	var show = document.querySelector('.show');
	var showLeft = document.querySelector('.showLeft');
	var showRight = document.querySelector('.showRight');
	var showLogo = document.querySelector('.showLogo');
	var showTitle = document.querySelector('.showTitle');
	var pointOut = document.querySelector('.pointOut');
	var pointOn = document.querySelector('.pointOn');

	var expIntro1 = document.querySelector('.expIntro1');
	var expIntro2 = document.querySelector('.expIntro2');
	var expIntro3 = document.querySelector('.expIntro3');
	var expIntro4 = document.querySelector('.expIntro4');

	var Experts = document.querySelector('.Experts');

	var tishi = document.querySelector('.tishi');
	var point = document.querySelector('.point');
	var dsjp = document.querySelector('.dsjp');
	var font = document.querySelectorAll('.font');
	var huajie = document.getElementById('huajie');
	var fajue = document.getElementById('fajue');
	var ldnt = document.getElementById('ldnt');
	var sjqn = document.getElementById('sjqn');
	var sbox = document.getElementById('sbox');
	var b1 = document.getElementById('b1');
	var b2 = document.getElementById('b2');
	var b3 = document.getElementById('b3');
	var b4 = document.getElementById('b4');


	wh(wrap);
	wh(show);
	wh(showLeft);
	wh(showRight);
	wh(showLogo);
	wh(sbox);
	wh(Experts);

	for(var i=0; i < font.length ;i++)
	{
		font[i].style.height = ph + 'px';
	}


	//第一页显示效果

	setTimeout(function()
	{
		//化解落地难题，发掘数据潜能
		huajie.style.opacity = '1';
		fajue.style.opacity = '1';
		ldnt.style.opacity = '1';
		sjqn.style.opacity = '1';
		setTimeout(function()
		{
			huajie.style.textShadow = 'none';
			fajue.style.textShadow  = 'none';
			ldnt.style.textShadow = 'none';
			sjqn.style.textShadow = 'none';
			setTimeout(function()
			{
				setTimeout(function()
				{
					showLeft.style.webkitTransform = 'rotateY(-110deg)';
					showRight.style.webkitTransform = 'rotateY(110deg)';
					setTimeout(function()
					{
						showLeft.style.display = 'none';
						showRight.style.display = 'none';
						showLogo.style.opacity = '1';
						setTimeout(function()
						{
							showTitle.style.opacity = '1';
							setTimeout(function()
							{
								sbox.style.opacity = '1';
								setTimeout(function()
								{
									b1.style.webkitTransform='translateZ(0px)';
									b2.style.webkitTransform='translateZ(0px)';
									b3.style.webkitTransform='translateZ(0px)';
									b4.style.webkitTransform='translateZ(0px)';
									setTimeout(function()
									{
										dsjp.style.opacity = '1';
										point.style.display = 'block';
										tishi.style.display='block';
									},1200)
								},1000);
							},600);
						},1000);
					},1500);
				},1000);
			},100);
		},2000);
	}, 2000);

	
	//指纹
	point.addEventListener('touchstart',function(){
		pointOut.style.display='block';
		pointOn.style.display='block';			
		setTimeout(function(){
			showLogo.style.opacity='0';
			setTimeout(function(){
				showLogo.style.display='none';
				expIntro1.style.webkitTransform='translateX(0px)';
				expIntro2.style.webkitTransform='translateX(-80px)';
				expIntro3.style.webkitTransform='translateX(-40px)';
				expIntro4.style.webkitTransform='translateX(-80px)';
			},1000)
		},1000)
	})


}


/**
*设置高度
**/
function wh(obj)
{
	var wh = document.documentElement.clientHeight;
	obj.style.height = wh+'px';
}
