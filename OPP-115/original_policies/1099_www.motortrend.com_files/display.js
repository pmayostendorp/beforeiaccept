jQuery(document).ready(function ($) {

    //$('<div id="loading-wrapper"><img src="/wp-content/plugins/dn_forms/img/ajax-loader_2.gif"> Uploading...</div>').appendTo(document.body);

    /*$(document).on('submit', ".dnforms-form", function(event){
        //event.preventDefault ? event.preventDefault() : event.returnValue = false; // Stops form from submitting by itself
        form_submit($(this), $("#sys-msg-form-submit"),null, null);
        return false;
    });*/
});


function form_submit(trigObj, params, callback){
    dnform_ajax_web_service(trigObj, params).done(function(ret){

        /*var f_id = trigObj.attr('id');
        var callback = f_id+"_submitResult";*/

        if (callback && typeof(callback) === "function") {
            callback(trigObj, ret);
        }
    });


    // If feedback display box does not exist. Make one.
    /*if(!sysMsg.length){
        trigObj.before("<div id='sys-msg-form-submit'></div>");
        sysMsg = jQuery("#sys-msg-form-submit");
    }*/

    /*if(callback != null){
        // This should include all form data + all submitted data + appended variables
        // Submitted data should include all special data from extended function.
        callback(ret);
    }*/


    //sys_message(sysMsg, ret.sys_msg);
}

function sys_message(sysMsg, msg){
    if(sysMsg.is(":visible")){
        sysMsg.html("<br>");
        sysMsg.animate({width : "1%"}, 400, function(){
            sysMsg.animate({width : "100%"}, 400, function(){
                sysMsg.html(msg).show("fast");
            });
        });
    }
    else{
        sysMsg.html(msg).show("fast");
    }
}

function dnform_ajax_web_service(thisObj, params){
    var d = jQuery.Deferred();
    var ret_data = {"sys_msg":"Ajax error", "dn_success":false};

    if (params === undefined) {  // allow for the first parameter to be optional.
        params = thisObj;
        thisObj = jQuery('<form id="dnform_dummy" name="dummy_form"></form>');
    }

    if(thisObj.is("form") || params != null){

        if(!thisObj.is("form")){
            thisObj = jQuery('<form id="dnform_dummy" name="dummy_form"></form>');
        }

        if(jQuery.isEmptyObject(params)){
            params = {action:"dnforms_ajax_request"};
        }
        else {
            if (typeof params.action == 'undefined' || jQuery.isEmptyObject(params.action)) params.action = "dnforms_ajax_request";
        }

        var ajaxurl = typeof ajaxurl == 'undefined'?'/wp-admin/admin-ajax.php':ajaxurl;

        thisObj.ajaxSubmit({
            type: "POST",
            url: ajaxurl,
            data: params,
            dataType: "json",
            async: true,
            cache: false,
            success: function(result){
                d.resolve(result);
            },
            error: function(result){
                d.reject(ret_data);
            }

        });
    }
    else {
        d.reject(ret_data);
    }

    return d.promise();
}

/*function submitResult(form_obj, ret, callback){
    if (callback && typeof(callback) === "function") {
        callback(form_obj, ret);
    }
}*/



/*$("#dealers-udid-form").on('submit', function(event){
    event.preventDefault();

    $('#dnswp_form_msg').prepend($('<div id="loading-wrapper"><img src="/wp-content/plugins/dn_sweepstakes/img/ajax-loader_2.gif"> Sending...</div>'));

    var loading_wrapper = $("#loading-wrapper");
    loading_wrapper.show();

    params = {action:"dnswp_ajax_request"};

    $(this).ajaxSubmit({
        type: "POST",
        url: ajaxurl,
        data: params,
        dataType: "json",
        async: false,
        cache: false,
        success: submitResult,
        complete: function(result){
            loading_wrapper.fadeOut(1000, function(){
            $(this).remove();
        });
    }
});

return false;
});*/

/*function submitResult(ret){
    var formObj = $("#join-dodge-revolution-form");
    $('.form_accepted').remove();
    $('.form_err').remove();
    if(ret.dn_success){
        var form_msg = $('#dnswp_form_msg');
        form_msg.append("<span class='form_accepted'>Form accepted. Thank you!</span>");
        formObj.slideUp(1000, function(){formObj.hide();});
    }
    else{
        // Form submit failed
        // Get offenders
        if(typeof ret !='undefined' && typeof ret.submit_data != 'undefined' && typeof ret.submit_data.val_array != 'undefined'){
            var val_array = ret.submit_data.val_array;
            for (var key in val_array) {
                if (val_array.hasOwnProperty(key)) {
                    if(key == "name"){
                        $('#dnswp_dealer_name').before("<span class='form_err'>* Name is required.</span>");
                        }
                    else if(key == "business"){
                        $('#dnswp_dealer_business').before("<span class='form_err'>* Business name is required.</span>");
                        }
                    else if(key == "email"){
                        $('#dnswp_dealer_email').before("<span class='form_err'>* Valid email is required.</span>");
                        }
                    else if(key == "dup_email"){
                        $('#dnswp_dealer_email').before("<span class='form_err'>* Email already registered.</span>");
                        }
                    else if(key == "udid"){
                        $('#dnswp_dealer_udid').before("<span class='form_err'>* Valid UDID is required.</span>");
                        }
                    else if(key == "dup_udid"){
                        $('#dnswp_dealer_udid').before("<span class='form_err'>* UDID already registered.</span>");
                    }
                }
            }
        }
    }
}*/
