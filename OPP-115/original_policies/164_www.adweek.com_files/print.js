$(document).ready(function() {
  
    // note: bmargolis found this with confusing variable names.
    // here is a key to help figure out what a variable name might be:
    // PP - Print Popup
    // AT - AddThis
    // ttl - Title
    // shdl - Sub Headline

    var ATpb = $('.left-share-bar-wrapper .addthis_button_print');

        PPbtn = $('.left-share-bar-wrapper .print_popup'),
        PPmsk = $('#print-modal-mask'),
        PPmdl = $('#print-modal'),

        PPi = $('#print-modal .print-content'),
        PPb = $('#print-modal .print_popup_btn'),
        PPc = $('#print-modal .print_popup_close'),

        PPttl = $('#main .subheader .headline'),
        PPshdl = $('#main .subheader .subheadline'),
        PPbl = $('#main .byline'),
        PPdt = $('#main .meta li').eq(0),
        PPimg = $('#main .colsAB .graph, #main .colsAB .media, #main .colsarticle .graph'),
        PPcnt = $('#main .colsAB'),
        // PPcnt1 = $('#main .colsAB .google_elide'),
        PPcnt2 = $('#main .colsarticle'),

        PPcontent = $('#print-content'),

        PPcontentNG2 = $('#gallery-module #gallery-list'),
        PPcontentNG2ttl = $('#gallery-module .slide-title'),
        PPcontentNG2cnt = $('#gallery-module #gallery-list'),

        isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
        isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
        isIE11 = (parseInt($.browser.version) == 11) && /Trident/.test(navigator.userAgent);

        // console.log(PPcnt2_1);


    if (
      isChrome || jQuery.browser.mozilla || isSafari || isIE11
      || (jQuery.browser.msie && parseFloat(jQuery.browser.version) >= 9)
    ) {
        if ((PPcnt.data('print') == 'news_article')
            || (PPcnt2.data('print') == 'news_article')
            || (PPcnt.data('print') == 'blog_post')
            || (PPcnt.data('print') == 'video_item')
            || PPcontentNG2.length) {
            ATpb.hide();
            PPbtn.show();
        }
    }

    if(PPcontentNG2.length) {
        PPshdl.clone().appendTo(PPi);
        PPbl.clone().appendTo(PPi);
        PPdt.clone().appendTo(PPi).addClass('date');

        $.ajax({
            url: '/gallery-json/' + $('#gallery-module').data('id'),
            dataType: 'json',
            success: function(data) {
                $('<h2 class="slide-title">' + data.title + '</h2>').appendTo(PPi);
                if(!$.isEmptyObject(data.introImage)) {
                  $('<div class="gallery-item-image"><img src="' + data.introImage + '" alt="' + data.title + '""/></div>').appendTo(PPi);
                  $('<div class="credit-caption"><p class="caption">' + data.introCredit + '<span class="meta-credit">' + data.introCaption + '</span></p></div>').appendTo(PPi);
                }
                if (!$.isEmptyObject(data.introText)) {
                  $('<p>' + data.introText + '</p>').appendTo(PPi);
                }
                $.each(data.slides, function(k, v) {
                    $('<h2 class="slide-title">' + v.title + '</h2>').appendTo(PPi);
                    if(!$.isEmptyObject(v.imageCache)) {
                        $('<div class="gallery-item-image"><img src="' + v.imageCache + '" alt="' + v.title + '""/></div>').appendTo(PPi);
                        $('<div class="credit-caption"><p class="caption">' + v.credit + '<span class="meta-credit">' + v.caption + '</span></p></div>').appendTo(PPi);
                    }
                    $('<p>' + v.body + '</p>').appendTo(PPi);
                });
                if (!$.isEmptyObject(data.relatedGallery[0].relatedGalleryImage) || !$.isEmptyObject(data.relatedGallery[0].title_link))
                {
                  $('<h2 class="slide-title last">Related Gallery</h2>').appendTo(PPi);
                  if (!$.isEmptyObject(data.relatedGallery[0].relatedGalleryImage))
                  {
                    $('<div class="gallery-item-image">' + data.relatedGallery[0].relatedGalleryImage + '</div>').appendTo(PPi);
                  }
                  if (!$.isEmptyObject(data.relatedGallery[0].title_link))
                  {
                    $('<p>' + data.relatedGallery[0].title_link + '</p>').appendTo(PPi);
                  }
                }
            },
            error: function( req, status, err ) {
                // console.log( 'something went wrong', status, err );
            }
        });

    }


    PPmsk.appendTo($('body'));
    PPmdl.appendTo($('body'));

    window.printInit = false;

    PPbtn.click(function(e) {

        $('html,body').addClass('print');

        if(!window.printInit) {
            window.printInit = true;

            if(PPcontentNG2.length) {
                // PPshdl.clone().appendTo(PPi);
                // PPbl.clone().appendTo(PPi);
                // PPdt.clone().appendTo(PPi).addClass('date');

                // $.ajax({
                //     url: '/gallery-json/' + $('#gallery-module').data('id'),
                //     dataType: 'json',
                //     success: function(data) {
                //         $('<h2 class="slide-title">' + data.title + '</h2>').appendTo(PPi);
                //         $.each(data.slides, function(k, v) {
                //             $('<h2 class="slide-title">' + v.title + '</h2>').appendTo(PPi);
                //             if(!$.isEmptyObject(v.imageCache)) {
                //                 $('<div class="gallery-item-image"><img src="' + v.imageCache + '" alt="' + v.title + '""/></div>').appendTo(PPi);
                //                 $('<div class="credit-caption"><p class="caption">' + v.credit + '<span class="meta-credit">' + v.caption + '</span></p></div>').appendTo(PPi);
                //             }
                //             $('<p>' + v.body + '</p>').appendTo(PPi);
                //         });
                //         $('<h2 class="slide-title last">Related Gallery</h2>').appendTo(PPi);
                //         $('<div class="gallery-item-image">' + data.relatedGallery[0].relatedGalleryImage + '</div>').appendTo(PPi);
                //         $('<p>' + data.relatedGallery[0].title_link + '</p>').appendTo(PPi);
                //     },
                //     error: function( req, status, err ) {
                //         // console.log( 'something went wrong', status, err );
                //     }
                // });

            } else {

                PPttl.clone().appendTo(PPi);

                if((PPcnt.data('print') == 'news_article') || (PPcnt2.data('print') == 'news_article')
                     || (PPcnt.data('print') == 'video_item') || (PPcnt2.data('print') == 'video_item'))  {
                    PPshdl.clone().appendTo(PPi);
                    PPbl.clone().appendTo(PPi);
                    PPdt.clone().appendTo(PPi).addClass('date');
                }

                if(PPimg.length) {
                    PPimg.clone().appendTo(PPi);
                }

                if($('#main .colsarticle .mod-author').length) {
                    $('#main .colsarticle .mod-author').clone().appendTo(PPi);
                }

                PPcontent.appendTo(PPi);

                // fix: drop cap if there's an image before the first paragraph
                var $fp = PPcontent.find('p:first:has(img:first-child)');
                if ($fp.length) {
                    var $np = $fp.next('p');
                    $fp.addClass('first-image-child');
                    $np.addClass('first-text-child');
                }
            }
        }

        PPmsk.show();
        PPmdl.show();

        window.topPos = $(window).scrollTop();

        $('html,body').scrollTop(0).css('height', PPi.height());

        e.preventDefault();
    })

    PPb.click(function(e) {
        // window.topPos = $(window).scrollTop();
        $('html,body').scrollTop(0).css('height', PPi.height());
        window.print();
        $('html,body').css('height', 'auto');
        e.preventDefault();
    })

    PPc.click(function(e) {
        $('html,body').scrollTop(window.topPos).removeClass('print');
        PPmsk.hide();
        PPmdl.hide();
        e.preventDefault();
    })

});

// Close print modal on Esc key
$(document).keyup(function(e) {

    if (e.keyCode == 27 && $('body').hasClass('print')) {
        $('html,body').scrollTop(window.topPos);
        $('#print-modal .print_popup_close').click();
    }

});
