﻿/*
 * QueryLoader2 - A simple script to create a preloader for images
 *
 * For instructions read the original post:
 * http://www.gayadesign.com/diy/queryloader2-preload-your-images-with-ease/
 *
 * Copyright (c) 2011 - Gaya Kessler
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Version: 3.0.6
 * Last update: 2014-09-25
 */
/*!function t(e,i,s){function n(o,a){if(!i[o]){if(!e[o]){var l="function"==typeof require&&require;if(!a&&l)return l(o,!0);if(r)return r(o,!0);throw new Error("Cannot find module '"+o+"'")}var h=i[o]={exports:{}};e[o][0].call(h.exports,function(t){var i=e[o][1][t];return n(i?i:t)},h,h.exports,t,e,i,s)}return i[o].exports}for(var r="function"==typeof require&&require,o=0;o<s.length;o++)n(s[o]);return n}({1:[function(t,e){function i(t){"use strict";this.src=t,this.element=null,"undefined"!=typeof t&&this.create()}var s=t("./ImageLoaded.js");i.prototype.create=function(){"use strict";this.element=document.createElement("img"),this.element.setAttribute("src",this.src)},i.prototype.preload=function(t){"use strict";s(this.element,function(e,i){t(e,i)})},e.exports=i},{"./ImageLoaded.js":2}],2:[function(t,e){function i(t,e){"use strict";function i(t,e,i,s){t.addEventListener?t[i?"addEventListener":"removeEventListener"](e,s):t[i?"attachEvent":"detachEvent"]("on"+e,s)}function n(){i(t,"load",!1,n),i(t,"error",!1,n),e(null,!1)}var r;return t.nodeName?"img"!==t.nodeName.toLowerCase()?e(new Error("Element supplied is not an image")):t.src&&t.complete&&void 0!==t.naturalWidth?e(null,!0):(i(t,"load",!0,n),i(t,"error",!0,n),void((t.readyState||t.complete)&&(r=t.src,t.src=s,t.src=r))):e(new Error("First argument must be an image element"))}var s="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";e.exports=i},{}],3:[function(t,e){function i(t){"use strict";this.parent=t,this.sources=[],this.images=[],this.loaded=0,this.deepSearch=!0}var s=t("./Image.js");i.prototype.getImageSrcs=function(t){"use strict";if(this.sources=[],"undefined"!=typeof t&&(this.findImageInElement(t),this.deepSearch===!0))for(var e=t.querySelectorAll("*"),i=0;i<e.length;i++)"SCRIPT"!==e[i].tagName&&this.findImageInElement(e[i]);return this.sources},i.prototype.findAndPreload=function(t){"use strict";if("undefined"!=typeof t){this.sources=this.getImageSrcs(t);for(var e=0;e<this.sources.length;e++){var i=new s(this.sources[e]);i.preload(this.imageLoaded.bind(this)),this.images.push(i)}}},i.prototype.imageLoaded=function(){"use strict";this.loaded++,this.updateProgress()},i.prototype.updateProgress=function(){"use strict";this.parent.updateProgress(this.loaded,this.sources.length)},i.prototype.findImageInElement=function(t){"use strict";var e=this.determineUrlAndType(t);if(!this.hasGradient(e.url)){e.url=this.stripUrl(e.url);for(var i=e.url.split(", "),s=0;s<i.length;s++)if(this.validUrl(i[s])&&this.urlIsNew(i[s])){var n="";(this.isIE()||this.isOpera())&&(n="?rand="+Math.random()),this.sources.push(i[s]+n)}}},i.prototype.determineUrlAndType=function(t){"use strict";var e="",i="normal",s=t.currentStyle||window.getComputedStyle(t,null);return""!==s.backgroundImage&&"none"!==s.backgroundImage||""!==t.style.backgroundImage&&"none"!==t.style.backgroundImage?(e=s.backgroundImage||t.style.backgroundImage,i="background"):"undefined"!=typeof t.getAttribute("src")&&"img"===t.nodeName.toLowerCase()&&(e=t.getAttribute("src")),{url:e,type:i}},i.prototype.hasGradient=function(t){"use strict";return-1!==t.indexOf("gradient(")},i.prototype.stripUrl=function(t){"use strict";return t=t.replace(/url\(\"/g,""),t=t.replace(/url\(/g,""),t=t.replace(/\"\)/g,""),t=t.replace(/\)/g,"")},i.prototype.validUrl=function(t){"use strict";return t.length>0&&!t.match(/^(data:)/i)?!0:!1},i.prototype.urlIsNew=function(t){"use strict";return-1===this.sources.indexOf(t)},i.prototype.isIE=function(){"use strict";return navigator.userAgent.match(/msie/i)},i.prototype.isOpera=function(){"use strict";return navigator.userAgent.match(/Opera/i)},e.exports=i},{"./Image.js":1}],4:[function(t,e){function i(){"use strict";this.element=null,this.className="queryloader__overlay__bar",this.barHeight=1,this.barColor="#fff"}i.prototype.create=function(){"use strict";this.element=document.createElement("div"),this.element.setAttribute("class",this.className),this.setStyling(),this.updateProgress(0,0)},i.prototype.setStyling=function(){"use strict";this.element.style.height=this.barHeight+"px",this.element.style.marginTop="-"+this.barHeight/2+"px",this.element.style.backgroundColor=this.barColor,this.element.style.position="absolute",this.element.style.top="50%",this.setTransitionTime(100)},i.prototype.updateProgress=function(t,e){"use strict";parseInt(t)<0?t=0:parseInt(t)>100&&(t=100),0!==e&&this.setTransitionTime(e),this.element.style.width=parseInt(t)+"%"},i.prototype.setTransitionTime=function(t){"use strict";this.element.style.WebkitTransition="width "+t+"ms",this.element.style.MozTransition="width "+t+"ms",this.element.style.OTransition="width "+t+"ms",this.element.style.MsTransition="width "+t+"ms",this.element.style.Transition="width "+t+"ms"},e.exports=i},{}],5:[function(t,e){function i(){"use strict";this.element=null,this.idName="qlPercentage",this.className="queryloader__overlay__percentage",this.barHeight=1,this.barColor="#fff"}i.prototype.create=function(){"use strict";this.element=document.createElement("div"),this.element.setAttribute("class",this.className),this.element.setAttribute("id",this.idName),this.applyStyling(),this.updateProgress(0,0)},i.prototype.applyStyling=function(){"use strict";this.element.style.height="40px",this.element.style.width="100%",this.element.style.position="absolute",this.element.style.fontSize="3em",this.element.style.top="50%",this.element.style.left="0",this.element.style.marginTop="-"+(59+this.barHeight)+"px",this.element.style.textAlign="center",this.element.style.color=this.barColor},i.prototype.updateProgress=function(t){"use strict";parseInt(t)<0?t=0:parseInt(t)>100&&(t=100),this.element.innerHTML=parseInt(t)+"%"},e.exports=i},{}],6:[function(t,e){function i(t){"use strict";this.parentElement=t,this.idName="qLoverlay",this.percentageId="qlPercentage",this.className="queryloader__overlay",this.element=null,this.loadingBar=null,this.percentage=null,this.barColor="#ff0000",this.backgroundColor="#000",this.barHeight=1,this.fadeOutTime=300,this.showPercentage=!1}var s=t("./LoadingBar.js"),n=t("./Percentage.js");i.prototype.init=function(){"use strict";this.create(),this.loadingBar=new s,this.loadingBar.barHeight=this.barHeight,this.loadingBar.barColor=this.barColor,this.loadingBar.create(),this.element.appendChild(this.loadingBar.element),this.showPercentage&&(this.percentage=new n,this.percentage.barColor=this.barColor,this.percentage.idName=this.percentageId,this.percentage.create(),this.element.appendChild(this.percentage.element)),this.parentElement.appendChild(this.element)},i.prototype.create=function(){"use strict";this.element=document.querySelector("#"+this.idName)||document.createElement("div"),this.element.setAttribute("class",this.className),this.element.setAttribute("id",this.idName),this.applyStyling()},i.prototype.applyStyling=function(){"use strict";this.element.style.position=this.calculatePosition(),this.element.style.width="100%",this.element.style.height="100%",this.element.style.backgroundColor=this.backgroundColor,this.element.style.backgroundPosition="fixed",this.element.style.zIndex=666999,this.element.style.top="0",this.element.style.left="0",this.element.style.WebkitTransition="opacity "+this.fadeOutTime+"ms",this.element.style.MozTransition="opacity "+this.fadeOutTime+"ms",this.element.style.OTransition="opacity "+this.fadeOutTime+"ms",this.element.style.MsTransition="opacity "+this.fadeOutTime+"ms",this.element.style.Transition="opacity "+this.fadeOutTime+"ms"},i.prototype.calculatePosition=function(){"use strict";var t="absolute";return"body"===this.parentElement.tagName.toLowerCase()?t="fixed":("fixed"!==this.parentElement.style.position||"absolute"!==this.parentElement.style.position)&&(this.parentElement.style.position="relative"),t},i.prototype.updateProgress=function(t,e){"use strict";null!==this.loadingBar&&this.loadingBar.updateProgress(t,e),null!==this.percentage&&this.percentage.updateProgress(t,e)},i.prototype.remove=function(){"use strict";this.element.parentNode.removeChild(this.element)},e.exports=i},{"./LoadingBar.js":4,"./Percentage.js":5}],7:[function(){Function.prototype.bind||(Function.prototype.bind=function(t){"use strict";if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),i=this,s=function(){},n=function(){return i.apply(this instanceof s&&t?this:t,e.concat(Array.prototype.slice.call(arguments)))};return s.prototype=this.prototype,n.prototype=new s,n})},{}],8:[function(t,e){function i(t,e){"use strict";this.element=t,this.options=e,this.done=!1,this.maxTimeout=null,this.defaultOptions={onComplete:function(){},backgroundColor:"#000",barColor:"#fff",overlayId:"qLoverlay",percentageId:"qLpercentage",barHeight:1,percentage:!1,deepSearch:!0,minimumTime:300,maxTime:1e4,fadeOutTime:1e3},this.overlay=null,this.preloader=null,null!==t&&this.init()}var s=t("./ImagePreloader/"),n=t("./Overlay/");i.prototype.init=function(){"use strict";this.options=this.extend(this.defaultOptions,this.options),"undefined"!=typeof this.element&&(this.createOverlay(),this.createPreloader(),this.startMaxTimeout())},i.prototype.extend=function(t,e){"use strict";"undefined"==typeof t&&(t={});for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t},i.prototype.startMaxTimeout=function(){"use strict";this.maxTimeout=window.setTimeout(this.doneLoading.bind(this),this.options.maxTime)},i.prototype.createOverlay=function(){"use strict";this.overlay=new n(this.element),this.overlay.idName=this.options.overlayId,this.overlay.percentageId=this.options.percentageId,this.overlay.backgroundColor=this.options.backgroundColor,this.overlay.barHeight=this.options.barHeight,this.overlay.barColor=this.options.barColor,this.overlay.showPercentage=this.options.percentage,this.overlay.fadeOuttime=this.options.fadeOutTime,"undefined"!=typeof this.element&&this.overlay.init()},i.prototype.createPreloader=function(){"use strict";this.preloader=new s(this),this.preloader.deepSearch=this.options.deepSearch,window.setTimeout(function(){this.preloader.findAndPreload(this.element)}.bind(this),100)},i.prototype.updateProgress=function(t,e){"use strict";this.overlay.updateProgress(t/e*100,this.options.minimumTime),t===e&&this.done===!1&&(window.clearTimeout(this.maxTimeout),window.setTimeout(this.doneLoading.bind(this),this.options.minimumTime))},i.prototype.doneLoading=function(){"use strict";window.clearTimeout(this.maxTimeout),this.done=!0,this.overlay.element.style.opacity=0,window.setTimeout(this.destroy.bind(this),this.options.fadeOutTime)},i.prototype.destroy=function(){"use strict";this.overlay.remove(),this.options.onComplete()},e.exports=i},{"./ImagePreloader/":3,"./Overlay/":6}],9:[function(t,e){t("./Polyfills/");var i=t("./QueryLoader.js");(window.jQuery||window.Zepto)&&!function(t){"use strict";t.fn.queryLoader2=function(t){return this.each(function(){new i(this,t)})}}(window.jQuery||window.Zepto),"undefined"!=typeof e&&(e.exports=i),"function"==typeof define&&define.amd&&define([],function(){"use strict";return i}),window.QueryLoader2=i},{"./Polyfills/":7,"./QueryLoader.js":8}]},{},[9]);

*/

