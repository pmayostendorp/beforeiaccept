/*
OnlineOpinion v5.7
Released: 3/6/2013. Compiled 03/06/2013 01:59:16 PM -0600
Branch: master 8d549bbb6d7ff935b4572cf4e62e305e6cd843d7
Components: Full
The following code is Copyright 1998-2013 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab
*/

if(OOo.readCookie('oo_original_visit')){
  /* Run the Invitation instance */
  // alert(window.navigator.userAgent.toString());
  new OOo.Invitation({
  /* REQUIRED - Asset identification */
    pathToAssets: '/onlineopinionV5/'
  /* OPTIONAL - Configuration */
    , responseRate: 18   //
 // , repromptTime: -1  // in seconds default is 604800 ie 7 days
    , promptDelay: 10
   
    , popupType: 'popup'
  //  , companyLogo: '/onlineopinionV5/logo.gif' // If a logo is to be added to the prompt 355px by 55px
      , neverShowAgainButton: false
      , referrerRewrite: {
                searchPattern: /:\/\/[^\/]*/,
                replacePattern: '://splitter.playstation.com'
            }
  });
 
if(window.navigator.userAgent.toString().indexOf('iPad') > -1)
{
//$('#oo_container').show();
}
} else {
  OOo.createCookie('oo_original_visit','1');
}
