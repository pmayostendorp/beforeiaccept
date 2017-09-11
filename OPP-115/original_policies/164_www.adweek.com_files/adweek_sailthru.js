jQuery(function($) {
    if ($('body#linkit').length) return;

    $('a.adweek_sailthru_settings').click(function() {
        $.get($(this).attr('href'), '', function(resp) {
            $('body').append('<div id="adweek_sailthru_settings_form">'+resp.output+'</div>');
            $('#adweek_sailthru_settings_form').dialog({
                'title': 'Edit Newsletter Settings',
                height: 570,
                width: 430,
                modal: true,
                close: function() {
                    $("#adweek_sailthru_settings_form").remove();
                }
            });
        }, 'json');

        return false;
    });
    
     // Display template preview in popup
    $('a.adweek_sailthru_preview').click(function() {
       $.get($(this).attr('href'), '', function(resp) {
           $('body').append('<div id="adweek_sailthru_preview_form"><iframe id="iframe_preview" width="800" height="1000" /></div>');
           $('#adweek_sailthru_preview_form').dialog({
               'title': 'Preview',
               height: 800,
               width: 1000,
               modal: true,
               close: function() {
                   $("#adweek_sailthru_preview_form").remove();
               }
           });
  
           // Wait while iframe appears in body
           setTimeout(function() { 
               $($('#iframe_preview')[0].contentDocument.body).html(resp.output);
           }, 300);
       }, 'json');
  
       return false;
    });
 
    $('#adweek_sailthru_settings_form form').live('submit', function() {
        var is_time = $(this).parents('#adweek_sailthru_time_settings_form').length,
            $form = $(this);

        $form.find('.form-submit').attr('disabled', 'disabled').attr('value', is_time ? 'Sending...' : 'Saving...');
        $.post($(this).attr('action'), $(this).serialize(), function(resp) {
            if (resp.status == 'error') {
                $("#adweek_sailthru_settings_form form").replaceWith(resp.output);
            } else {
                $form.parents('.ui-dialog-content').dialog('close');
                location.href = location.href;
            }
            $form.find('.form-submit').removeAttr('disabled').attr('value', is_time ? 'Send' : 'Save');
        }, 'json');

        return false;
    });

    $('#adweek_sailthru_time_settings_form form').live('submit', function() {
        $.post($(this).attr('action'), $(this).serialize(), function(resp) {
            if (resp.status == 'error') {
                if (!$('#console').length) $('#footer').prev().before('<div id="console" class="clear-block" />');
                if (!$('#console .messages.error').length) $('#console').prepend('<div class="messages error">');
                $('#console .messages.error').append('<p>'+resp.error.send_time+'</p>');
            }
        }, 'json');
        $(this).parents('.ui-dialog-content').dialog('close');

        return false;
    });

    $('#adweek_sailthru_newsletter_table .adweek_sailthru_send_time, #adweek_sailthru_newsletter_table .adweek_sailthru_test_send').click(function() {
        var is_test = $(this).hasClass('adweek_sailthru_test_send'),
        title = '';
        title = '<span class="'+(is_test ? 'test-send' : 'live-send')+'">Select Send Time'+(is_test ? ' (Test Mode)' : '')+'</span>';
        $.get($(this).attr('href'), '', function(resp) {
            $('<div id="adweek_sailthru_time_settings_form">'+resp.output+'</div>').dialog({
                'title': title, // 'title': 'Select Send Time<br>Note: Will go to entire mailing list!',
                height: 300,
                width: 380,
                modal: true,
                close: function() {
                    $("#adweek_sailthru_time_settings_form").remove();
                }
            });
            Drupal.attachBehaviors("#adweek_sailthru_time_settings_form");
            $('#adweek_sailthru_time_settings_form #edit-submit').focus();

        }, 'json');

        return false;
    });

    $('#adweek_sailthru_user_edit').click(function() {
        var email = prompt("Please enter user email", "");

        location.href = $(this).attr('href').replace('/1/', '/'+encodeURIComponent(email)+'/');

        return false;
    });

    $('#newsletters-form-registered,#newsletters-form-email-change').click(function() {
        $.get($(this).attr('href'), '', function(data) {
            $('body').append('<div class="popup_form_overlay" />');
            $('body').append($(data).append('<div class="popup-form-close">×</div>'));
        });

        return false;
    });

    $('#adweek-sailthru-email-form, #adweek-sailthru-email-change-form').live('submit', function() {
        var $form = $(this);
        $.post($form.attr('action'), $form.serialize(), function(data) {
            try {
                data = $.parseJSON(data);
                $('.popup-form-close').click();
                location.href = data.href;
            } catch (e) {
                $form.replaceWith($(data).html());
            }
        });
        return false;
    });


    $('.popup-form-close, .popup_form_overlay').bind("click", function() {
        $('.popup-form-close').parent().remove();
        $('.popup_form_overlay').remove();
        return false;
    });

    $('#edit-newsletters-all').bind("change", function() {
        var $inputs = $(this).parents('.form-checkboxes').find('input');
        if ($(this).attr('checked')) {
            $inputs.attr('checked', 'checked');
        } else {
            $inputs.removeAttr('checked');
        }
    });

    $('#adweek-sailthru-newsletter-settings-test-mode-form #edit-send-time-wrapper').parent().remove();
});