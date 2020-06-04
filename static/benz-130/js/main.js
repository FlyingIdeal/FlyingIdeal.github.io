/*
 *author Fly 2016*01*22
 */
var WORLD_DEPTH = -800;
var cartoon = []; //用于存储动画
var tNum = 0; //滑动数字参数

//根节点
var stage = new C3D.Stage();
var bgStage = new C3D.Stage();
var homeStage = new C3D.Stage();

//重力感应舞台
var world = new C3D.Sprite();
//首页重力感应
var homeworld = new C3D.Sprite();

$(document).ready(function() {

    touch.on('body', 'touchmove', function(ev) {
        ev.preventDefault();
    });
    screenOrient();

    initVideoData();

    if (window.DeviceOrientationEvent) initOrientation();
    resize();
    requestAnimationFrame(go);

});


function initVideoData() {
    var v2 = $("#myVideo")[0];
    v2.load();

    v2.addEventListener('loadstart', eventHandler)
    v2.addEventListener('suspend', eventHandler)
    v2.addEventListener('play', onplay)
    v2.addEventListener('waiting', eventHandler)
    v2.addEventListener('progress', eventHandler)
    v2.addEventListener('durationchange', eventHandler)
    v2.addEventListener('loadedmetadata', eventHandler)
    v2.addEventListener('loadeddata', eventHandler)
    v2.addEventListener('canplay', eventHandler)
    v2.addEventListener('playing', onplay)
    v2.addEventListener('canplaythrough', eventHandler)
    v2.addEventListener('timeupdate', ontimeupdate)
    v2.addEventListener('pause', eventHandler)
    v2.addEventListener('seeking', eventHandler)
    v2.addEventListener('seeked', eventHandler)
    v2.addEventListener('error', eventHandler)
    v2.addEventListener('ended', onended)
    v2.addEventListener('stalled', eventHandler)
    v2.addEventListener('ratechange', eventHandler)
    v2.addEventListener('emptied', eventHandler)
    v2.addEventListener('click', function() {
        v2.play()
    });

    function eventHandler(event) {
        //printState(event.type, v2, event) 
        var t = event.type;
        if (t == "canplay") {
            //v2.play();
        }
        if (t == "loadedmetadata") loadedmetadata();
    }

    function onplay() {
        resetV();
    }

    function onended() {
        //$("#videoBox").fadeOut();
    }

    function loadedmetadata() {
        resetV();
    };

    function resetV() {
        if (checkNavigator()) {
            $("#myVideo").width('90%');
        }
    }

    //update HTML5 video current play time
    function ontimeupdate() {
        if (v2.currentTime / v2.duration == 1) {
            //onended();
        }
    };

    var simulatedEvent = document.createEvent('MouseEvent');

    simulatedEvent.initMouseEvent(
        "click", true, true, window, 1,
        100, 111, 111, 111,
        false, false, false, false, 0 /*left*/ , null);
}

//判断是否为ios
function checkNavigator() {
    var ua = navigator.userAgent.toLowerCase();
    var flage = true;
    if (/iphone|ipad|ipod/.test(ua)) {
        flage = false;
    }

    return flage;
}

//loading
function initLoading() {

    $("body").queryLoader2({
        barColor: "#fff",
        backgroundColor: "#FCCCDC",
        deepSearch: true,
        percentage: true,
        barHeight: 36,
        completeAnimation: "fade",
        onComplete: function() {
            preloadImages();
            wrapNumChange();
        }
    });
}

/*
 *首页数字变化
 ***/
function wrapNumChange() {
    $('#wrap').show();

    var leftNum = 1886;
    var rightNum = 9863;
    var leftTimer, rightTimer;

    clearInterval(leftTimer);
    leftTimer = setInterval(function() {
        $('#myYear').html(leftNum);
        if (leftNum == 2016) {
            clearInterval(leftTimer);
        }
        leftNum++;
    }, 30);

    clearInterval(rightTimer);
    rightTimer = setInterval(function() {
        $('#myKm').html(rightNum);
        if (rightNum <= 0) {
            $('#myKm').html('0');
            clearInterval(rightTimer);
        }
        rightNum -= 11;
    }, 1);

    //从左向右
    touch.on('#wrap', 'swiperight', function() {
        $('#wrap .left').animate({
            'width': '100%'
        }, 500);
        $('#wrap .right').animate({
            'left': '100%'
        }, 500, function() {
            audioPlay();
            playHistoryAni();
            initStage();
            _hmt.push(['_trackEvent', 'leftToRight', 'click', '从左向右']); //统计
        })
    });

    //从右向左
    touch.on('#wrap', 'swipeleft', function() {
        $('#wrap .right').animate({
            'width': '100%',
            'left': '0'
        }, 500);
        $('#wrap .left').animate({
            'width': '0'
        }, 500, function() {
            //播放视频
            videoPlay();
            playHistoryAni();
            initStage();
            $('#wrap,#home,#main').hide();
            _hmt.push(['_trackEvent', 'rightToLeft', 'click', '从右向左']); //统计
        })
    })
}

