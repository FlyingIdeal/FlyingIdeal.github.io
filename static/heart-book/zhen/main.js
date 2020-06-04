;
(function($) {
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

  var inPersonSection = true;
  var currentSection = 0;
  var sections = $('#story section');

  var getPlatform = function() {
    var browserInformation = navigator.userAgent;
    if (browserInformation.indexOf('iPhone') >= 0 || browserInformation.indexOf("iPad") >= 0) {
      return 'ios';
    } else if (browserInformation.indexOf('Android') >= 0) {
      return 'android';
    }
    return 'pc';
  };

  // 进入 starter
  var starterIn = function() {};

  // 退出 starter
  var starterOut = function() {
    $.fn.magic('#starter-you-have-a', 'vanishOut', 0, 'vanishIn');
    $.fn.magic('#starter-enter-to-your-heart', 'vanishOut', 100, 'vanishIn');
    $.fn.magic('#starter-start-from-your-heart', 'spaceOutDown', 300, 'spaceInDown');
    setTimeout(function() {
      $('#starter').hide();
    }, 200);
    $('#person-slider').css({
      display: 'none',
      opacity: 0
    });
  };

  var personIn = function() {

    $('#person').css({
      width: 640,
      'margin-left': -320
    });
    $('#person-ribbon').css({
      left: 100
    });
    $('#person-slider').css({
      left: -166
    });
    starterOut();
    window.clearInterval(starterShakeInterval);
    setTimeout(function() {
      $('#person').animate({
        top: -50,
        'margin-top': -100
      }, 500);
      $('#shutter').css({
        opacity: 0,
        bottom: 0,
        display: 'block'
      }).animate({
        opacity: 1,
        bottom: 25
      }, 500);
    }, 0);

    setTimeout(function() {
      $.fn.magicInFor('#person');
    }, 0);

    $.fn.magic('#book-cover', 'slideDown', 1000);
  };

  var personOut = function() {
    $.fn.magic('#person', 'vanishOut', 0);
    setTimeout(function() {
      $('#person').hide();
    }, 1000);
  };

  var storyIn = function() {
    $.fn.magic('#story', 'vanishIn', 0);
    setTimeout(function() {
      $.fn.magicInFor('#section-event');
    }, 1000);
  };

  var initScratch = function() {
    if (currentSection != 1 && currentSection != 2) {
      return;
    }
    $('#section-photo-' + currentSection + ' .canvas').each(function(i) {
      //console.log(i);
      var mask = './img/section-photo-' + currentSection + '-scratcher-mask-' + (i + 1) + '.png';
      //console.log(mask);
      $(this).wScratchPad({
        fg: mask,
        size: 90, // The size of the brush/scratch.
        //bg          : bg,  // Background (image path or hex color).
        //fg          : fg,  // Foreground (image path or hex color).
        realtime: true, // Calculates percentage in realitime.
        cursor: 'crosshair', // Set cursor.
        scratchUp: function() {
          $('#section-photo-' + currentSection + ' .canvas').css({
            display: 'none'
          });
        }
      });
      if (currentSection == 1) {
        $('#section-photo-' + currentSection + ' .canvas i').css({
          top: 50,
          left: 50
        }).animate({
          top: 20,
          left: 150
        })
      }
    });
    $('.canvas').css({
      background: 'none !important'
    });
  };

  // 拍照片
  var shot = function() {
    //console.log('Shotting');

    if (inPersonSection) {
      $('#person .frame').addClass('shot');
      setTimeout(function() {
        personOut();
      }, 300);
      setTimeout(function() {
        storyIn();
      }, 500);
      inPersonSection = false;
      return;
    }

    var key = '#' + $(sections[currentSection]).attr('id');
    //console.log('Key for out: ' + key);

    $(key + ' .frame').addClass('shot');

    $.fn.magicOutFor(key);

    if (currentSection < sections.length) {
      currentSection++;
      nextkey = '#' + $(sections[currentSection]).attr('id');
      //console.log('Key for in: ' + nextkey);
      setTimeout(function() {
        $.fn.magicInFor(nextkey);
        initScratch();
      }, 1000);

      if (currentSection + 1 == sections.length) {
        $.fn.magic('#shutter', 'slideDown');
        setTimeout(function() {
          $('#shutter').css({
            display: 'none'
          });
          //$.fn.magic('#book-cover', 'slideDownRetourn', 1000);
          $('#book-cover #book-cover-title').hide();
        }, 1000);
      }
    }

  };
  var starterShakeInterval;
  var initHeart = function() {
    var starterShakeCounter = 0;
    starterShakeInterval = setInterval(function() {
      switch (starterShakeCounter) {
        case 0:
          $('#starter-start-from-your-heart').css({
            'background-position': 'center left'
          });
          starterShakeCounter = 1;
          break;
        case 1:
        case 3:
          $('#starter-start-from-your-heart').css({
            'background-position': 'center center'
          });
          starterShakeCounter = starterShakeCounter == 1 ? 2 : 4;
          break;
        case 2:
        case 4:
          $('#starter-start-from-your-heart').css({
            'background-position': 'center right'
          });
          starterShakeCounter = starterShakeCounter == 2 ? 3 : 5;
          break;
        case 5:
          $('#starter-start-from-your-heart').css({
            'background-position': 'center left'
          });
          starterShakeCounter = 0;
          break;
      }
    }, 150);
  };


  var init = function() {
    $('#person').css({
      width: 600,
      'margin-left': -300
    });
    $(document).on('touchmove', function(e) {
      e.preventDefault();
    });

    starterIn();
    setTimeout(function() {
      initHeart();
    }, 0);
    $('#person-ribbon').on('click swipeUp', personIn);

    $('#shutter').on('tap', shot);
  };

  init();
}(Zepto));



$(function() {
  //分享
  //loading
  $("body").queryLoader2({
    barColor: "#ffffff",
    backgroundColor: "#214358",
    percentage: true,
    barHeight: 30,
    completeAnimation: "fade"
  });

  //显示遮罩层
  $('.invite').on('tap', function() {
    $('.mask').show();
  });

  //关闭分享遮罩层
  $('.mask').on('tap', function() {
    $('.mask').hide();
  });
})
