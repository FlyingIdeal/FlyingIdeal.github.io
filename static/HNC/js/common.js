$(function() {

  var wHeight = $(window).height();
  var currentIndex = 0;
  var svgArr = [];

  $(".wrap , .moreWrap , .bg , .page1 , .page2").css('height', wHeight);

  $("svg").each(function(i) {
    svgArr.push(new Walkway({
      selector: '#ps' + (i + 1),
      duration: 800,
      easing: 'easeInOutCubic'
    }));
  });

  //图片加载
  var time = null;
  var Img = new Image();
  Img.src = "http://www.uwin.cc/huawei/20150414/images/icon.png";

  Img.onload = function() {
    var size = $(".hnc .icon").size();

    time = setInterval(function() {
      size = $(".hnc .icon:hidden").size();
      var r = parseInt(Math.random() * (size - 1)) + 1;
      $(".hnc .icon:hidden:eq(" + r + ")").show();

      if (size <= 5) {
        clearInterval(time);
        $(".icon").show();

        setTimeout(function() {
          $(".bg , .btn , .logo , .title , .shadow").animate({
            "opacity": 1
          }, 500);
          $(".btn a").addClass("active");
        }, 200)
      }

    }, 20);
  }

  $(".btn a").bind('click', function() {
    drawImg();
  });


  /**
   *画图
   */
  var flag = false;
  var iNum = 0;

  function drawImg() {

    $(".svg").css("display", "block");

    if (flag) {
      return false;
    }
    flag = true;

    if (svgArr[currentIndex]) {
      //切换按钮图片
      switchBtn(currentIndex);

      svgArr[currentIndex].draw(function() {
        currentIndex = currentIndex + 1;
        flag = false;
      });

      if (currentIndex == svgArr.length - 1) {

        setTimeout(function() {
          $(".iconBg , .time2015").animate({
            "opacity": 1
          }, 1000, function() {

            setTimeout(function() {
              $(".shadow").css({
                "top": "-35px",
                "opacity": 0
              });

              setTimeout(function() {
                $(".shadow img").attr({
                  "src": "images/shadow_1.png"
                }).parent().animate({
                  "opacity": 1
                }, 500);
              }, 2000);


              $(".page1").animate({
                "left": "-640px"
              }, 300);

              $(".page2").addClass("page2Active").animate({
                "left": "0px"
              }, 300);

            }, 800)

          });
        }, 1000)

      }
    }
  }

});

/**
 *切换btn
 **/
function switchBtn(index) {

  switch (index) {
    case 0:
      $(".btn img").attr({
        "src": "images/btn_1.png"
      });
      break;
    case 1:
      $(".btn img").attr({
        "src": "images/btn_2.png"
      });
      break;
    case 2:
      $(".btn").remove();
      break;
    default:
      $(".btn img").attr({
        "src": "images/btn.png"
      });
  }
}
