function initCarouFredSel(cfg) {
    // check for carousels
    var carousels = $(cfg.selector),
        countCarousels = $(carousels).length,
        hasAlreadyBeenProcessed = countCarousels > 0 ? $(carousels).first().attr('data-widget-type') == 'carousel' : false,
        idSet = 1; /* append unique ID to each carousel if required */

    if (!hasAlreadyBeenProcessed && countCarousels > 0) {

        $(carousels).each(function() {
            var self = this,
                getID = $(this).attr('id'),
                countChildren = $(this).children('li:not(.add-plus-product)').length,
                /* making the number of visible items configurable */
                numVisibleItems = $(this).attr('data-visible-items') || cfg.numDisplay,
                width = getCarouselWidth(this, cfg);

            cfg.scroll.items = parseInt(numVisibleItems);

            $(this).attr('data-widget-type', 'carousel');

            if (cfg.incrementIds) {
                $(this).attr('id', (getID + '-' + idSet));
                idSet++;
            }

            // Match to num of display
            if (countChildren > cfg.numDisplay) {
                // generate next/prev buttons
                $(this).after(cfg.paginationButtons);
                if (cfg.breadcrumbContainer && cfg.pagination) {
                    // generate breadcrumb dots at the bottom of the carousel
                    $(this).after(cfg.breadcrumbContainer);
                }
            }

            $(this).parent().off('click').on('click', '.prev-item, .featured-prev-item', function() {
                $(self).trigger('prev');
            });

            $(this).parent().on('click', '.next-item, .featured-next-item', function() {
                $(self).trigger('next');
            });

            $(this).carouFredSel({
                align: cfg.alignItems,
                responsive: cfg.responsive,
                circular: cfg.circular,
                infinite: cfg.infinite,
                width: cfg.carouselWidth,
                height: cfg.carouselHeight,
                items: {visible: numVisibleItems, width: cfg.itemWidth, height: cfg.itemHeight},
                prev: cfg.prev,
                next: cfg.next,
                pagination: cfg.pagination,
                auto: cfg.auto,
                scroll: cfg.scroll
            });

        });
    }
}
/**
 * Carousels may reference a parent wrapper element whose true width
 * will be used to determine the carousel width. Add a 'data-wrapper-id'
 * OR 'data-wrapper-class' attribute to the UL carousel element to
 * target the parent wrapper element. If no wrapper element is defined,
 * the default width will be returned from the provided configuration
 * object.
 */
function getCarouselWidth(carousel, cfg) {
    var constrainingParentId = $(carousel).attr('data-wrapper-id'),
        constrainingParentClass = $(carousel).attr('data-wrapper-class'),
        constrainingParent;
    if (constrainingParentId) {
        constrainingParent = $(carousel).closest('#'+constrainingParentId);
    } else if (constrainingParentClass) {
        constrainingParent = $(carousel).closest('.'+constrainingParentClass);
    }
    if (constrainingParent) {
        return Math.floor($(constrainingParent).outerWidth());
    } else {
        return cfg.carouselWidth;
    }
}

