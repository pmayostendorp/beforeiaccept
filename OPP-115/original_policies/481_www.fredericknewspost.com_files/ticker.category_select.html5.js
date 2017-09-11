//////////////////////////
//TICKER
//////////////////////////
var tickerStopScroll;
var tickerStartScroll;
var tickerGo;

function dmcTickerReady(stopAuto, startAuto, go){
  //tickerStopScroll = stopAuto;
  //tickerStartScroll = startAuto;
  tickerGo = go;
}

function resetTicker(){
  //tickerStopScroll();
  //tickerGo(0);
  $('.listingTicker ul').css('top', '0');
}


//////////////////////////
//CATEGORY SELECT
//////////////////////////
//init chosen (category dropdown)
$(".dmcWidget #ivbCategorySelect").chosen({no_results_text: "No categories matched"}).change(categoryChange);
// Real Estate Variables
$(".dmcWidget #reLocations").chosen({no_results_text: "No categories matched"}).change(categoryChange);
$(".dmcWidget #reBeds").chosen({no_results_text: "No categories matched"}).change(categoryChange);
$(".dmcWidget #reBaths").chosen({no_results_text: "No categories matched"}).change(categoryChange);

function categoryChange(){
  updateListingsView($(this).val());
}

function updateListingsView(category){
  var category = (category && category || 'all');
  resetTicker();
  $('.dmcWidget .listingTicker ul li').hide();
  if(category === 'all'){
    $('.dmcWidget .listingTicker ul li').fadeIn();
    //tickerStartScroll();
    return;
  }

  // To display listing by a category (default)
  var $listingsToShow = $('.listingTicker .listing[data-category="'+category+'"]').closest('li');
  //remove duplicate listings from view
  var listingIDArray = [];
  var uniqueListingArray = [];
  $listingsToShow.each(function() {
    if($.inArray($(this).attr('id'), listingIDArray) == -1){
      listingIDArray.push($(this).attr('id'));
      uniqueListingArray.push($(this));
    }else{
      window.console.log('already exists in array');
    }
  });
  for (var i = 0; i < uniqueListingArray.length; i++) {
      uniqueListingArray[i].fadeIn();
  }

  // To display listing by a category (default)
  var $listingsToShow = $('.listingTicker .listing[data-location="'+category+'"]').closest('li');
  //remove duplicate listings from view
  var listingIDArray = [];
  var uniqueListingArray = [];
  $listingsToShow.each(function() {
    if($.inArray($(this).attr('id'), listingIDArray) == -1){
      listingIDArray.push($(this).attr('id'));
      uniqueListingArray.push($(this));
    }else{
      window.console.log('already exists in array');
    }
  });
  for (var i = 0; i < uniqueListingArray.length; i++) {
      uniqueListingArray[i].fadeIn();
  }

  // To display listing by a category (default)
  var $listingsToShow = $('.listingTicker .listing[data-beds="'+category+'"]').closest('li');
  //remove duplicate listings from view
  var listingIDArray = [];
  var uniqueListingArray = [];
  $listingsToShow.each(function() {
    if($.inArray($(this).attr('id'), listingIDArray) == -1){
      listingIDArray.push($(this).attr('id'));
      uniqueListingArray.push($(this));
    }else{
      window.console.log('already exists in array');
    }
  });
  for (var i = 0; i < uniqueListingArray.length; i++) {
      uniqueListingArray[i].fadeIn();
  }

  // To display listing by a category (default)
  var $listingsToShow = $('.listingTicker .listing[data-baths="'+category+'"]').closest('li');
  //remove duplicate listings from view
  var listingIDArray = [];
  var uniqueListingArray = [];
  $listingsToShow.each(function() {
    if($.inArray($(this).attr('id'), listingIDArray) == -1){
      listingIDArray.push($(this).attr('id'));
      uniqueListingArray.push($(this));
    }else{
      window.console.log('already exists in array');
    }
  });
  for (var i = 0; i < uniqueListingArray.length; i++) {
      uniqueListingArray[i].fadeIn();
  }
}

//if autoplay...
//set video path and pause at poster
if(listingID && autoPlay){
  playVideo(listingID,!autoPlay);
}