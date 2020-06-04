$('.sexCom').bind('click', function(){

    $('.sexCom').find('i').removeClass('active');
    $(this).find('i').addClass('active');

});

$('.agree').bind('click', function(){
    $(this).find('i').toggleClass('active');
});

Array.prototype.unique = function()
{
    var n = []; //一个新的临时数组
    for(var i = 0; i < this.length; i++) //遍历当前数组
    {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if (n.indexOf(this[i]) == -1) n.push(this[i]);
    }
    return n;
}


var cityData = [];
    
$('select').change(function(){
    var vals = $(this).find('option:checked');
    var thisName = $(this).attr('name');

    $(this).parent().find('h4:eq(0)').text(vals.text());

    if(thisName = "dealer"){
        try{ dataLayer.push({'event': 'gaevent', 'Category': '报名页面','Action': '经销商','Label': ''}) }catch(e){}
    }else if(thisName = "buycartype"){
        try{ dataLayer.push({'event': 'gaevent', 'Category': '报名页面','Action': '感兴趣车型','Label': ''}) }catch(e){}
    }else if(thisName = "source"){
        try{ dataLayer.push({'event': 'gaevent', 'Category': '报名页面','Action': '从何处获得活动信息','Label': ''}) }catch(e){}
    }else
    {

    }
});

$.get('js/data.xml', function(data){
    resetData(data);
});

$('#submitBackBtn').bind('click', function(){
    $('#submitWarp').hide();
});

$('#submitForm').bind('click', function(){

    var user_name = $('#name').val();
    var user_phone = $('#Phone').val();
    var province = $('#province').val();
    var city = $('#city').val();
    var distributor = $('#distributor').val();
    var sex = $('#sex').find('.active').attr('sexValue');

    try{ dataLayer.push({'event': 'gaevent', 'Category': '报名页面','Action': '提交申请','Label': ''}) }catch(e){}

    if(checkInput() && checkAgree()){
            
        var datas = "user_name=" + user_name + 
        "&user_phone=" + user_phone + 
        "&province=" + province + 
        "&city=" + city + 
        "&distributor=" + distributor + 
        "&sex=" + sex +
        "&comeFrom=" + "mobile";

        //_smq.push(['custom','填写信息_提交', user_name , user_phone ]);//统计
        _smq.push(['custom', '填写信息提交', user_name, user_phone]);//统计
        _hmt.push(['_trackEvent', 'tijiaoxinxi', 'click', '填写信息_提交']);//统计

        $.ajax({
            url: "http://app.slpuzi.com/datastore/0befee75922a49beb98052c61c80d197/save.htm",
            data: encodeURI(datas),
            type:"post",
            dataType:"jsonp",
            success: function (data) {
                if(data.state == 0){
                    alert("恭喜您提交成功！");
                    //提交成功
                    try{ dataLayer.push({'event': 'gapage','page': '/报名页面/报名成功/'}); }catch(e){}
                }else{
                    alert("保存信息失败，请稍后重试！");
                }
            },
            error : function(){
                alert("提交失败！");
            }
        });
    }
    else
    {
        alert('请填写信息或勾选阅读条款');
    }

});

$('input[name=username]').blur(function(){
    try{ dataLayer.push({'event': 'gaevent', 'Category': '报名页面','Action': '姓名','Label': ''}) }catch(e){}
});
$('input[name=email]').blur(function(){
    try{ dataLayer.push({'event': 'gaevent', 'Category': '报名页面','Action': '邮箱','Label': ''}) }catch(e){}
});
$('input[name=mobile]').blur(function(){
    try{ dataLayer.push({'event': 'gaevent', 'Category': '报名页面','Action': '手机号码','Label': ''}) }catch(e){}
});

//省份切换
$('select[name=dealerprovince]').bind('change', function(){

    if(cityData.length == 0) {
        alert('数据未加载');
        return;
    }

    var vals = $(this).find('option:checked').val();
    var data = createOption(vals, "province", "city");

    $('select[name=dealercity]').html(data).prev().text($('select[name=dealercity]').find('option:checked').text());
    var vals2 = $('select[name=dealercity]').find('option:checked').text();
    var data2 = createOption(vals2, "city", "dealer");
    $('select[name=dealer]').html(data2).prev().text($('select[name=dealer]').find('option:checked').text());
    try{ dataLayer.push({'event': 'gaevent', 'Category': '报名页面','Action': '省','Label': ''}) }catch(e){}
});

$('select[name=dealercity]').bind('change', function(){
    var vals = $(this).find('option:checked').val();
    var data = createOption(vals, "city", "dealer");
    $('select[name=dealer]').html(data).prev().text($('select[name=dealer]').find('option:checked').text());
    try{ dataLayer.push({'event': 'gaevent', 'Category': '报名页面','Action': '市','Label': ''}) }catch(e){}
});

//生成新的下一级下拉列表
function createOption(initTxt, initObj, getObj){
    var tmpOption = '';
    var nnb = [];
    if(initTxt == "北京"){
        return '<option value="北京市">北京市</option>';
    }
    for( var i= 0,len=cityData.length; i<len; i++){
        if(cityData[i][initObj] == initTxt){
            nnb.push(cityData[i][getObj]);
            //tmpOption+='<option value="'+ cityData[i][getObj] +'">'+ cityData[i][getObj] +'</option>';
        }
    }
    var New = nnb.unique();
    for( var i= 0,len=New.length; i<len; i++){
        tmpOption+='<option value="'+ New[i] +'">'+ New[i] +'</option>';
    }
    return tmpOption;
}
//处理经销商数据
function resetData(data){
    $(data).find('metadata').each(function(){
        cityData.push({province: $(this).find('province').text(),city: $(this).find('city').text(),dealer: $(this).find('dealer').text()})
    });
}

//表单验证
function checkInput() {
    var isTrue = true;
    var inputs = $('input.inputText');
    for (var i = 0, len = inputs.length; i < len; i++) {
        if (inputs.eq(i).val() == "") {
            isTrue = false;
        }
    }
    return isTrue;
}

//协议勾选
function checkAgree() {
    isCheck = true;
    if (!$('.agree').find('i').hasClass('active')) {
        isCheck = false;
    }
    return isCheck;
}
