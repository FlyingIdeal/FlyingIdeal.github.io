var fileBasePath = 'http://192.168.12.4/';

var fileList = [
	'img/loading-bg.jpg',
	'img/loading-monster.png',
	'img/loading-scan-line.png',
	'img/loading-scan.png',
	'img/begin-1.jpg',
	'img/begin-2.jpg',
	'img/end-1.jpg',
	'img/end-2.jpg',
	'img/end-btn-share.png',
	'img/share.png',
	'img/tips.png'
];

var loader = new WxMoment.Loader();

for (var i = 0; i < fileList.length; i++) {
	loader.addImage(fileBasePath + fileList[i]);
};

loader.addProgressListener(function (e) {
	if ( e.completedCount >= 4 ) {
		$('#load').addClass('show');
		$('.scan').addClass('run');
		loading();
	};
});

loader.addCompletionListener(function () {
	setTimeout(function(){
		$('#video').addClass('show');
		loadingStatus = 0;
		setTimeout(function(){
			$('#load').remove();
		},1000);
	},3000);
});

var ua = navigator.userAgent.toLowerCase();
var iOS = /iPad|iPhone|iPod/.test(navigator.platform) || ua.indexOf('iphone') >= 0;
var QB;
var WeiXin;
if ( ua.indexOf('mttcustomua') > -1 || ua.indexOf('mqqbrowser') > -1 ) {
	QB = true;
};
if ( ua.indexOf('micromessenger') > -1 ) {
	WeiXin = true;
};

$(function() {

	loader.start();

	$(window).resize(function() {
		var random = Math.random();
		window.location.href = 'http://192.168.12.4/index.html?' + random;
	});

	var width = $('body').width();
	var height = $('body').height();
	if ( width > height ) {
		$('body').addClass('horizontal');
		$('#video-1').remove();
		// $('.video-responsive video source').attr({'src':fileBasePath + 'video/2.mp4'});
	} else {
		$('#video-2').remove();
	};

	$('.js-video')[0].load();

	var canvasVideo;
	if ( iOS && QB == undefined && !WeiXin ) {
		$('.js-video')[0].load();
		canvasVideo = new CanvasVideoPlayer({
			videoSelector: '.js-video',
			canvasSelector: '.js-canvas',
			hideVideo: true,
			audio: true
		});
	} else {
		$('.js-video')[0].load();
		$('canvas').remove();
		// if ( !iOS ) {
		// 	$('video').removeAttr('webkit-playsinline');
		// 	$('video').attr({'controls':'controls'});
		// };
		$('video').on('ended',function(){
			$('#end').addClass('show');
			$('#video').remove();
		});
	};


	$('#video').one('touchend',function(event){
		event.preventDefault();
		$('#video .video-responsive').addClass('show');
		if ( canvasVideo ) {
			canvasVideo.play();
		} else {
			$('video')[0].play();
		};
	});

	$('#end .btn-share').bind('touchend',function(event){
		event.preventDefault();
		$('#share').addClass('show');
		_hmt.push(['_trackEvent', '分享', '状态', '分享按钮']);
	});

	$('#share').bind('touchend',function(event){
		event.preventDefault();
		$('#share').addClass('hide');
		setTimeout(function(){
			$('#share').removeClass('show hide');
		},500);
	});

})

var loadingIndex = 1;
var loadingStatus = 1;
function loading() {
	$('#load .monster li').removeClass('show');
	$('#load .monster li.monster-' + loadingIndex).addClass('show');
	loadingIndex++;
	if ( loadingIndex == 4 ) {
		loadingIndex = 1;
	};
	setTimeout(function(){
		if ( loadingStatus == 1 ) {
			loading();
		};
	},1000);
};