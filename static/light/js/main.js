$(function() {

	$(".p28").bind('click', function() {
		addUserInfo();
	})

	$(".p25").bind('click', function() {
		rob();
	})

	//初始化cookie
	// initCookie();


})


/**
 * 初始化
 * @return {[type]} [description]
 */
function initCookie() {
	$.ajax({
		type: "post",
		url: "http://182.92.236.178:9002/init",
		data: "",
		dataType: "jsonp",
		success: function(json) {}
	});
}

/**
 * 记录分享
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
function share(target) {
	$.ajax({
		type: "post",
		url: "http://182.92.236.178:9002/share",
		data: {
			target: target
		},
		dataType: "jsonp",
		success: function(json) {}
	});
}

/**
 * 抢
 * @return {[type]} [description]
 */
function rob() {
	$.ajax({
		type: "post",
		url: "http://182.92.236.178:9002/rob",
		data: "",
		dataType: "jsonp",
		success: function(json) {

			if (json.state == "0") {
				$(".page8").show();
			} else {
				$(".fail").show();
			}
		}
	});
}

/**
 * 添加个人信息
 */
function addUserInfo() {

	var userName = $("#userName").val();
	var userPhone = $("#userPhone").val();
	var userAddr = $("#userAddr").val();

	if (!userName) {
		alert("请输入姓名!");
		return false;
	}
	if (!userPhone) {
		alert("请输入手机号!");
		return false;
	}
	if (!userAddr) {
		alert("请输入邮箱!");
		return false;
	}

	if (!checkPhone(userPhone)) {
		alert("请输入正确的手机号！");
		return false;
	}


	$.ajax({
		type: "post",
		url: "http://182.92.236.178:9002/login",
		data: {
			name: userName,
			phone: userPhone,
			address: userAddr
		},
		dataType: "jsonp",
		success: function(json) {

			if (json.state == "0") {
				$(".success").show();
			} else {
				alert("保存信息失败，请稍后重试！");
			}
		}
	});

}

/**
 * 验证手机号
 * @param  {[type]} phone [description]
 * @return {[type]}       [description]
 */
function checkPhone(phone) {
	if (!phone) {
		return false;
	}
	if (!phone.match(/^0?1[3|4|5|7|8][0-9]\d{8}$/)) {
		return false;
	}
	return true;
}