define(["jquery","underscore","baseview","pubsub"],function(t,e,a,i){"use strict";var n=a.extend({events:{"click .js-mycapture-btn":"mycaptureBtnClick"},initialize:function(t){a.prototype.initialize.call(this,t)},mycaptureBtnClick:function(e){e.preventDefault(),i.trigger("uotrack","mycapturepurchase");var a=t(e.currentTarget.parentElement).parent(),n=location.host.split(".").slice(-2)[0],r=".mycapture.com/mycapture/remoteimage.asp?",c=a.parent().find("img").attr("data-mycapture-src"),p={image:c,caption:t.trim(a.find(".js-caption").text()),credit:t.trim(a.find(".credit").text()),backtext:"Back to Site",backurl:location.href},o="http://"+n+r+t.param(p);window.open(o,"mycapture")},switchMyCaptureBtn:function(t){var e=t.$(".single-photo"),a=e.find(".js-mycapture-btn-small"),i=e.find(".js-mycapture-btn"),n=t.$(".js-caption-wrapper");e.hasClass("expandable-collapsed")?(a.hide(),i.show(),n.addClass("expandable-photo-caption-with-mycapture")):(i.hide(),a.show(),n.removeClass("expandable-photo-caption-with-mycapture"))},toggleSmallTag:function(t){this.$(".mycapture-small-btn").toggle(t)}});return n});
//# sourceMappingURL=myCapture.js
//# sourceMappingURL=myCapture.js.map