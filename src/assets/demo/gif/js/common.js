$(window).load(function() {

    var wHeight = $(window).height();
    //屏幕高度
    $("body").css('height', wHeight);
    $('.main').css('height', wHeight);

    if (/i(Phone|P(o|a)d)/.test(navigator.userAgent)) {
        $(document).one("touchstart",function(){
            playVid();
        });
    }
    else
    {
        playVid();
    }

    $(".main").one("touchstart",function(){
        animatePlay();
        $(".gesture").hide();
    })
    
});

function playVid()
{
    //alert("播放");
    $("#video").get(0).play();
}

function pauseVid()
{
    $("#video").get(0).pause();
}


/*开始动画*/

function animatePlay()
{
    setTimeout(function(){
        //盒子树叶消失
        $(".p1_1 , .p1_2").fadeOut(500);
        //树干显示
        $(".p2_1_mask , .p2_1").css("display" , "block");
        //500ms后树干遮罩层向上移动
        $(".p2_1_mask").animate({
            "top" : -340
        },3000);

        //从新设置定时器 叶子间隔出来
        setTimeout(function(){
            //最左边的叶子显示出来,依次
            $(".p2_2").fadeIn(500);
            $(".p2_1_mask").remove();
            
            setTimeout(function(){
                $(".p2_3").fadeIn(500);

                setTimeout(function(){
                    $(".p2_4").fadeIn(500);

                    setTimeout(function(){
                        //叶子显示完毕
                        $(".p2_5").fadeIn(500);

                        //叶子上的羊显示出来
                        setTimeout(function(){
                            $(".yang").fadeIn(500);

                            //2000ms后树枝树叶消失
                            setTimeout(function(){
                                $(".zhi").fadeOut(500);
                                //$(".main").css("background", "#E41D57");

                                //1000ms后羊向中间靠拢，宽度高度大小变成0
                                setTimeout(function(){

                                    $(".yang").animate({
                                        "width" : 0,
                                        "height" : 0,
                                        "left" : 300,
                                        "top" : 560
                                    });

                                },1000)

                                //羊汇聚到中间之后  斗志昂羊共成长 出现
                                setTimeout(function(){
                                    $(".p3_1").show().animate({
                                        "width" :640,
                                        "top" : 400,
                                        "height" : 110,
                                        "left" : 0
                                    });
                                },1500);

                                //2000ms之后羊logo出来
                                setTimeout(function(){
                                    //此时叶子上的羊可以删除
                                    $(".yang").remove();
                                    //羊logo运动到中间
                                    $(".p4_2").show().animate({
                                        "left" : 190
                                    });
                                },2000);

                                //“斗志昂羊共成长”不着急消失，多停留1-2秒
                                setTimeout(function(){
                                    $(".p3_1").fadeOut(500);
                                },4000);

                                //2015羊年快乐 出现
                                setTimeout(function(){
                                    $(".p4_1_mask").css({"display":"block"});
                                    $(".p4_1").css({"display":"block"});
                                },4200);

                                setTimeout(function(){
                                    $(".p4_1_mask").animate({
                                        "top" : 540
                                    },500)
                                },5500);

                                setTimeout(function(){
                                    $(".p4_1_mask").animate({
                                        "top" : 640
                                    },500)
                                },6500);

                                setTimeout(function(){
                                    $(".p4_1_mask").animate({
                                        "top" : 740
                                    },500)
                                },7500);

                                //羊向左离开
                                setTimeout(function(){
                                    $(".p4_2").animate({
                                        "left" : -640
                                    },500)
                                },12000);

                                //2015羊年快乐 消失
                                setTimeout(function(){
                                    $(".p4_1").fadeOut(500);
                                },13000);

                                //公司logo出现
                               setTimeout(function(){
                                    //$(".main").css("background", "#E7366A");
                                    $(".p5_1").fadeIn(500);
                                    $(".p4_2").remove();
                                    $(".p4_1_mask").remove();
                                },14000);
                               

                            },2000)

                        },1000)

                    },1000)

                },1000)

            },1000)

        },3500);

    },1500)

}
