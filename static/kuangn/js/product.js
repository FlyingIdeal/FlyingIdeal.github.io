$(function(){
	//初始化导航
	initMenu();
});

/**
 * 初始化产品导航
 * @return {[type]} [description]
 */
function initMenu()
{

	var focusConf = {
        //titCell : ".kuangn-product-bd li",
        mainCell : ".kuangn-product-sd dl",
        effect : "left",
        //vis : 3,
        delayTime : 200,
        prevCell : '.nav-pre',
        nextCell : '.nav-next',
        startFun : function(i,c){//i为当前分页，c为总页数
            //console.log(i);
            //$('#kuangn-focus-slide .bd li:eq('+(i+2)+')').addClass('curActive');
            //console.log(i);
        }
    };

    if(isPC())
    {
        focusConf.titCell = ".kuangn-product-bd li";
        focusConf.mainCell = ".kuangn-product-sd ul";
    }
    else
    {

        focusConf.defaultPlay = false;

        var currentLi = $(".kuangn-product-bd li.on");
        focusConf.mainCell = ".kuangn-product-sd .productLi" + currentLi.index() + " dl";
        focusConf.defaultIndex = $("dd a.active").parent().index();
        currentLi.siblings().hide();
        //上一个
        $("#kuangn-product-slide .navpre").click(function(){
            var prevLi = currentLi.prev();
            if(prevLi.size() < 1)
            {
                return false;
            }
            location.href = $(".kuangn-product-sd .productLi" + prevLi.index() + " dd:eq(0) a").attr("href");

        });
        //下一个
        $("#kuangn-product-slide .navnext").click(function(){
            var nextLi = currentLi.next();
            if(nextLi.size() < 1)
            {
                return false;
            }
            location.href = $(".kuangn-product-sd .productLi" + nextLi.index() + " dd:eq(0) a").attr("href");
        });

        var allLi = $(".kuangn-product-sd li");
        allLi.hide();
        allLi.eq(currentLi.index()).show();


        focusConf.endFun = function(i){
            var parentDd = $(".kuangn-product-sd .productLi" + currentLi.index() + " dd[ddFlag='on']");
            var currentDd = $(".kuangn-product-sd .productLi" + currentLi.index() + " dd:eq(" + i + ")");
            currentDd.attr("ddFlag","on");

            currentDd.prev().addClass("prevView");
            currentDd.addClass("on");
            currentDd.next().addClass("nextView");


            if(parentDd.size() > 0 && parentDd.index() != currentDd.index())
            {
                location.href = $(".kuangn-product-sd .productLi" + currentLi.index() + " dd:eq(" + i + ") a").attr("href");
            }
        }
    }

    initSlidePlugIn("#kuangn-product-slide",focusConf);
}