function videoPlay() {
    $('#videoBox').show();
    $('#videoInnerBox').on('click', function() {
        $('#videoInnerBox').css('backgroundColor', 'transparent')
        $('#myVideo').get(0).play();
    });

    //videoCloseBtn
    $('#videoCloseBtn').on('click', function() {
        $('#videoInnerBox').css('backgroundColor', '#000');
        $(this).parent().fadeOut();
        $('#myVideo').get(0).pause();
        $('#home').fadeIn();
        setCurTime();
        _hmt.push(['_trackEvent', 'videoCloseBtn', 'click', '视频关闭按钮']); //统计
    })
}


/**
 *初始化stage
 **/
function initStage() {

    //首页
    homeStage.size(window.innerWidth, window.innerHeight).material({
        image: 'images/homeBg.jpg',
        repeat: 'no-repeat',
        position: '50%'
    }).update();
    document.getElementById('home').appendChild(homeStage.el);

    homeworld.position(0, 0, -400).update();
    homeStage.addChild(homeworld);

    //首页
    var homeBgSprite = new C3D.Sprite();
    homeBgSprite.position(0, 0, 0).update();
    homeworld.addChild(homeBgSprite);

    //首页-让心给出答案
    var first_btn_1 = new C3D.Plane();
    generatePlane(first_btn_1, 289, 328, 520, 180, 80, 'images/first_btn_1.png', homeBgSprite);
    first_btn_1.on('click', function() {
        $('#wrap,#home,#main').hide();
        videoPlay();
        _hmt.push(['_trackEvent', 'homeHeart', 'click', '让心给出答案']); //统计
    });

    //首页-让未来给出答案
    var first_btn_2 = new C3D.Plane();
    generatePlane(first_btn_2, 259, 436, 340, 60, 0, 'images/first_btn_2.png', homeBgSprite);
    first_btn_2.on('click', function() {
        _hmt.push(['_trackEvent', 'homeWeilai', 'click', '让未来给出答案']); //统计
        audioPlay();
        $('#home').fadeOut();
        $('#main').fadeIn();
    })

    //首页-招募活动
    var zhaomuBtn = new C3D.Plane();
    generatePlane(zhaomuBtn, 114, 142, 950, 180, 0, 'images/zhaomuBtn.png', homeBgSprite);
    zhaomuBtn.on('click', function() {
        _hmt.push(['_trackEvent', 'zhaomu', 'click', '招募活动']); //统计
        $('#zhaomu').fadeIn();
    })

    $('#zhaomuCloseBtn').on('click', function() {
        $('#zhaomu').fadeOut();
    })

    //首页-微信分享
    var weixinBtn = new C3D.Plane();
    generatePlane(weixinBtn, 114, 142, 950, 350, 0, 'images/weixinBtn.png', homeBgSprite);
    weixinBtn.on('click', function() {
        _hmt.push(['_trackEvent', 'weixin', 'click', '微信分享按钮']); //统计
        $('#weixinMask').fadeIn();
    });

    //微信分享指导关闭
    $('#weixinMask').on('click', function() {
        $(this).fadeOut();
    })

}

/*
 *过去-未来
 *执行动画
 */
var sectionArr = []; //用于存储内平面数组;
function playHistoryAni() {
    $('#home,#wrap').fadeOut();
    $('#main').fadeIn();

    bgStage.size(window.innerWidth, window.innerHeight).material({
        image: 'images/horseBg.jpg',
        repeat: 'no-repeat',
        position: '50%'
    }).update();
    bgStage.el.id = "bgStage";
    document.getElementById('main').appendChild(bgStage.el);

    stage.size(window.innerWidth, window.innerHeight).update();
    document.getElementById('main').appendChild(stage.el);

    world.position(0, 0, -400).update();
    stage.addChild(world);

    var historySprite = new C3D.Sprite();
    historySprite.position(0, 0, 0).update();
    world.addChild(historySprite);

    var horseArrs = horseImgData.planeArr //马车
    singlePlane(horseArrs, historySprite);

    var secArrs = oldPlaneImgData.planeArr; //过去
    singlePlane(secArrs, historySprite);

    var newsecArrs = nowPlaneImgData.planeArr; //现在
    singlePlane(newsecArrs, historySprite);

    var flturesecArrs = futurePlaneImgData.planeArr; //未来
    singlePlane(flturesecArrs, historySprite);

    var carsecArrs = carPlaneImgData.planeArr; //car
    singlePlane(carsecArrs, historySprite);

    touchEvent();

}

