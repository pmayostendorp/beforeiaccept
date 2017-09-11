/** 
 * UTD REST module customization
 */
(function ($) {

$(document).ready(function(){
	//Hide the default H1 on the Authors and Editors pages
	if($(".utdRestContributors").length > 0){
		$("#page-title").hide();
	}
});

})(jQuery);