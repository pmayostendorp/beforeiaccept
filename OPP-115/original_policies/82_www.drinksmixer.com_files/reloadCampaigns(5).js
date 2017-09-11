//<script>
(function(){
	var new_campaigns = false;
		
	bouncex.unload_campaigns();
	for(var ca_id in bouncex.campaigns){
		if(bouncex.campaigns.hasOwnProperty(ca_id)){
			if(new_campaigns[ca_id]&&
				bouncex.campaigns[ca_id].ad_visible&&
				new_campaigns[ca_id].html.replace(/fsa=(\d+)&|width=(\d+)&|height=(\d+)&/gi,'')==bouncex.campaigns[ca_id].html.replace(/fsa=(\d+)&|width=(\d+)&|height=(\d+)&/gi,'')){
								new_campaigns[ca_id] = bouncex.campaigns[ca_id];
				bouncex.campaigns[ca_id].activated = false;
				bouncex.activate_campaign(ca_id);
			}else{
				bouncex.destroy_ad(ca_id);
			}
		}
	}
	bouncex.campaigns = new_campaigns;
	new_campaigns = {};
	bouncex.cookie = {"v":{"ever_submitted_email":false,"time_on_site":0.6,"num_articles_viewed":0},"fvt":1435869572,"vid":1435869572564046,"ao":0,"as":0,"vpv":1,"d":"d","lp":"http%3A%2F%2Fwww.sheknows.com%2Fprivacy-policy","r":"www.drinksmixer.com","cvt":1435869572,"gcr":98,"m":0,"sid":0,"lvt":1435869572,"ibxt":"MTQzNTg2OTU3MjU2NDA0Ng%3D%3D"};
	bouncex.debug = false;
	bouncex.setBounceCookie();
	if (bouncex.campaigns) {
		bouncex.initActivationFuncs();
	}
	if(bouncex.campaigns && !bouncex.css_added){
		bouncex.init_lightbox();
	}
	}());
