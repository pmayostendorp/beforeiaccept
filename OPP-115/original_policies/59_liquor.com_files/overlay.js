function putCursor(inp){
	if (inp.createTextRange) { 
		var part = inp.createTextRange();
		part.moveStart("character", 0);
		part.moveEnd("character", 0);
		part.select();
	}else if (inp.setSelectionRange){
		inp.focus();
		inp.setSelectionRange(0, 0);
	}
	//inp.selectionStart = inp.selectionEnd = inp.value.length;
}

//used in overlays
function next_step(now_step,to_step){
	var new_step = $('#step_'+(to_step));
	var cur_step = $('#step_'+(now_step));
	if(form_transition_effect=='slide'){
		new_step.show();
		setTimeout(function(){
			cur_step.css('left','-100%');
			new_step.css('left','0%');
			if(now_step!=to_step){
				setTimeout(function(){
					cur_step.hide();
				},500);
			}
		},10);
	}else if(form_transition_effect=='fade'){
		new_step.show();
		setTimeout(function(){
			new_step.css({'opacity':'1'});
			cur_step.css({'opacity':'0.25'})
			if(now_step!=to_step){
				setTimeout(function(){
					cur_step.hide();
				},500);
			}
		},10);
	}else{
		cur_step.hide();
		new_step.show();
	}
	validate_coupons_seen(new_step);
	report_step(to_step,now_step);
}

var jump_to_step = null;
var force_last_step = null;
function set_jump_to_step(step,last_step) {
	jump_to_step = step;
	force_last_step = last_step;
}
function report_step(to_step,cur_step){
	XD.postMessage('move_step&to_step='+to_step+'&cur_step='+cur_step);
}	
function submit_genie_form(obj,cur_step,total_steps){
	var device = $('[name=d]').val();
	if(device!='d'){
		$('input:focus').blur();//ios fix- pressing submit would not blur of input and then can't edit field
		
	}
	var to_step = cur_step + 1;
	if (jump_to_step != null) {
		//override to step
		to_step = jump_to_step;
		$('input[name=step]',obj).val(to_step);
		jump_to_step = null;
	}
	var last_step = (to_step >= total_steps - 1);
	
	if (force_last_step===true) {
		$('input[name=last_step]',obj).val(1);
	}
	if($('.form_input',obj).length>0){
		if(last_step || force_last_step===true){
			validateFormAbs(obj,(function(data){
					submit_esp(data,cur_step,to_step);
				}),(function(){
                if(dont_wait){
                }else{
                    submit_timeout = setTimeout(function(){
                        show_thanks_capture(cur_step,to_step);
                    },2500);
                }

			}),false,clear_submit_timeout);
		}else{
			validateFormAbs(obj,function(){
				next_step(cur_step,to_step);
			});
		}
	}else{
		XD.postMessage('report_click');
		next_step(cur_step,to_step);
	}
	
}
function validate_coupons_seen(step) {
	if(step){
		var cpn = jQuery('.coupon',step);
	}else{
		var cpn = jQuery('.coupon').filter(':visible');
	}
	if(cpn.length>0) {
		XD.postMessage('report_coupon&code='+cpn.attr('id').substr(4));
	}
}

function validate_slide(slide,callback_success){
	var action = '/capture/validate_step';
	var form = slide.parent();
	var serial = $('input, textarea, select',slide).serialize();
	serial+='&campaign_id='+jQuery('#bcx_campaign_id').val();
	jQuery.post(action,serial,function(data){
		var trimmed_data = jQuery.trim(data);
		if(trimmed_data.indexOf('{')===0){
			//php might say we have errors
			data = jQuery.parseJSON(trimmed_data);	
			if(typeof(data)=='object'){
				jsonToErrorAbs(data,form);
			}
		}else{//only success gets here
			callback_success(trimmed_data);
		}
	});
}

function validateForm2(form_name,obj,callback_success,callback_before,redirect_url,onerror_fn,abs){  
	
	if(callback_success && typeof(callback_success)=='string'){
		redirect_url = callback_success;
		callback_success = false;
	}else if(callback_before && typeof(callback_before)=='string'){
		redirect_url = callback_before;
		callback_before = false;
	}
	if(callback_before){
		if(callback_before()===false)
			return;
	}
	obj = jQuery(obj);
	if(obj.is('form')){
		var form = obj;
		obj = jQuery('input[type=submit]',obj);
	}else{
		var form = jQuery('form#' + form_name).length>0?jQuery('form#' + form_name):jQuery('form[name=' + form_name +']');//get form by name (default)or id
	}
	obj.attr('disabled','disabled');
	loading(obj);

		
	
	var action = form.attr('action');
	if(!action){
		alert("Error: could not find the form or it does not have action. Aborting.");
		return false;
	}
	if(abs){
		jQuery('.error',form).remove();
	}else{
		jQuery('.error span.errorMessage',form).remove();
		jQuery('.error',form).removeClass('error');
	}
	//submit value of disabled input

	//obj.removeAttr('disabled');
	var serial = form.serialize();

	jQuery.post(action,serial,function(data){
		var trimmed_data = jQuery.trim(data);
		if(trimmed_data.indexOf('{')===0){
			//php might say we have errors
			data = jQuery.parseJSON(trimmed_data);	
			if(typeof(data)=='object'){
				if(abs)
					jsonToErrorAbs(data,form);
				else
					jsonToError(data,form);
				if(onerror_fn)
					onerror_fn(trimmed_data);
				
			}
		}else{//only success gets here
			if(callback_success)
				callback_success(trimmed_data);
			//php might tell us to redirect to a url
			if(trimmed_data.indexOf('/')===0){
				window.location = trimmed_data;
			}else if(trimmed_data == 'reload'){
				location.reload();
			}else{
				if(redirect_url){
					if(redirect_url == 'reload'){
						location.reload(true);
						return;
					}else	
						window.location = redirect_url;
				}
			}
		}
		
		jQuery('.loading',form).remove();
		obj.removeAttr("disabled");
	});
	
	return false;
};

