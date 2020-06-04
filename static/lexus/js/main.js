var huabanCode = ["86B48E53EA25CC4A551D1E7FB39481C5", "34A9EC8566DD1C36DA21EC755DD0AA40", "386231914D00A9E5632B0A63BD0134A2", "E57FC6E979B709862D6BE6A7DF58EEEB", "3923150F08DCD8D1B7328C18713AA6AC"];

/*$.fn.snow({
    minSize: 20,    //雪花的最小尺寸
    maxSize: 40,    //雪花的最大尺寸
    newOn: 800      //雪花出现的频率 这个数值越小雪花越多
});*/

$(function() {
    initHeight();
    initSwiper();
    initClick();
});



/**
 * 初始化按钮
 * @return {[type]} [description]
 */
function initClick() {
    //初始化花瓣
    initHuaBanCode();

    //点击花瓣
    $(".p3-img-common a").click(function() {
        var currentObj = $(this);
        var code = currentObj.attr("code");
        getHuaban(code, currentObj);
    });

    //活动规则
    $("#guizeBtn, #p6-guizeBtn").click(function() {
        showLoginWin();
    });

    //弹窗关闭按钮
    $(".closeBtn").click(function() {
        closeLoginWin();
    });

    //奖项查询按钮
    $("#priseBtn, #p6-priseBtn").click(function() {
        $('#prise').show();
    })

    //奖项查询返回按钮
    $('.priseBackBtn').click(function() {
        $('#prise').hide();
    })

    //登录按钮
    $(".loginBtn").click(function() {
        login();
    });

    //预约试驾预约提交按钮
    $("#yuyue .submitBtn").click(function() {

        var name = $("#useryuyueName").val();
        var phone = $("#useryuyuePhone").val();
        var email = $("#useryuyueEmail").val();

        subscribe(name, phone, email);

    });

    //预约试驾弹窗
    $("#yuyueBtn, #p6-yuyueBtn").click(function() {
        openSubscribe();
    });

    //复选框选中按钮
    $(".chooseYuyue a,.yuyue-select-1 a,.yuyue-select-2-mid").click(function() {
        $(this).toggleClass("active");
    });

    //五个按钮
    $('#p3-box a').click(function() {
        var thisAttrName = $(this).attr('attrname');

        $('#p3-img').show();
        $('#' + thisAttrName).show();
    });

    //五个页面的关闭按钮
    $('#p3-img a.closeBtn').click(function() {
        $('#p3-img, .p3-img-common').hide();
    })


    //相关说明信息
    $('#relativeBtn').click(function() {
        $("#releInfro").show();
    })

    $('#releInfro a.releCloseBtn').click(function() {
        $('#releInfro').hide();
    })


    //点击退出按钮
    $('.loginOut a.loginOutBtn').click(function() {
        loginOutFun();
    })
}

/**
 * 打开预约试驾
 * @return {[type]} [description]
 */
function openSubscribe() {
    $("#yuyue").show();
}

/*初始化滑动*/
function initSwiper() {
    var mySwiper = new Swiper('.swiper', {
        direction: 'vertical',
        wrapperClass: 'swiperMid',
        slideClass: 'slide',
        speed: 500,
        slideActiveClass: 'active'
    });
}


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


/*初始化页面高度*/
function initHeight() {
    var wHeight = $(window).height();
    $(".main, .swiper, .slide").css("height", wHeight);
}

/**
 * 初始化花瓣
 * @return {[type]} [description]
 */
function initHuaBanCode() {
    var huabanObjArr = $(".p3-img-common a");
    huabanObjArr.show();
    //var currentHuaBan  = $.cookie('huaban');

    var currentHuaBan = localStorage.getItem("huaban");

    for (var i = 0; i < huabanCode.length; i++) {
        huabanObjArr.eq(i).attr("code", huabanCode[i]);

        //隐藏已获取的花瓣
        if (!!currentHuaBan && currentHuaBan.indexOf(huabanCode[i]) >= 0) {
            huabanObjArr.eq(i).hide();
        }
    }
}

/**
 *退出登录
 *@return {[type]} [description]
 */
