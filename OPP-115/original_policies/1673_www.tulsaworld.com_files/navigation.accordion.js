$(document).ready(function () {
	$('.vertical-accordion .ui-icon').click(function(){
		if($(this).parent().hasClass("active")) {
			$(this).removeClass("ui-icon-circle-triangle-n");
			$(this).addClass("ui-icon-circle-triangle-s");
			$(this).parent().children("ul").slideUp(100);
			$(this).parent().removeClass("active");
		}/* else if ($(this).parent().siblings().hasClass("active"){
			$(this).parent().siblings(".active").children(".ui-icon").removeClass("ui-icon-circle-triangle-n");
			$(this).parent().siblings().children(".ui-icon").addClass("ui-icon-circle-triangle-s");
			$(this).parent().siblings(".active").children("ul").slideUp();
			$(this).parent().siblings().removeClass("active");
		}*/else {
			$(this).removeClass("ui-icon-circle-triangle-s");
			$(this).addClass("ui-icon-circle-triangle-n");
			$(this).parent().addClass("active");
			$(this).parent().children("ul").slideDown(100);
		}
	});
});