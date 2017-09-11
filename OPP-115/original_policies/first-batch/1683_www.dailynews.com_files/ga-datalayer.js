(function($) {

  /*
    Initial setup
      - Detect the domain
  */

  // do domain detection here
  var gtm_domain = "";
  //var gtm_domain = "mercurynews.com";

  var gtm_urlParts = window.location.hostname.split(".");
      gtm_domain = gtm_urlParts[gtm_urlParts.length - 2] + '.' + gtm_urlParts[gtm_urlParts.length - 1];
  //console.log(gtm_domain);

  // check to see if our gtm_domain is in the approved domains array. For testing, this code
  // should not run on all sites
  if (window["dfm_gtm_dataLayer"] !== undefined && window["dfm_gtm_dataLayer"] === true) {

    //console.log("approved domain");

    /*
      Check page for error codes
    */

    /*
      DataLayer variables
      - check to see if the ajax call above has successfully retrieved data
      - build the variables for the datalayer
        - the DFM api will not always be available
    */

    /*
      Publisher Domain
    */

    // console.log(typeof dfm_gtm_publisherdomain);

    // dataLayer_publisherdomain might be defined before this on third-party sites
    if (window["dfm_gtm_publisherdomain"] === undefined) {
      if (dfm.api("data","siteDomain")) {
        var dataLayer_publisherdomain = dfm.api("data","siteDomain");
      } else {
        var dataLayer_publisherdomain = gtm_domain;
      }
      //console.log(dataLayer_publisherdomain);
    } else {
      var dataLayer_publisherdomain = dfm_gtm_publisherdomain;
    }

    // console.log(typeof dataLayer_publisherdomain);
    // console.log(dataLayer_publisherdomain);

    /*
      Publisher Product
      - this will need to be enhanced with a lookup table before it goes network-wide
    */

    //console.log(typeof dfm_gtm_publisherproduct);

    if (window["dfm_gtm_publisherproduct"] === undefined) {
      if (dfm.api("data","siteDomain")) {
        var dataLayer_publisherproduct = dfm.api("data","siteDomain");
      } else {
        var dataLayer_publisherproduct = gtm_domain;
      }
      //console.log(dataLayer_publisherdomain);
    } else {
      var dataLayer_publisherproduct = dfm_gtm_publisherproduct;
    }

    //console.log(typeof dataLayer_publisherproduct);
    //console.log(dataLayer_publisherproduct);

    /*
      Dateline
    */

    /*
      Publish Hour of Day
    */

    if (dfm.api("data","pubDate")) {
      var dataLayer_publishdate = dfm.api("data","pubDate");
    } else {
      var dataLayer_publishdate = "";
    }

    /*
      Create Hour of Day
    */

    if (dfm.api("data","startDate")) {
      var dataLayer_createdate = dfm.api("data","startDate");
    } else {
      var dataLayer_createdate = "";
    }

    /*
      Update Hour of Day
    */

    if (dfm.api("data","modificationDate")) {
      var dataLayer_updatedate = dfm.api("data","modificationDate");
    } else {
      var dataLayer_updatedate = "";
    }

    /*
      Behind Paywall
    */

    // this check won't work as the paywallEnabled flag doesn't necessarily mean the paywall is in place
    // on a page. disabling until a solution can be found

    // if (window["paywallEnabled"] !== undefined) {
    //   if (paywallEnabled === true) {
    //     var dataLayer_paywall = "YES";
    //   } else if (paywallEnabled === false) {
    //     var dataLayer_paywall = "NO";
    //   }
    // } else {
    //   var dataLayer_paywall = "NO"; 
    // }

    /*
      Mobile Presentation
    */

    //http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    window.mobilecheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };

    if (window.mobilecheck() === true) {
      //console.log("Mobile");
      var dataLayer_mobile = "YES";
    } else {
      //console.log("No Mobile");
      var dataLayer_mobile = "NO";
    }

    /*
      kv
    */

    if (dfm.api("data","kv")) {
      // NCS
      var dataLayer_kv = dfm.api("data","kv");
    } else if (dfm.api("data","sectionName")) {
      // NGPS
      var dataLayer_kv = dfm.api("data","sectionName").toLowerCase().replace(/\s+/g, '');
    } else {
      var dataLayer_kv = "";
    }

    /*
      Section
    */

    if (dfm.api("data","sectionName")) {
      var dataLayer_section = dfm.api("data","sectionName");
    } else {
      var dataLayer_section = "";
    }

    /*
      Taxonomy
    */

    function detectTaxonomy(n) {
      var num = "Taxonomy" + n.toString();
      if (dfm.api("data",num)) {
        return dfm.api("data",num);
      } else {
        return "";
      }
    }

    // 1
    var dataLayer_taxonomy1 = detectTaxonomy(1);
    //console.log(dataLayer_taxonomy1);

    // 2
    var dataLayer_taxonomy2 = detectTaxonomy(2);
    //console.log(dataLayer_taxonomy2);

    // 3
    var dataLayer_taxonomy3 = detectTaxonomy(3);
    //console.log(dataLayer_taxonomy3);

    // 4
    var dataLayer_taxonomy4 = detectTaxonomy(4);
    //console.log(dataLayer_taxonomy4);

    // 5
    var dataLayer_taxonomy5 = detectTaxonomy(5);
    //console.log(dataLayer_taxonomy5);

    /*
      Content Source
    */

    /*
      Canonical URL
    */

    var dataLayer_canonicalurl;
    if (dfm.api("data","canonicalURL")) {
      // NCS
      var dataLayer_canonicalurl = dfm.api("data","canonicalURL");
    } else if (document.querySelector("link[rel='canonical']")) {
      // NGPS
      var dataLayer_canonicalurl = document.querySelector("link[rel='canonical']").href;
    } else {
      var dataLayer_canonicalurl = "";
    }
    //console.log(dataLayer_canonicalurl);

    /*
      Slug
    */

    /*
      Content ID
    */

    if (dfm.api("data","contentId")) {
      var dataLayer_contentid = dfm.api("data","contentId");
    } else {
      var dataLayer_contentid = "";
    }

    /*
      Page Type
    */

    if (dfm.api("data","pageType")) {
      var dataLayer_pagetype = dfm.api("data","pageType");
    } else {
      var dataLayer_pagetype = "";
    }

    /*
      Byline
    */

    /*
      Content Title
    */

    if (dfm.api("data","pageTitle")) {
      // NCS
      var dataLayer_contenttitle = dfm.api("data","pageTitle");
    } else if (dfm.api("data","title")) {
      // NGPS
      var dataLayer_contenttitle = dfm.api("data","title");
    } else {
      var dataLayer_contenttitle = "";
    }

    /*
      URL
    */

    if (dfm.api("data","pageUrl")) {
      // NCS
      var dataLayer_url = dfm.api("data","pageUrl");
    } else if (dfm.api("data","pageURL")) {
      // NGPS
      var dataLayer_url = dfm.api("data","pageURL");
    } else {
      var dataLayer_url = window.location.href;
    }

    /*
      Page Title
    */

    var dataLayer_pagetitle = document.title;

    /*
      User ID
    */


    /*
      Push all of the variables into the dataLayer
    */

    dataLayer.push({     
      'Publisher Domain':dataLayer_publisherdomain,
      'Publisher Product':dataLayer_publisherproduct,
      'Publish Hour of Day':dataLayer_publishdate,
      'Create Hour of Day':dataLayer_createdate,
      'Update Hour of Day':dataLayer_updatedate,
      'Mobile Presentation':dataLayer_mobile,
      'kv':dataLayer_kv,
      'Section':dataLayer_section,
      'Taxonomy1':dataLayer_taxonomy1,
      'Taxonomy2':dataLayer_taxonomy2,
      'Taxonomy3':dataLayer_taxonomy3,
      'Taxonomy4':dataLayer_taxonomy4,
      'Taxonomy5':dataLayer_taxonomy5,
      'Canonical URL':dataLayer_canonicalurl,
      'Content ID':dataLayer_contentid,
      'Page Type':dataLayer_pagetype,
      'Content Title':dataLayer_contenttitle,
      'URL':dataLayer_url,
      'Page Title':dataLayer_pagetitle  
    });

    //console.log (dataLayer);

    // remaining variables for v2

    //'Behind Paywall':dataLayer_paywall,
    //'errorType':dataLayer_errortype,
    //'Dateline':'',
    //'Content Source':'',
    //'Slug':dfm.api("data","slug"), //need something else from ngps
    //'Byline':dfm.api("data","byline"),  //need to strip out "the" preceeding
    //'User ID':''

    //});

    /*
     * DEBUGGING
     */

    //Log the object to the console
    // function dataOutput(obj) {
    //   for (var key in obj) {
    //     if (obj.hasOwnProperty(key)) {
    //         var val = obj[key];
    //         console.log(val);
    //     }
    //   }
    // }
    // dataOutput(dataLayer);

    // Log the values to the console
    // for (var key in dataLayer) {
    //    if (dataLayer.hasOwnProperty(key)) {
    //        var obj = dataLayer[key];
    //         for (var prop in obj) {
    //           if(obj.hasOwnProperty(prop)){
    //             console.log(prop + " : " + obj[prop]);
    //           }
    //        }
    //     }
    // }

  }

}(jQuery));