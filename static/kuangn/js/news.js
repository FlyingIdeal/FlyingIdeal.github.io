$(function(){
    //初始化所有滑动
    initAllSlide();
    //视频http://www.kuangn.com/api/get_videos
    
    $(window).resize(function(){
        initAllSlide();
    });
});

/**
*页面中所有的滑动
*/
function initAllSlide(){
    //头条新闻
    var topNewsConf = {
        mainCell : ".kuangn-news-bd ul",
        titCell : ".kuangn-news-sd li",
        effect : "left",
        delayTime : 200,
        pnLoop : false
    };
    initSlidePlugIn("#kuangn-news-topline-slide",topNewsConf);
}