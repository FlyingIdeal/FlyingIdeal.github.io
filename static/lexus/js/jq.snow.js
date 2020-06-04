/**
 * js网页雪花效果jquery插件 
 */
(function($) {

	$.fn.snow = function(options) {

		var $flake = $('<div class="snowbox" />').css({
				'position': 'absolute',
				'top': '-50px;'
			}), //.html('❀'),
			documentHeight = $(window).height(),
			documentWidth = $(window).width(),
			defaults = {
				minSize: 10, //雪花的最小尺寸
				maxSize: 20, //雪花的最大尺寸
				newOn: 1000, //雪花出现的频率
				flakeColor: "#fff"
			},
			options = $.extend({}, defaults, options);

		var interval = setInterval(function() {
			var startPositionTop = Math.random() * documentHeight * 0.8,
				startOpacity = 0.5 + Math.random(),
				sizeFlake = options.minSize + Math.random() * options.maxSize,
				//endPositionTop		= startPositionTop - 100 + Math.random() * 500,
				endPositionTop = documentHeight / 2 + Math.random() * (documentHeight / 2),
				endPositionLeft = documentWidth / 2,
				durationFall = 3000 + Math.random() * 500;
			$flake.clone().appendTo('.navhua').css({
				top: startPositionTop,
				left: -50,
				opacity: startOpacity,
				'font-size': sizeFlake,
				color: options.flakeColor
			}).animate({
				top: endPositionTop,
				left: endPositionLeft,
				opacity: 0
			}, durationFall, 'swing', function() {
				$(this).remove()
			});
			$flake.clone().appendTo('.navhua').css({
				top: startPositionTop,
				left: documentWidth + 50,
				opacity: startOpacity,
				'font-size': sizeFlake,
				color: options.flakeColor
			}).animate({
				top: endPositionTop,
				left: endPositionLeft,
				opacity: 0
			}, durationFall, 'linear', function() {
				$(this).remove()
			});
		}, options.newOn);



	};

})(jQuery);