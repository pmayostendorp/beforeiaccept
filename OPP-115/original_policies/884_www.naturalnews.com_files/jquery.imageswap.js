  $(document).ready(function () {
    	
//rollover swap images with rel
var img_src = "";
var new_src = "";

$(".overlay").hover(function(){
//mouseover
img_src = $(this).attr('src'); //grab original image
new_src = $(this).attr('rel'); //grab rollover image
$(this).attr('src', new_src); //swap images
$(this).attr('rel', img_src); //swap images
},
function(){
//mouse out
$(this).attr('src', img_src); //swap images
$(this).attr('rel', new_src); //swap images
});

//preload images
var cache = new Array();
//cycle through all rollover elements and add rollover img src to cache array
$(".overlay").each(function(){
var cacheImage = document.createElement('img');
cacheImage.src = $(this).attr('rel');
cache.push(cacheImage);
});
    	
	});
