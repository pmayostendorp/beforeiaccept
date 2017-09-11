var tracking_source = "";
var login_redirect = "";

jQuery(document).ready( function() {

	var tracking_source = '';

	$('.generic-login, .nav-user-login, .ldc-user-login, #switch-to-login, .gated_content_login_link, #comment_login, .comment-reply-login').on( 'click', function() {
		if (typeof $(this).data("tracking_source") != 'undefined') { tracking_source = $(this).data("tracking_source"); }
		if (typeof $(this).data("redirect") != 'undefined') { login_redirect = $(this).data("redirect"); }
		if( typeof(ga)=='function'){
			ga('send','event', 'Login', tracking_source );
		}
		show_modal_login();
	});

	$('.generic-join, .nav-user-join, .ldc-user-join, #switch-to-join, .gated_content_signup_link, #comment_signup').on( 'click', function() {
		if (typeof $(this).data("tracking_source") != 'undefined') { tracking_source = $(this).data("tracking_source"); }
		if (typeof $(this).data("redirect") != 'undefined') { login_redirect = $(this).data("redirect"); }
		if( typeof(ga)=='function'){
			ga('send','event', 'Click', 'Join', tracking_source );
		}
		show_modal_join('join-now');
	});

	$('#ldc-user-signin-button').click( function() {
		if (typeof $(this).data("tracking_source") != 'undefined') { tracking_source = $(this).data("tracking_source"); }
		if (typeof $(this).data("redirect") != 'undefined') { login_redirect = $(this).data("redirect"); }
		if( typeof(ga)=='function'){
			ga('send','event', 'Click', 'Sign In', tracking_source);
		}
		$('#ldc-user-signin-button').addClass("working");
		$('#ldc-user-login-error').hide();
		$('#ldc-login-form :input').removeClass("error");
		$('.ldc-user-working').show();
		$.ajax({
			type: "POST",
			dataType: "json",
			data: $('#ldc-login-form').serialize(),
			url:"https://" + window.location.hostname + "/wp-admin/admin-ajax.php?action=login_state_login",
			xhrFields: {
				withCredentials: true
			},
			success:function(result){
				ga('send','event', 'Login', 'Modal', tracking_source);
				if (typeof login_redirect != 'undefined') {
					window.location.href = login_redirect;
				}
				else {
					location.reload();
				}
			},
			error:function(result){
				response = $.parseJSON(result.responseText);
				$('.ldc-user-working').hide();
				$('#ldc-user-login-error').html( response.message );
				$('#ldc-user-login-error').show();
				$('#ldc-login-form :input').addClass( "error" );
				$('#ldc-user-signin-button').removeClass( "working" );
			}
		});
	});

	$('#ldc-user-signup-button').click( function() {
		if (typeof $(this).data("tracking_source") != 'undefined') { tracking_source = $(this).data("tracking_source"); }
		if( typeof(ga)=='function'){
			ga('send','event', 'Click', 'Sign Up', tracking_source);
		}
		$('#ldc-user-signup-button').addClass("working");
		$('#ldc-user-signup-error').hide();
		$('#ldc-user-signup-error').html("");
		$('.ldc-popup-form :input,.ldc-popup-form label').removeClass("error");
		$('.ldc-user-working').show();
		$.ajax({
			type: "POST",
			dataType: "json",
			data: $('#login-state-signup-form').serialize(),
			url:"https://" + window.location.hostname + "/wp-admin/admin-ajax.php?action=login_state_signup1",
			xhrFields: {
				withCredentials: true
			},
			success: function( result ){
   			ga('send','event', 'Join', 'Modal', tracking_source);
				// Once the first screen saves successfully, a WordPress account is create and
				// the user is logged in to WordPress. To indicate the chanded login state to
				// the user, the page must be reloaded. A cookies is set below to tell PHP to
				// include the HTML for the second step of the onboarding process and the JavaScript
				// that loads the modal once the page has rendered.
				$.cookie( 'show-login-state-signup2', 1, { expires: 365 } );

				/**
				* LDC-1197 Install Facebook Conversion Pixel on /join page confirmation page and signup page
				* A cookie is set when a new user is created from sidebar signup to indicate the loading of Facebook Conversion pixel on next reload
				* @author George Moh <moh@liquor.com>
				*/
				$.cookie( 'facebook_conversion_pixel_shown', 0, { expires : 1, path : '/' });

				$.fancybox.close();
				location.reload();
			},
			error: function( result ) {
				response = $.parseJSON(result.responseText);
				respsonse_name_to_id = {
					'username': 'signup_username',
					'email': 'signup_email',
					'password': 'signup_password_1',
					'password_confirm': 'signup_password_2',
					'day': 'signup_birthdate_day',
					'month': 'signup_birthdate_month',
					'year': 'signup_birthdate_year',
					'age_tos': 'signup_age_tos',
				};

				$('.ldc-user-working').hide();
				$('#ldc-user-signup-button').removeClass("working");
				$.each( response.field_errors, function( key, value ) {

					var error_field = $( '#' + respsonse_name_to_id[key] );
					error_field.addClass("error");
					$('label[for="' + respsonse_name_to_id[key] + '"]').addClass("error");


					if (value) { $('#ldc-user-signup-error').append(value + "<br>"); }
				});
				$('#ldc-user-signup-error').show();

			},
		});
	});

	$('#ldc-user-signup2-button').click( function() {
		$('#ldc-user-signup2-button').addClass("working");
		$('.ldc-user-working').show();
		$.ajax({
			type: "POST",
			dataType: "json",
			data: $('#login-state-signup-form2').serialize(),
			url:"https://" + window.location.hostname + "/wp-admin/admin-ajax.php?action=login_state_signup2",
			xhrFields: {
				withCredentials: true
			},
			success:function( result ) {
				ga('send','event', 'Interaction', 'Modal Sign Up: Part 2');
				$.fancybox.close();
			},
			error:function( result ) {
				response = $.parseJSON(result.responseText);

				$('.ldc-user-working').hide();
				$('#ldc-user-signup-button').removeClass("working");
				$.each( response.field_errors, function( key, value ) {
					if (value) { $('#ldc-user-signup-error').append(value + "<br>"); }
				});
				$('#ldc-user-signup-error').show();
			}
		});
	});

	// LDC-796 Login/Signup modal - allow user to retrieve password
	$('#ldc-login-retrievepw-button').click( function() {
		show_modal_retrievepw();
	});

	$('#ldc-login-retrievepw-send').click( function() {

		$('#ldc-login-retrievepw-form :input').removeClass( "error" );
		$('.ldc-retrievepw-error').hide();
		$('.ldc-retrievepw-show').hide();
		$('.ldc-retrievepw-loader').show();
		$.ajax({
			type: "POST",
			dataType: "json",
			data: $('#ldc-login-retrievepw-form').serialize(),
			url:"/wp-admin/admin-ajax.php?action=retrieve_password",
			success:function( result ) {
				ga('send','event', 'Interaction', 'Password Retrieve');
				$('#ldc-login-retrievepw-form :input').removeClass( "error" );
				$('.ldc-retrievepw-error').hide();
				$('.ldc-retrievepw-loader').hide();
				$('#ldc-login-retrievepw-form :input').addClass( "success" );
				$('.ldc-retrievepw-success').show();
				setTimeout( function() { $.fancybox.close(); }, 1000);

			},
			error:function( result ) {
				$('.ldc-retrievepw-success').hide();
				$('.ldc-retrievepw-loader').hide();
				$('#ldc-login-retrievepw-form :input').removeClass( "success" );
				$('#ldc-login-retrievepw-form :input').addClass( "error" );

				$('.ldc-retrievepw-error').show();
			}
		});
	});

	// End of LDC-796

	$('.ldc-user-block').click( function() {
	 	window.location = "/user-profile"
		ga('send','event', 'Click', 'User Profile');
	});

	// setTimeout( check_for_cached_user_info, 2000 );

	if ( $('#out-of-cache-user-widget').length > 0 ) {
		$('.user-widget').append( $('#out-of-cache-user-widget') );
		$('#out-of-cache-user-widget').show();
	}

	$('#goto-part2').click( function() {
		$('.ldc-user-popup-incidental.part1').hide();
		$('.ldc-user-popup-incidental.part2').show();
	});

	$('#goto-part3').click( function() {
		$('.ldc-user-popup-incidental.part1').hide();
		$('.ldc-user-popup-incidental.part2').hide();
		$('.ldc-user-popup-incidental.part3').show();
	});

});


