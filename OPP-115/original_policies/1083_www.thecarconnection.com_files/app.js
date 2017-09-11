jQuery(function(){
	jQuery('#div1').show();
	jQuery('#div2, #div3, #div4, #div5, #div6').hide();
    jQuery('.show').click(function(){
    	jQuery('.show').removeClass('activeLink')
	    jQuery(this).addClass('activeLink');
        jQuery('.target').hide();
        jQuery('#div'+jQuery(this).attr('target')).show();
    });
});