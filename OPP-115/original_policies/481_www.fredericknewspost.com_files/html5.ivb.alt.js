//@codekit-prepend "abstract.dmc.html5.js", "ticker.category_select.html5.js";

//////////////////////////
//IVB FUNCTIONALITY
//////////////////////////
function exitWidget(){
//	tickerStopScroll();
	videoPlayer.pause();
}

//$(".listingTicker").jCarouselLite({
//  mouseWheel: true,
//  vertical: true,
//  auto: 2000,
//  speed: 1000,
//  scroll: 1,
//  visible: 4
//}, dmcTickerReady);

//ticker click handlers (async click handler)
$('.listingTicker').on('click','.listing', function(e){
  e.preventDefault();
//  tickerStopScroll();

  advertiserName = $(this).find('p.headline').text();
  advertiserTagline = $(this).find('p.tagline').text();
  advertiserLogo = $(this).attr('data-logo');
  advertiserWebsite = $(this).attr('data-website');
  adnumber = $(this).attr('data-adnumber');
  ad_email = $(this).attr('data-email');
   ad_couponlink = $(this).attr('data-couponLink');

  $('.dmcWidget .advertiser-logo img').attr('src',advertiserLogo);

  playVideo($(this).attr('data-id'));
});


//////////////////////////
//OVERRIDES
//////////////////////////
function stopVideoOverride(){
  $('.video-poster').show();
  //replace logo with default
  $('.dmcWidget .advertiser-logo img').attr('src',defaultLogo);
}

function videoPlayingOverride(){
  $('.video-poster').hide();
  $('.dmcWidget .chzn-container').show();
  $('.dmcWidget .advertiser-logo img').attr('src',advertiserLogo);
}

