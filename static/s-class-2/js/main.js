var SHAKE_FLAG = false; //摇一摇
var SHAKE_FLAG_YUN = false; //极光摇一摇
var wHeight = $(window).height();

$(function() {
    imgPreLoad();

    initTouchEvent();

    initHeight();

    initMusic();

    page1();

    page3();

    page4();

    page5();

    page6();

    page7();

});


/*初始化图片加载*/
function imgPreLoad() {
    $("body").queryLoader2({
        barColor: "#ffffff",
        backgroundColor: "#000",
        percentage: true,
        barHeight: 10,
        completeAnimation: "fade"
    });
}

/**
 *初始化加载音乐
 */
function initMusic() {
    music_data = {
        music: 'http://special.mercedes-benz.com.cn/S-Class-sustaining-1/mobile/images/music.mp3', //默认音乐
        replace_music: 'http://special.mercedes-benz.com.cn/S-Class-sustaining-1/mobile/images/music.mp3', //替换音乐
    };

    //加载 裸动
    if (/i(Phone|P(o|a)d)/.test(navigator.userAgent)) {
        $(document).one("touchstart", function() {
            music_init();
        });
    } else {
        music_init();
    }
}


/*
 *初始化touch事件
 */
function initTouchEvent() {
    $('.main').on('touchmove', function(e) {
        e.preventDefault();
    });

    //试乘试驾
    touch.on('#shichengBtn', 'tap', function() {
        $('#submitWarp').show();
    })

    //金融计划
    touch.on('#jrPlanBtn', 'tap', function() {
        $('#jinrong').show();
    })

    //技术数据价格
    touch.on('#priceNav a', 'tap', function() {
        $('#priceNav a').removeClass('active');
        $(this).addClass('active');
        var curIndex = $(this).parent().index();
        $('#detailTable').css({
            'background-position': -(640 * curIndex) + 'px'
        });
    });
    touch.on('.priceCloseBtn a', 'tap', function() {
        var thisAtr = $(this).attr('dataAtr');

        $(this).parent().parent().hide();

        if (thisAtr == 'viewTech') {
            $('#videoObj').attr('src', '');
        };
    });

    //分享按钮
    touch.on('#p7 .g2', 'tap', function() {
        $('#shareMask').show();
    })

    //视频播放
    touch.on('#g1 a', 'tap', function() {
        var thisAtr = $(this).attr('dataAtr');

        if (thisAtr == 'viewTech') {
            $('#videoObj').attr('src', 'http://www.uwin.cc/benz/20150607/images/video.mp4');
        }
        $('#' + thisAtr).show();
    });

    //share
    touch.on('#shareMask', 'tap', function() {
        $(this).hide();
    });

    //金融计划
    touch.on('#jinrong a.jBackBtn', 'tap', function() {
        $('#jinrong').hide();
    })
    touch.on('#jinrong a.jShiJiaBtn', 'tap', function() {
        $('#submitWarp').show();
    })

}

/**
 *第一页动画
 **/
function page1() {

    touch.on('#a2', 'tap, touchstart', function() {
        $('#a1, #a2').fadeOut(500);

        $('#a-bg1').animate({
            'bottom': '-1362px'
        }, 2000, function() {
            $('#b2').fadeIn(500);
            SHAKE_FLAG = false;
            shake();
        })
    });
    touch.on('#a-bg1', 'touchstart', function() {
        $('#a1, #a2').fadeOut(500);

        $('#a-bg1').animate({
            'bottom': '-1362px'
        }, 2000, function() {
            $('#b2').fadeIn(500);
            SHAKE_FLAG = false;
            shake();
        })
    })

    touch.on('#b-bg2', 'swipeup', function() {
        $('#p1').hide();
        $('#p3').fadeIn(1000, function() {
            ResetPage1();
        });
    })
}

/**
 *重置第一页
 **/
function ResetPage1() {
    $('#a-bg1').css('bottom', '0px');
    $('#a2, a1').show();
    $('#b-bg2, #b2, #b3').hide();
}

/**
 *第三页动画
 **/