function validateForm(obj,callback_success,callback_before,redirect_url,onerror_fn){ 
	return validateForm2(false,obj,callback_success,callback_before,redirect_url,onerror_fn);
};

var enableValidateFormAbs = true;
function validateFormAbs(obj,callback_success,callback_before,redirect_url,onerror_fn){
	if (!enableValidateFormAbs) 
		return;
	return validateForm2(false,obj,callback_success,callback_before,redirect_url,onerror_fn,true);
};

//displays error messages from json object
function jsonToError(data,form){
	jQuery.each(data,function(k, v){
		var el = jQuery('[name="'+k+'"]',form);
		el.bind('change',function(){
			jQuery(this).parent().removeClass('error').unbind();
			jQuery('span.errorMessage',jQuery(this).parent()).remove();
		});
		var parent = el.parent();
		if(parent.hasClass('error')){
			parent.find('.errorMessage').append('<br/>'+v);
		}else{
			parent.addClass('error').append('<span class="errorMessage">' + v + '</span>');
		}
	});
	var scroll_destination = jQuery('.error:first');
	if(!scroll_destination.length>0)
		scroll_destination = jQuery('.error:first');
	scrollTo(scroll_destination);
}

function clearInputBox2(obj,default_text,def_color,new_color){
	if(!def_color){
		def_color = '#999';	
	}
	if(!new_color){
		new_color = '#000';
	}
	
	var obj = jQuery(obj);
	var name = obj.attr('name');
	var val = obj.val();
	var events = obj.data('events');
	if(!events || (events && !events.blur)){
		obj.bind('blur',function(){
			var val = jQuery(this).val();
			if(!val){
				obj.val(default_text).css('color',def_color);
			}
		});
	}
	if(val && default_text == val){
		obj.val('').css('color',new_color);
	}
}

window.XD = function(){
	return {
		postMessage	:	function(message) {
			message ='bcx_message=true&campaign_id='+jQuery('#bcx_campaign_id').val()+'&message='+message;
			var target_url = jQuery('#bcx_calling_url').val();
			if (!target_url) {
				return;
			}
			
			parent['postMessage'](message, target_url.replace( /([^:]+:\/\/[^\/]+).*/, '$1'));
		},
		receiveMessage : function(callback) {
			attached_callback = function(e){
				callback(e.data);
			}
			
			if (window['addEventListener']) {
				window['addEventListener']('message', attached_callback, false);
			}else {
				window['attachEvent']('onmessage', attached_callback);
			}
			
		} 
	};
}();

function scrollTo(obj,onsuccess_fn){}
function loading(obj) {
    var l = jQuery('<span class="loading"></span>');
    l.insertAfter(obj);
}
var thanked = false;
var submit_timeout = false;
function show_thanks_capture(cur_step,to_step){
	if(thanked)
		return;
	thanked = true;//thanks once per overlay
	enableValidateFormAbs = false;
	var wmode = $('.wmode');
	var message = jQuery('form .form_input').serialize();//that's all steps
	
	XD.postMessage('bcx_form_subitted&'+message);
	var btimeout = jQuery('#bouncex_close_timeout').val();

	next_step(cur_step,to_step);
	if(btimeout && btimeout>0){
		setTimeout(function(){
			//wmode.hide();
			//$('.wbefore').show();
			XD.postMessage('bcx_close_ad');
		},btimeout*1000);
	}
	
	// check for coupon
	validate_coupons_seen(false);
}
function show_thanks_delay(){
	submit_timeout = setTimeout(function(){
		show_thanks_capture();
	},2500);
}
function submit_esp(data,cur_step,to_step){
	var dataobj = $(data).hide();
	jQuery('body').append(dataobj);
	show_thanks_capture(cur_step,to_step);
}
function clear_submit_timeout(){
	clearTimeout(submit_timeout);
}
function jsonToErrorAbs(data,form){
	XD.postMessage('had_error');
	jQuery.each(data,function(k, v){
		var el = jQuery('[name="'+k+'"]',form);
		if(el.length == 0){
			el = jQuery('[type=submit]', form);
		}
		var parent = el.parent();
		var err = jQuery('<div class="bouncex_abs_error error" id="bouncex_err_'+k+'">'+v+'</div>');
		parent.append(err);
		var top = (parseInt(el.css('top'))+el.height())+'px';
		err.css({'left':el.css('left'),
				'top':top});
	});
}

function populateDDHidden(button_id,obj){
	jQuery(obj).hide();
	var selected = jQuery('option:selected',obj);
	var txt = selected.text();
	
	var el = jQuery('#bouncex_el_'+button_id);
	el.css('z-index',3).find('div').text(txt).css('color','#333');
	el.find('.error').remove();
	jQuery('#'+button_id+'_hidden').val(selected.val());
	jQuery('#'+button_id+'_text_hidden').val(txt);
}