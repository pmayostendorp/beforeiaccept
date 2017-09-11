function destroyWYSIWYG(){
  if (CKEDITOR.instances) {
    for(var instanceName in CKEDITOR.instances) {
      CKEDITOR.instances.myInstanceName.destroy(false);
    }
  }
  return false;
}

Drupal.behaviors.destroyWYSIWYG_FIX = function(context) {
  $('#edit-field-reorder-value').click(collapse).removeAttr('checked');

  $('#group_newsgallery2_slides_values .content-multiple-remove-cell').each(function() {
    if (!$(this).find('.newsgallery2-slides-expand-item').length) {
      $(this).append(
        $('<a href="#expand-item" class="newsgallery2-slides-expand-item expanded">-</a>').click(function() {
          //var selector = '#group-newsgallery2-slides-items .filefield-element, [id*=-field-image-text-wrap-value], [id*=-field-slide-body-value-wrapper], label[for*="-field-slide-image-upload"]',
          var selector = 'td > div:not(:first-child, .content-multiple-removed-warning), td > .content-multiple-cell-content-wrapper > div:not(:first-child)',
              $items = $(this).parent().parent().find(selector);

          if ($(this).hasClass('expanded')) {
            $(this).removeClass('expanded').text('+');
            $items.hide();
          } else {
            $(this).addClass('expanded').text('-');
            $items.show();
          }

          return false;
        })
      );
    }
  });  
}


function collapse(){
  $('#group_newsgallery2_slides_values .newsgallery2-slides-expand-item')[$(this).attr('checked') ? 'addClass' : 'removeClass']('expanded').click();
}

Drupal.behaviors.cckblock = function() {
  $("input.form-submit").bind('mouseover',function(){
    var context = $(this).parent().parent();

     $(".cckblock-ckeditor-wrapper textarea",context).each(function () {
      
      var ta_id=$(this).attr("id");

        Drupal.ckeditorOff(ta_id);
        Drupal.ckeditorOn(ta_id);
        
     });
     return false;
  });
  
  $(".div-edit-button").bind('click',function(){
    if($(this).hasClass('open')) {
      $(this).next().slideUp('fast');
      $(this).removeClass('open');
      $("a",this).text('open');
    } else {
      $(this).next().slideDown('fast');
      $(this).addClass('open');
      $("a",this).text('close');
    }
    return false;
  });

  $("body").ajaxComplete(function() {

    $('.cckblock-nids-list').filter(':not(.tabledrag-processed)').each(function() {
      var tableSettings = Drupal.settings.tableDrag['draggable-table-nids-0'];
      var base = $(this).attr('id');
      Drupal.tableDrag[base] = new Drupal.tableDrag(this,tableSettings);
      $('#' + base).addClass('tabledrag-processed');
    });
    
   
    
   var contentTaxonomy = $(".content-taxonomy-field").parent();
   

   $.each(contentTaxonomy, function (i, v) {
    v = "#" + $(v).attr('id');
    var wrapper = $(v);
    if (wrapper.length == 1 && !wrapper.hasClass('active-tags-processed')) {
      activeTagsActivate(v, i);
      wrapper.addClass('active-tags-processed');
    }
  });  
  
   var ckeditorID = $("textarea.ckeditor-processed").eq(0).attr('id');
    
   $(".cckblock-ckeditor-wrapper textarea:not(.ckeditor-processed)").each(function () {

      var ta_id=$(this).attr("id");
      $(this).addClass('ckeditor-mod');
      Drupal.settings.ckeditor.settings[ta_id] = Drupal.settings.ckeditor.settings[ckeditorID];
      
      if(typeof(CKEDITOR.instances[ta_id]) != 'null') {
        delete CKEDITOR.instances[ta_id];
      }
      
      Drupal.ckeditorOn(ta_id);
      //Drupal.attachBehaviors(".ahah-new-content");
      

      
    });
  


    
  }); 

 }