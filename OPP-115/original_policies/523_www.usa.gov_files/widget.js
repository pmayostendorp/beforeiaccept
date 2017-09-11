/* Use an immediately invoked function to isolate widget variables */
(function(){

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



  // Fix for window.location.origin for IE
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" +
      window.location.hostname + (window.location.port ? ':' +
      window.location.port: '');
  }

  /* main - Main function for the voc widget.  This function is called once */
  /* jQuery has been loaded.                                                */
  function main() {
    /* create window jquery object */
    window.VOCjQuery = jQuery;
    /* create the voc object */
    window.voc = {
      Survey: survey
    }

    survey = voc.Survey({surveyID: 251});
      survey.setTargetID('pagesurvey-trgt');
    survey.loadSurvey();
  }

  /* define the survey module using the revealing module pattern.          */
  function survey(opts){
    var _opts = opts || {};

    var _targetID = _opts.targetID || "vocSurveyDiv";
    var _pageURL  = _opts.pageURL  || (window.location.origin + window.location.pathname);
    var _surveyID = _opts.surveyID;
    var _this = this;

    /* getters and setters for private variables */
    function getTargetID()         { return _targetID; }
    function getSurveyID()         { return _surveyID; }
    function getPageURL()          { return _pageURL;  }

    function setTargetID(targetID) { _targetID = targetID; }
    function setPageURL(url)       { _pageURL = url; }


    /* loadSurvey(success: FunctionPointer, error: FunctionPointer)       */
    /* Attempt to load the survey with id _surveyID into the DOM element  */
    /* with id _targetID.                                                 */
    function loadSurvey() {
      var _hostname = "survey.usa.gov";
      var _url = "https://"+ _hostname + "/surveys/" + _surveyID + ".json";
      var target = jQuery("#" + _targetID)
      var surveyID = _surveyID

      /* get the survey identified by id _surveyID and insert it into the */
      /* DOM element _targetID.                                           */
      jQuery.getJSON(_url, "callback=?&page_url=" + _pageURL, function(data){
        target.html(data.html);
      });

      jQuery(document).on("submit", "#"+_targetID+" form", function(){

        // create and post to a hidden iframe to avoid cross-domain POST limitations
        var iframe = jQuery("<iframe>");
        var uniqueString = "surveyPostContainerIframe";
        var form = target.children("form").first();

        // add the hidden iframe
        jQuery("body").append(iframe);
        iframe.hide();

        // direct the form post into the iframe's window
        iframe[0].contentWindow.name = uniqueString;
        form.attr("target", uniqueString);
        form.attr("action", 'https://' + _hostname + '/survey_responses');

        // call the native submit, not the jQuery submit wrapper
        // this is to avoid hitting this handler twice (and looping)
        form[0].submit();

        // pull back the thank you page
        jQuery.getJSON("https://" + _hostname + "/surveys/" + _surveyID + "/thank_you_page.json", "callback=?", function(data){
          jQuery("#" + _targetID).html(data.html);
        });

        return false;
      });

      return _this;
    }

    return {
      /* Define the publicly accessible methods */
      getTargetID: getTargetID,
      getSurveyID: getSurveyID,
      getPageURL:  getPageURL,
      setTargetID: setTargetID,
      loadSurvey: loadSurvey
    };
  };

})();

/******************* Survey.js ******************************************/
function focus_on_page(page){
  input_element = jQuery("#page_" + page + " :input:enabled:visible:first");
  if(input_element.length) {
    input_element.focus();
  } else {
    jQuery("#page_" + page).focus();
  }
}

function show_next_page(page){
  var required_unanswered = false;

  required_unanswered = check_for_unanswered_required(page);

  if (!required_unanswered){
    jQuery("#page_" + page).hide();
    var next_page = jQuery("#page_" + page + "_next_page").val();

    /* Set the prev page on next page */
    set_prev_page(page, next_page);

    jQuery("#page_"+ next_page).show();
    window.location.hash="PAGE_" + next_page;
    focus_on_page(next_page)
  } else {
    alert(survey_required_fields_error);
  }

}

function show_prev_page(page){
  jQuery("#page_"+page).hide();
  var prev_page = jQuery("#page_" + page + "_prev_page").val();
  jQuery("#page_"+ prev_page).show();
  window.location.hash = "PAGE_" + prev_page;
  focus_on_page(prev_page)
}

function set_next_page(current_page, next_page) {
  jQuery("#page_" + current_page + "_next_page").val(next_page);
  jQuery("#page_" + next_page + "_prev_page").val(current_page);
}

function set_prev_page(current_page, prev_page) {
  jQuery("#page_" + prev_page + "_prev_page").val(current_page);
}

function check_for_unanswered_required(page) {
  required = false;
    jQuery("#page_"+page+" input[type=hidden].required_question").each(function(index){
      if(jQuery(this).val() == 'true'){
        question_number = jQuery(this).attr('id').split('_')[1]; // q_{number}_required
        /* if the element is a radio button that is required then check to make sure one is checked */
        if( jQuery(".question_" + question_number + "_answer").attr('type') == "radio" && jQuery(".question_" + question_number + "_answer:checked").length == 0 ) {
          required =  true;
        } else if( jQuery("select.question_" + question_number + "_answer").length > 0 && jQuery(".question_" + question_number + "_answer:selected").length == 0 ) {
          required =  true;
        } else if( jQuery(".question_" + question_number + "_answer").attr('type') == "checkbox" && jQuery(".question_" + question_number + "_answer").length > 0 && jQuery(".question_" + question_number + "_answer:checked").length == 0 ) {
          required =  true;
        } else if( jQuery(".question_" + question_number + "_answer").attr('type') == "text" && jQuery(".question_" + question_number + "_answer").val() == "") {
          required =  true;
        } else if( jQuery(".question_" + question_number + "_answer").prop('tagName').toLowerCase() == "textarea" && jQuery(".question_" + question_number + "_answer").val() == "") {
          /* a textarea does not have a an attr('type') so use the prop('tagName') */
          required =  true;
        }
      }
    });
    return required;
}

function validate_before_submit(page){
  if (!check_for_unanswered_required(page)){
    return true;
  } else {
    alert(survey_required_fields_error);
    return false;
  }

}
