$(document).ready(function() {
  $('.styled_nodequeue .styled_noqueue_item').each(function() {
    $(this).bind('mouseover', function() {
      $(this).css('cursor', 'pointer');
    }).bind('click', function() {
      $(location).attr('href', $(this).find('.styled_noqueue_item_headline a').attr('href'));
    });
  });

  $('.adweek_article_newsletters_block_mod .newsletters-selection, .adweek_article_newsletters_block_mod .thankyou').css('display', 'none');

  // Clear placeholder for email input on focus
  $('.adweek_article_newsletters_block_mod [name="email"]').focus(function() {
    if ($(this).val() == 'Your email address' || !$(this).val()) {
      $(this).val('');
      $('.adweek_article_newsletters_block_mod .newsletters-selection').css('display', 'block');
      $('.adweek_article_newsletters_block_mod .thankyou').css('display', 'none');
    }
  });

  // Set placeholder for email input on losing focus
  $('.adweek_article_newsletters_block_mod [name="email"]').blur(function() {
    if (!$(this).val()) $(this).val('Your email address');
  });

  // Change title according to selected checkboxes
  /* Not needed because the featured newsletter will pull from the path. @todo: find out if one of the boxes should be removed based on the 
   * fact that the newsletter already says Get the ___ newsletter.
  $('.adweek_article_newsletters_block_mod .newsletters-selection input').each(function() {
    $(this).bind('click', function() {
      var i = 0;
      var newsletters = '';
      $('.adweek_article_newsletters_block_mod .newsletters-selection input:checked').each(function() {
        i++;
        if (newsletters.length > 0) newsletters += ', ';
        newsletters += $(this).parent().find('label').html();
      });

      // New title
      var title = 'Get the <strong>' + newsletters + '</strong> newsletter';
      if (i > 1) title += 's';
      title += ':';

      $('.adweek_article_newsletters_block_mod .title').html(title);
    });
  });
  */

  // On form submit
  $('.adweek_article_newsletters_block_mod form').submit(function() {
    var email = $('.adweek_article_newsletters_block_mod [name="email"]').val();
    if (email == 'Your email address' || !email) {
      alert('Email field is required.');
      return false;
    }

    // Email validation
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      alert('Sorry, your email was invalid.');
      return false;
    }

    $('.adweek_article_newsletters_block_mod .newsletters-block-data').css('display', 'none');
    $('.adweek_article_newsletters_block_mod .newsletters-selection').css('display', 'none');
    $('.adweek_article_newsletters_block_mod .thankyou').css('display', 'block');

    // Get selected checkboxes
    var newsletter_ids = new Array();
    $('.adweek_article_newsletters_block_mod .newsletters-selection input:checked').each(function() {
      newsletter_ids[newsletter_ids.length] = $(this).val();
    });
    var jsonString = JSON.stringify(newsletter_ids);

    // Send data to Sailthru via AJAX
    $.ajax({
      type: 'POST',
      url: '/newsletters_ajax/sailthru/' + email + '/' + jsonString,
      data: {},
      success: function (data) {
        // alert(data);
      },
    });

    return false;
  });
})
