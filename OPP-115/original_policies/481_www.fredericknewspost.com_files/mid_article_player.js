window.TOUT = window.TOUT || {};
window.TOUT.data=window.TOUT.data||{};TOUT.data.mid_article_player_experiment={"embed_iframe_url":"//www.tout.com/embed/touts/j5wiuc?product_name=mid_article_player&brand_uid=582503&muted=true&hover=unmute&volume=10","selector":".tout-mid-article","dom_manipulation":"html","single_page_app":false,"disable_analytics":false,"name":"e0029","variation":"mid_article"};

(function($){
  //var etag_cache_buster = 120;

  $(function() {
    var midArticleExperimentData = TOUT.data.mid_article_player_experiment;

    var getToutEmbedCode = function(iframeUrl, width, height){
      // we have to give the iframe a random id because of this bug:
      //  https://code.google.com/p/chromium/issues/detail?id=324102
      //  NOTE: I tried using the setTimeout(0) solution recommended in the bug report, but that didn't work
      var randomNumber = Math.floor((Math.random() * 9999999) + 1),
        timeStamp = (new Date()).getTime(),
        embedCodeId = "tout_embed_" + randomNumber + "_" + timeStamp;

      var iframeHtml = '<iframe class="tout-mid-article-iframe" width="' + width + 
        '" height="' + height + 
        '" frameborder="0" id="' + embedCodeId + 
        '" src="' + iframeUrl + 
        '" style="margin-bottom:10px;"></iframe>';

      var headingStyles = "background: #efefef !important; padding: .5em !important; border-top: 2px solid #666 !important; font-size: 16px !important; font-family: Arial !important; text-transform: uppercase !important; margin: 0 !important;",
        headingHtml = "<div style='"+headingStyles+"'>&#9658; Trending Video</div>";
      return headingHtml + iframeHtml;
    };

    if(midArticleExperimentData.selector && midArticleExperimentData.dom_manipulation){
      var $el             = $(midArticleExperimentData.selector),
          elWidth         = $el.width(),
          embedHeight     = elWidth * 9 / 16,
          domManipulation = midArticleExperimentData.dom_manipulation,
          embedIframeUrl  = midArticleExperimentData.embed_iframe_url,
          embedCode       = getToutEmbedCode(embedIframeUrl, elWidth, embedHeight);

      if(midArticleExperimentData.single_page_app){
        if(TOUT.config.get("autoRender")){
          // if dom_manipulation is 'prepend', this is $el.prepend(embedCode)
          $el[domManipulation](embedCode);

          var iframeEl = $(".tout-mid-article-iframe");
          if(iframeEl.length > 0){
            var injector = new TOUT.utils.ToutInjector({el: iframeEl, $: $});
            $(window).scroll(function(e){
              injector.onScroll(e);
            });
          }
        }
      } else {
        // if dom_manipulation is 'prepend', this is $el.prepend(embedCode)
        $el[domManipulation](embedCode);

        var iframeEl = $(".tout-mid-article-iframe");
        if(iframeEl.length > 0){
          var injector = new TOUT.utils.ToutInjector({el: iframeEl, $: $});
          $(window).scroll(function(e){
            injector.onScroll(e);
          });
        }
      }
    }

  });

})($ || jQuery);
