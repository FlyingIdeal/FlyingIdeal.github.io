$(function() {
    var wHeight = $(window).height();
    //屏幕高度
    $('.swiper , .wrap , .load').css('height', wHeight);

    if (/i(Phone|P(o|a)d)/.test(navigator.userAgent)) {
        $(document).one("touchstart", function() {
            playVid();
        });
    } else {
        playVid();
    }

    $("#audioBtnLink").click(function() {
        var audioBtn = $(this);
        if (audioBtn.attr("class") == "active") {
            audioBtn.removeClass("active");
            playVid();
        } else {
            audioBtn.addClass("active");
            pauseVid();
        }
    });

    var sChildLen = $(".swiper .sChild").size() - 1;

    var mySwiperV = new Swiper('.swiper', {
        wrapperClass: 'sBox',
        direction: 'vertical',
        slideClass: 'sChild',
        watchSlidesProgress: true,
        followFinger: false,
        longSwipesRatio: 0.5,
        slideActiveClass: 'active',
        onInit: function(swiper) {
            swiper.myactive = 0;
        },
        onSlideChangeEnd: function(swipe) {
            var _thisIndex = swipe.activeIndex;
            if (_thisIndex == 0) {
                $(".page1_in").addClass("page1_in_active");
            } else {
                $(".page1_in").removeClass("page1_in_active");
            }

            if (_thisIndex == sChildLen) {
                $("#upDownBtn").hide();
            } else {
                $("#upDownBtn").show();
            }
        },
        onImagesReady: function(swiper) {
            //图片加载完成之后;
            $(".load").addClass("active");
        }
    });



    //点击go
    $(".load_go img").bind("click", function() {
        $(".load").hide();
        $(".page1_in").addClass("page1_in_active");
    });


    //发给小伙伴
    $(".page6_5 a").bind("click", function() {
        if (isWeiXin()) {
            $(".mask").show();
        } else {
            location.href = "buy.html";
        }
    });

    //遮罩层点击
    $(".mask").bind("click", function() {
        $(this).hide();
    });

})


function playVid() {
    //alert("播放");
    $("#video").get(0).play();
}

function pauseVid() {
    $("#video").get(0).pause();
}

/*
 * 判断是否是微信内置浏览器
 * */
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}