$(document).ready(function() {


    bodyClass = $('body').attr('class'),
        carouFredSel_cfg_base = {
            incrementIds : true,
            carouselWidth : 736, /* carousel width. Single column pages 936, internal double column pages 736 */
            carouselHeight: 'auto',
            numDisplay : 5, /* define number of slides to show at once */
            itemWidth : 135, /* set width of carousel items */
            alignItems : 'left', /* set alignment of carousel items. Default is left. */
            prevButtonID : 'carousel-prev', /* do not use # on id's */
            nextButtonID : 'carousel-next', /* do not use # on id's */
            prev: {button: "#" + this.prevButtonID, key: "left"},
            next: {button: "#" + this.nextButtonID, key: "right"},
            paginationButtons : '<div class="prev-item carousel-prev" style="display:block;"><span style="display:none;">Prev</span></div>'+
                                '<div class="next-item carousel-next"><span style="display:none;">Next</span></div>',
            auto: false,
            scroll: {fx: 'scroll'},
            circular: true,
            infinite: true
        };

    if(typeof bodyClass == 'undefined')
        bodyClass='';

    // BOOK CAROUSEL
    if($('[id^=book-carousel]').length > 0 || $('[data-carousel-type^=book-carousel]').length > 0){
    //if($('[data-carousel-type^=book-carousel]').length > 0){
        $(function() {
            // Define defaults
            var cfg = $.extend({}, carouFredSel_cfg_base, {selector : '[id^=book-carousel]'});

            // page specific var overrides
            if (bodyClass.indexOf('noResults') > -1 || bodyClass.indexOf('pdpPage') > -1 || bodyClass.indexOf('homepage') > -1) {
                cfg.carouselWidth = 964;
                cfg.numDisplay = 6;
            }

            // for IE 9
            if (bodyClass.indexOf('pdpPage ie9') > -1) {
                cfg.carouselWidth = 964;
                cfg.numDisplay = 6;
            }

            // for IE 8
            if (bodyClass.indexOf('pdpPage lt-ie9') > -1) {
                cfg.carouselWidth = 964;
                cfg.numDisplay = 6;
                cfg.itemWidth = 148;
            }

            if (bodyClass.indexOf('shopping-bag') > -1 || bodyClass.indexOf('shopping-bag lt-ie9') > -1) {
                cfg.carouselWidth = 660;
                cfg.itemWidth = 145;
                if (bodyClass.indexOf('empty-cart') > -1) {
                     cfg.numDisplay = 6;
                } else {
                    cfg.numDisplay = 4;
                }
            }

            if (bodyClass.indexOf('shopping-bag') > -1 || bodyClass.indexOf('shopping-bag ie9') > -1) {
                cfg.carouselWidth = 660;
                cfg.itemWidth = 145;
                if (bodyClass.indexOf('empty-cart') > -1) {
                        cfg.numDisplay = 6;
                } else {
                    cfg.numDisplay = 4;
                }
            }

            initCarouFredSel(cfg);

            if($('[data-carousel-type^=book-carousel]').length > 0) {
                $('[data-carousel-type^=book-carousel]').each(function() {
                    var carouselId = $(this).attr('id'),
                        carouselUrl = '',
                         carouselContainer = $('#' + carouselId),
                         carouselData = carouselContainer.data(),
                         carouselSel = '#' + carouselId + ' ul',
                         config = $.extend({}, cfg, {selector : carouselSel});


                    switch (carouselId.toLowerCase()) {
                        case "recommendations":
                            carouselUrl = "/includes/bn-recommendation-content.jsp";
                            break;
                        case "recentlyviewed":
                            carouselUrl = "/includes/bn-recentlyviewed-content.jsp";
                            break;
                    }

                     getCarousel(carouselUrl, carouselContainer, carouselData, config);
                });

            }
        });
    }

    // VIDEO CAROUSEL
    if($('[id^=video-carousel]').length > 0){
        $(function() {
            // Define defaults
            var cfg = $.extend({}, carouFredSel_cfg_base, {
                selector : '[id^=video-carousel]',
                carouselWidth : 'auto',
                carouselHeight: 'auto',
                numDisplay : 3,
                itemWidth : 285
            });

            initCarouFredSel(cfg);
        });
    }

    // PDP thumbnail carousel script
    $(function() {
        var context = $('.PageContent');
        getThumbsCarousel(context);
    });

    // home page and landing page carousels
    if($('[id^=featuredItemList]').length > 0){
        $(function() {
            // Define defaults
            var cfg = $.extend({}, carouFredSel_cfg_base, {
                selector : '[id^=featuredItemList]',
                incrementIds : false,
                carouselWidth : 936,
                numDisplay : 1,
                itemWidth : 'auto',
                itemHeight : 'auto',
                prevButtonID : 'carousel-prev',
                nextButtonID : 'carousel-next',
                prev: '.featured-prev-item',
                next: '.featured-next-item',
                paginationButtons : '<div id="carousel-pagination" class="featured-item-pagination"></div>'+
                                    '<div class="featured-prev-item" style="display:block;" id="carousel-prev"><span style="display:none;">Prev</span></div>'+
                                    '<div class="featured-next-item" id="carousel-next"><span style="display:none;">Next</span></div>',
                breadcrumbContainer : '<div id="carousel-pagination" class="featured-item-pagination"></div>',
                pagination : {
                    container : '#carousel-pagination',
                    anchorBuilder : function(nr) {
                        return ' <span data-icon="carousel-pager-off">'+nr+'</span>';
                    }
                },
                auto : {play: true, timeoutDuration: 6000},
                scroll: {
                    pauseOnHover: true
                }
            });

            // page specific var overrides
            if (bodyClass.indexOf('landingPage') > -1) {
                cfg.carouselWidth = 736;
            }
            if (bodyClass.indexOf('homepage') > -1) {
                cfg.carouselWidth = 635;
                cfg.prevButtonID = '';
                cfg.nextButtonID = '';
                cfg.prev = '';
                cfg.next = '';
            }
            if (bodyClass.indexOf('membership-landing') > -1) {
                cfg.carouselWidth = 730;
            }

        initCarouFredSel(cfg);
       });
    }

    initPromoCarousel();
});

function initPromoCarousel() {
    // UTILITY NAV PROMO CAROUSEL
    if($('[id^=upsellPromo]').length > 0){
        $(function() {

            // Define defaults
            var cfg = $.extend({}, carouFredSel_cfg_base, {
                selector : '[id^=upsellPromo]',
                alignItems : 'center',
                incrementIds : false,
                carouselWidth : 300,
                carouselHeight: 20,
                pauseOnHover: true,
                auto: {
                    play: true,
                    timeoutDuration: 5000
                },
                scroll: {
                    fx: 'fade',
                    easing: 'linear',
                    duration: 2000
                },
                numDisplay : 1,
                prevButtonID : '', /* do not use # on id's */
                nextButtonID : '', /* do not use # on id's */
                prev: '',
                next: '',
                paginationButtons : ''
            });
            initCarouFredSel(cfg);
        });
    }
}

$(window).load(function() {
    // check for carousels
    var countCarousels = $('[id^=book-carousel]').length;

    if (countCarousels > 0) {
        $('div.hidden').each(function() { // fix for a caroufredsel bug that incorrectly hides next/prev buttons
            $(this).attr('style','display:block;').removeClass('hidden');
        });
    }

    var countCarousels = $('[id^=video-carousel]').length;

    if (countCarousels > 0) {
        $('[id^=video-carousel]').each(function() { // fix for a caroufredsel bug that incorrectly sets width
            $(this).parent().width('100%');
        });
   }
});