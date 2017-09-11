window.TOUT = window.TOUT || {};
window.TOUT.data=window.TOUT.data||{};TOUT.data.tracker_experiment={"tracker_iframe_url":"http://platform.tout.com//tracker.html?external_article_id=&og_url=http%3A%2F%2Fwww.fredericknewspost.com%2Fsite%2Fprivacy.html&brand_uid=582503&sdk_version=161&content_referrer=http%3A%2F%2Fwww.fredericknewspost.com%2F","disable_analytics":false,"name":"default","variation":"default"};

(function($){

  $(function() {
    var experimentData = TOUT.data.tracker_experiment;

    var getEmbedCode = function(iframeUrl){
      // we have to give the iframe a random id because of this bug:
      //  https://code.google.com/p/chromium/issues/detail?id=324102
      //  NOTE: I tried using the setTimeout(0) solution recommended in the bug report, but that didn't work
      var randomNumber = Math.floor((Math.random() * 9999999) + 1),
              timeStamp = (new Date()).getTime(),
              embedCodeId = "tout_tracker" + randomNumber + "_" + timeStamp;

      return '<iframe class="tout-tracker" id="' + embedCodeId + '" frameborder="0" height="0" width="0" scrolling="no" style="display: none;" src="' + iframeUrl + '"></iframe>';
    };

    if(experimentData.tracker_iframe_url){
      var $el = $("body");
      var embedCode = getEmbedCode(experimentData.tracker_iframe_url);
      $el.append(embedCode);
    }
  });

})($ || jQuery);