/*
 *封装单独平面
 *c平面 p场景
 */
function singlePlane(c, p) {
    var HORIZON_NUM = 1500; //水平位置
    for (var i = 0; i < c.length; i++) {
        var secArr = c[i];
        var secPlanes = secArr.planes;
        var _section = new C3D.Sprite();
        var donghuaType = secArr.cartoon;
        _section.position(HORIZON_NUM * secArr.h, HORIZON_NUM * secArr.h, 0).update();
        p.addChild(_section);
        sectionArr.push(_section);
        cartoon.push(donghuaType);

        for (var j = 0; j < secPlanes.length; j++) {
            var planeObj = secPlanes[j];
            var _plane = new C3D.Plane();
            generatePlane(_plane, planeObj.w, planeObj.h, planeObj.x, planeObj.y, planeObj.z, planeObj.src, _section);
        }
    }
}


/*
 *左右滑动
 **/
function touchEvent() {
    touch.on('#main>div', 'swiperight', function() {
        if (tNum >= 20) {
            //按钮初始化
            $('#rightArrow').show();
            $('#leftArrow').hide();

            audioPause(); //关闭音频
            tNum = 0;
            $('#main').fadeOut(300);
            $('#home').fadeIn(300, function() {
                JT.fromTo(sectionArr[20], 0, {
                    alpha: 1
                }, {
                    alpha: 0,
                    onUpdate: function() {
                        sectionArr[20].updateT();
                        sectionArr[20].updateV();
                    },
                    onEnd: function() {
                        JT.fromTo(sectionArr[20], 0, {
                            alpha: 0
                        }, {
                            x: 0,
                            y: 0,
                            scaleX: 1,
                            scaleY: 1,
                            rotationX: 0,
                            rotationY: 0,
                            rotationZ: 0,
                            alpha: 1,
                            onUpdate: function() {
                                sectionArr[0].updateT();
                                sectionArr[0].updateV();
                            },
                            onEnd: function() {
                                bgStage.size(window.innerWidth, window.innerHeight).material({
                                    image: 'images/horseBg.jpg'
                                }).update();
                            }
                        })
                    }
                })
            });
            return false;
        }
        JTanimate(tNum, 1) //1为加
    });

    touch.on('#main>div', 'swipeleft', function() {
        if (tNum <= 0) return false;
        JTanimate(tNum, 0); //0为减
    });

    //关闭按钮
    $('#mainCloseBtn').on('click', function() {
        if (touchFlag) return false;

        audioPause(); //关闭音频
        $(this).parent().fadeOut(300);
        $('#home').fadeIn(300, function() {
            JT.fromTo(sectionArr[tNum], 0.1, {
                alpha: 1
            }, {
                alpha: 0,
                onUpdate: function() {
                    sectionArr[tNum].updateT();
                    sectionArr[tNum].updateV();
                },
                onEnd: function() {
                    tNum = 0;
                    $('#leftArrow').hide();
                    JT.fromTo(sectionArr[tNum], 0.1, {
                        alpha: 0
                    }, {
                        x: 0,
                        y: 0,
                        scaleX: 1,
                        scaleY: 1,
                        rotationX: 0,
                        rotationY: 0,
                        rotationZ: 0,
                        alpha: 1,
                        onUpdate: function() {
                            sectionArr[0].updateT();
                            sectionArr[0].updateV();
                        },
                        onEnd: function() {
                            bgStage.size(window.innerWidth, window.innerHeight).material({
                                image: 'images/horseBg.jpg'
                            }).update();
                        }
                    })
                }
            })
        });

        _hmt.push(['_trackEvent', 'mainCloseBtn', 'click', '科技关闭按钮']); //统计
    })

}

/*
 *JT动画
 **/
var touchFlag = false;

