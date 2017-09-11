gSiteOptions.suppressDockedNav=true;
gSiteOptions.noPDFExtractExpand=true;
gSiteOptions.collapsibleLabels=["h3 span","h3","h4 span","h4","span"];

gSiteOptions.openWindowDetails=new Object();
gSiteOptions.openWindowDetails['submit-sci-nw-link'] = { target: 'submitinit', config: 'width=800,height=600,scrollbars=1,resizable=1,channelmode=0,toolbar=0,location=0,directories=0,menubar=0' };

gSiteOptions.openWindowDetails['cb-rightslink-link'] = { target: 'rightslink', config: 'width=800,height=600,scrollbars=1,resizable=1,channelmode=0,toolbar=0,location=0,directories=0,menubar=0' };

gSiteOptions.relatedWebPagesLabel='Related Web Sites';
gSiteOptions.relatedWebPageLoadingText='Loading Related Web Sites...';
gSiteOptions.hwCitingLabel='HighWire Press';

$(document).ready(function() {
		if ($("#pageid-content").length) {
			var ems = $("h4.rel-which-jnl em");
			if (ems.length) {
				for (var i = 0; i < ems.length - 1; i++) {
					for (var j = i+1; j < ems.length; j++) {
						var t = ems.eq(i).text();
						if (ems.eq(j).text() == t) {
							ems.eq(j).parent("h4").hide();
						}
					}
				}
			}
		}

    $("#pageid-content li.compilation").prepend('<a href="#content-block" class="nav-top">Top of page</a>');
	$("#pageid-toc span.cit-ahead-of-print-date").before("<br />");
	$("#search-terms").focus(
	 function()
	 {
	  $(this).css("background-color","#fdf6e8");
	  $(this).css("border-color","#666");
	  $(this).css("color","#000");
	  // set to empty if it's the default
	  if(this.value == this.defaultValue)
	  {
	   this.value = "";
	  }
	 }
	)

	$("#search-terms").blur(
	 function()
	 {
	  $(this).css("background-color","#FFFFFF");
	  $(this).css("border-color","#d9d9d9");
	  $(this).css("color","#ccc");
	  // reset to default if it's empty
	  if(this.value == "")
	  {
	   this.value = this.defaultValue;
	  }
	 }
	)

		$("#keyword").focus(
	 function()
	 {
	  $(this).css("color","#000");
	  // set to empty if it's the default
	  if(this.value == this.defaultValue)
	  {
	   this.value = "";
	  }
	 }
	)

	$("#keyword").blur(
	 function()
	 {
	  $(this).css("color","#333333");
	  // reset to default if it's empty
	  if(this.value == "")
	  {
	   this.value = this.defaultValue;
	  }
	 }
	)
	var pptCopyrightText = 
		'You may download the associated image(s) for non-profit educational presentation use only, provided no modifications are made to the content. Any use, publication, or distribution of the image(s) beyond that permitted in the sentence above or beyond that allowed by the "Fair Use" limitations (sections 107 and 108) of the US Copyright law requires the prior written permission of AAAS (https://www.sciencemag.org/site/subscriptions/permissions.xhtml). This permission does not apply to images that are credited to non-AAAS sources. For images credited to non-AAAS entities, you will need to obtain permission from the entity listed in the legend or credit line before making any use of the image(s).\n\nPlease note: if you are viewing this content through an institutional subscription, you may need to register for free (https://pubs.aaas.org/Promo/promo_setup_rd.asp?dmc=P0RFB1) with our site to access this feature, or, if you have already registered, log in with your username and password.';

     $('div#power-point input[name="generate_file"]').click(function(){
         return confirm(pptCopyrightText);
     });
    
    $('.fig-services li.ppt-link').live('click', function(ev){
        return confirm(pptCopyrightText);
    });

    // display in issue-level data supplements
    if ($('div#pageid-data-supp').length && $('a[title="Return to toc"]').length) {
        $('div#col-2').css('display','none');
        $('div#content-block').css('left','20px');
    }
	setTimeout(function() {
		var metricDataHideNoMention = $('#pageid-articleusage div.altmetric-embed div a img');
		if (metricDataHideNoMention.length == 0) {
	    	$('#pageid-articleusage #content-block h2.metrics').addClass("hide-metrics");
		}
	},1000);
});


