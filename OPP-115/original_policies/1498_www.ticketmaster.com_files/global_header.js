(function($,w){
  try{

   var intSearch = $("#topSearch");
   $("#site-search").css({"visibility":"visible"});
   var TMsearchToggle_tt_vars = $.parseJSON(TM.global_header.TM_SEARCH_TOGGLE);
   if(TMsearchToggle_tt_vars.anchored_tab_enabled == 0 || rebranding) {
        
        $('#site-search').find('#search-wrap > input')
            .live('focus', function() {
                  if($(this).val() === search_text) {
                    $(this).val("");
                  }
                  $(this).animate({ width: 360});
              })
            .live('blur', function() {
                 if($(this).val() === "") {
                   $(this).val(search_text);
                 }
                var that = this;
                var delayMin = setTimeout(function() { 
                   if(!$('#search-suggest').length || ($('#search-suggest').length && $('#search-suggest').not(':visible'))){
                           if($('#search-suggest').length && $('#search-suggest').not(':hidden')){
                               $('#search-suggest').hide();
                           }
                           $(that).animate({ width: 232});
                     }
               }, 350);
          });

   } else {

       var TMsearchToggle = {
                 dataVals:{
                       msActive: false,
                    sha_offset : $('#site-header-anchor').offset().top,
                    anchorSite : $('#site-header-anchor'),
                   leaderBoard : $('#leaderBoard'),
                lb_outerHeight : 0,
                    tmLinksArr : $.merge($('#site-header-anchor').find('li > a'),[$("#search_form input[name~=tm_link]")]),
                      ssDelta  : $('#site-search').offset().top + 5,
                    actionDivs : {
                                  mini : {name: $('#mini-search'),min: 170, max: (isSuperNav)? 280: 300},
                                  main : {name: $('#site-search'),min: 232, max: 360}
                                 },
                    anchorSite : $('#site-header-anchor'),
               anchorLinksOmni : $('[data-omniExternalTrack]','#site-header-anchor') || {}
                  },
                  startListening: function(){
                    var dV = this.dataVals; 
                        dV.anchorSite.removeClass("on-scroll");
                        dV.anchorSite.show();
                         $.each(this.dataVals.anchorLinksOmni, function(){
                             if(!$(this).hasClass("super-nav-tab")){
                                 $(this).click(function(){
                                 var extOmniVal = TMsearchToggle_tt_vars.omn_domain_owner + ' ' + $(this).data('omniexternaltrack');
                                 tm_omn.linkTrackVars='prop14,eVar14,events';
                                     tm_omn.linkTrackEvents='event27';
                                     tm_omn.prop14 = extOmniVal;
                                     tm_omn.eVar14 = extOmniVal;
                                     tm_omn.tl(true, 'o', 'Navigation Link');
                                 });
                             }
                         });
                         
                         if(isSuperNav){
                             $.each($("#site-header-anchor  a.super-nav-tab.external-link"), function(){
                                  $(this).click(function(){
                                      var extOmniVal = TMsearchToggle_tt_vars.omn_domain_owner + ' ' + $(this).attr("data-omn");
                                      tm_omn.linkTrackVars='prop14,eVar14';
                                      tm_omn.prop14= extOmniVal;
                                      tm_omn.eVar14 = extOmniVal;
                                      tm_omn.tl(this,'o','Tab Supernav');
                                      tm_omn.linkTrackVars='';
                                  });
                             });
                         }

                         $.each(this.dataVals.actionDivs,function(i){
                             var self = this;
                             this.name.find('#search-wrap > input').live('focus',function(){
                                 if($(this).val() === search_text) {
                                    $(this).val("");
                                  }
                                 $(this).animate({ width: self.max});
                              }).live('blur',function(){
                                 if($(this).val() === "") {
                                   $(this).val(search_text);
                                 }
                                  var that = this;
                                  var delayMin = setTimeout(function(){ 
                                     if(!$('#search-suggest').length || ($('#search-suggest').length && $('#search-suggest').not(':visible'))){
                                       if($('#search-suggest').length && $('#search-suggest').not(':hidden')){
                                           $('#search-suggest').hide();
                                       }
                                       $(that).animate({ width: self.min});
                                     }
                                    }, 350)
                              });
                         });
                  },
                  leaderBoard: function(){
                  var dV = this.dataVals;
                     if(dV.leaderBoard.length){
                         if(dV.leaderBoard.height() < 30){
                             dV.sha_offset = 0;
                             dV.anchorSite.addClass('on-scroll');
                         }else{
                            this.dataVals.lb_outerHeight = dV.leaderBoard.height();
                            dV.anchorSite.removeClass("on-scroll").show();
                         }
                     }else{
                        dV.anchorSite.addClass('on-scroll');
                    }
                   var self = this;
                   var forcedHiddenAnchor = $('#site-header-anchor.hide').length;
                   if (forcedHiddenAnchor !== 1) {
                     $(window).bind('scroll.miniSearch',function(){
                         self.checkScrollforSearch();
                     });
                   }
                  },
                  reorganizeDisplay: function(disp){
                      var actionItem = this.dataVals.actionDivs[disp];
                      if( isSuperNav && disp == 'main' && intSearch[0]){
                        intSearch.insertAfter("#topSearchPreffix");
                      }
                      if(!$.isEmptyObject(search_suggest) && $.isFunction(search_suggest.reset())){
                        search_suggest.reset();
                      }
                      if(isSuperNav){
                          if(disp == "mini"){
                              if(intSearch[0]){
                                if(!jQuery("#search_input").hasClass("placeholder")){  
                                  var searchValue = jQuery("#search_input").val();
                                }
                                intSearch.remove();
                              }
                              actionItem.name.append(topNavSearchBlock); 

                              if(searchValue && searchValue !== TM.global_header.TU.searchPlaceholder){
                                topNavSearchBlock.find(".search-textfield").removeClass("placeholder").val(searchValue);
                              } else {
                                topNavSearchBlock.find(".search-textfield").addClass("placeholder").val(TM.global_header.TU.searchPlaceholder);
                              }
                          } else {
                              if(!topNavSearchBlock.find(".search-textfield").hasClass("placeholder")){
                                var searchValue = topNavSearchBlock.find(".search-textfield").val();
                              }
                              topNavSearchBlock.remove();
                              
                              if(searchValue && searchValue !== TM.global_header.TU.searchPlaceholder){
                                jQuery("#search_input").val(searchValue).css("color","rgb(51, 51, 51)");
                              } else {
                                jQuery("#search_input").val(TM.global_header.TU.searchPlaceholder).css("color", "rgb(137,137,137)");
                              }
                          }
                      } else {
                          actionItem.name.append(topNavSearchBlock);
                      }
                      $('#mini-search,#mini-search-button,#site-nav-anchor-secondary,#search').toggle();
                      if( isSuperNav && disp == 'main' && intSearch && intSearch[0] ) {
                          $("#search").show();
                      }
                      actionItem.name.find('#search-wrap > input').css('width',actionItem.min);
                      if(disp === 'main'){
                          $("#search-suggest").removeClass("fixed");
                      } else {
                          $("#search-suggest").addClass("fixed");
                      }
                  },
                  omniAnchorToggle: function(){
                      var dV = this.dataVals; that = this;
                      addAnchor = function(sel){
                         return $(this).attr(sel).replace(/^((.)*[tm mch]_link=)?(tm_)(homeA_)?/, "$&anchor_");
                      };

                      removeAnchor = function(sel){
                         return $(this).attr(sel).replace("_anchor_", "_");
                      };


                      $.each(dV.tmLinksArr, function(){

                          var that = this;

                          if( isSuperNav && $(that).hasClass("super-nav-tab") ){

                              
                              var $that = $(that);
                              var trackingAttribute;
                              if($that.hasClass("external-link")){
                                  trackingAttribute = "data-omn";
                              } else if($that.hasClass("internal-link")){
                                  trackingAttribute = "href";
                              }

                              if(trackingAttribute){
                                  if(dV.msActive){
                                    $that.attr(trackingAttribute, $that.attr(trackingAttribute).replace(/_supernav/, "_anchor_supernav"));
                                  } else {
                                    $that.attr(trackingAttribute, $that.attr(trackingAttribute).replace(/_anchor_supernav/, "_supernav"));
                                  }

                                  return;
                              }

                          }
                          var attrSelector = $.map(['href','data-omniExternalTrack','value'],function(val){
                              if($(that).attr(val)){
                                  return val;
                              }
                          });

                          $.each(attrSelector, function(i,sel){ 
                              $(that).attr(sel,function(){
                                  return dV.msActive ?
                                      addAnchor.call(that,sel) :
                                      removeAnchor.call(that,sel);     
                              });
                          });
                      });
                  },
                  checkScrollforSearch: function(){
                      var dV = this.dataVals
                         ,st = $(window).scrollTop()
                         ,sha = dV.anchorSite.offset().top
                         ,ssDelta = dV.lb_outerHeight + dV.ssDelta;

                            if((st === sha) && (st > ssDelta) && !dV.msActive){
                                 dV.msActive = true;
                                 this.reorganizeDisplay('mini');
                                 this.omniAnchorToggle();
                             }else if ((st <= ssDelta) && (sha <= ssDelta) && dV.msActive){
                                 dV.msActive = false;
                                 this.reorganizeDisplay('main');
                                 this.omniAnchorToggle();
                             };

                             if(dV.lb_outerHeight >= st){
                                  dV.anchorSite.removeClass("on-scroll");
                             }else if(dV.lb_outerHeight < st){
                                  dV.anchorSite.addClass("on-scroll");
                             };
                  },
                  ie_fix: function(){
                    if($("body").width() > 1024) {
                        $(".require_ie_fix").each(function() {
                             $(this).addClass("ie_fix");
                        });
                    } else {
                        $(".require_ie_fix").each(function() {
                            $(this).removeClass("ie_fix");
                        });
                    }
                  },init: function(data){
                      $.extend(this.dataVals, data);
                      this.leaderBoard();
                      this.startListening();
                  }
            };
            
        setTimeout(function(){TMsearchToggle.init({})},0) ;
        
        if(navigator.appVersion.match(/MSIE\s+(?:7|8)\./)) { 
            $(document).ready(function($) {
                 var resizeTimer = null;
                 TMsearchToggle.ie_fix();
                 $(window).resize(function() {
                     if (typeof(resizeTimer) != null) {
                        clearTimeout(resizeTimer); // Clearing old timer to avoid unwanted resize calls.
                     }
                     resizeTimer = setTimeout(function() {
                          TMsearchToggle.ie_fix();
                     }, 200);
                });
            });
        }

     if (window[ 'writeCapture' ]) {
         $(window).load(function () {
            var count = 0;
            var leaderBoard = $('#leaderBoard');
            var showLeaderBoard = function() {
               count++;
               if(leaderBoard.length && (leaderBoard.height() > 30)){
                    TMsearchToggle.leaderBoard();
                    jQuery('#spotlight_wrapper').css('position', 'relative');
                    stopInterval();
               } else if (count == 10) {
                    stopInterval();
               }
            };
            var intervalLB = setInterval(showLeaderBoard, 100);
            var stopInterval = function() {
                clearInterval(intervalLB);
            };
         });
      }

    }
  } catch(err) {
      // Leave an empty catch to not interrupt the script flow
  }

  var wcmSortLink = function(arr) {
    var comparator = function(a, b) {
      var aVal, bVal;
      if (a.a && b.a && a.a.length && b.a.length) {
        aVal = a.a[0];
        bVal = b.a[0];
        if (aVal.pee == bVal.pee) {
          return aVal.tx > bVal.tx ?  1 :
                 aVal.tx < bVal.tx ? -1 : 0;
        }
        else if (aVal.pee > bVal.pee) {
          return 1;
        }
        else if (aVal.pee < bVal.pee) {
          return -1;
        }
        return 0;
      }
    };
    var newArr = [];
    var unsorted = [];
    var noSortArr = [];
    for (var i=0; i<arr.length; i++) {
      if (arr[i].a.length && arr[i].a[0].pee) {
        newArr.push(arr[i]);
      } else {
        noSortArr.push(arr[i]);
      }
    }
    newArr.sort(comparator);
    newArr.concat(noSortArr);
    return newArr;
  };

  var populate = function (url, fixer) {
    $.getJSON(url, function callback(data) {
      var i = j = 0;
      var o;

      if (fixer && (typeof fixer === 'function')) {
        fixer(data);
      }

      if (data && data.i && data.i.length) {
        wcmSortLink(data.i);

        for (i=0; i<data.i.length; i++) {
          o = data.i[i];

          if (o.a && o.a.length) {
            switch (o.a[0].ac) {
              case 'add_element':
                customLink(o);
                break;
              case 'replace_element':
                promoUnit(o);
                break;
            }
          }
        }
      }
    });
  };
  /**
   * @param {Object} data
   * @param {jQuery} wrapper
   * @param {String} maniFunc defaults to append()
   */
  var build = function(data, wrapper, maniFunc) {
    maniFunc = maniFunc || 'append';
    var i, o;
    var curEl, prevEl;
    var mainParent = [];
    var validTypes = ['a','img'];
    var isSelector = /^#/;
    var queue = [];

    if (!wrapper || wrapper.length == 0) {
      return;
    }

    for (i=0; i<data.a.length; i++) {
      o = data.a[i];
      curEl = undefined;

      if (validTypes.indexOf(o.tp) !== -1) {
        if (o.tp === 'img' && typeof TM !== 'undefined' && o.at.src) {
          o.at.src = TM.config.media_server + o.at.src;
        }

        curEl = $('<'+o.tp+'>').attr(o.at || {});

        // 1. substitute image with correct path
        // 2. fix url tracking when on homepage

        curEl.text(o.tx);

        if (i==0) {
          mainParent = $(o.pt);
          queue.push({
            pt: wrapper,
            el: curEl
          });
        } else {
          if (isSelector.test(o.pt)) {
            // queue for DOM pending
            queue.push({ pt: $(o.pt), el: curEl });
          }
          else if (prevEl) {
            // default pending behaviour is using
            // previous element as parent
            switch (o.pt) {
              case 'prev':
                queue.push({ pt: prevEl, el: curEl });
                break;
              case 'wrapper':
                queue.push({ pt: wrapper, el: curEl });
                break;
              default:
                break;
            }
          }
        }

        prevEl = curEl;
      }
    }

    for (i=0; i<queue.length; i++) {
      queue[i].pt.append(queue[i].el);
    }

    if (mainParent.length && wrapper.length) {
      mainParent[maniFunc](wrapper);
    }
  };

  var promoUnit = function(data) {
    build(data, $('<li class="tmcm-content"></li>'), 'prepend');
    return;
  };

  var customLink = function(data) {
    build(data, $('<li role="menuitem" class="tmcm-content"></li>'));
    return;
  };

  w.tmcm = {
    populate: populate,
    build: build
  };
}(jQuery, window));
