window.TOUT = window.TOUT || {};
window.TOUT.data=window.TOUT.data||{};TOUT.data.embeds_experiment={"tout_uid":null,"match_status":null,"selector":"#blox-story-frame","dom_manipulation":"before","embed_iframe_url":"//www.tout.com/embed/touts/?product_name=top_article_embed&brand_uid=582503","single_page_app":false,"disable_analytics":false,"name":"e0016","variation":"article_top"};

(function($){
  //var etag_cache_buster = 120;

  $(function() {
    var embedsExperimentData = TOUT.data.embeds_experiment;

    var getToutEmbedCode = function(toutUid, width, height){
      // we have to give the iframe a random id because of this bug:
      //  https://code.google.com/p/chromium/issues/detail?id=324102
      //  NOTE: I tried using the setTimeout(0) solution recommended in the bug report, but that didn't work
      var randomNumber = Math.floor((Math.random() * 9999999) + 1),
        timeStamp = (new Date()).getTime(),
        embedCodeId = "tout_embed_" + randomNumber + "_" + timeStamp,
        embedUrl = embedsExperimentData.embed_iframe_url;

      return '<iframe width="' + width + '" height="' + height + '" frameborder="0" id="' + embedCodeId + '" src="' + embedUrl + '" style="margin-bottom:10px;"></iframe>';
    };

    var matchExists = false;

    if(embedsExperimentData.tout_uid && embedsExperimentData.selector && embedsExperimentData.dom_manipulation){
      var $el = $(embedsExperimentData.selector),
        elWidth = $el.width(),
        embedHeight = elWidth * 9 / 16,
        embedCode = getToutEmbedCode(embedsExperimentData.tout_uid, elWidth, embedHeight);

      if(embedsExperimentData.match_status !== "removed"){
        matchExists = true;

        if(embedsExperimentData.single_page_app){
          if(TOUT.config.get("autoRender")){
            // if dom_manipulation is 'prepend', this is $el.prepend(embedCode)
            $el[embedsExperimentData.dom_manipulation](embedCode);
          }

          var onTopArticleSuccess = TOUT.config.get("_onFetchTopArticleSuccess");

          if(typeof onTopArticleSuccess === "function"){
            onTopArticleSuccess({
              embed: {
                html: embedCode,
                width: elWidth,
                height: embedHeight,
                src: embedsExperimentData.embed_iframe_url
              },
              selector: embedsExperimentData.selector,
              dom_manipulation: embedsExperimentData.dom_manipulation
            });
          }
        } else {
          // if dom_manipulation is 'prepend', this is $el.prepend(embedCode)
          $el[embedsExperimentData.dom_manipulation](embedCode);
        }
      }
    }

    if(typeof TOUT.topArticleLoaded === "function"){
      TOUT.topArticleLoaded({matchExists: matchExists});
    }

    if(embedsExperimentData.single_page_app){
      if(!matchExists){
        var onTopArticleError = TOUT.config.get("_onFetchTopArticleError");
        if(typeof onTopArticleError === "function"){
          onTopArticleError({
            error: "No Top Article Match Exists"
          });
        }
      }
    }



  });

})($ || jQuery);