function JTanimate(t, type) {
    if (touchFlag) return false;
    touchFlag = true;

    var addsub = type == 1 ? 1 : -1;
    tNum = tNum + addsub;

    var ani = cartoon[tNum];

    //var randNum = parseInt(Math.random()*12 + 1);
    var arr = switchAnimate(ani);
    var ax = arr[0],
        ay = arr[1],
        ascaleX = arr[2],
        ascaleY = arr[3],
        arotatex = arr[4],
        arotatey = arr[5],
        arotatez = arr[6],
        opa = arr[7];

    //判断箭头
    $('#rightArrow, #leftArrow').show()
    if (tNum == 0) {
        $('#leftArrow').hide();
    }
    if (tNum == 20) {
        $('#rightArrow').hide();
    }

    JT.fromTo(sectionArr[t], 1, {
        alpha: 1
    }, {
        alpha: 0,
        ease: JT.Quart.Out,
        onUpdate: function() {
            sectionArr[t].updateT();
            sectionArr[t].updateV();
        },
        onEnd: function() {

            //判断是否为临界画面
            if (tNum == 0 && addsub == -1) {
                bgStage.size(window.innerWidth, window.innerHeight).material({
                    image: 'images/horseBg.jpg'
                }).update();
            }
            if ((tNum == 8 && addsub == 1) || (tNum == 12 && addsub == -1)) {
                bgStage.size(window.innerWidth, window.innerHeight).material({
                    image: 'images/nowBg.jpg'
                }).update();
            }
            if ((tNum == 7 && addsub == -1) || (tNum == 1 && addsub == 1)) {
                bgStage.size(window.innerWidth, window.innerHeight).material({
                    image: 'images/oldBg.jpg'
                }).update();
            }
            if ((tNum == 13 && addsub == 1) || (tNum == 16 && addsub == -1)) {
                bgStage.size(window.innerWidth, window.innerHeight).material({
                    image: 'images/futureBg.jpg'
                }).update();
            }
            if (tNum == 17 && addsub == 1) {
                bgStage.size(window.innerWidth, window.innerHeight).material({
                    image: 'images/carBg.jpg'
                }).update();
            }

            JT.fromTo(sectionArr[t + addsub], 1.5, {
                x: ax,
                y: ay,
                scaleX: ascaleX,
                scaleY: ascaleY,
                rotationX: arotatex,
                rotationY: arotatey,
                rotationZ: arotatez,
                alpha: opa
            }, {
                x: 0,
                y: 0,
                scaleX: 1,
                scaleY: 1,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                alpha: 1,
                ease: JT.Quart.Out,
                onUpdate: function() {
                    sectionArr[t + addsub].updateT();
                    sectionArr[t + addsub].updateV();
                },
                onEnd: function() {
                    touchFlag = false;
                }
            })
        }
    })
}


/**
 *选择动画类型
 **/
function switchAnimate(type) {
    var x, y, scaleX, scaleY, rotatex, rotatey, rotatez, opacity;
    var aArray = []; //上面参数

    switch (type) {
        case 'leftIn': //从左到右
            x = -1500;
            y = 0;
            scaleX = 1;
            scaleY = 1;
            rotatex = 0;
            rotatey = 0;
            rotatez = 0;
            opa = 1;
            break;
        case 'rightIn': //从右到左
            x = 1500;
            y = 0;
            scaleX = 1;
            scaleY = 1;
            rotatex = 0;
            rotatey = 0;
            rotatez = 0;
            opa = 1;
            break;
        case 'fadeIn': //从上到下
            x = 0;
            y = 0;
            scaleX = 1;
            scaleY = 1;
            rotatex = 0;
            rotatey = 0;
            rotatez = 0;
            opa = 0;
            break;
        case 'bigIn': //x旋转90
            x = 0;
            y = 0;
            scaleX = 0;
            scaleY = 0;
            rotatex = 0;
            rotatey = 0;
            rotatez = 0;
            opa = 0;
            break;
        case 'leftZoomIn': //向左翻转
            x = 1500;
            y = 500;
            scaleX = 2;
            scaleY = 2;
            rotatex = 0;
            rotatey = 0;
            rotatez = 0;
            opa = 1;
            break;
        case 'leftRoomIn': //向右翻转
            x = 1500;
            y = -500;
            scaleX = 0;
            scaleY = 0;
            rotatex = 0;
            rotatey = 0;
            rotatez = 0;
            opa = 1;
            break;
    }

    aArray.push(x, y, scaleX, scaleY, rotatex, rotatey, rotatez, opa);

    return aArray;
}


/*
 *生成plane函数 obj当前plane对象
 *w 宽度，h:高度，x：左坐标值，y：上坐标值，z:视角坐标值，url:图片路径，
 *container:父级
 */
