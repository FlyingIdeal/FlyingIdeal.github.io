/*canvas main*/
$(function(){

	$("body").on("touchmove", function(e) {
		e.preventDefault();
	});	

	//屏幕自适应
	LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
	LSystem.screen(LStage.FULL_SCREEN);

	//初始化游戏
	var gameWidth = 640;
	var gameHeight = window.innerHeight * gameWidth / window.innerWidth;

	//-----------------------判断横屏------------------------------------------------
	var initFlag = true;
	var landscape = false;
	//判断横屏
	function orien() {
		if (window.orientation == 90 || window.orientation == -90) {
			if(initFlag) {
				initFlag = false;
				landscape = true;
			}
			$("#landscape").show();

		} else {
			if(initFlag) {
				initFlag = false;
			}
			if(landscape) {
				window.location.reload(true);
			} else {
				$("#landscape").hide();	
			}
		}
	};

	orien();
	$(window).on("orientationchange", orien);

	var ua = navigator.userAgent, wx = /MicroMessenger/i.test(ua), ios = /ip(?=od|ad|hone)/i.test(ua);

	//图片数组img
	var imgData0 = new Array();
	var imglist0 = {};
	imgData0.push({name:"audioBtn", path:'images/audioBtn.png'});
	imgData0.push({name:"ball", path:'images/ball.png'});
	imgData0.push({name:"ballShadow", path:'images/ballShadow.png'});
	imgData0.push({name:"Bg", path:'images/Bg.jpg'});
	imgData0.push({name:"car", path:'images/car.png'});
	imgData0.push({name:"closeBtn", path:'images/closeBtn.png'});
	imgData0.push({name:"diff_txt", path:'images/diff_txt.png'});
	imgData0.push({name:"eye", path:'images/eye.png'});
	imgData0.push({name:"findBtn", path:'images/findBtn.png'});
	imgData0.push({name:"fingerTxt", path:'images/finger-txt.png'});
	imgData0.push({name:"FootprintBtn", path:'images/FootprintBtn.png'});
	imgData0.push({name:"Footprint-txt", path:'images/Footprint-txt.png'});
	imgData0.push({name:"jinrong", path:'images/jinrong.png'});
	imgData0.push({name:"line", path:'images/line.png'});
	imgData0.push({name:"linggan_txt", path:'images/linggan_txt.png'});
	imgData0.push({name:"load", path:'images/load.jpg'});
	imgData0.push({name:"logo", path:'images/logo.png'});
	imgData0.push({name:"logo2", path:'images/logo2.png'});
	imgData0.push({name:"mangmuBtn", path:'images/mangmu-btn.png'});
	imgData0.push({name:"migongBg", path:'images/migongBg.png'});
	imgData0.push({name:"migongBtn", path:'images/migongBtn.png'});
	imgData0.push({name:"migongPo", path:'images/migongPo.png'});
	imgData0.push({name:"out-txt", path:'images/out-txt.png'});
	imgData0.push({name:"peopleDecompose", path:'images/people-decompose.png'});
	imgData0.push({name:"product", path:'images/product.png'});
	imgData0.push({name:"productBg", path:'images/productBg.jpg'});
	imgData0.push({name:"selfBtn", path:'images/selfBtn.png'});
	imgData0.push({name:"selfFinger", path:'images/self-finger.png'});
	imgData0.push({name:"selfTxt", path:'images/self-txt.png'});
	imgData0.push({name:"share", path:'images/share.jpg'});
	imgData0.push({name:"shareMask", path:'images/shareMask.png'});
	imgData0.push({name:"submitBg", path:'images/submitBg.jpg'});
	imgData0.push({name:"submiticon", path:'images/submiticon.png'});
	imgData0.push({name:"tips_up", path:'images/tips_up.png'});
	imgData0.push({name:"water", path:'images/water.png'});
	imgData0.push({name:"weiwo", path:'images/weiwo.png'});
	imgData0.push({name:"wolf", path:'images/wolf.png'});

	//图片及js文件数组lib
	var imgData1 = new Array();
	var imgList1 = {};
	for(var i1=1; i1<=36; i1++)
	{
		imgData1.push({name:"sbl_" + String(i1), path:"lib/sbl_" + String(i1) + ".jpg"});
	}

	//图片及js文件数组shan
	var imgData2 = new Array();
	var imgList2 = {};
	for(var i2=1; i2<=10; i2++)
	{
		imgData2.push({name:"shan_" + String(i2), path:"shan/shan_" + String(i2) + ".jpg"});
	}

	//图片及js文件数组turn
	var imgData3 = new Array();
	var imgList3 = {};
	for(var i3=1; i3<=22; i3++)
	{
		imgData3.push({name:"turn_" + String(i3), path:"turn/turn_" + String(i3) + ".jpg"});
	}

	//图片及js文件数组walk
	var imgData4 = new Array();
	var imgList4 = {};
	for(var i4=1; i4<=28; i4++)
	{
		imgData4.push({name:"turn_" + String(i4), path:"turn/turn_" + String(i4) + ".jpg"});
	}


	//---------------------------------------------------

	var gameContainerLayer;//最底层
	//---------------------------------------------------

	//设定游戏速度，屏幕大小，回调函数
	LInit(1000/10, "main", gameWidth, gameHeight, main);

	function main(){
		LGlobal.setDebug(true);//bug输出
		LMouseEventContainer.set(LMouseEvent.MOUSE_UP, true);
		LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN, true);

		gameContainerLayer = new LSprite();
		addChild(gameContainerLayer);

		//图片Loading
		LLoadManage.load(
			imgData0,
			function(progress)
			{
				//console.log(progress)
				$('#loadProcess').html(progress + '%');
			},
			function(result)
			{
				$('#loading').remove();
				imglist0 = result;//将图片以键值对的方式输出输出[[bu:img],[title:img]...]
				gameInit(result);//开始游戏
			}
		);
	};

	function gameInit(){

		var bitmapdataGameBg = new LBitmapData(imglist0['Bg']);
		var bitmapGameBg = new LBitmap(bitmapdataGameBg);
		gameContainerLayer.addChild(bitmapGameBg);

		//logo层
		var logoLayer = new LSprite();
		var bitmapLogo = new LBitmap(new LBitmapData(imglist0['logo']));
		bitmapLogo.x = 10;
		bitmapLogo.y = 10;
		logoLayer.addChild(bitmapLogo);

		//第一页---------------------------------------------------------------------*/
		var firstLayer = new LSprite();

		var bitmapWolf = new LBitmap(new LBitmapData(imglist0['wolf']));
		bitmapWolf.x = 0;
		bitmapWolf.y = 195;
		firstLayer.addChild(bitmapWolf);

		//闪动
		var difftxtList = LGlobal.divideCoordinate(640,311,1,2);
		var	difftxtData = new LBitmapData(imglist0['diff_txt'],0,0,320,311);
		var difftxtPlayer = new LAnimationTimeline(difftxtData, difftxtList);
		difftxtPlayer.x = 180;
		difftxtPlayer.y = 330;
		firstLayer.addChild(difftxtPlayer);

		//第一页下方的按钮
		var bitmapmigongBtn = new LBitmap(new LBitmapData(imglist0['migongBtn']));
		bitmapmigongBtn.x = 160;
		bitmapmigongBtn.y = 830;
		firstLayer.addChild(bitmapmigongBtn);

		gameContainerLayer.addChild(logoLayer);
		gameContainerLayer.addChild(firstLayer);

		firstLayer.addEventListener(LMouseEvent.MOUSE_DOWN, removeFirstLayer);

		function removeFirstLayer(){
			gameContainerLayer.removeChild(firstLayer);

			initSecondLayer();
		}

		//第二页---------------------------------------------------------------------*/
		var secondLayer = new LSprite();
		function initSecondLayer(){

			//第二页水滴
			var waterList = LGlobal.divideCoordinate(1602,631,1,3);
			var	waterData = new LBitmapData(imglist0['water'],0,0,534,631);
			var waterPlayer = new LAnimationTimeline(waterData, waterList);
			waterPlayer.x = 63;
			waterPlayer.y = 150;
			waterPlayer.alpha = 0;
			LTweenLite.to(waterPlayer,0.3,{alpha:1.0});
			secondLayer.addChild(waterPlayer);

			//第二页按钮
			var bitmapfindBtnLayer = new LSprite();
			var bitmapfindBtn = new LBitmap(new LBitmapData(imglist0['findBtn']));
			bitmapfindBtnLayer.x = 150;
			bitmapfindBtnLayer.y = 830;
			bitmapfindBtnLayer.alpha = 0;
			LTweenLite.to(bitmapfindBtnLayer,0.5,{alpha:1.0, delay:1});
			bitmapfindBtnLayer.addChild(bitmapfindBtn);

			bitmapfindBtnLayer.addEventListener(LMouseEvent.MOUSE_DOWN, addEye);

			secondLayer.addChild(bitmapfindBtnLayer);

			function addEye(){

				secondLayer.removeChild(bitmapfindBtnLayer);//移除寻找灵感按钮

				//添加天才是99%的汗水
				/*var linggantxtList = LGlobal.divideCoordinate(728,138,1,2);
				var	linggantxtData = new LBitmapData(imglist0['linggan_txt'],0,0,363,138);
				var linggantxtPlayer = new LAnimationTimeline(linggantxtData, linggantxtList);
				linggantxtPlayer.x = 138;
				linggantxtPlayer.y = 750;
				secondLayer.addChild(linggantxtPlayer);*/

				//眼睛
				window.setTimeout(function(){
					var eyeList = LGlobal.divideCoordinate(360,72,1,5);
					var	eyeData = new LBitmapData(imglist0['eye'],0,0,72,72);
					var eyePlayer = new LAnimationTimeline(eyeData, eyeList);
					eyePlayer.x = 230;
					eyePlayer.y = 375;
					secondLayer.addChild(eyePlayer);

					eyePlayer.addEventListener(LEvent.COMPLETE, function(e){
						eyePlayer.stop();
						secondLayer.removeChild(eyePlayer);//移除眼睛

						showBenzCar();
					})
				},300)
			}

			function showBenzCar(){

				secondLayer.removeChild(waterPlayer);//移除水滴

				var carList = LGlobal.divideCoordinate(5120,640,1,8);
				var	carData = new LBitmapData(imglist0['car'],0,0,640,640);
				var carPlayer = new LAnimationTimeline(carData, carList);
				carPlayer.speed = 0.0005;
				carPlayer.x = 10;
				carPlayer.y = 125;
				secondLayer.addChild(carPlayer);

				carPlayer.addEventListener(LEvent.COMPLETE, function(e){
					carPlayer.stop();

					//添加天才下面的按钮 模拟
					var bitmapmigongBtnLayer = new LSprite();
					var bitmapmigongBtn = new LBitmap(new LBitmapData(imglist0['migongBtn']));
					bitmapmigongBtnLayer.addChild(bitmapmigongBtn);
					bitmapmigongBtnLayer.x = 160;
					bitmapmigongBtnLayer.y = 830;
					bitmapmigongBtnLayer.alpha = 0;
					LTweenLite.to(bitmapmigongBtnLayer,0.5,{alpha:1.0});
					secondLayer.addChild(bitmapmigongBtnLayer);
					bitmapmigongBtnLayer.addEventListener(LMouseEvent.MOUSE_DOWN, initThirdLayer);
				});
			}

			gameContainerLayer.addChild(secondLayer);


			//序列山的图片
			LLoadManage.load(
				imgData2,
				null,
				function(res)
				{
					imgList2 = res;
				}
			);
		}

		//第三页---------------------------------------------------------------------*/
		var thirdLayer = new LSprite();
		function initThirdLayer(){

			//移除第二page
			gameContainerLayer.removeChild(secondLayer);

			//序列山
			var shanDatas = [];
			var shanList = [];
			for(var i=0; i<10; i++)
			{
				shanDatas.push(new LBitmapData(imgList2["shan_" + (i+1)]));
				shanList.push({dataIndex : i, x : 0, y : 0, width : 640, height : 1136, sx : 0, sy : 0});
			}

			var shanPlayer = new LAnimationTimeline(shanDatas, [shanList]);
			shanPlayer.x = 0;
			shanPlayer.y = 0;
			thirdLayer.addChild(shanPlayer);
			shanPlayer.stop();

			shanPlayer.addEventListener(LEvent.COMPLETE, function(e){
				shanPlayer.stop();
			});

			//不再盲目按钮
			var mangmuBtnLayer =  new LSprite();
			var bitmapmimangmuBtn = new LBitmap(new LBitmapData(imglist0['mangmuBtn']));
			mangmuBtnLayer.addChild(bitmapmimangmuBtn);
			mangmuBtnLayer.x = 150;
			mangmuBtnLayer.y = 830;
			thirdLayer.addChild(mangmuBtnLayer);
			mangmuBtnLayer.addEventListener(LMouseEvent.MOUSE_DOWN, xuliezhenShanPlay);

			//人行走 peopleDecompose
			var curPeoTween;
			var peopleDecomposeList = LGlobal.divideCoordinate(770,240,1,7);
			var	peopleDecomposeData = new LBitmapData(imglist0['peopleDecompose'],0,0,110,240);
			var peopleDecomposePlayer = new LAnimationTimeline(peopleDecomposeData, peopleDecomposeList);
			peopleDecomposePlayer.speed = 0.01;
			peopleDecomposePlayer.x = 0;
			peopleDecomposePlayer.y = 190;
			curPeoTween = LTweenLite.to(peopleDecomposePlayer,3,{x:640,y:130,loop:true}).to(peopleDecomposePlayer,0,{x:-110,y:190});
			thirdLayer.addChild(peopleDecomposePlayer);

			//序列山播放
			function xuliezhenShanPlay(){
				mangmuBtnLayer.remove();
				shanPlayer.play();

				//停止人行走动画
				var stopFlag = false;
				clearInterval(curPeoTimer);
				var curPeoTimer = setInterval(function(){
					if(stopFlag)
					{
						peopleDecomposePlayer.x = 490;
						peopleDecomposePlayer.y = 144;
						LTweenLite.remove(curPeoTween);
						peopleDecomposePlayer.stop();
						clearInterval(curPeoTimer);

						//显示序列山的文案
						showxuliezhenShanTxt();
					}
					if(peopleDecomposePlayer.x < 490 && (peopleDecomposePlayer.x+40) >=490)
					{
						stopFlag = true;
					}
				},5)
			}

			//显示序列山的文案
			function showxuliezhenShanTxt(){
				var fingerTxtList = LGlobal.divideCoordinate(620,250,1,2);
				var	fingerTxtData = new LBitmapData(imglist0['fingerTxt'],0,0,310,250);
				var fingerTxtPlayer = new LAnimationTimeline(fingerTxtData, fingerTxtList);
				fingerTxtPlayer.x = 310;
				fingerTxtPlayer.y = 560;
				fingerTxtPlayer.alpha = 0;
				LTweenLite.to(fingerTxtPlayer,0.5,{alpha:1});
				thirdLayer.addChild(fingerTxtPlayer);

				//显示山按钮
				var mangmuBtnTwoLayer =  new LSprite();
				var bitmapmimangmuTwoBtn = new LBitmap(new LBitmapData(imglist0['migongBtn']));
				mangmuBtnTwoLayer.addChild(bitmapmimangmuTwoBtn);
				mangmuBtnTwoLayer.x = 150;
				mangmuBtnTwoLayer.y = 850;
				mangmuBtnTwoLayer.alpha = 0;
				LTweenLite.to(mangmuBtnTwoLayer,0.5,{alpha : 1, delay:1});
				thirdLayer.addChild(mangmuBtnTwoLayer);
				mangmuBtnTwoLayer.addEventListener(LMouseEvent.MOUSE_DOWN, initFouthLayer);
			}

			gameContainerLayer.addChild(thirdLayer);

			LLoadManage.load(
				imgData1,
				null,
				function(res)
				{
					imgList1 = res;
				}
			);

		}


		//第四页---------------------------------------------------------------------*/
		var fouthLayer = new LSprite();

		function initFouthLayer(){

			gameContainerLayer.removeChild(thirdLayer);//移除第三页层级

			//车的序列帧
			var cheDatas = [];
			var cheList = [];
			for(var i=0; i<36; i++)
			{
				cheDatas.push(new LBitmapData(imgList1["sbl_" + (i+1)]));
				cheList.push({dataIndex : i, x : 0, y : 0, width : 640, height : 1136, sx : 0, sy : 0});
			}

			var chePlayer = new LAnimationTimeline(cheDatas, [cheList]);
			chePlayer.x = 0;
			chePlayer.y = 0;
			chePlayer.alpha = 0;
			fouthLayer.addChild(chePlayer);
			chePlayer.stop();

			chePlayer.addEventListener(LEvent.COMPLETE, function(e){
				chePlayer.stop();

				//播放完出现三个按钮
				//了解详情
				var detailLayer = new LSprite();
				var bitmapDetail = new LBitmap(new LBitmapData(imglist0['selfBtn'],0,0,102,102));
				detailLayer.addChild(bitmapDetail);
				detailLayer.x = 29;
				detailLayer.y = 860;
				detailLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
					window.location.href = 'http://m.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/mobile/mbp/new_cars/model_overview/cla-class/c117.html';
				});
				//试乘试驾
				var shijiaLayer = new LSprite();
				var bitmapShijia = new LBitmap(new LBitmapData(imglist0['selfBtn'],129,0,102,102));
				shijiaLayer.addChild(bitmapShijia);
				shijiaLayer.x = 189;
				shijiaLayer.y = 860;
				shijiaLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
					window.location.href = 'http://special.mercedes-benz.com.cn/S-Class-sustaining-1/mobile/submit.html';
				});
				//金融计划
				var planLayer = new LSprite();
				var bitmapPlan = new LBitmap(new LBitmapData(imglist0['selfBtn'],256,0,102,102));
				planLayer.addChild(bitmapPlan);
				planLayer.x = 349;
				planLayer.y = 860;
				planLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
					window.location.href = 'http://special.mercedes-benz.com.cn/S-Class-sustaining-1/mobile/plan.html';
				});

				//再玩一次
				var againLayer = new LSprite();
				var bitmapAgain = new LBitmap(new LBitmapData(imglist0['selfBtn'],256,0,102,102));
				againLayer.addChild(bitmapAgain);
				againLayer.x = 509;
				againLayer.y = 860;
				againLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
					removeChild(gameContainerLayer);
					main();
				});


				fouthLayer.addChild(detailLayer);
				fouthLayer.addChild(shijiaLayer);
				fouthLayer.addChild(planLayer);
				fouthLayer.addChild(againLayer);


			});

			//做自己文案
			var selfTxtList = LGlobal.divideCoordinate(430,212,1,2);
			var	selfTxtData = new LBitmapData(imglist0['selfTxt'],0,0,215,212);
			var selfTxtPlayer = new LAnimationTimeline(selfTxtData, selfTxtList);
			selfTxtPlayer.x = 142;
			selfTxtPlayer.y = 703;
			fouthLayer.addChild(selfTxtPlayer);

			//指纹
			var selfFingerLayer = new LSprite();
			var bitmapSelfFinger = new LBitmap(new LBitmapData(imglist0['selfFinger']));
			selfFingerLayer.addChild(bitmapSelfFinger);
			selfFingerLayer.x = 146;
			selfFingerLayer.y = 177;
			fouthLayer.addChild(selfFingerLayer);
			selfFingerLayer.addEventListener(LMouseEvent.MOUSE_DOWN, xulieChePlay);
			
			function xulieChePlay(){
				chePlayer.alpha = 1;
				fouthLayer.removeChild(selfFingerLayer);
				fouthLayer.removeChild(selfTxtPlayer);
				chePlayer.play();
			}
			gameContainerLayer.addChild(fouthLayer);
		}
	}
})




