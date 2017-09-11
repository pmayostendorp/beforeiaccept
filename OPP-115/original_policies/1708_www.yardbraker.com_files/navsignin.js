// Filename: navsignin.js  
// Timestamp: 2015.05.01-11:25:39 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)


define("components/navsignin/navsignin", [
  "jrlf",
  "jquery",
  "pubsub"
], function(jrlf, $,pubsub) {
  var navsignin = {
    signinContainerId : "SigninContainer",
    signinFontIconId : "SigninFontIconContainer",
    signoutLink : "userSignOutLink",
    greetingContainerId : "greetingContainerId",
    
    getSigninContainerElem : function () {
      return document.getElementById(this.signinContainerId);
    },
    getSigninFontIconElem : function () {
      return document.getElementById(this.signinFontIconId);
    },
    getSignoutElem : function () {
      return document.getElementById(this.signoutLink);
    },
    
    getGreetingContainer : function () {
        return document.getElementById(this.greetingContainerId);
    },

    doSignin : function (CAPTURE) {
      
    	CAPTURE.beginLogin();
    	
    },

    doSignout : function (CAPTURE) {
      
    	if (CAPTURE.isLoggedIn()) {
    		CAPTURE.invalidateSession();
    	}
    },

    toggleSignedin : function () {
      var that = this,
          signinContainerElem = that.getSigninContainerElem(),
          signinFontIconElem = that.getSigninFontIconElem();
      if (signinContainerElem &&
          signinFontIconElem) {
        signinFontIconElem.className = "user-icon icon-FS_Icons_signin";
        signinContainerElem.className = "signinContainer site-user-controls logged-in";
      }
    },

    toggleSignedout : function () {
      var that = this,
          signinContainerElem = that.getSigninContainerElem(),
          signinFontIconElem = that.getSigninFontIconElem();
      if (signinContainerElem && signinFontIconElem) {
        signinFontIconElem.className = "user-icon icon-FS_Icons_signout";
        signinContainerElem.className = "signinContainer site-user-controls logged-out";
      }
    },

    toggleUpdate : function (CAPTURE) {
      (CAPTURE.isLoggedIn()) ? this.toggleSignedin() : this.toggleSignedout();
    },
	buildSignedInLinks : function(){
		var that = this,
			host = location.host,
			userProfileEditLink = document.getElementById("userProfileEditLink"),
			userAccountEditLink = document.getElementById("userAccountEditLink"),
			userSignoutLink = that.getSignoutElem();

                userProfileEditLink.href = "/account/profile";
		userAccountEditLink.href = "/account/settings";          
	  /*
		if(host.match(/beta/)) {
			userProfileEditLink.href = "http://www.foxsports.com/account/profile-settings#loc=account_profile";
			userAccountEditLink.href = "http://www.foxsports.com/account/profile-settings#loc=account_settings";
		}
		
		if(host.match(/qa/) || host.match(/dev/)) {
			userProfileEditLink.href = "http://qa.foxsports.com/account/profile-settings#loc=account_profile";
			userAccountEditLink.href = "http://qa.foxsports.com/account/profile-settings#loc=account_settings";		
		}
		else {
			userProfileEditLink.href = "/account/profile-settings#loc=account_profile";
			userAccountEditLink.href = "/account/profile-settings#loc=account_settings";
		}
           */
        $(userSignoutLink).click(function() {
            that.doSignout(CAPTURE);
        });
	},
    attach : function (CAPTURE) {
      var that = this,
          signinContainerElem = that.getSigninContainerElem(),
          signinLink = that.getSigninFontIconElem();

      if (signinContainerElem) {
        $(signinLink).click(function() {
          if (CAPTURE.isLoggedIn()) {
	          return false;
          } else {
            that.doSignin(CAPTURE);
          }
        });
		  that.buildSignedInLinks();
      }
    }
  };

  return {
    prototype : navsignin,
    
    start: function(opts) {
      var that = Object.create(navsignin);
      
      jrlf.init(function (err, Backplane, CAPTURE) {
        
    	if (err) return null;

        that.toggleUpdate(CAPTURE);
        that.attach(CAPTURE);
        
        if (CAPTURE.isLoggedIn()) {
        	
        	CAPTURE.getUserData(function (err, res) {

                that.getGreetingContainer().innerHTML = res.displayName;  //set user display name after user is logged in              
                
        	});
        	
    	} 
            
      });
    },

    init : function () {
      // begin binding!
	      this.start();
/*
		pubsub.on("page:load", function(){
	      this.start();
		}, this);
*/

    }
  };
});