function show_modal_login() {
	$("#fb_email").remove();
	$("#ldc-login-form > .ldc-user-or-slug").show();
	$("#ldc-login-form > .input-row").show();
	$.fancybox.close();
	$.fancybox({
		href: "#ldc-login",
		padding: 0,
		margin: 0,
		afterClose: function() {
			document.getElementById("ldc-login-form").reset();
			$('#ldc-user-login-error').hide();
			$('#ldc-login-form :input').removeClass("error");
		}
	});
}

/**
 *  @param source string | join-now (Standard Join Now Modal)
 *  @param source string | custom	  (Use Admin -> Modal Settings)
 *  @return null
 */

function show_modal_join(source) {

	// If window width is too small, use the default.
	if ($(window).width() <= 360) {
		source = "join-now";
	}

	if (source == "join-now") {
		var modal_to_show = "#login-state-signup";
	}

	if (source == "custom") {

		var modal_choice =  $('#modal_choice').html(); // Which one to show

		if (modal_choice == "default") {
			var modal_to_show = "#login-state-signup";
		}
		else {
			var modal_to_show = "#custom-modal-signup-box";
			$('#custom-modal-signup-box').show();
		}

	}

	$.fancybox.close();
	$.fancybox({
		href: modal_to_show,
		padding: 0,
		margin: 0,
		scrolling: 'no',
		afterClose: function() {
			document.getElementById("login-state-signup-form").reset();
			$('#ldc-user-signup-error').hide();
			$('#login-state-signup-form :input').removeClass("error");
		},
	});
}

// LDC-796 Login/Signup modal - allow user to retrieve password

function show_modal_retrievepw() {

	$.fancybox.close();
	$.fancybox({
		href: "#ldc-login-retrievepw",
		padding: 0,
		margin: 0
	});
}

// LDC-927 "Drinking is Better with Friends" Module

function show_modal_fbfriends() {

	$.fancybox.close();
	$.fancybox({
		href: '#login-fb-friends',
		padding: 0,
		margin: 0,
		autoDimensions: true
	});

}
