//随机跳转的目录
var linkHref = ['chu', 'wu', 'jiang', 'zhen', 'ye'];

$(function() {

    initHeight();

    //loading
    $("body").queryLoader2({
        barColor: "#ffffff",
        backgroundColor: "#214358",
        percentage: true,
        barHeight: 30,
        completeAnimation: "fade"
    });

    //body添加touch事件，防止下拉缓冲
    /*touch.on('body' , 'touchstart' , function(ev){
        ev.preventDefault();
    })*/

    //指纹添加touch事件
    //var print = 
    touch.on('.point', 'touchstart', function(ev) {
        ev.preventDefault();

        $(".pointOn").css("display", "block");

        //间隔2s随机跳转document.write(Math.random()*(n-m)+m);

        setTimeout(function() {

            var num = parseInt(Math.random() * linkHref.length);
            //替换num
            location.href = linkHref[num] + "/index.html";

        }, 2000)
    })

    //视频播放
    touch.on('#videoBtn', 'touchstart , tap', function() {
        $("#videoMask , #videoMid").show();
        $('#videoObj').attr('src', 'http://www.uwin.cc/benz/20150607/images/video.mp4');
    })

    touch.on('#closeBtn , #videoMask', 'touchstart , tap', function() {
        $("#videoMask , #videoMid").hide();
        $('#videoObj').attr('src', '');
    })


})

function initHeight() {
    var Vheight = document.documentElement.clientHeight;

    $(".main").css("height", Vheight);
}