function page3() {
    var BesselArray = [
        [50, 5],
        [100, 10],
        [150, 20]
    ]; //分散点
    fingerFun($('#touchTarget'), BesselArray, 900, function() {
        $('#c-bg2').fadeIn(1000, function() {
            $('#c1').fadeIn(1000);
        });
        $('#line').fadeOut(100);
    }); //97 允许范围差

    //第3到第4动画
    touch.on('#c-bg2', 'swipeup', function() {
        ResetPage3();
        $('#p3').hide();
        $('#p4').fadeIn(1000);
    })
    //第3到第2动画
    touch.on('#c-bg1, #c-bg2', 'swipedown', function() {
        ResetPage3();
        $('#p3').hide();
        $('#p1').fadeIn(1000);
    })
}
/**
 *重置第三页
 **/
function ResetPage3() {
    $('#line, #c-bg1').show();
    $('#c-bg2, #c1').hide();
}

/**
 *第四页动画
 **/
function page4() {
    var BesselArray = [
        [20, 10],
        [35, 50],
        [90, 110],
        [135, 146],
        [160, 110]
    ]; //分散点
    fingerFun($('#v'), BesselArray, 900, function() {
        $('#v').fadeOut(1000);
        $('#d-bg2').fadeIn(1000, function() {
            $('#d1').fadeIn(500)
            $('#d-bg1').hide();
        })
    }); //97 允许范围差

    //第4到第5动画
    touch.on('#d-bg2', 'swipeup', function() {
        ResetPage4();
        $('#p4').hide();
        $('#p5').fadeIn(1000);
    })

    //第4到第3动画
    touch.on('#d-bg1, #d-bg2', 'swipedown', function() {
        ResetPage4();
        $('#p4').hide();
        $('#p3').fadeIn(1000);
    })
}
/**
 *重置第四页
 **/
function ResetPage4() {
    $('#v, #d-bg1').show();
    $('#d-bg2, #d1').hide();
}

/**
 *第五页动画
 **/
function page5() {
    var BesselArray = [
        [40, -35],
        [60, -60],
        [100, -80],
        [160, -110],
        [330, -140]
    ]; //分散点
    fingerFun($('#q'), BesselArray, 900, function() {
        $('#q').fadeOut(500);
        $('#e-bg2').fadeIn(1000, function() {
            $('#e1').fadeIn(500)
            $('#e-bg1').hide();
        })
    }); //97 允许范围差

    touch.on('#e-bg2', 'swipeup', function() {
        SHAKE_FLAG_YUN = false;
        shake_a();
        ResetPage5();
        $('#p5').hide();
        $('#p6').fadeIn(1000);
    });

    touch.on('#e-bg1, #e-bg2', 'swipedown', function() {
        ResetPage5();
        $('#p5').hide();
        $('#p4').fadeIn(1000);
    })
}
/**
 *重置第五页
 **/
function ResetPage5() {
    $('#q, #e-bg1').show();
    $('#e-bg2, #e1').hide();
}

/**
 *第六页动画
 **/
function page6() {

    touch.on('#f-bg2', 'swipeup', function() {
        maskTarget();
    })

    touch.on('#f-bg1, #f-bg2', 'swipedown', function() {
        SHAKE_FLAG_YUN = true;
        ResetPage6();
        $('#p6').hide();
        $('#p5').fadeIn(1000);
    })
}
/**
 *重置第六页
 **/
function ResetPage6() {
    $('#f1, #f-bg1').show();
    $('#f-bg2, #f2').hide();
}

/**
 *第七页动画
 **/
function page7() {
    touch.on('#g-bg', 'swipedown', function() {
        SHAKE_FLAG_YUN = false;
        $('#p7').hide();
        $('#p6').fadeIn(1000);
    })
}

/**
 *摇一摇
 **/
var SHAKE_THRESHOLD = 1000; //定义一个摇动的阈值
var last_update = 0; //定义一个变量记录上一次摇动的时间
var x = y = z = last_x = last_y = last_z = 0; //定义x、y、z记录三个轴的数据以及上一次触发的时间
function shake() {
    //判断移动浏览器是否支持运动传感器事件
    if (window.DeviceMotionEvent) {
        //添加一个事件监听器
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
        alert('not support mobile event');
    }
}
//运动传感器处理
function deviceMotionHandler(eventData) {
    if (SHAKE_FLAG) {
        return false;
    }

    //获取含重力加速
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime(); //获取当前时间戳
    var diffTime = curTime - last_update;
    if (diffTime > 100) {
        last_update = curTime; //记录上一次摇动的时间
        x = acceleration.x; //获取加速度X方向
        y = acceleration.y; //获取加速度Y方向
        z = acceleration.z; //获取加速度垂直方向
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000; //计算阈值
        if (speed > SHAKE_THRESHOLD) {
            SHAKE_FLAG = true;
            $('#b2').hide();
            $('#b-bg2').delay(300).fadeIn(800, function() {
                $('#b3').fadeIn(800);
            });
        }
        //记录上一次加速度
        last_x = x;
        last_y = y;
        last_z = z;
    }
}


