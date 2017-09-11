/* Use an immediately invoked function to isolate variables */
(function(existing_jquery){

  // jQuery formatted selector to search for focusable items
  var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

  // store the item that has focus before opening the modal window
  var focusedElementBeforeModal;

  // Fix for window.location.origin for IE
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" +
      window.location.hostname + (window.location.port ? ':' +
      window.location.port: '');
  }

  /* Local JQuery variable */
var jQuery;
var countScriptCalled = 0; // some versions of IE will call scriptLoadHandler twice

function loadMobileBrowserDetection() {
  /**
   * jQuery.browser.mobile (http://detectmobilebrowser.com/)
   *
   * jQuery.browser.mobile will be true if the browser is a mobile device
   *
   **/
  (function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
}

/* Load jQuery if it is not present */
if(typeof existing_jquery != "undefined" && typeof existing_jquery.fn != "undefined"
    && existing_jquery.fn.jquery == '1.7.2') {
  jQuery = existing_jquery;
  loadMobileBrowserDetection();
  main();
} else if (window.jQuery === undefined || window.jQuery.fn.jquery != '1.7.2') {
  var script_tag = document.createElement('script');
  script_tag.setAttribute('type', 'text/javascript');
  script_tag.setAttribute('src',
    "//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");

  /* Wait for the script to load */
  //Other browsers
  if(script_tag.addEventListener) {
    script_tag.addEventListener("load", scriptLoadHandler, false);
  }
  // For Old versions of IE
  else if(script_tag.readyState) {
    script_tag.onreadystatechange = scriptLoadHandler;
  }

  // Try to find the head, otherwise default to the documentElement
  (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);

} else {
  /* The site already has jQuery loaded */
  jQuery = window.jQuery;

  loadMobileBrowserDetection();

  main();
}

/* Called once jQuery has been loaded */
function scriptLoadHandler(){
  countScriptCalled++;
  if(countScriptCalled > 1) return;
  /* Restore jQuery and window.jQuery to their original values */
  var interval = setInterval(function(){
    if((typeof window.jQuery !== "undefined") && window.jQuery.fn.jquery == '1.7.2') {
      clearInterval(interval);
      jQuery = window.jQuery.noConflict(true);

      loadMobileBrowserDetection();

      main();
    }
  }, 100);
}



  /* main - Main function for the voc invitation.  This function is called once */
  /* jQuery has been loaded.                                                */
  function main() {
    if(jQuery.browser.mobile) {
      var $target = jQuery('#survey-target');
      var targetHTML = $target.html();
      var pageurl  = window.location.origin + window.location.pathname;
      var popurl = "https://survey.usa.gov/surveys/291?";
          popurl = popurl + "stylesheet=https://www.usa.gov/sites/all/themes/usa/css/popup-survey.css&";
      popurl = popurl + "page_url=" + pageurl;

      var aTag = "<a href='" + popurl + "' target='_blank'>" + targetHTML + "</a>";

      $target.html(aTag);

    } else {
      jQuery('#survey-target').hide();
      var cookieName = 'survey_invitation_291';
      var invitationInterval = 90;
      if(invitationInterval == 0 || readCookie(cookieName) == null) {
        var invite = false;
          invite = Math.random() < 2.0 / 100
        if(invite) {
          loadModal();
          if(invitationInterval > 0) {
            createCookie(cookieName, true, invitationInterval);
          }
        }
      }
    }
  }

  function createCookie(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }


  /*
  ============================================
  License for Application
  ============================================
  This license is governed by United States copyright law, and with respect to matters
  of tort, contract, and other causes of action it is governed by North Carolina law,
  without regard to North Carolina choice of law provisions. The forum for any dispute
  resolution shall be in Wake County, North Carolina.
  Redistribution and use in source and binary forms, with or without modification, are
  permitted provided that the following conditions are met:
  1. Redistributions of source code must retain the above copyright notice, this list
  of conditions and the following disclaimer.
  2. Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or other
  materials provided with the distribution.
  3. The name of the author may not be used to endorse or promote products derived from
  this software without specific prior written permission.
  THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR IMPLIED
  WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE
  LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
  DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
  THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
  ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  */

  function loadModal() {
      jQuery('#srvyinvt').html("<style type=\"text/css\">\n  #vocModalOverlay {\n      width:100%;\n      height:100%;\n      z-index:9999; /* places the modal overlay between the main page and the modal dialog*/\n      background-color:#000;\n      opacity:0.5;\n      position:fixed;\n      top:0;\n      left:0;\n      display:none;\n      margin:0;\n      padding:0;\n  }\n\n  #vocModal {\n      width:50%;\n      margin-left:auto;\n      margin-right:auto;\n      padding: 25px;\n      border: thin #000 solid;\n      background-color:#fff;\n      z-index:10000; /* places the modal dialog on top of everything else */\n      position:fixed;\n      top:25%;\n      left:25%;\n      display:none;\n  }\n  #vocModal h1 {\n      text-align:center;\n  }\n\n  #vocEnter {\n    cursor: pointer;\n  }\n\n  .vocCancelButton {\n    cursor: pointer;\n  }\n\n  .banner {\n    padding-bottom: 10px;\n    border-bottom: 1px solid black;\n  }\n\n  .modalCloseButton {\n      float:right;\n      position:absolute;\n      top:10px;\n      left:95%;\n  }\n  .modalCloseButton img {\n      border:0;\n  }\n\n  .screen-reader-offscreen {\n      position:absolute;\n      left:-999px;\n      width:1px;\n      height:1px;\n      top:auto;\n  }\n\n  .top-right {\n    position: absolute;\n    top: 5px;\n    right: 5px;\n    text-decoration: none;\n    background-color: grey;\n    color: white;\n    font-size: 11px;\n  }\n\n<\/style>\n<div id=\'vocModal\' aria-hidden=\'true\' aria-labelledby=\'modalTitle\' aria-describedby=\'modalDescription\' role=\'dialog\' tabindex=\'-1\'>\n  <input class=\"vocCancelButton top-right\" id=\"cancel\" type=\"submit\" value=\"Close | X\">\n<p class=\"firstpara\">Please help us improve USA.gov after your visit!<\/p>\n<p>Your answers to a 2 to 3 minute survey about your experience will give us the feedback we need to make our site better.<\/p>\n<p>Use the \"Yes, I\'ll help\" button and a new window will open with your survey.  It will wait until you are ready.  Thank you!<\/p>\n<br>\n<input type=\"button\" name=\"vocEnter\" id=\"vocEnter\" value=\"Yes, I&#x27;ll help\"> <input type=\"button\" name=\"vocCancelButton\" class=\"vocCancelButton\" value=\"No thanks\">\n<\/div>\n<div id=\'vocModalOverlay\'><\/div>\n\n<script type=\'text/javascript\'>\n  jQuery.post(\'https://survey.usa.gov/surveys/291/invitation\')\n<\/script>\n");
      showModal(jQuery('#vocModal'));
      jQuery('#startModal').click(function(e) {
          showModal(jQuery('#vocModal'));
      });
      jQuery('#cancel').click(function(e) {
          hideModal();
          e.preventDefault();
      });
      jQuery('.vocCancelButton').click(function(e) {
          hideModal();
          e.preventDefault();
      });
      jQuery('#vocEnter').click(function(e) {
          enterButtonModal();
      });
      jQuery('#vocModalCloseButton').click(function(e) {
          hideModal();
      });
      jQuery('#vocModalCloseButton').keydown(function(event) {
          trapSpaceKey(jQuery(this), event, hideModal);
      });
      jQuery('#vocModal').keydown(function(event) {
          trapTabKey(jQuery(this), event);
      });
      jQuery('#vocModal').keydown(function(event) {
          trapEscapeKey(jQuery(this), event);
      });

  }


  function trapSpaceKey(obj, evt, f) {
      // if space key pressed
      if (evt.which == 32) {
          // fire the user passed event
          f();
          evt.preventDefault();
      }
  }

  function trapEscapeKey(obj, evt) {

      // if escape pressed
      if (evt.which == 27) {

          // get list of all children elements in given object
          var o = obj.find('*');

          // get list of focusable items
          var cancelElement;
          cancelElement = o.filter("#cancel")

          // close the modal window
          cancelElement.click();
          evt.preventDefault();
      }

  }

  function trapTabKey(obj, evt) {

      // if tab or shift-tab pressed
      if (evt.which == 9) {

          // get list of all children elements in given object
          var o = obj.find('*');

          // get list of focusable items
          var focusableItems;
          focusableItems = o.filter(focusableElementsString).filter(':visible')

          // get currently focused item
          var focusedItem;
          focusedItem = jQuery(':focus');

          // get the number of focusable items
          var numberOfFocusableItems;
          numberOfFocusableItems = focusableItems.length

          // get the index of the currently focused item
          var focusedItemIndex;
          focusedItemIndex = focusableItems.index(focusedItem);

          if (evt.shiftKey) {
              //back tab
              // if focused on first item and user preses back-tab, go to the last focusable item
              if (focusedItemIndex == 0) {
                  focusableItems.get(numberOfFocusableItems - 1).focus();
                  evt.preventDefault();
              }

          } else {
              //forward tab
              // if focused on the last item and user preses tab, go to the first focusable item
              if (focusedItemIndex == numberOfFocusableItems - 1) {
                  focusableItems.get(0).focus();
                  evt.preventDefault();
              }
          }
      }

  }

  function setInitialFocusModal(obj) {
      // get list of all children elements in given object
      var o = obj.find('*');

      // set focus to first focusable item
      var focusableItems;
      focusableItems = o.filter(focusableElementsString).filter(':visible').first().focus();

  }

  function enterButtonModal() {
      // BEGIN logic for executing the Enter button action for the modal window
      var pageurl  = window.location.origin + window.location.pathname;
      var popurl = "https://survey.usa.gov/surveys/291/holding_page?"
      popurl = popurl + "stylesheet=https://www.usa.gov/sites/all/themes/usa/css/popup-survey.css&";
      popurl = popurl + "page_url=" + pageurl;
      new_window = window.open(popurl,"","width=600,height=270,scrollbars,");
      // END logic for executing the Enter button action for the modal window
      hideModal();
      jQuery.post("https://survey.usa.gov/surveys/291/invitation_accept");

      if (new_window != null && window.focus) {
        new_window.focus();
      }
  }

  function showModal(obj) {
      jQuery('#mainPage').attr('aria-hidden', 'true'); // mark the main page as hidden
      jQuery('#vocModalOverlay').css('display', 'block'); // insert an overlay to prevent clicking and make a visual change to indicate the main apge is not available
      jQuery('#vocModal').css('display', 'block'); // make the modal window visible
      jQuery('#vocModal').attr('aria-hidden', 'false'); // mark the modal window as visible

      // save current focus
      focusedElementBeforeModal = jQuery(':focus');

      // get list of all children elements in given object
      var o = obj.find('*');

      // Safari and VoiceOver shim
      // if VoiceOver in Safari is used, set the initial focus to the modal window itself instead of
      // the first keyboard focusable item. This causes VoiceOver to announce the aria-labelled
      // attributes. Otherwise, Safari and VoiceOver will not announce the labels attached to the
      // modal window.

      // set the focus to the first keyboard focusable item
      o.filter(focusableElementsString).filter(':visible').first().focus();


  }

  function hideModal() {
      jQuery('#vocModalOverlay').css('display', 'none'); // remove the overlay in order to make the main screen available again
      jQuery('#vocModal').css('display', 'none'); // hide the modal window
      jQuery('#vocModal').attr('aria-hidden', 'true'); // mark the modal window as hidden
      jQuery('#mainPage').attr('aria-hidden', 'false'); // mark the main page as visible

      // set focus back to element that had it before the modal was opened
      focusedElementBeforeModal.focus();
  }

})(undefined);