function generatePlane(obj, w, h, x, y, z, url, container) {
    var scale = (z + WORLD_DEPTH) / WORLD_DEPTH;
    fx = (x + w / 2 - stage.width / 2);
    fy = (y + h / 2 - stage.height / 2);
    obj.size(w, h).position(fx, fy, z).material({
        image: url,
        repeat: 'repeat',
        position: '50%'
    }).update();
    obj.scale(scale, scale, 1).updateT();
    container.addChild(obj);
}


//记录orientation的值的变量，具体查看initorientation()函数
var _rotation = 0;
var _rotationY = 0
var _rotationX = 0;

//相当于渲染代码
function go() {
    world.updateT();
    homeworld.updateT();
    requestAnimationFrame(go);
}

requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
    function(callback) {
        setTimeout(callback, 1000 / 60);
    };

//响应屏幕调整尺寸
function resize() {
    stage.size(window.innerWidth, window.innerHeight).update();
    bgStage.size(window.innerWidth, window.innerHeight).update();
    homeStage.size(window.innerWidth, window.innerHeight).update();
};
window.onresize = function() {
    resize();
};
/*
 *重力感应
 */
function initOrientation() {
    var interval = setInterval(function() {
        _factor = 0.2;

        if (_rotation < -10) {
            _rotation = -10;
        }
        world.rotationY += _factor * (_rotation - world.rotationY);
        homeworld.rotationY += _factor * (_rotation - homeworld.rotationY);
    }, 1e3 / 30);

    window.addEventListener('deviceorientation', updateOrientation, false);

    function updateOrientation(eventData) {
        //factor越低 响应orientation事件越不明显
        var _factor = 0.3;
        //竖屏就用gamma  横屏就用beta
        var tiltLR = eventData.beta;
        _rotation = eventData.beta > 90 ? _factor * (eventData.beta - 180) : _factor * eventData.beta;
    }
}

/*
 *图片预加载
 */
function preloadImages() {
    var assets = [];

    var horsePlaneArr = getPlaneImgSrc(horseImgData);
    var oldPlaneArr = getPlaneImgSrc(oldPlaneImgData);
    var nowPlaneArr = getPlaneImgSrc(nowPlaneImgData);
    var futurePlaneArr = getPlaneImgSrc(futurePlaneImgData);
    var carPlaneArr = getPlaneImgSrc(carPlaneImgData);

    assets = assets.concat(horsePlaneArr, oldPlaneArr, nowPlaneArr, futurePlaneArr, carPlaneArr); //拼接过去，现在，未来, car

    var loaded = 0;
    var total = assets.length;

    for (var j = 0; j < total; j++) {
        try {
            var img = new Image();
            img.onload = function() {
                loaded++;
                /*if(loaded == total){
                    //initStage();
                    //$('#loading').remove();
                }*/
            }
            img.src = assets[j];
        } catch (e) {
            //initStage();
            return;
        }
    }
}

/*
 *封装函数，循环遍历数组内src
 *return obj里所有的src数组
 **/
function getPlaneImgSrc(obj) {
    var currentArr = [];
    var SectionObj = obj.partBgObj;
    var SectionArr = obj.planeArr;
    currentArr.push(SectionObj.src);

    for (var i = 0; i < SectionArr.length; i++) {
        var planesObj = SectionArr[i];
        var planesArr = planesObj.planes;
        if (planesArr.length == 0) continue;

        for (var j = 0; j < planesArr.length; j++) {
            var planeObj = planesArr[j];
            currentArr.push(planeObj.src);
        }
    }

    return currentArr;
}

/*
 *判断横竖屏幕
 **/
$(window).bind('orientationchange', function(e) {
    screenOrient();
});
var orientFlag = false;

function screenOrient() {
    if (window.orientation == 0 || window.orientation == 180) {
        //竖
        orientation = 'portrait';
        $('#Orient').show();
        return false;
    } else if (window.orientation == 90 || window.orientation == -90) {
        //横
        orientation = 'landscape';
        $('#Orient').hide();

        if (!orientFlag) {
            initLoading();
            //initStage();
            //preloadImages();
            orientFlag = true;
        }

        return false;
    }
}


//audio play
function audioPlay() {
    $('#video').get(0).play();
}

//audio pause()
function audioPause() {
    $('#video').get(0).pause();
}

//获取视频播放时间
function setCurTime() {
    myVid = document.getElementById("myVideo");

    myVid.currentTime = 3;
}
