$(document).ready(function(){
	if($("ul.navigation.mega").hasClass("click") ){
                
		$("ul.navigation.mega > li span.arrow").click(function(event){
                        
                        if($(this).parent().hasClass("active")){
				$('ul.navigation.mega > li .ui-icon').removeClass("ui-icon-circle-triangle-n");
				$(this).addClass("ui-icon-circle-triangle-s");
				$(this).parent().removeClass("active");
				$(this).parent().children("div.mega-nav-container").css('display','none');
			} else { 
				$('ul.navigation.mega > li .ui-icon').removeClass("ui-icon-circle-triangle-n");
				/* $(this).removeClass("ui-icon-circle-triangle-s"); */
				$(this).addClass("ui-icon-circle-triangle-n");
				$('ul.navigation.mega > li').removeClass("active");
				$('ul.navigation.mega > li div.mega-nav-container').css('display','none');
				$(this).parent().addClass("active");
				$(this).parent().children("div.mega-nav-container").css('display','block');
			}
			
		});
	} else {
		
		$("ul.navigation.mega > li").hoverIntent(function(){
				$('ul.navigation.mega li').removeClass("active");
				$('.ui-icon', this).addClass("ui-icon-circle-triangle-n");
				$(this).addClass("active");
				$("div.mega-nav-container", this).css('display','block');
		}, function(){
			$('.ui-icon', this).removeClass("ui-icon-circle-triangle-n");
			$("div.mega-nav-container", this).css('display','none');
                        $('ul.navigation.mega > li').removeClass("active");
			$(this).removeClass("active");
		});
	}

});