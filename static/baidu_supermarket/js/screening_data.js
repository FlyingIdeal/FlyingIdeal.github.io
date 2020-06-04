$(function() {

	var aId = gethrefPara('id');
	var moreId = gethrefPara('moreId');
	var titleId = gethrefPara('titleId');
	titleval(titleId);

	var showNavState = parseInt(gethrefPara('show'));

	showNav(showNavState);

	initData(aId);
	$('.filterBtn a').bind('click', function() {
		//alert();

		screening($(this).attr('id'));
	})

	if (!moreId == "" || moreId == null) {
		findChildMenu(moreId);
	}


})

function titleval(titleId) {
	var _html = '';
	for (var i = 0; i < titleVal.length; i++) {
		if (titleId == titleVal[i].titleId) {
			_html = titleVal[i].title_cnt;
		}
	}
	$('.bCenter p').html(_html);
}


function screening(parentId) {
		var data_num = [];

		var _html = '';
		for (var i = 0; i < appList.length; i++) {
			if (parentId == appList[i].parentId) {
				data_num.push(appList[i]);
				_html += '<div class="col4"><a target="_blank"  href="' + appList[i].aLink + '" class="aLink"><div class="top"><div class="topLeft"><img src="../images/' + appList[i].appIcon + '.png" /></div><div class="topRight"><h3 title='+appList[i].title+'>' + appList[i].title + '</h3><span>评价</span>' + howStarNum(i) + '</div></div><div class="bot"><p>' + appList[i].infro + '</p></div></a></div>';
			}
		}

		var data_length = data_num.length;
		//	alert(data_length % 4);
		var qid_num = 4 - data_length % 4;
		//alert(qid_num);
		for (var q = 0; q < qid_num; q++) {
			if (qid_num < 4) {
				_html += '<div class="col4"><a href="javascript:void(0);" class="aLink"><h1 class="wait">敬请期待</h1></a></div>';
			}
		}
		$('.gallery').html(_html);

	}
	/**传输belong = ''  根据belong 筛选
	 **循环data数据
	 ***/

function initData(a_id) {


	var ary = [];
	var data_num = [];
	var _html = '';
	var filterBtn_html = '';
	//alert(a_id);
	for (var s = 0; s < superList.length; s++) {
		if (a_id == superList[s].parentId) {
			ary.push(superList[s].id);

		}
	}

	for (var t = 0; t < ary.length; t++) {

		for (var i = 0; i < appList.length; i++) {
			if (ary[t] == appList[i].parentId) {
				data_num.push(appList[i]);

				_html += '<div class="col4"><a target="_blank"  href="' + appList[i].aLink + '" class="aLink"><div class="top"><div class="topLeft"><img src="../images/' + appList[i].appIcon + '.png" /></div><div class="topRight"><h3 title='+appList[i].title+'>' + appList[i].title + '</h3><span>评价</span>' + howStarNum(i) + '</div></div><div class="bot"><p>' + appList[i].infro + '</p></div></a></div>';
			}
		}
		for (var h = 0; h < superList.length; h++) {
			if (ary[t] == superList[h].id) {
				filterBtn_html += '<a href="javascript:void(0);" class="btn_1" id="' + superList[h].id + '">' + superList[h].title + '</a>'
			}
		}

	}


	for (var i = 0; i < appList.length; i++) {

		if (a_id == appList[i].parentId) {
			data_num.push(appList[i]);
			_html += '<div class="col4"><a target="_blank" href="' + appList[i].aLink + '" class="aLink"><div class="top"><div class="topLeft"><img src="../images/' + appList[i].appIcon + '.png" /></div><div class="topRight"><h3 title='+appList[i].title+'>' + appList[i].title + '</h3><span>评价</span>' + howStarNum(i) + '</div></div><div class="bot"><p>' + appList[i].infro + '</p></div></a></div>';
		}
	}
	var data_length = data_num.length;
	var qid_num = 4 - data_length % 4;
	//  alert(qid_num);
	for (var q = 0; q < qid_num; q++) {
		if (qid_num < 4) {
			_html += '<div class="col4"><a href="javascript:void(0);" class="aLink"><h1 class="wait">敬请期待</h1></a></div>';
		}
	}

	$('.gallery').html(_html);
	$('.filterBtn').html(filterBtn_html);
	if ($('.filterBtn').html() == "") {
		$('.filterTxt').hide();
	}
}

/** num 当前index
 *星星个数
 ***/
function howStarNum(num) {
	var indexOnNum = parseInt(appList[num].starOnNum);
	var indexLoseNum = parseInt(appList[num].starLoseNum);

	var _html = '<dl>';

	for (var i = 0; i < indexOnNum; i++) {
		_html += '<dd><img src="../images/starOn.png" /></dd>';
	}

	for (var j = 0; j < indexLoseNum; j++) {
		_html += '<dd><img src="../images/starLose.png" /></dd>';
	}

	_html += '</dl>'

	return _html;
}



/**
 * 根据父节点ID查询该节点下的子节点
 */

function findChildMenu(moreId) {
	var _html = '';
	var data_num = [];
	//var menuArr = superList;
	//var currentArr = new Array();
	//var currentMenu = null;

	for (var i = 0; i < appList.length; i++) {
		//currentMenu = menuArr[i];
		if (appList[i].moreId == moreId) {
			data_num.push(appList[i]);
			_html += '<div class="col4"><a target="_blank"  href="' + appList[i].aLink + '" class="aLink"><div class="top"><div class="topLeft"><img src="../images/' + appList[i].appIcon + '.png" /></div><div class="topRight"><h3 title='+appList[i].title+'>' + appList[i].title + '</h3><span>评价</span>' + howStarNum(i) + '</div></div><div class="bot"><p>' + appList[i].infro + '</p></div></a></div>';
		}
	}
	var data_length = data_num.length;
	var qid_num = 4 - data_length % 4;
	//  alert(qid_num);
	for (var q = 0; q < qid_num; q++) {
		if (qid_num < 4) {
			_html += '<div class="col4"><a href="javascript:void(0);" class="aLink"><h1 class="wait">敬请期待</h1></a></div>';
		}
	}

	$('.gallery').html(_html);
	//return currentArr;
}


/***
 *是否显示筛选Nav
 **/
function showNav(state) {
	if (state) {

	} else {
		//alert(2);
	}
}

/**
 *截取link中的字符串
 ****/
function gethrefPara(name) {
	var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
	if (reg.test(window.location.href))
		return unescape(RegExp.$2.replace(/\+/g, " "));
	return "";
};