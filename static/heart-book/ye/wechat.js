$(function() {
  //loading
  $("body").queryLoader2({
    barColor: "#ffffff",
    backgroundColor: "#214358",
    percentage: true,
    barHeight: 30,
    completeAnimation: "fade"
  });

  //显示遮罩层
  $('#share-button').on('tap', function() {
    $('.mask').show();
  });

  //关闭分享遮罩层
  $('.mask').on('tap', function() {
    $('.mask').hide();
  });

  //返回重新测试
  $('#reset-button').on('tap', function() {
    location.href = "../index.html";
  });

  //初始化音频地址
  music_data = {
    music: 'http://www.uwin.cc/benz/20150607/images/xin.mp3', //默认音乐
    replace_music: 'http://www.uwin.cc/benz/20150607/images/xin.mp3', //替换音乐
  };

  //加载 裸动
  if (/i(Phone|P(o|a)d)/.test(navigator.userAgent)) {
    $(document).one("touchstart", function() {
      music_init();
    });
  } else {
    music_init();
  }
})