var last_update_a = 0; //定义一个变量记录上一次摇动的时间
var x_a = y_a = z_a = last_x_a = last_y_a = last_z_a = 0; //定义x、y、z记录三个轴的数据以及上一次触发的时间
function shake_a() {
    //判断移动浏览器是否支持运动传感器事件
    if (window.DeviceMotionEvent) {
        //添加一个事件监听器
        window.addEventListener('devicemotion', deviceMotionHandler_a, false);
    } else {
        alert('not support mobile event');
    }
}
//运动传感器处理
function deviceMotionHandler_a(eventData) {
    if (SHAKE_FLAG_YUN) {
        return false;
    }
    //获取含重力加速
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime(); //获取当前时间戳
    var diffTime = curTime - last_update_a;
    if (diffTime > 100) {
        last_update_a = curTime; //记录上一次摇动的时间
        x_a = acceleration.x; //获取加速度X方向
        y_a = acceleration.y; //获取加速度Y方向
        z_a = acceleration.z; //获取加速度垂直方向
        var speed = Math.abs(x_a + y_a + z_a - last_x_a - last_y_a - last_z_a) / diffTime * 10000; //计算阈值
        if (speed > SHAKE_THRESHOLD) {
            SHAKE_FLAG_YUN = true;

            $('#f1').hide();
            $('#f-bg2').delay(800).fadeIn(800, function() {
                $('#f-bg1').hide();
                $('#f2').fadeIn(800);
            });
        }
        //记录上一次加速度
        last_x_a = x_a;
        last_y_a = y_a;
        last_z_a = z_a;
    }
}

/**
 *初始化屏幕高度
 ****/
function initHeight() {
    $('.main, #p1, #p2, #p3, #p4, #p5, #p6, #p7, #PriceMain, #submitWarp, #viewTech, #jinrong').css('height', wHeight);
}

/**
 *遮罩动画
 **/
function maskTarget() {
    var posGen = $('#Generic');
    posGen.show();
    maskAnimation(4, 5, 20, 80, function(x, y) {
        posGen.css("-webkit-mask-position", (-x * 640) + "px " + (-y * wHeight) + "px");
    }, function() {
        $('#Generic').hide();
        $('#p6').hide();
        $('#p7').show();
        ResetPage6();
    });
}
var setInter = '';
maskAnimation = function(x, y, end, time, step, callback) {
    clearInterval(setInter);
    var _x = _y = _i = 0;
    setInter = setInterval(function() {
        if (_x >= x) {
            _x = 0;
            _y = _y >= y ? 0 : _y += 1;
        }
        step(_x, _y);
        _x += 1;
        _i++;
        if (_i >= end) {
            clearInterval(setInter);
            callback();
        }
    }, time);
};


/***
 *finger 手势函数
 **/
function fingerFun(target, array, dis, callback) {

    var missdistance = dis;
    var marks = Array(array.length);

    for (var count = 0; count < marks.length; count++) {
        marks[count] = false;
    }
    touch.on(target, 'swiping', function(ev) {
        console.log(ev);
        var offx = parseInt(ev.x) + "px";
        var offy = parseInt(ev.y) + "px";
        for (var count = 0; count < marks.length; count++) {
            if ((((ev.x - array[count][0]) * (ev.x - array[count][0]) + (ev.y - array[count][1]) * (ev.y - array[count][1]))) < missdistance) {
                if (count == 0) {
                    marks[count] = true;
                } else if (marks[count - 1]) {
                    marks[count] = true;
                }
            }
        }
        //console.log(offx + "=====" + offy);
    });

    touch.on(target, 'swipeend', function(ev) {
        var result = false;
        var num = 0;
        for (var count = 0; count < marks.length; count++) {
            if (marks[count]) {
                num++;
            }
        }

        if (num >= marks.length / 2) {
            result = true;
        }

        if (result) {
            callback();
        } else {
            //console.log("sorry");
        }

        //初始化
        for (var count = 0; count < marks.length; count++) {
            marks[count] = false;
        }
    });
}
