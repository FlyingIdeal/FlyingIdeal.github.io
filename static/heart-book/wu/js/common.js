var step = 0;
var footIndex = 1;
var time = null;
var chuFlag = true; //气球执行一次
var touchBackNum = 0;

$(function() {

    //图片loading
    imgLoading();

    //初始化高度
    initHeight();

    //初始化所有touch事件
    initTouchEle();

    //初心闪动效果
    initHeartFlash();

    //初始化故事滑动
    initSwipeStory();

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

/*故事整屏滑动*/
function initSwipeStory() {
    var mySwiper = new Swiper('.storyBox', {
        direction: 'vertical',
        wrapperClass: 'swiperBox',
        slideClass: 'sChild',
        effect: 'slide',
        speed: 500,
        nextButton: '.footprint_btn',
        slideActiveClass: 'swiperActive',
        onlyExternal: true,
        onSlideChangeEnd: function(mySwiper) {
            var curIndex = mySwiper.activeIndex;

            if (curIndex == 3) {
                breakIceImg();
            }
        }
    });

    touch.on('.footprint_btn', 'touchstart', function() {
        mySwiper.slideNext();
    })

}

/*
 *打碎冰层 
 */
function breakIceImg() {

    var chui = document.getElementById("wu_11_img");

    chui.style.webkitTransform = 'translateZ(0px)';
    setTimeout(function() {
        $("#wu_10_1").remove();
        chui.style.webkitTransform = 'translateZ(400px)';

    }, 300);

    setTimeout(function() {
        chui.style.webkitTransform = 'translateZ(0px)';

        setTimeout(function() {
            $("#wu_10_2").remove();
            chui.style.webkitTransform = 'translateZ(400px)';

        }, 300)

    }, 1000)

    setTimeout(function() {
        chui.style.webkitTransform = 'translateZ(0px)';

        setTimeout(function() {
            $("#wu_10_3").remove();
            chui.style.webkitTransform = 'translateZ(400px)';

        }, 300)

    }, 2000)
}

/*各种心跳闪动*/
function initHeartFlash() {
    var flaArr_i = 0;
    var flaArr = [680, 340, 680, 340, 680, 0, 0, 0];

    setInterval(function() {

        $(".home_txt_name").css({
            "background-position": '-' + (flaArr[flaArr_i]) + 'px'
        });

        flaArr_i++;

        if (flaArr_i == flaArr.length) {
            flaArr_i = 0;
        }

    }, 150);
}


/*初始化所有touch事件*/
function initTouchEle() {
    /*上滑动*/
    touch.on('.home_slide', 'swipeup , tap', function(ev) {

        $(".home_slide").animate({
            "bottom": Vheight
        }, function() {
            $(".chu_1").fadeIn(1000)
        })

        $(".story").animate({
            "bottom": "0px"
        }, function() {
            //出现按钮
            $(".footprint_btn").fadeIn(100)
        })
    });

    //取消事件冒泡
    touch.on('body', 'touchstart', function(ev) {
        ev.preventDefault();
    })


    //返回重新测试
    touch.on('.back_btn', 'tap', function() {

        location.href = "../index.html";

    });

    //关闭分享遮罩层
    touch.on('.mask', 'tap', function() {
        $('.mask').hide();
    })

    //显示分享遮罩层
    touch.on('.invite', 'tap', function() {
        $('.mask').show();
    })

    //音乐
    touch.on('#cardsound_mask', 'touchstart', function() {
        switchsound();
    })
}


//图片Loading
function imgLoading() {
    //loading
    $("body").queryLoader2({
        barColor: "#ffffff",
        backgroundColor: "#214358",
        percentage: true,
        barHeight: 30,
        completeAnimation: "fade"
    });
    if (document.readyState == "interactive") {
        $('.main').css("visibility", "visible");
        $('.story').css("visibility", "visible");
    }
}


var Vheight = document.documentElement.clientHeight;

/*初始化页面高度*/
function initHeight() {

    $("body").css("height", Vheight);
    $(".main").css("height", Vheight);

    $(".story .storyBox").css({
        "height": Vheight
    });

    $(".story").css({
        "bottom": -Vheight
    });

    $(".mask , .maskBox").css("height", Vheight);

}