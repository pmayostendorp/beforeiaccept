var dfm_gtm_dataLayer = true;

analyticsEvent = function() {};
analyticsSocial = function() {};
analyticsVPV = function() {};
analyticsClearVPV = function() {};
analyticsForm = function() {};
window.dataLayer = window.dataLayer || [];

(function() {
  window.gaJsonData = window.gaJsonData || [];

  var gaTempJson = {
    "gaua": "UA-61435456-15",
    "quantcast": "p-4ctCQwtnNBNs2",
    "quantcast label": "LANewsGroup",
    "comscore": "6035443",
    "pubplatform": "NCS",
    "releaseversion": "",
    "digitalpublisher": "",
    "publisherstate": ""
  };

  gaJsonData.push(gaTempJson);

  var data = gaJsonData[0];

  var json = {
    "gaua": function() {
      return data.gaua;
    },
    "quantcast": function () {
      return data.quantcast;
    },
    "quantcast label": function () {
      return data["quantcast label"];
    },
    "comscore": function() {
      return data.comscore;
    },
    "pubplatform": function() {
      return data.pubplatform;
    },
    "releaseversion": function() {
      return data.releaseversion;
    },
    "digitalpublisher": function() {
      return data.digitalpublisher;
    },
    "publisherstate": function() {
      return data.publisherstate;
    }
  };

  /*
    ga_ua
  */

  var dataLayer_gaua = json["gaua"]();

  /*
    quantcast
  */

  var dataLayer_quantcast = json["quantcast"]();

  /*
    quantcast label
  */

  var dataLayer_quantcastlabel = json["quantcast label"]();

  /*
    comscore
  */

  var dataLayer_comscore = json["comscore"]();

  /*
    Release Version
  */

  var dataLayer_releaseversion = json["releaseversion"]();

  /*
    Digital Publisher
  */

  var dataLayer_digitalpublisher = json["digitalpublisher"]();

  /*
    Platform
  */

  var dataLayer_pubplatform = json["pubplatform"]();

  /*
    Publisher State
  */

  var dataLayer_publisherstate = json["publisherstate"]();

  // Push the values into the dataLayer

  dataLayer.push({
    'ga_ua':dataLayer_gaua,
    'quantcast':dataLayer_quantcast,
    'quantcast label':dataLayer_quantcastlabel,
    'comscore':dataLayer_comscore,
    'Release Version':dataLayer_releaseversion,
    'Digital Publisher':dataLayer_digitalpublisher,
    'Platform':dataLayer_pubplatform,
    'Publisher State':dataLayer_publisherstate
  });

}());