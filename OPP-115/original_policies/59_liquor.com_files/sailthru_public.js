
function sailthru_public() {
	var t = this;
	var data;
	var form_id
	var list_count = 0;
	var plugin_url;
	
	this.init = function() {
		
		t.plugin_url = jQuery('#sailthru_plugin_url').val();
		
		jQuery('[id^=sailthru-submit-]').click(function() {
			t.form_id = jQuery(this).attr('id').split('-')[2];
			
			if((t.data = t.get_data()) && t.validate_data()) {
				t.do_ajax();
			}
		});
	};
	
	this.do_ajax = function() {
		jQuery('#sailthru_loader-' + t.form_id).css('display', '');

		jQuery.post(
			t.plugin_url + '/sailthru_ajax.php?action=subscribe', t.data, 
			function(response) {
				
				if(typeof response.length == 'undefined') {
					jQuery('#sailthru_errors-' + t.form_id).remove();
					jQuery('#sailthru_loader-' + t.form_id).after('<span id="sailthru_errors-' + t.form_id + '" style="color: green;">You have been subscribed.</span>');
				}
				else {
					jQuery('#sailthru_errors-' + t.form_id).remove();
					var error_messages = '<ul style="color: red; font-weight: bold;" id="sailthru_errors-' + t.form_id + '">';
					for(var i in response) {
						error_messages += '<li>' + response[i] + '</li>\n';
					}
					error_messages += '</ul>';

					jQuery('#sailthru_loader-' + t.form_id).after(error_messages);
				}
				
				jQuery('#sailthru_loader-' + t.form_id).css('display', 'none');
			},
			'json'
		);
	};
	
	this.validate_data = function() {
		var errors = Array();
		
		if(t.list_count && !t.data.lists.length) {
			errors.push('You must subscribe to at least one list.');
		}
		
		var regex = new RegExp('sailthru\-[^\\d]+' + t.form_id + 'jQuery', 'i')
		
		jQuery('.required').each(function() {
			if(jQuery(this).attr('id').match(regex) && !jQuery(this).val()) {
				switch(jQuery(this).attr('id').split('-')[1]) {
					case 'fname':
						errors.push('You must enter a first name.');
						break;
					case 'lname':
						errors.push('You must enter a last name.');
						break;
					case 'email':
						errors.push('You must enter an email address.');
						break;
				}
			}
		});
		
		var email = jQuery('#sailthru-email-' + t.form_id).val();
		if(email && !email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
			errors.push('You must enter a valid email address');
		}
		
		jQuery('#sailthru_errors-' + t.form_id).remove();
		var error_messages = '<ul style="color: red; font-weight: bold;" id="sailthru_errors-' + t.form_id + '">';
		if(errors.length) {
			for(var i in errors) {
				error_messages += '<li>' + errors[i] + '</li>\n';
			}
			error_messages += '</ul>';
			
			jQuery('#sailthru_loader-' + t.form_id).after(error_messages);
		}
		
		return !errors.length;
	};
	
	this.get_data = function() {
		return {
			email: jQuery('#sailthru-email-' + t.form_id).val(),
			fname: jQuery('#sailthru-fname-' + t.form_id).val(),
			lname: jQuery('#sailthru-lname-' + t.form_id).val(),
			lists: t.get_lists(),
			form_id: t.form_id
		};
	};
	
	this.get_lists = function() {
		var lists = '';
		t.list_count = 0;
		jQuery('[id^=sailthru-optin-' + t.form_id + '-]').each(function() {
			t.list_count++;
			if(jQuery(this).is(':checked')) {
				// lists.push(jQuery(this).attr('id').split('-')[3]);
				lists += jQuery(this).attr('id').split('-')[3] + ',';
			}
		});
		lists = lists.substring(0, lists.length-1);
		return lists;
	};
}

jQuery(document).ready(function() {
	var t = new sailthru_public();
	t.init();
});