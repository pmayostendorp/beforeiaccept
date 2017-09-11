// ============================================================
// Onload initialize and event handling
// ============================================================


// Execute once DOM is ready
$(function(){
	
	// Target first word of a category and add a span 
	$('.subcat_nm a').each(function(index,element){
		var sCatName = $(this).text()
		var sFirstWord = $(this).text().split(' ')[0];
		var sCatName = '<span class="category-link">' + sFirstWord + '</span>' + sCatName.replace(sFirstWord, '');
		$(this).html(sCatName);
	});
	
/*	var sLinkClass = 0
	$('.subcat_item').each(function(index,element){
		if (sLinkClass == 4) {
			sLinkClass = 0
		}
		sLinkClass = sLinkClass + 1
		$(this).addClass('subcat_item' + sLinkClass);
	});*/
	
	$('.subcat_nm a').show()
	

	// Add submenu classes for dropdowns
	// ------------------------------------------------------------
	$('.dropdown-nested li ul')
		.addClass('dropdown-menu')
		.closest('li').addClass('dropdown-submenu');


	// Bootstrap hotfixes
	// ------------------------------------------------------------
	
	// Prevents drop down to be closed on click into `.dropdown-menu`.
	// github.com/mitnal/bootstrap/commit/29df6eaa230df3e1c9e5bcb4c86c75132ef32817
	$(document).on(
		'click.dropdown.data-api', 
		'.dropdown-menu', 
		function(e) { 
			e.stopPropagation() 
		});


	// Initialize plugins
	// ------------------------------------------------------------
	$('[rel="tooltip"], .tooltip-trigger').tooltip();
	$('[rel="popover"]').popover();
	$('input, textarea').placeholder();
	$('.carousel').carousel();


	// UI helpers
	// ------------------------------------------------------------
	
	// Remove modals from tabindex 
	// - enables close on ESC keypress for modal windows
	$('.modal').attr('tabindex', -1);

	// Apply class to prevent bkg scrolling when modal is open
	// - this is handled by bootstrap-modal now...
	// var $html = $('html')
	// 	.on('shown', '.modal', function(){
	// 		$html.addClass('modal-open');
	// 	})
	// 	.on('hidden', '.modal', function(){
	// 		$html.removeClass('modal-open');
	// 	});

	// Move progress bar for payment page order processing
	$('#order_processing_modal')
		.on('shown', function(){
			fncMoveProgressBar('#order_processing_bar');
		});

	// Move progress bar for sign in loading msg
	$('#login_progress_modal')
		.on('shown', function(){
			fncMoveProgressBar('#login_progress_bar');
		});

	// Kill the default behavior for cart builder qty update links
	$('#cartform a[onclick^="submitCart"]')
		.on('click', function(e){
			e.preventDefault();
		});

	// Assign all buttons that add to cart ...
	var addToCartButtons = '.prod_item .actions .btn.btn-small, \
		                      .detail_atc_standalone .btn-primary';

	// Add to cart button processing indicators
	$(addToCartButtons)
		.on('mousedown keydown touchstart', function(e){
			// only left mousedown
			if (e.which === 1) {
				$(this).append('<i class="icon-spinner icon-spin hide"></i>').fadeIn('fast');
			}
		});

	// Kill the button processing indicators once items have been
	// successfully added to the cart (by watching the modal)
	$('#atc_msg.modal')
		.on('show', function(e){
			$(addToCartButtons).children('i.icon-spinner').remove();
		});

	// Don't allow qty less than 1 for product detail standalone,
	// and search results grid view, and quick order form, and cart
	$('.detail_atc_standalone input.qtyinput, \
	  #gallery_layout input.qtyinput, \
	  #order_matrix input.qtyinput, \
	  .cart-table input.cart-input-qty')
		.on('keyup', function(){
			$(this).val() <= 0 ? $(this).val(1) : false
		});

	// Smooth scroll to
	$('.scroll, .scroll-to')
		.on('click', function(e) {
			e.preventDefault();
			var   target = this.hash,
			         pos = $(target).offset(),
			    scrollto = pos.top - 160;
			$('body, html').animate(
				{scrollTop: scrollto}, 
				300, 
				function(){ 
					$('body, html').clearQueue(); 
					$(target).trigger('focus');
				});
		});
	
	
	// Init tablesorter plugin for input-qty table (product detail)
	$('table.qty_input_table').tablesorter();
	
	
	// Fix links to named anchors when base href is used (static pages)
	if ($('base').length) {
		$('a[href^="#"]').each(function(){
			var href = window.location + $(this).attr('href').replace('/#.*/i','');
			$(this).attr('href', href);
		});
	}
	
	
	// ============================================================
	// Init select element replacement plugin (select2)
	// ============================================================
	
	// Address selector in bill-ship page
	// (this is handled in the bill-ship CFV now)
	// $('select#sha_key').select2({ width: 'copy' });


	// ============================================================
	// Fixes for IE
	// ============================================================
	//fncFixSelectOptionsIE('.lt-ie9 select.search-filter');


}); // $(function(){})


// ============================================================
// Execute once window has loaded (images and all)
// ============================================================
$(window).load(function(){

	// This fixes an issue with absolute-positioned related products
	// on the detail page when the height of that container
	// may be greater than the detail page container, therefore
	// causing the related products to cut off or overlay the
	// content below
	//fncEqualColumnHeights('#detail_related_prods', 60, '#detail_wrap', 0);

});



// ============================================================
// Functions
// ============================================================

// Use this as a generic way to simulate progressbar progress
var fncMoveProgressBar = function(target) {
	var progress = setInterval(function() {
		var $bar = $(target);
		if ($bar.width()==400) {
			clearInterval(progress);
			//$('.progress').removeClass('active');
		} else {
			$bar.width($bar.width()+30);
		}
	}, 100);
}

// Measure column heights and even them up
var fncEqualColumnHeights = function(selector1, offset1, selector2, offset2) {
	var height1 = $(selector1).outerHeight() + offset1,
	    height2 = $(selector2).outerHeight() + offset2,
	        max = Math.max(height1, height2);
	$(selector1).height(max);
	$(selector2).height(max+10);
}


// Select with fixed width cuts off options in IE 7-8
// http://css-tricks.com/select-cuts-off-options-in-ie-fix/
// ------------------------------------------------------------
var fncFixSelectOptionsIE = function(selector) {
	if (selector) {
		$(selector)
			.each(function() {
				$this = $(this);
				$this.data('origWidth', $this.outerWidth());
			})
			.on('mouseenter', function(){
				$(this).css('width', 'auto');
			})
			.on('blur change', function(){
				$this = $(this);
				$this.css('width', $this.data('origWidth'));
			});
	}

}
// fncFixSelectOptionsIE()
