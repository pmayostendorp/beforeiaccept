$ = jQuery;
$(function(){
 $('header h3 button').bind('click', function(){acordionNav3(this);}); //Video Transcript Box
  function acordionNav3(este){
	$('.transcript').slideToggle(300, function(){
		var transcriptIcon = $(this).prev().find('span');
		if(transcriptIcon.attr('class')=='arrowDwn'){
			transcriptIcon.removeClass('arrowDwn');
			transcriptIcon.text($('html').attr('lang')=="en" ? "Hide the Video Transcript" : "Ocultar la transcripci\u00F3n del video");
		}else{
			transcriptIcon.addClass('arrowDwn');
			transcriptIcon.text($('html').attr('lang')=="en" ? "Show the Video Transcript" : "Mostrar la transcripci\u00F3n del video");
		}
	});
  }
}); 


/**
$(function(){
$("#show").click(function(){
    $(".transcript").show();
	});
  });**/