function loginOutFun() {


    localStorage.removeItem("uName");
    localStorage.removeItem("uPhone");
    localStorage.removeItem("uEmail");
    localStorage.removeItem("huaban");

    $('.loginOut, .chooseYuyue, .loginBox').show();
    $('.loginOut, #guize').hide();

    $("#userName").val('').removeAttr('readonly');
    $("#userPhone").val('').removeAttr('readonly');
    $("#userEmail").val('').removeAttr('readonly');

    initHuaBanCode();

}



/**
 * 显示登录窗口
 * @return {[type]} [description]
 */
function showLoginWin() {
    $("#guize,.chooseYuyue,.loginBox").show();
    //$(".chooseYuyue,.loginBox").hide();

    var uName = localStorage.getItem("uName");
    var uPhone = localStorage.getItem("uPhone");
    var uEmail = localStorage.getItem("uEmail");
    if (!isNull(uPhone)) {
        //处理个人信息是否可编辑
        $("#userName").val(uName).attr("readonly", "readonly");
        $("#userPhone").val(uPhone).attr("readonly", "readonly");
        $("#userEmail").val(uEmail).attr("readonly", "readonly");

        $(".chooseYuyue,.loginBox").hide();
        $('.loginOut').show();

        //给flower父级元素添加一个active 让花瓣相对位置升高
        //$('.guizeMid').addClass('flowerActive');
    }



    //var huabanArr  = $.cookie('huaban').split(",");
    var huabanStr = localStorage.getItem("huaban");
    var huabanArr = !!huabanStr ? huabanStr.split(",") : [];
    if (huabanArr[0] == "") {
        huabanArr = [];
    }

    var showNum = huabanArr.length;

    var flower = $("#flower");
    flower.html("");

    var _htm = "";
    for (var i = 0; i < 5; i++) {
        //点亮花瓣的数量
        if (i < showNum) {
            _htm += '<img src="images/redFlower.png" />';
        } else {
            //未点亮花瓣的数量
            _htm += '<img src="images/blockFlower.png" />';
        }
    }
    flower.html(_htm);
}

/**
 * 关闭登录弹窗
 * @return {[type]} [description]
 */
function closeLoginWin() {
    $("#userName,#userPhone,#userEmail , #useryuyueName,#useryuyuePhone,#useryuyueEmail").val("");

    $("#guize,#yuyue").hide();
}

/**
 * 获取花瓣
 * @return {[type]} [description]
 */
function getHuaban(code, currentObj) {
    if (!code) {
        return false;
    }
    var uphone = localStorage.getItem("uPhone");
    if (!uphone) {
        showLoginWin();
        return false;
    }

    $.ajax({
        url: "http://p7.hbsm.cc/lexus/leaf/uwinLeaf/getLeaf",
        type: "get",
        dataType: 'jsonp',
        data: {
            phone: uphone,
            leafType: code,
            visitType: 'mobile'
        },
        success: function(result) {
            if (result.state != "0") {
                if (result.message == "未登录") {
                    showLoginWin();
                } else {
                    alert(result.message);
                }
                return false;
            };

            setHuaBan(result.data.leafs);

            currentObj.hide();

            if (result.data.leafs.length == 5) {
                alert('恭喜您！已经集满五朵樱花啦！');
            } else {
                alert('收集成功，请到活动机制中查看樱花收集情况!');
            }
        }
    });
}

/**
 * 登录
 * @return {[type]} [description]
 */
function login() {

    var name = $("#userName").val();
    var phone = $("#userPhone").val();
    var email = $("#userEmail").val();
    var isSubscribe = $("").val();

    if (isNull(name)) {
        alert('请输入您的真实姓名');
        return;
    }
    if (isNull(phone) || !checkPhone(phone)) {
        alert('请输入正确的手机号');
        return;
    }
    if (isNull(email) || !checkEmail(email)) {
        alert('请输入正确的邮箱地址');
        return;
    }

    var dataObj = {
        name: name,
        phone: phone,
        email: email,
        visitType: 'mobile'
        //orderCode 勾选预约试驾后传入该值
    };

    var isSubscribe = $("#guize .chooseYuyue a").attr("class");
    if (isSubscribe == "active") {
        dataObj.orderCode = "B7EADF713CC70E79DA44BC2BA42E6F64";
    }

    localStorage.setItem("uName", name);
    localStorage.setItem("uPhone", phone);
    localStorage.setItem("uEmail", email);
    localStorage.setItem("huaban", "");

    $.ajax({
        url: "http://p7.hbsm.cc/lexus/leaf/uwinLeaf/login",
        type: "GET",
        dataType: 'jsonp',
        data: {
            name: name,
            phone: phone,
            email: email,
            visitType: 'mobile'
            //orderCode 勾选预约试驾后传入该值
        },
        success: function(result) {
            if (result.state != "0") {
                return false;
            };

            setHuaBan(result.data.leafs);
            //刷新登陆窗口花瓣
            //rushHb();

            //刷新登录框
            //loginModeOff();
            //
            alert("登录成功");

            //关闭登录接口
            closeLoginWin();
        }
    });
}


