Drupal.behaviors.adweek_fancyzoom = function(context) {
	
  $('.fancybox').fancybox({
    padding: 0,
    openEffect  : 'none',
    closeEffect : 'none',
    scrolling   : 'yes',
    fitToView: false,
    afterShow: function () {
      var imgsrc = $(this.element).attr('data-cloudzoom-src');
      if(imgsrc != "") {
        var img = $('img', $(this.inner));
        var zoomsettings = "zoomPosition:'inside', zoomOffsetX:0, maxMagnification:12, zoomImage: '" + imgsrc + "'";
        $(img).addClass('cloudzoom');
        $(img).attr('data-cloudzoom',zoomsettings);
        $('.cloudzoom').CloudZoom();
      }
    }
  });
 
 if($('.fancyzoom').length == 0) return;

 $('.fancyzoom').each(function() {

   var style = "";
   var spanStyle ="";
   var centerTop = "";
   
   if(this.clientWidth) {
     style += 'width: ' + this.clientWidth + 'px;';
   }
   if(this.clientHeight) {
     style += 'height: ' + this.clientHeight + 'px;';
   }
	 if($('.fancyzoom').css('float'))
	 {
	 	spanStyle = 'float: ' + $('.fancyzoom').css('float') + ';';
	 	spanStyle ='style="' + spanStyle + '"';
	 	
	 }
	 
	 if($('.fancyzoom').css('float') == 'none'){
	 		style += 'display: inline';
	 		centerTop = 'style=" top: auto;"';
	 }
   
   if(style.length) {
     style='style="' + style + '"';
   }
   //$(this).wrap('<span class="fancy-span" />');
	$(this).wrap('<span class="fancy-span"' + spanStyle + ' />');
	$(this).wrap('<a class="fancybox" href="' + $(this).attr('data-fancybox-src') + '" ' + style + ' />');
   //$(this).wrap('<a class="fancybox" href="' + $(this).attr('data-fancybox-src') + '" ' + ' />');
   
   $(this).after('<img class="fancybox-enlarger-icon" src="/sites/all/libraries/ckeditor/plugins/fancyzoom/images/enlarge-button.jpg"' + '" ' + centerTop + ' />');
   if($(this).attr('data-fancybox-src') != "") {
     $(this).parent().attr('data-cloudzoom-src',$(this).attr('data-cloudzoom-src'));
   }
 });

/*
 $('.fancybox').fancybox({
      padding: 0,
      openEffect  : 'none',
      closeEffect : 'none',
      scrolling   : 'yes',
      autoWidth: 'false',
      fitToView: false,
      afterShow: function () {
        
        
        var imgsrc = $(this.element).attr('data-cloudzoom-src');
        if(imgsrc != "") {
          var img = $('img', $(this.inner));
          var zoomsettings = "zoomPosition:'inside', zoomOffsetX:0, maxMagnification:12, zoomImage: '" + imgsrc + "'";
          $(img).addClass('cloudzoom');
          $(img).attr('data-cloudzoom',zoomsettings);
          $('.cloudzoom').CloudZoom();
        }
      }
  });
 */
}; 
  