!function t(e, i, s) {
    function n(o, a) {
        if (!i[o]) {
            if (!e[o]) {
                var l = "function" == typeof require && require;
                if (!a && l) return l(o, !0);
                if (r) return r(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var h = i[o] = {
                exports: {}
            };
            e[o][0].call(h.exports,
            function(t) {
                var i = e[o][1][t];
                return n(i ? i: t)
            },
            h, h.exports, t, e, i, s)
        }
        return i[o].exports
    }
    for (var r = "function" == typeof require && require,
    o = 0; o < s.length; o++) n(s[o]);
    return n
} ({
    1 : [function(t, e) {
        function i(t) {
            "use strict";
            this.src = t,
            this.element = null,
            "undefined" != typeof t && this.create()
        }
        var s = t("./ImageLoaded.js");
        i.prototype.create = function() {
            "use strict";
            this.element = document.createElement("img"),
            this.element.setAttribute("src", this.src)
        },
        i.prototype.preload = function(t) {
            "use strict";
            s(this.element,
            function(e, i) {
                t(e, i)
            })
        },
        e.exports = i
    },
    {
        "./ImageLoaded.js": 2
    }],
    2 : [function(t, e) {
        function i(t, e) {
            "use strict";
            function i(t, e, i, s) {
                t.addEventListener ? t[i ? "addEventListener": "removeEventListener"](e, s) : t[i ? "attachEvent": "detachEvent"]("on" + e, s)
            }
            function n() {
                i(t, "load", !1, n),
                i(t, "error", !1, n),
                e(null, !1)
            }
            var r;
            return t.nodeName ? "img" !== t.nodeName.toLowerCase() ? e(new Error("Element supplied is not an image")) : t.src && t.complete && void 0 !== t.naturalWidth ? e(null, !0) : (i(t, "load", !0, n), i(t, "error", !0, n), void((t.readyState || t.complete) && (r = t.src, t.src = s, t.src = r))) : e(new Error("First argument must be an image element"))
        }
        var s = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        e.exports = i
    },
    {}],
    3 : [function(t, e) {
        function i(t) {
            "use strict";
            this.parent = t,
            this.sources = [],
            this.images = [],
            this.loaded = 0,
            this.deepSearch = !0
        }
        var s = t("./Image.js");
        i.prototype.getImageSrcs = function(t) {
            "use strict";
            if (this.sources = [], "undefined" != typeof t && (this.findImageInElement(t), this.deepSearch === !0)) for (var e = t.querySelectorAll("*"), i = 0; i < e.length; i++)"SCRIPT" !== e[i].tagName && this.findImageInElement(e[i]);
            return this.sources
        },
        i.prototype.findAndPreload = function(t) {
            "use strict";
            if ("undefined" != typeof t) {
                this.sources = this.getImageSrcs(t);
                for (var e = 0; e < this.sources.length; e++) {
                    var i = new s(this.sources[e]);
                    i.preload(this.imageLoaded.bind(this)),
                    this.images.push(i)
                }
            }
        },
        i.prototype.imageLoaded = function() {
            "use strict";
            this.loaded++,
            this.updateProgress()
        },
        i.prototype.updateProgress = function() {
            "use strict";
            this.parent.updateProgress(this.loaded, this.sources.length);
        },
        i.prototype.findImageInElement = function(t) {
            "use strict";
            var e = this.determineUrlAndType(t);
            if (!this.hasGradient(e.url)) {
                e.url = this.stripUrl(e.url);
                for (var i = e.url.split(", "), s = 0; s < i.length; s++) if (this.validUrl(i[s]) && this.urlIsNew(i[s])) {
                    var n = ""; (this.isIE() || this.isOpera()) && (n = "?rand=" + Math.random()),
                    this.sources.push(i[s] + n)
                }
            }
        },
        i.prototype.determineUrlAndType = function(t) {
            "use strict";
            var e = "",
            i = "normal",
            s = t.currentStyle || window.getComputedStyle(t, null);
            return "" !== s.backgroundImage && "none" !== s.backgroundImage || "" !== t.style.backgroundImage && "none" !== t.style.backgroundImage ? (e = s.backgroundImage || t.style.backgroundImage, i = "background") : "undefined" != typeof t.getAttribute("src") && "img" === t.nodeName.toLowerCase() && (e = t.getAttribute("src")),
            {
                url: e,
                type: i
            }
        },
        i.prototype.hasGradient = function(t) {
            "use strict";
            return - 1 !== t.indexOf("gradient(")
        },
        i.prototype.stripUrl = function(t) {
            "use strict";
            return t = t.replace(/url\(\"/g, ""),
            t = t.replace(/url\(/g, ""),
            t = t.replace(/\"\)/g, ""),
            t = t.replace(/\)/g, "")
        },
        i.prototype.validUrl = function(t) {
            "use strict";
            return t.length > 0 && !t.match(/^(data:)/i) ? !0 : !1
        },
        i.prototype.urlIsNew = function(t) {
            "use strict";
            return - 1 === this.sources.indexOf(t)
        },
        i.prototype.isIE = function() {
            "use strict";
            return navigator.userAgent.match(/msie/i)
        },
        i.prototype.isOpera = function() {
            "use strict";
            return navigator.userAgent.match(/Opera/i)
        },
        e.exports = i
    },
    {
        "./Image.js": 1
    }],
    4 : [function(t, e) {
        function i() {
            "use strict";
            this.element = null,
            this.className = "queryloader__overlay__bar",
            this.barHeight = 1,
            this.barColor = "#fff"
        }
        i.prototype.create = function() {
            "use strict";
            this.element = document.createElement("div"),
            this.element.innerHTML = '<img src="http://www.uwin.cc/benz/20150607/images/loading.png">';

            this.element.setAttribute("class", this.className),
            this.setStyling(),
            this.updateProgress(0, 0)
        },
        i.prototype.setStyling = function() {
            "use strict";
            //this.element.style.height = this.barHeight + "px",
            this.element.style.marginTop = "-" + this.barHeight / 2 + "px",
            //this.element.style.backgroundColor = this.barColor,
            this.element.style.position = "absolute",
            this.element.style.top = "50%",
            this.setTransitionTime(100)
        },
        i.prototype.updateProgress = function(t, e) {
            "use strict";
            parseInt(t) < 0 ? t = 0 : parseInt(t) > 100 && (t = 100),
            0 !== e && this.setTransitionTime(e),
            this.element.style.width = parseInt(t) + "%"
        },
        i.prototype.setTransitionTime = function(t) {
            "use strict";
            this.element.style.WebkitTransition = "width " + t + "ms",
            this.element.style.MozTransition = "width " + t + "ms",
            this.element.style.OTransition = "width " + t + "ms",
            this.element.style.MsTransition = "width " + t + "ms",
            this.element.style.Transition = "width " + t + "ms"
        },
        e.exports = i
    },
    {}],
    5 : [function(t, e) {
        function i() {
            "use strict";
            this.element = null,
            this.idName = "qlPercentage",
            this.className = "queryloader__overlay__percentage",
            this.barHeight = 1,
            this.barColor = "#fff"
        }
        i.prototype.create = function() {
            "use strict";
            this.element = document.createElement("div"),
            this.element.setAttribute("class", this.className),
            this.element.setAttribute("id", this.idName),
            this.applyStyling(),
            this.updateProgress(0, 0)
        },
        i.prototype.applyStyling = function() {
            "use strict";
            this.element.style.height = "40px",
            this.element.style.width = "100%",
            this.element.style.position = "absolute",
            this.element.style.fontSize = "3em",
            this.element.style.top = "50%",
            this.element.style.left = "0",
            this.element.style.marginTop = "-" + (59 + this.barHeight) + "px",
            this.element.style.textAlign = "center",
            this.element.style.color = this.barColor
        },
        i.prototype.updateProgress = function(t) {
            "use strict";
            parseInt(t) < 0 ? t = 0 : parseInt(t) > 100 && (t = 100),
            this.element.innerHTML = parseInt(t) + "%"
        },
        e.exports = i
    },
    {}],
    6 : [function(t, e) {
        function i(t) {
            "use strict";
            this.parentElement = t,
            this.idName = "qLoverlay",
            this.percentageId = "qlPercentage",
            this.className = "queryloader__overlay",
            this.element = null,
            this.loadingBar = null,
            this.percentage = null,
            this.barColor = "#ff0000",
            this.backgroundColor = "#000",
            this.barHeight = 1,
            this.fadeOutTime = 300,
            this.showPercentage = !1
        }
        var s = t("./LoadingBar.js"),
        n = t("./Percentage.js");
        i.prototype.init = function() {
            "use strict";
            this.create(),
            this.loadingBar = new s,
            this.loadingBar.barHeight = this.barHeight,
            this.loadingBar.barColor = this.barColor,
            this.loadingBar.create(),
            this.element.appendChild(this.loadingBar.element),
            this.showPercentage && (this.percentage = new n, this.percentage.barColor = this.barColor, this.percentage.idName = this.percentageId, this.percentage.create(), this.element.appendChild(this.percentage.element)),
            this.parentElement.appendChild(this.element)
        },
        i.prototype.create = function() {
            "use strict";
            this.element = document.querySelector("#" + this.idName) || document.createElement("div"),
            this.element.setAttribute("class", this.className),
            this.element.setAttribute("id", this.idName),
            this.applyStyling()
        },
        i.prototype.applyStyling = function() {
            "use strict";
            this.element.style.position = this.calculatePosition(),
            this.element.style.width = "100%",
            this.element.style.height = "100%",
            //this.element.style.backgroundColor = this.backgroundColor,
            //this.element.style.background = 'url(../images/loadBg.jpg)',
            this.element.style.backgroundPosition = "fixed",
            this.element.style.zIndex = 666999,
            this.element.style.top = "0",
            this.element.style.left = "0",
            this.element.style.WebkitTransition = "opacity " + this.fadeOutTime + "ms",
            this.element.style.MozTransition = "opacity " + this.fadeOutTime + "ms",
            this.element.style.OTransition = "opacity " + this.fadeOutTime + "ms",
            this.element.style.MsTransition = "opacity " + this.fadeOutTime + "ms",
            this.element.style.Transition = "opacity " + this.fadeOutTime + "ms"
        },
        i.prototype.calculatePosition = function() {
            "use strict";
            var t = "absolute";
            return "body" === this.parentElement.tagName.toLowerCase() ? t = "fixed": ("fixed" !== this.parentElement.style.position || "absolute" !== this.parentElement.style.position) && (this.parentElement.style.position = "relative"),
            t
        },
        i.prototype.updateProgress = function(t, e) {
            "use strict";
            null !== this.loadingBar && this.loadingBar.updateProgress(t, e),
            null !== this.percentage && this.percentage.updateProgress(t, e)
        },
        i.prototype.remove = function() {
            "use strict";
            this.element.parentNode.removeChild(this.element)
        },
        e.exports = i
    },
    {
        "./LoadingBar.js": 4,
        "./Percentage.js": 5
    }],
    7 : [function() {
        Function.prototype.bind || (Function.prototype.bind = function(t) {
            "use strict";
            if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            var e = Array.prototype.slice.call(arguments, 1),
            i = this,
            s = function() {},
            n = function() {
                return i.apply(this instanceof s && t ? this: t, e.concat(Array.prototype.slice.call(arguments)))
            };
            return s.prototype = this.prototype,
            n.prototype = new s,
            n
        })
    },
    {}],
    8 : [function(t, e) {
        function i(t, e) {
            "use strict";
            this.element = t,
            this.options = e,
            this.done = !1,
            this.maxTimeout = null,
            this.defaultOptions = {
                onComplete: function() {},
                backgroundColor: "#000",
                barColor: "#fff",
                overlayId: "qLoverlay",
                percentageId: "qLpercentage",
                barHeight: 1,
                percentage: !1,
                deepSearch: !0,
                minimumTime: 300,
                maxTime: 1e4,
                fadeOutTime: 1e3
            },
            this.overlay = null,
            this.preloader = null,
            null !== t && this.init()
        }
        var s = t("./ImagePreloader/"),
        n = t("./Overlay/");
        i.prototype.init = function() {
            "use strict";
            this.options = this.extend(this.defaultOptions, this.options),
            "undefined" != typeof this.element && (this.createOverlay(), this.createPreloader(), this.startMaxTimeout())
        },
        i.prototype.extend = function(t, e) {
            "use strict";
            "undefined" == typeof t && (t = {});
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            return t
        },
        i.prototype.startMaxTimeout = function() {
            "use strict";
            this.maxTimeout = window.setTimeout(this.doneLoading.bind(this), this.options.maxTime)
        },
        i.prototype.createOverlay = function() {
            "use strict";
            this.overlay = new n(this.element),
            this.overlay.idName = this.options.overlayId,
            this.overlay.percentageId = this.options.percentageId,
            this.overlay.backgroundColor = this.options.backgroundColor,
            this.overlay.barHeight = this.options.barHeight,
            this.overlay.barColor = this.options.barColor,
            this.overlay.showPercentage = this.options.percentage,
            this.overlay.fadeOuttime = this.options.fadeOutTime,
            "undefined" != typeof this.element && this.overlay.init()
        },
        i.prototype.createPreloader = function() {
            "use strict";
            this.preloader = new s(this),
            this.preloader.deepSearch = this.options.deepSearch,
            window.setTimeout(function() {
                this.preloader.findAndPreload(this.element)
            }.bind(this), 100)
        },
        i.prototype.updateProgress = function(t, e) {
            "use strict";
            this.overlay.updateProgress(t / e * 100, this.options.minimumTime),
            t === e && this.done === !1 && (window.clearTimeout(this.maxTimeout), window.setTimeout(this.doneLoading.bind(this), this.options.minimumTime))
        },
        i.prototype.doneLoading = function() {
            "use strict";
            window.clearTimeout(this.maxTimeout),
            this.done = !0,
            this.overlay.element.style.opacity = 0,
            window.setTimeout(this.destroy.bind(this), this.options.fadeOutTime)
        },
        i.prototype.destroy = function() {
            "use strict";
            this.overlay.remove(),
            this.options.onComplete()
        },
        e.exports = i
    },
    {
        "./ImagePreloader/": 3,
        "./Overlay/": 6
    }],
    9 : [function(t, e) {
        t("./Polyfills/");
        var i = t("./QueryLoader.js"); (window.jQuery || window.Zepto) && !
        function(t) {
            "use strict";
            t.fn.queryLoader2 = function(t) {
                return this.each(function() {
                    new i(this, t)
                })
            }
        } (window.jQuery || window.Zepto),
        "undefined" != typeof e && (e.exports = i),
        "function" == typeof define && define.amd && define([],
        function() {
            "use strict";
            return i
        }),
        window.QueryLoader2 = i
    },
    {
        "./Polyfills/": 7,
        "./QueryLoader.js": 8
    }]
},
{},
[9]);