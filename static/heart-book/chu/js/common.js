var step = 0;
var footIndex = 1;
var time = null;
var chuFlag = true; //气球执行一次
var touchBackNum = 0;

$(function() {

    reback();
    initHeight();

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

    //初心闪动效果
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


    /*上滑动*/
    touch.on('.home_slide', 'swipeup , tap', function(ev) {

        $(".home_slide").animate({
            "bottom": Vheight - 90
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


    //脚印按钮
    touch.on('.footprint_btn', 'touchstart', function(ev) {

        var storyHeight = $(".storyBox").height()
        var thisHeight = $(".story .in").height() - storyHeight;

        $(".footprintBox").css("height", $(".story .in").height());

        var dom = $(".story .in");
        var domFoot = $(".footprintBox");


        //addFootPrint();
        startSlideUp(thisHeight, dom, domFoot);
    })

    touch.on('.footprint_btn', 'touchend', function() {
        stopSlideUp();
    })


    //返回重新测试
    touch.on('.back_btn', 'tap', function() {

        location.href = "../index.html";

    });

    //显示遮罩层
    touch.on('.invite', 'tap', function() {
        $('.mask').show();
    })

    //关闭分享遮罩层
    touch.on('.mask', 'tap', function() {
        $('.mask').hide();
    })

    //音乐
    touch.on('#cardsound_mask', 'touchstart', function() {
        switchsound();
    })

})

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

/*故事向上移动*/
function startSlideUp(h, dom, domFoot) {
    if (step > h) {
        return;
    }

    time = setInterval(function() {

        $(".footprintBox").get(0).style.webkitTransform = "translate3d(0px," + (-step + "px") + ",0px)";
        $(".in").get(0).style.webkitTransform = "translate3d(0px," + (-step + "px") + ",0px)";

        step += 3;

        //全部向上移动完毕
        if (step >= h) {

            $(".botBtn").fadeIn();
            clearTimeout(time);
        }

        var leftPos = (footIndex % 2 == 1) ? 250 : 320; //设置脚印的left位置
        var footprint = (footIndex % 2 == 1) ? "footprint_left" : "footprint_right";

        //达到冰面
        if (step > 2450 && step < 3300) {
            footprint = (footIndex % 2 == 1) ? "footprint_left_bing" : "footprint_right_bing";
        }

        //console.log(step);
        //小车开始运动
        if (step > 3500) {

            $(".storyBox .chu_8").css("top", step + 650);

            if (step > 4790) {
                $(".storyBox .chu_8").css("top", 4790 + 650);
            }

            //气球随小车行走一段
            $(".chu_9").css("top", step + 484);

            if (step > 4100 && chuFlag) {
                $(".chu_9").animate({
                    "width": "518",
                    "left": "124",
                    "opacity": 0
                }, 2000)

                chuFlag = false;
            }
        } else {
            //每运动80px加一个脚印
            if (step % 102 == 0) {
                //console.log(step);

                var htmlImg = "<img style='top:" + (step + 550) + "px ; left:" + leftPos + "px' src='images/" + footprint + ".png' />";
                $(".footprintBox").append(htmlImg);

                footIndex++;
            }
        }

        //一直保持五个脚印
        /*if($(".footprintBox img").size() > 8)
        {
            $(".footprintBox img:eq(0)").remove();
        }*/

        //动画
        $(".storyBox .in [data-img='sImg']").each(function(i) {

            if ($(this).hasClass("aniActive")) {
                return;
            }

            var top = getImgScreenTop(this);

            if (top < 690) {
                animateImg(this);
            }

        })

    }, 10);

}

/*停止向上移动*/
function stopSlideUp() {
    clearTimeout(time);
}

//相对视口的高度
function getImgScreenTop(img) {

    return img.offsetTop - step;

}

//初心动画
function animateImg(_this) {

    $(_this).addClass("aniActive");

}

/**
 * 返回
 * @return {[type]} [description]
 */
function reback() {
    /*
    var destinationTop;
    var backgroudDiv = $(".in");
    //swipeup swipedown
    //swiping
    touch.on('.storyBox' , 'swiping' , function(ev){
        var currentTop = parseInt(backgroudDiv.css("top"));

        console.log(ev);

        var destinationTop = currentTop + ev.y;
        if(destinationTop > 0)
        {
            destinationTop = 0;
        }

        if(-step >= destinationTop - 20)
        {
            destinationTop = -step;
        }
        
        backgroudDiv.css("top",destinationTop);
        $(".footprintBox").css("top",destinationTop);
        
    });
    */

    touch.on('.storyBox', 'touchstart', function(ev) {
        ev.preventDefault();
    });

    var dy, offy;
    var reg = /\-?[0-9]+\.?[0-9]*/g;
    var currY = 0;

    touch.on('.storyBox', 'dragstart', function(ev) {

        if (!!this.style.webkitTransform) {
            currY = this.style.webkitTransform.match(reg)[2];
        }
    });

    touch.on('.storyBox', 'drag', function(ev) {
        dy = dy || 0;
        offy = parseFloat(currY) + ev.y;

        if (offy > 0) {
            offy = 0;
        }

        if (-step >= offy - 20) {
            offy = -step;
        }

        $(".footprintBox").get(0).style.webkitTransform = "translate3d(0px," + offy + "px,0px)";
        $(".in").get(0).style.webkitTransform = "translate3d(0px," + offy + "px,0px)";
    });

    touch.on('.storyBox', 'dragend', function(ev) {
        if (dy > 0) {
            dy = 0;
        } else if (-step >= offy - 20) {
            dy = -step;
        } else {
            dy += ev.y;
        }
    });


}