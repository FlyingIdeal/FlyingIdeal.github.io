$(function() {

    imgPreLoad();

    initSkrollr();

    initMusic();

})


/*初始化图片加载*/
function imgPreLoad() {
    $("body").queryLoader2({
        barColor: "#ffffff",
        backgroundColor: "#000",
        percentage: true,
        barHeight: 10,
        completeAnimation: "fade",
        onComplete: function() {
            $('.carLine').delay(200).fadeIn(500, function() {
                $('#lineShadowUp').addClass('active');
                $('#lineShadowDown').addClass('active');

                $('.homeBg_Text').delay(2000).fadeOut(500, function() {
                    $('.carLineText').fadeIn();
                    $('.touchDown').fadeIn(500, function() {

                        //车的光线
                        homePageTouch();
                    });
                });
            });
        }
    });
}


/**
 *首页车加滑动事件
 **/
function homePageTouch() {
    touch.on('.carLingBg', 'touchstart', function(ev) {
        $(".carLingBg").animate({
            top: '1500px'
        }, "slow");
        $(".carLine").animate({
            top: '1500px'
        }, "slow", function() {
            $('.Line').remove();
            $('.shichengBtn').show();
            $('.downtips').show();
        });
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


/**
 * 加载滑动事件
 */
function initSkrollr() {
    ///var dis1 = 22801, dis2 = 20001, dis3 = 26001, dis4 = 15001, dis5 = 17001, dis6 = 20001, dis7 = 26530;
    //var dis1 = 22801, dis2 = 14001, dis3 = 26001, dis4 = 15001, dis5 = 17001,dis6 = 20001, dis7 = 26501;
    ///测试var dis1 = 22801, dis2 = 14001, dis3 = 20001, dis4 = 26001, dis5 = 26530, dis6 = 15001, dis7 = 17001;
    var dis1 = 22801,
        dis2 = 15001,
        dis3 = 20001,
        dis4 = 26001,
        dis5 = 26501,
        dis6 = 15001,
        dis7 = 17001;
    var s = skrollr.init({
        smoothScrolling: true,
        smoothScrollingDuration: 200,
        mobileDeceleration: 0.002,
        edgeStrategy: 'set',
        easing: {
            WTF: Math.random,
            inverted: function(p) {
                return 1 - p;
            }
        },
        render: function(data) {
            //console.log("sum:" + (dis2 + dis3 + dis4 + dis5 + dis6 + dis7));
            //console.log(data.curTop);
        },
        constants: {
            p1: dis2 + dis3 + dis4 + dis5 + dis6 + dis7,
            p2: dis3 + dis4 + dis5 + dis6 + dis7,
            p3: dis4 + dis5 + dis6 + dis7,
            p4: dis5 + dis6 + dis7,
            p5: dis6 + dis7,
            p6: dis7,
            p7: 0
        }
    });
    window.tests = s;
    s.setScrollTop(s.getMaxScrollTop(), true);
}


