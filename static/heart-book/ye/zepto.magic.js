;(function($){
  var magic = function(key, name, delay, remove){
    if(!$(key)) {
      return;
    }
    name = name ? name : $(key).data('name') || 'vanishIn';
    delay = delay ? delay : $(key).data('delay') || 0;
    if(remove) {
      $(key).removeClass(remove);
    }
    $(key).css({
      visibility: 'visible'
    });
    setTimeout(function(){
      $(key).addClass('visiable');
      $(key).addClass('magictime');
      $(key).addClass(name);
    }, delay);
  };

  $.extend($.fn, {
    magic: magic,
    magicInFor: function(key) {
      $(key).removeClass('hide');
      $(key).css({
        visibility: 'visible'
      });
      $(key + ' .magictime').each(function(){
        var delay = $(this).data('delay') || 0;
        var name = $(this).data('in') || 'vanishIn';
        magic($(this), name, delay);
      });
    },

    magicOutFor: function(key) {
      var t = 0;
      $(key + ' .magictime').each(function(){
        var delay = $(this).data('delay') || 0;
        if(parseInt(delay) > t) {
          t = delay;
        }
        var name = $(this).data('out') || 'vanishOut';
        magic($(this), name, delay, $(this).data('in'));
        setTimeout(function () {
        //  $(this).hide();
        }, delay + 1000);
      });
      //magic(key, 'vanishOut', t);
      setTimeout(function(){
        $(key).css({
          visibility: 'hidden'
        });
      }, t * 2 / 3);
    }
  })
})(Zepto)