_satellite.pushBlockingScript(function(event, target, $variables){
  window._trackAnalytics = function(obj){
	if (typeof obj === 'object'){
		/* Add if for each event type */
		/* Social Share */
		if(obj.event && obj.event === 'social share'){
			_satellite.setVar('Social Network' , obj.socialNetwork);
			_satellite.track('social network');
		}
    
    if(obj.event && obj.event === 'comment'){
			_satellite.setVar('Comment Page' , obj.commentPage);
			_satellite.track('comment page');
		}
    
    if(obj.event && obj.event === 'comment'){
			_satellite.setVar('Comment Text' , obj.commentText);
			_satellite.track('comment text');
		}
    
    if(obj.event && obj.event === 'social follow'){
			_satellite.setVar('Follow Type' , obj.followType);
			_satellite.track('follow type');
		}
    
    if(obj.event && obj.event === 'social follow'){
			_satellite.setVar('Follow Location' , obj.followLocation);
			_satellite.track('follow location');
		}
    
     if(typeof obj.searchPageTitle !== 'undefined' && obj.searchPageTitle !== ''){
			_satellite.setVar('Search Page Title' , obj.searchPageTitle);
       console.log(obj.searchPageTitle);
			_satellite.track('search page title');
		}
    
     if(obj.event && obj.event === 'ptArticle'){
			_satellite.setVar('Popular Today Article Title' , obj.ptArticleTitle);
			_satellite.track('popular today article title');
		}
    
     if(obj.event && obj.event === 'ptArticle'){
			_satellite.setVar('Popular Today Featured' , obj.isItFeatured);
			_satellite.track('popular today featured');
		}
    
     if(typeof obj.navClick !== 'undefined' && obj.navClick !== ''){
			_satellite.setVar('Top Navigation Click', obj.navClick);
			_satellite.track('top navigation click');
		}
	}
};
});
