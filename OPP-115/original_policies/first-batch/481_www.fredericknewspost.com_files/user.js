function townnews_common_user_validate(bAnonymous,curURL)
{
    //console.log('Running user validate function');
     var bHasRememberMe = (document.cookie.indexOf('tncms-rememberme') > -1);
     var bHasAuthToken = (document.cookie.indexOf('tncms-authtoken') > -1);
         //console.log('AuthToken :'+bHasAuthToken);
	 	 //console.log('Anonymous: '+bAnonymous);
         //console.log('Remember: '+bHasRememberMe);
		 //console.log('curURL (if passed): '+curURL);
		 //console.log('\n');

     if (bAnonymous){
        //console.log('User is anonymous.');
        if (bHasAuthToken){
                //console.log('User has authtoken.');
		//console.log('Anonymous view but is really logged in, force refresh');
			//console.log('Call refresh function \n');
        	townnews_common_user_refresh(curURL);

         } else if (bHasRememberMe){
             //console.log('Anonymous view, has remember me, attempt to restore session');
			 //console.log('Call refresh function \n');
             townnews_common_user_remember(curURL);
         }
         else{//console.log('No conflict. \n');
		 }
     } else if (!bHasAuthToken){
         //console.log('User is NOT anonymous but is missing authtoken.');
         if (bHasRememberMe){
             //console.log('User has remember me token.');
             //console.log('Logged in view, but no authtoken, has remember me token, attempt to restore session');
			 //console.log('Call remember function \n');
             townnews_common_user_remember(curURL);
         }
	 else{
             //console.log('User has no tokens but sees logged in view.');
             //console.log('Logged-in View, no tokens, force refresh');
			 //console.log('Call refresh function \n');
             townnews_common_user_refresh(curURL);
         }
     }
	 else{
		//console.log('User is logged in and valid. \n');
	}
}

function townnews_common_user_remember(pasURL)
{
    //console.log('Running remember function \n');
    var nRandCacheBuster = Math.random() * 1000000000000;
    var sURL = '/tncms/auth/remember/?_dc=' + nRandCacheBuster + '&success=';
	var goTo = window.location.href;
	//console.log(sURL);

    if (pasURL){
	//console.log('goTo has recieved curURL.');
	goTo = pasURL;
	}

	sURL += encodeURIComponent(goTo);

	//console.log('encode: '+sURL);

    if (window.location.replace) {
        window.location.replace(sURL);
    } else {
        window.location.href = sURL;
    }
}

function townnews_common_user_refresh(pasURL)
{
     //console.log('Running refresh function \n');
     var nRandCacheBuster = Math.random() * 1000000000000;
     var bIsChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	 var bIsSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

     var sURL = window.location.href.toString();

	 var goTo = window.location.href;

	if (pasURL){
	//console.log('goTo has recieved curURL.');
	sURL = pasURL;
	}

     // Handle Chrome since window.location.reload() is broken in that browser

     if (window.location.reload && !bIsChrome && !bIsSafari){
         window.location.reload(true); // doesn't appear to work in mobile safari
         return;
     }

     if (sURL.indexOf('?') > -1) {
         sURL += '&_dc=' + nRandCacheBuster;
     } else {
         sURL += '?_dc=' + nRandCacheBuster;
     }


     if (sURL.indexOf('#') > -1) {
         // relocate anchor tags
         var anchor = sURL.match(/#[a-z0-9\-\_]*/);
         sURL = sURL.replace(anchor,"")+anchor;
     }

     if (window.location.replace) {
         window.location.replace(sURL);
     } else if (window.location.assign) {
         window.location.assign(sURL);
     } else {
         window.location.href = sURL;
     }
}