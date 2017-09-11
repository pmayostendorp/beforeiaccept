jQuery(document).ready( function() {

	var auth_response = {};

	// Initialization Routines moved to ldc-facebook-login.php
	// They need to be loaded before Genesis

	function login() {
			FB.login(function (response) {
					// debug auth response
					if (response.authResponse) {
							// ignore auth response content - get full graph data
							download_graph_data(response.authResponse.userID);
							var url = document.URL;
							ga('send','event', 'Login', 'Facebook', url);
					} else {
							var url = document.URL;
							ga('send','event', 'Incidental', 'Facebook Cancel', url);
							// @todo: handle auth cancelled
					}
			}, {scope: "email, user_about_me"});

			//OLD-SCOPE, LDC-1605//{scope: "email, user_birthday, user_location, user_about_me"});

			// LDC-927 "Drinking it better with friends"
			// This cookies the login and displays the Facebook friends invite modal once on Facebook logins
			$.cookie('facebook_friends_invite_modal', '1');
	}


	function download_graph_data() {

			FB.api("/me", function (graph_response) {
					$("#fb_email").remove();
					var params = {
							action: "facebook_login",
							user: graph_response
					};
					if( graph_response.email===undefined ){
						$('#ldc-login-form > .ldc-user-fb-login').before('<div id="fb_email" class="form-group text-center" style="font-size:13px; margin-top:4em;"><span style="display:block;font-size:13px; color:#C00; margin-top:1em;margin-bottom:0.5em;line-height:1.7em;">We could not get your email address. Signing in with Facebook requires a valid email address.</span><span>Please try again.</span></div>');
						$("#ldc-login-form > .ldc-user-or-slug").slideUp();
						$("#ldc-login-form > .input-row").slideUp();

						FB.api("/me/permissions","DELETE",function(response){
    						console.log(response); //gives true on app delete success
						});

					} else {
						$.ajax({
							url: "/wp-admin/admin-ajax.php",
							type: 'POST',
							data: params,
							dataType: "json",
							success: function (ajax_response) {
									if(typeof ajax_response.ID != 'undefined') {
										if (typeof login_redirect != 'undefined') {
											window.location.href = login_redirect;
										}
										else {
											location.reload();
										}
									}
							},
							error: function (error) {
									console.log(error, "Error ajax to server")
							}
					});
					}
			});
	}

	$(document).ready(function () {

		$("#facebook_signup_login").click(function () {
			ga('send','event', 'Click', 'FB Signin from Modal Box', document.URL);
			login();
		});

		$(".fb-login-button").click(function () {
			ga('send','event', 'Click', 'FB Signin from Newsletter Box', document.URL);
			login();
		});

		$('.ldc-hellobar-fb-login-button').click(function() {
			ga('send','event', 'Click', 'FB Signin from Hellobar', document.URL);
			login();
		})

	});

});