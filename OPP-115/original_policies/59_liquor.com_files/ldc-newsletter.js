jQuery(document).ready(function() {

	window.bindNewsletterSubmit();

	jQuery( '#newsletter-capture' ).on( "click", function() {
		var email_entered = jQuery( '#bottom-newsletter-email' ).val();
		jQuery( '#newsletter_email_entered' ).attr( 'value', email_entered );
	});

	jQuery( '#sidebar-newsletter-capture' ).on( "click", function() {
		var email_entered = jQuery( '#sidebar-newsletter-email' ).val();
		jQuery( '#newsletter_email_entered' ).attr( 'value', email_entered );
	});

	jQuery( '#modal-newsletter-capture' ).on( "click", function() {
		var email_entered = jQuery( '#modal_email_entered' ).val();
		jQuery( '#newsletter_email_entered' ).attr( 'value', email_entered );
	});

	// unbind previous submit event first to prevent duplicate binding
	jQuery('form.newsletter-signup').unbind('submit');

	// re-enable any disabled submit buttons
	jQuery('form.newsletter-signup input[type=submit]').removeAttr('disabled');

	jQuery('form.newsletter-signup').each( 
		function ( index ) {
			var form_instance = this; // Allows passing a reference to the current form into the ajaxForm block.
			jQuery( this ).ajaxForm( {
				beforeSubmit: function () {
					// Validate input.
					var valid = true;
					var valid_email_regx = /^([A-Za-z0-9_\-\.\+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
					var email_address = $('input[name=email]', form_instance).val();
					var tos_agreement_is_checked = jQuery('input[name=agree]', form_instance).is( ':checked' );

					if ( !tos_agreement_is_checked ) {
						showError('You must agree to the terms and conditions', 'input[name=agree]', form_instance);
						valid = false;
					}
					if (email_address.trim() == '') {
						showError('Please enter your email address', 'input[name=email]', form_instance);
						valid = false;
					} else if (!valid_email_regx.test(email_address)) {
						showError('Please enter a valid email address', 'input[name=email]', form_instance);
						valid = false;
					}

					return valid;
				},

				success: function (result) {
					var tracking_source = $('input[name=form_source]', form_instance).val();
					ga('send','event', 'Join', 'Newsletter', tracking_source);
					console.log(tracking_source);
					display_traditional_step2_modal();	
				},
				error: function ( result ) {
					response = $.parseJSON(result.responseText);
					if ( response.field_errors['username'] ) {
						showError('You must agree to the terms and conditions', 'input[name=agree]', form_instance);
					}

					if ( response.field_errors['email'] ) {
						showError('Please enter a valid email address', 'input[name=email]', form_instance);
					}
				}
			} );
		} 
	);


	// Bind the "signup_confirm_form", the modal that constitutes the second step of the
	// "traditional" onboarding flow. Runs in an anonymous function to limit variable 
	// scope.
	( function () {
		var confirm_form_instance = jQuery( '#signup_confirm_form' );
		confirm_form_instance.ajaxForm( {
			beforeSubmit: function () {},
			xhrFields: {
				withCredentials: true
			},
			success: function ( result ) {
				if ( 'success' == result.status ) {
					/**
					* LDC-1197 Install Facebook Conversion Pixel on /join page confirmation page and signup page
					* A cookie is set when a new user is created from newsletter signup to indicate the loading of Facebook Conversion pixel on next reload
					* @author George Moh <moh@liquor.com>
					*/
					$.cookie( 'facebook_conversion_pixel_shown', 0, { expires : 1, path : '/' });
					location.reload();
				}
			},
			error: function ( result ) {
				response = $.parseJSON(result.responseText);
				if ( response.field_errors['username'] ) {
					showError( response.field_errors['username'], 'input[name=username]', confirm_form_instance );
				}

				if ( response.field_errors['password'] ) {
					showError(response.field_errors['password'], '#signup_confirm_form_password', confirm_form_instance);
				}

				if ( response.field_errors['month'] || response.field_errors['day'] || response.field_errors['year'] ) {
					showError( 'Please enter a valid date. (Remember, you must be at least 21 to join Liquor.com.)', '#signup_confirm_form_birthdate_month', confirm_form_instance );
				}
			}
		} )
	} )();
/*
	// Binds submit request to the modal dialog that is the second step of the traditional onboarding process.
	jQuery( "#ldc_signup_confirm_form").bind("submit", function() {

		var email = jQuery('#newsletter_email_entered').val();
	
		if ( jQuery( "#ldc_hd_na" ).is( ':checked' ) ) {
			var na = jQuery("#ldc_hd_na").val();
		} else {
			var na = "";
		}
	
		if(jQuery("#ldc_hd_ch").is(':checked')) {
			var ch = jQuery("#ldc_hd_ch").val();
		} else {
			var ch = "";
		}
	
		if(jQuery("#ldc_hd_la").is(':checked')) {
			var la = jQuery("#ldc_hd_la").val();
		} else {
			var la = "";
		}
	
		if(jQuery("#ldc_hd_ny").is(':checked')) {
			var ny = jQuery("#ldc_hd_ny").val();
		} else {
			var ny = "";
		}
	
		if( jQuery("#ldc_hd_sf").is(':checked') ) {
			var sf = jQuery("#ldc_hd_sf").val();
		} else {
			var sf= "";
		}
	
		var username = jQuery("#ldc_hd_confirm_username").val();
		var password = jQuery("#ldc_hd_confirm_password").val();
		var password2 = jQuery("#ldc_hd_confirm_password2").val();
		var birthday = jQuery("#ldc_hd_confirm_birth_day").val();
		var birthmonth = jQuery("#ldc_hd_confirm_birth_month").val();
		var birthyear = jQuery("#ldc_hd_confirm_birth_year").val();
	
		var gender = jQuery("#ldc_hd_confirm_gender").val();
		var bartender = jQuery("#ldc_hd_confirm_bartender").val();
	
		if(jQuery("#ldc_hd_confirm_bourbon").is(':checked')) {
			var bourbon = jQuery("#ldc_hd_confirm_bourbon").val();
		} else {
			var bourbon = "";
		}
	
		if(jQuery("#ldc_hd_confirm_cognac").is(':checked')) {
			var cognac = jQuery("#ldc_hd_confirm_cognac").val();
		} else {
			var cognac = "";
		}
	
		if(jQuery("#ldc_hd_confirm_gin").is(':checked')) {
			var gin = jQuery("#ldc_hd_confirm_gin").val();
		} else {
			var gin = "";
		}
	
		if(jQuery("#ldc_hd_confirm_rum").is(':checked')) {
			var rum = jQuery("#ldc_hd_confirm_rum").val();
		} else {
			var rum = "";
		}
	
		if(jQuery("#ldc_hd_confirm_scotch").is(':checked')) {
			var scotch = jQuery("#ldc_hd_confirm_scotch").val();
		} else {
			var scotch = "";
		}
	
		if(jQuery("#ldc_hd_confirm_tequila").is(':checked')) {
			var tequila = jQuery("#ldc_hd_confirm_tequila").val();
		} else {
			var tequila= "";
		}
	
		if(jQuery("#ldc_hd_confirm_vodka").is(':checked')) {
			var vodka = jQuery("#ldc_hd_confirm_vodka").val();
		} else {
			var vodka = "";
		}
	
		if(jQuery("#ldc_hd_confirm_irish_whiskey").is(':checked')) {
			var irish_whiskey = jQuery("#ldc_hd_confirm_irish_whiskey").val();
		} else {
			var irish_whiskey = "";
		}
	
		var other_like = jQuery("#ldc_hd_confirm_other").val();
	
		jQuery.fancybox.showLoading();
	

		jQuery.ajax({
			type		: "POST",
			cache		: false,
			url			: ldc_header_login_signup.ajaxurl,
			data		: 'action=header_confirm_subscribe_ajax_call&na='+na+'&ch='+ch+'&la='+la+'&ny='+ny+'&sf='+sf+'&username='+username+'&password='+password+'&password2='+password2+'&birthday='+birthday+'&birthmonth='+birthmonth+'&birthyear='+birthyear+'&gender='+gender+'&bartender='+bartender+'&bourbon='+bourbon+'&cognac='+cognac+'&gin='+gin+'&rum='+rum+'&scotch='+scotch+'&tequila='+tequila+'&vodka='+vodka+'&email='+email+'&irish_whiskey='+irish_whiskey+'&other='+other_like,
			success: function(data) {
				if( data == 1	) { //exito
					window.location.reload(true);
				} else {
					jQuery("#ldc_hd_signup_confirm_error_word").html(data);
					jQuery("#ldc_hd_signup_confirm_error").show();
					jQuery.fancybox.update();
					jQuery.fancybox.hideLoading();
				}
	
			}
		}); 
		return false;
	});
	*/
});

// Show a modal with a form that creates a WordPress account and captures demographic info and base spirit preferences.
function display_traditional_step2_modal () {
	jQuery('<a href="#ldc_hd_signup_confirm_popup" id="this_is_test"></a>').fancybox({
		padding: 0,
		margin: 0,
		afterClose: function() {
			// Reset form values.
			jQuery("#signup_confirm_form_ed_na").removeAttr("checked");
			jQuery("#signup_confirm_form_ed_chi").removeAttr("checked");
			jQuery("#signup_confirm_form_ed_la").removeAttr("checked");
			jQuery("#signup_confirm_form_ed_ny").removeAttr("checked");
			jQuery("#signup_confirm_form_ed_sf").removeAttr("checked");
			jQuery("#signup_confirm_form_username").val('');
			jQuery("#signup_confirm_form_password").val('');
			jQuery("#signup_confirm_form_password2").val('');
			jQuery("#signup_confirm_form_birthdate_day").val('');
			jQuery("#signup_confirm_form_birthdate_month").val('');
			jQuery("#signup_confirm_form_birthdate_year").val('');
			jQuery("#signup_confirm_form_spirit_bourbon").removeAttr("checked");
			jQuery("#signup_confirm_form_spirit_cognac").removeAttr("checked");
			jQuery("#signup_confirm_form_spirit_gin").removeAttr("checked");
			jQuery("#signup_confirm_form_spirit_rum").removeAttr("checked");
			jQuery("#signup_confirm_form_spirit_scotch").removeAttr("checked");
			jQuery("#signup_confirm_form_spirit_tequila").removeAttr("checked");
			jQuery("#signup_confirm_form_spirit_vodka").removeAttr("checked");
			jQuery("#ldc_hd_signup_confirm_error").hide();
			//jQuery("#ldc_hd_na").attr("checked", true);
			//jQuery("#ldc_hd_"+defaultCity+"").attr("checked", true);

			// Unselect all radio buttons.
			jQuery('#signup_confirm_form input[type=radio]').each(function(){
      	jQuery(this).prop('checked',false);
  		});

		}
	}).click();
}




// A helper function that can be attached to an element to create a delay in behavior, 
// such as fading out an error message.
jQuery.fn.idle = function(time) {
	var o = jQuery(this);
	o.queue(function() {
		setTimeout(function() {
			o.dequeue();
		}, time);
	});
	return this;
}

//CONTENT FROM NEWSLETTER.JS
if (!window.ldc) window.ldc = {
	'newsletter': {},
	'tracking': {
		'ga': {},
		'adwords': {},
		'fb': {}
	}
};

/* Use jQuery.cookie plugin instead. DWC
//function to check cookie
function getCookie(c_name) {
	cookie_value = "";
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name) {
			cookie_value = unescape(y);
		}
	}
	return cookie_value;
}
*/

/*
// function for preparing and submitting the newsletter signup form
function submitSignupForm() {
	// Submit the form
	jQuery(window.nlForm)
	.append('<input type="hidden" name="ajaxSubmit" value="1" />')
	.ajaxSubmit({
		success: function(response) {
			jQuery.fancybox.hideLoading();
			jQuery('input[type=submit]', window.nlForm).removeAttr('disabled');

			// manage errors returned by the server
			if(response.indexOf('~') != -1) {
				// already subscribed in case of ED landing means we just bypass the confirmation screen
				// and go straight to the latest deal page
				if('SF' == window.ldc.edpage && response.indexOf('already subscribed') != -1) {
					document.location = '/sip-and-experience-sf/';
					return;
				}

				var parts = response.split('~');

				if( jQuery.trim(parts[0]) == 'ERROR' ) {
					showError(parts[1], 'input[name=email]', this);
					return;
				}
			}

			// handle special cases (like signup from the new ED landing page)
			if ( 'SF' == window.ldc.edpage ) {
				jQuery.fancybox.showLoading();
				jQuery('#ed-landing-body').load('?newsletter=signup&id='+response+'&type=ed', function() {
					jQuery.fancybox.hideLoading();
				});
				return;
			}

			window.nlForm = document;
			var HTML='';
			var PARAMS='';

			if( jQuery( "#ed-signup-form" ).length>0 ) {

				var EDpage=jQuery("#edPage").val();

				PARAMS="&type=ed&page="+EDpage;
				jQuery('<a href="?newsletter=signup&id='+response+PARAMS+'"></a>')
				.fancybox({
					// NEWSLETTER SIGNUP SCREEN 1
					'width': 661,
					'height': 307,
					'overlayOpacity': 0.5,
					'overlayColor': '#000',
					'hideOnOverlayClick': false,
					'scrolling'			:'no',
					'hideOnContentClick': false,
					'showCloseButton': false
				}).click()
				.remove();
				jQuery("#ed-landing-body").html(HTML);
				jQuery('#fancybox-outer').find('canvas').remove();
				jQuery('#fancybox-overlay').remove()

			} else {

				// modify account number based on server environment
				var url = window.location.href;
				url = url.split('/');
				var subdomain = url[2];
				var acctNo = 1;
				if(  ( "dev.liquor.com" == subdomain  )
				  || ( "ben-dev.liquor.com" == subdomain )
				  || ( "david-dev.liquor.com" == subdomain ) )
				{
				  acctNo = 4
				} else if( subdomain == "stg.liquor.com"  ) {
				  acctNo = 5
				}


				if( typeof subscribe_from_url != 'undefined' ) {
					// UPDATE! ga.push( ['_setAccount', 'UA-11551319-' + acctNo] );
					//prepare for trigger google analytic goal
					if( subscribe_from_url == 'Home' ) {
						try {
							window.optimizely = window.optimizely || [];
							window.optimizely.push( ['trackEvent', 'subscribe-confirm'] );
						} catch( err ) {
							// alert("optimizely error");
						}
						try {
							// UPDATE! ga.push( ['_trackPageview', '/home-page-subscribe-confirm/'] );
						}
						catch( err ) {
							alert( "here's where things broke" );
							// alert("ga _trackPageview code error");
						}
					} else if( subscribe_from_url == 'NotHome' ) {
						try {
							window.optimizely = window.optimizely || [];
							window.optimizely.push(['trackEvent', 'subscribe-confirm']);
						} catch( err ) {
							//alert("optimizely error");
						}
						try {
							// UPDATE! ga.push( ['_trackPageview', '/gray-box-subscribe-confirm/'] );
						}
						catch ( err ) {
							// alert("ga _trackPageview code error");
						}
					} else {
						try {
							// UPDATE! ga.push( ['_trackPageview', subscribe_from_url] );
							// alert('well, we are deep into this, and the subscribe from url is ' + subscribe_from_url);
						}
						catch( err ) {
							alert("problem tracking this sign up");
						}
					}
				}

				jQuery('<a href="#ldc_hd_signup_confirm_popup" id="this_is_test"></a>').fancybox({
					padding: 0,
					margin: 0,
					afterClose: function() {
						jQuery("#ldc_hd_na").removeAttr("checked");
						jQuery("#ldc_hd_ch").removeAttr("checked");
						jQuery("#ldc_hd_la").removeAttr("checked");
						jQuery("#ldc_hd_ny").removeAttr("checked");
						jQuery("#ldc_hd_sf").removeAttr("checked");
						jQuery("#ldc_hd_confirm_username").val('');
						jQuery("#ldc_hd_confirm_password").val('');
						jQuery("#ldc_hd_confirm_password2").val('');
						jQuery("#ldc_hd_confirm_birth_day").val('');
						jQuery("#ldc_hd_confirm_birth_month").val('');
						jQuery("#ldc_hd_confirm_birth_year").val('');
						jQuery("#ldc_hd_confirm_gender").removeAttr('checked');
						jQuery("#ldc_hd_confirm_bartender").removeAttr('checked');
						jQuery("#ldc_hd_confirm_bourbon").removeAttr("checked");
						jQuery("#ldc_hd_confirm_cognac").removeAttr("checked");
						jQuery("#ldc_hd_confirm_gin").removeAttr("checked");
						jQuery("#ldc_hd_confirm_rum").removeAttr("checked");
						jQuery("#ldc_hd_confirm_scotch").removeAttr("checked");
						jQuery("#ldc_hd_confirm_tequila").removeAttr("checked");
						jQuery("#ldc_hd_confirm_vodka").removeAttr("checked");
						jQuery("#ldc_hd_signup_confirm_error").hide();
						jQuery("#ldc_hd_na").attr("checked", true);
						jQuery("#ldc_hd_"+defaultCity+"").attr("checked", true);
					}
				}).click();
			}

			//add virtual page view for tracking successful subscriptions in google analytics
			//use the virtual page: /newsletter?subscription=true as the goal url
			//Async Snippet
			//by james @ Mar 23, 2011
			try {
				// OLD! gaq.push(['_setAccount', 'UA-11551319-1']);
				// OLD! gaq.push(['_trackPageview', '/newsletter?subscription=true']);
			}
			catch(err) {
				//alert("ga _trackPageview code error");
			}
			//snippet ends
			// if we got this far, we have a valid response containing the ID of the data row
			// jQuery('<a href="?newsletter=signup&id='+response+'&type=ed&page=JUNE"></a>')
		}
	});
}
*/
// A helper function that displays error messages as tooltips near an input.
function showError( msg, near, form_reference ) {
	var pos = jQuery(near, form_reference).offset();
	jQuery('<div></div>')
	.addClass('nl-error')
	.css({
		position: 'absolute',
		top: pos.top - 30,
		left: pos.left - 20
	})
	.html(msg)
	.appendTo('body')
	.idle(3000)
	.fadeOut('slow', function(){
		jQuery(this).remove()
	});
}


// Event hook for newsletter signup form submission
// this submits the data via ajax, handles any errors, and loads the thank you overlay if the signup was successful
// UPDATE: since it turns out .live('submit') doesn't work in IE, I am going to revise this to use bind() instead --Rene
window.bindNewsletterSubmit = function() {

	/*jQuery('form.newsletter-signup').bind('submit', function(){
		window.nlForm = this;
		// validate input
		var valid = true;
		var reg = /^([A-Za-z0-9_\-\.\+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		var addr = jQuery('input[name=email]', this).val();
		if ( !jQuery('input[name=agree]', this).is(':checked') ) {
				showError('You must agree to the terms and conditions', 'input[name=agree]');
				valid = false;
		}
		if (addr == 'your email address') {
				showError('Please enter your email address', 'input[name=email]');
				valid = false;
		} else if (!reg.test(addr)) {
				showError('Please enter a valid email address', 'input[name=email]');
				valid = false;
		} else {


		}

		//alert(jQuery('input[name=agree]', this).is(':checked'));

		if (!valid) {
			return false;
		}
		else {
			jQuery.fancybox.showLoading();
			jQuery("#fancybox-loading")
			.unbind()
			.css('cursor', 'default');

			// set up conversion tracking parameters based on which conversion we are tracking here (NL signup, ED email signup, etc)
			var $listID = jQuery('input[name=listID]', this);
			if (($listID.length > 0) && (window.ldc.listID = $listID.val())) {
				window.ldc.newsletter.email = 'editor-sf@liquor.com';
				window.ldc.tracking.ga.conversionPage = '?newsletter=ed-sf';
				window.ldc.tracking.adwords.format = '2';
				window.ldc.tracking.adwords.label = 'UWh-CK-KxwEQo-LS9AM';

				var $edPage = jQuery('input[name=edPage]', this);
				window.ldc.edpage = ($edPage.length > 0) ? $edPage.val() : false;

				ldc_cookie_value = getCookie("_ldc_user-deal");

				if ('SEM' == ldc_cookie_value) {
					window.ldc.tracking.fb.id = 6002443243970;
					window.ldc.tracking.fb.h = '6dea238f93';
				} else if ('SF' == ldc_cookie_value) {
					window.ldc.tracking.ga.conversionPage = '/ed-sf-confirm/'
					window.ldc.tracking.fb.id = 6002491506170;
					window.ldc.tracking.fb.h = '062575455f';
				} else if ('LA' == ldc_cookie_value) {
					window.ldc.tracking.ga.conversionPage = '/ed-la-confirm/'
					window.ldc.tracking.fb.id = 6002491506170;
					window.ldc.tracking.fb.h = '062575455f';
				} else if ('NY' == ldc_cookie_value) {
					window.ldc.tracking.ga.conversionPage = '/ed-ny-confirm/'
					window.ldc.tracking.fb.id = 6002491506170;
					window.ldc.tracking.fb.h = '062575455f';
				} else if ('CH' == ldc_cookie_value) {
					window.ldc.tracking.ga.conversionPage = '/ed-ch-confirm/'
					window.ldc.tracking.fb.id = 6002491506170;
					window.ldc.tracking.fb.h = '062575455f';
				} else if ('NA' == ldc_cookie_value) {
					window.ldc.tracking.ga.conversionPage = '/ed-na-confirm/'
					window.ldc.tracking.fb.id = 6002491506170;
					window.ldc.tracking.fb.h = '062575455f';
				} else {
					window.ldc.tracking.fb.id = 6002430998370;
					window.ldc.tracking.fb.h = '5015fadbee';
				}

			} else {
				window.ldc.tracking.adwords.format = '3';
				window.ldc.tracking.adwords.label = 'crVdCMHUvQEQo-LS9AM';
				window.ldc.tracking.fb.id = 6002341817970;
				window.ldc.tracking.fb.h = '0bf933daf9';

				ldc_cookie_value = getCookie("_ldc_user-deal");

				if ('SEM' == ldc_cookie_value) {
					window.ldc.tracking.fb.id = 6002443243970;
					window.ldc.tracking.fb.h = '6dea238f93';
				} else if ('SF' == ldc_cookie_value) {
					window.ldc.tracking.ga.conversionPage = '/ed-sf-confirm/'
					window.ldc.tracking.fb.id = 6002491506170;
					window.ldc.tracking.fb.h = '062575455f';
				} else if ('LA' == ldc_cookie_value) {
					window.ldc.tracking.ga.conversionPage = '/ed-la-confirm/'
					window.ldc.tracking.fb.id = 6002491506170;
					window.ldc.tracking.fb.h = '062575455f';
				} else if ('NY' == ldc_cookie_value) {
					window.ldc.tracking.ga.conversionPage = '/ed-ny-confirm/'
					window.ldc.tracking.fb.id = 6002491506170;
					window.ldc.tracking.fb.h = '062575455f';
				} else if ('CH' == ldc_cookie_value) {
					window.ldc.tracking.ga.conversionPage = '/ed-ch-confirm/'
					window.ldc.tracking.fb.id = 6002491506170;
					window.ldc.tracking.fb.h = '062575455f';
				} else if ('NA' == ldc_cookie_value) {
					window.ldc.tracking.ga.conversionPage = '/ed-na-confirm/'
					window.ldc.tracking.fb.id = 6002491506170;
					window.ldc.tracking.fb.h = '062575455f';
				} else {
					window.ldc.tracking.fb.id = 6002430998370;
					window.ldc.tracking.fb.h = '5015fadbee';
				}

			}

			jQuery('input[type=submit]', this).attr('disabled', 'disabled');
			submitSignupForm();
			return false; // Return false to override the default submit behavior.
		}
	});
	*/
}

function toggleAll(element)
{
	var value = jQuery(element).attr('checked');
	//alert(value);
	jQuery('#openinviter-form .thCheckbox').attr('checked',value);
}

// Friendinviter code moved over from signup_step1
/*window.initInviter = function(){

	jQuery('#fancybox-overlay,#fancybox-outer').click(function(e){
		jQuery('#inviter-login-form:visible')
		.slideUp(200)
		.parent()
		.resetForm();
	});

	jQuery('#inviter-login-form').click(function(e){
		e.stopPropagation();
	});

	jQuery('.prvdr').click(function(e){
		jQuery('#inviter-login-form:hidden')
		.slideDown(200);
		if(jQuery('#newsletter_overlay_mail_container').html()==''){jQuery('#inviter-login-form').append("<input type='hidden' name='isEDmail' value='true'>");}
		jQuery('#inviter-login-form').parent().resetForm();
		this.checked = true;
		e.stopPropagation();
	});

	jQuery('#openinviter-form').ajaxForm({
		beforeSubmit: function(){
			jQuery('input').attr('disabled', 'disabled');
			jQuery.fancybox.showLoading();
			return true;
		},
		success: function(result) {
			jQuery.fancybox.hideLoading();
			jQuery('input').removeAttr('disabled');
			// TODO: improve performance! perhaps implement the contact list as a data set (json, xml, etc)
			// maybe consider even pagination?

			// prevent stack overflow issues with large result sets
			if(result.length < 10240)
				$errors = jQuery(result).find('.error');
			else
				$errors = [];

			if($errors.length) {
				$errors.each(function(){
					showError(this.innerHTML, '.thButton');
				});
			} else {
				jQuery('<div id="newfancywindow"></div>').appendTo('body');

				jQuery('<a href="#newfancywindow" />').fancybox({
					'width': 552,
					'height': 469,
					'overlayOpacity': 0.5,
					'overlayColor': '#000',
					'hideOnOverlayClick': false,
					'content': result,
					'scrolling'	: 'no',
					'onComplete': function(){
						jQuery.fancybox.update();
						//code moved to inviter.php
					}
				}).click().remove();
				jQuery('#newfancywindow').remove();
			}
		}
	});
}
*/
// resize fancybox screen
function resizeFancyBox(width, height, padding) {
		jQuery('#fancybox-outer').width(width+2*padding).height(height+2*padding);
		jQuery('#registration-overlay iframe').attr('width', width).attr('height', height);
}
//END NEWSLETTER.JS CONTENT

jQuery(document).ready(function() {

	// Add The Image Upload Button

	jQuery(document).on("click", ".upload_image_button", function() {
		formfield = jQuery(this).data('field');
		tb_show('', 'media-upload.php?type=image&TB_iframe=true');
		return false;
	});

	window.send_to_editor = function(html) {
		imgurl = jQuery('img',html).attr('src');
		jQuery('input[name="' + formfield + '"]').val(imgurl);
		tb_remove();
	}

});