/**
 * 预约
 * @return {[type]} [description]
 */
function subscribe(name, phone, email) {
    if (isNull(name)) {
        alert('请输入您的真实姓名');
        return;
    }
    if (isNull(phone) || !checkPhone(phone)) {
        alert('请输入正确的手机号');
        return;
    }
    if (isNull(email) || !checkEmail(email)) {
        alert('请输入正确的邮箱地址');
        return;
    }
    var selectArr = $("#yuyue .yuyue-select-1 a");

    var isSubscribe = selectArr.eq(0).attr("class");
    var isProduct = selectArr.eq(1).attr("class");
    var isAccept = $("#yuyue .yuyue-select-2-mid").attr("class").indexOf("active") >= 0 ? 'active' : '';

    if (isSubscribe != "active") {
        alert("请勾选预约试驾选框");
        return false;
    }
    if (isProduct != "active") {
        alert("请接受更多产品信息");
        return false;
    }
    if (isAccept != "active") {
        alert("请接受阅读并同意相关说明信息");
        return false;
    }

    $.ajax({
        url: "http://p7.hbsm.cc/lexus/leaf/uwinLeaf/orderDrive",
        type: "GET",
        dataType: 'jsonp',
        data: {
            name: name,
            phone: phone,
            email: email,
            orderCode: "B7EADF713CC70E79DA44BC2BA42E6F64",
            visitType: "mobile"
        },
        success: function(result) {
            if (result.state != "0") {
                alert(result.message);
                return false;
            }

            alert("预约成功");

            //关闭登录接口
            closeLoginWin();
        }
    });
}

/**
 * 设置修改当前花瓣信息
 * @param {[type]} huabanArr [description]
 */
function setHuaBan(huabanArr) {
    var codeStr = "";
    var tmpStr = "";
    for (var i = 0; i < huabanArr.length; i++) {
        tmpStr = huabanArr[i];
        if (i < huabanArr.length - 1) {
            codeStr += tmpStr + ",";
        } else {
            codeStr += tmpStr;
        }
        //codeStr = codeStr + result.data.leafs[i];
    }
    //console.log(codeStr);
    //$.cookie('huaban', codeStr);
    localStorage.setItem("huaban", codeStr);
}

/**
 * 验证手机号
 * @param  {[type]} phone [description]
 * @return {[type]}       [description]
 */
function checkPhone(phone) {
    if (isNull(phone)) {
        return false;
    }
    if (!phone.match(/^0?1[3|4|5|7|8][0-9]\d{8}$/)) {
        return false;
    }
    return true;
}

/**
 * 验证邮箱
 * @param  {[type]} email [description]
 * @return {[type]}       [description]
 */
function checkEmail(email) {
    if (isNull(email)) {
        return false;
    }
    if (!email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
        return false;
    }
    return true;
}

/*
 * 空值判断处理函数，当传入的对象为string时会做空字符校验
 * 需要依赖jquery的trim函数
 *
 * @param obj : 需要判断的对象
 * @return : 空位true，非空为false
 */
function isNull(obj) {
    var result = true;
    var type = typeof(obj);
    /*undefined or null return false*/
    if (type == "undefined" ||
        obj == null) {
        result = true;
    }
    /*type is string */
    else if (type == "string") {
        obj = $.trim(obj);
        if (obj == "" ||
            obj == "undefined") {
            result = true;
        } else {
            result = false;
        }
    }
    /*other object */
    else {
        result = false;
    }
    return result;
}