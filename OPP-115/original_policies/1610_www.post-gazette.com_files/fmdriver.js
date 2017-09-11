/***** BOF Filemobile Driver *****/
jQuery.fn.extend({
	fmInit: function(){
		this.attributes = {"moderationStatus":"1", "filetype":"1"};
		this.photos =  Array();
		this.photoCount = 0;
		this.fields = Array("hits","title","channel","extension","rating","filetype", "id", "uid","message",  "status", 'tags', 'upload', 'user_name', 'vhost', 'votecount', 'publicUrl', 'thumbUrl','location','user_firstname',"user_lastname","user");
		this.photoWidth = 300;
		this.photoID = -1;
		this.layout = 'thumbs';
		this.sliderClassname = 'responsive-slider';
		this.carouselClassname = 'gallery-carousel';
		this.thumbClassname = 'gallery-thumbs';
		this.infiniteClassname = 'gallery-infinite';
		this.photoClassname = 'gallery-photo';
		this.limit = 25;
		this.startPosition = 0;
		this.infiniteWindow= window;
		this.infiniteDocument = document;


		if($(this).attrIsset("data-moderation-status")){
			this.attributes.moderationStatus=$(this).attr("data-moderation-status");
		}

		if(this.attrIsset("data-channel")){
			this.attributes.channel=$(this).attr("data-channel");
		}

		if(this.attrIsset("data-collection")){
			this.attributes.collection=$(this).attr("data-collection");
		}
		
		if(this.attrIsset("data-group")){
			this.attributes.groupid=$(this).attr("data-group");
		}

		if(this.attrIsset("data-width")){
		 	this.photoWidth = $(this).attr("data-width");
	   	}

	   	if(this.attrIsset("data-limit")){
		 	this.limit = $(this).attr("data-limit");
	   	}

	   	if(this.attrIsset("data-start")){
		 	this.startPosition = $(this).attr("data-start");
	   	}

		if(this.attrIsset("data-layout")){
			this.layout = $(this).attr("data-layout");
		}

		if(this.attrIsset("data-carousel-class")){
			SignUp.log("CAROUSEL CLASS="+$(this).attr("data-carousel-class"));
			this.carouselClassname = $(this).attr("data-carousel-class");
		}

		if(this.attrIsset("data-slider-class")){
			SignUp.log("SLIDER CLASS="+$(this).attr("data-slider-class"));
			this.sliderClassname = $(this).attr("data-slider-class");
		}

		if(this.attrIsset("data-thumb-class")){
			SignUp.log("THUMB CLASS="+$(this).attr("data-thumb-class"));
			this.thumbClassname = $(this).attr("data-thumb-class");
		}

		if(this.attrIsset("data-infinite-class")){
			SignUp.log("INFINITE CLASS="+$(this).attr("data-infinite-class"));
			this.infiniteClassname = $(this).attr("data-infinite-class");
		}

		if(this.attrIsset("data-photo-class")){
			SignUp.log("PHOTO CLASS="+$(this).attr("data-photo-class"));
			this.photoClassname = $(this).attr("data-photo-class");
		}

		if(this.attrIsset("data-photo-id")){
		 	this.photoID = $(this).attr("data-photo-id");
	   	}

	   	if(this.attrIsset("data-label")){
		 	this.label = $(this).attr("data-label");
	   	}

	   	if(this.attrIsset("data-photo-count")){
		 	this.visiblePhotos = $(this).attr("data-photo-count");
	   	}

		if(this.attrIsset("data-request-type")){
	 		this.requestType = $(this).attr("data-request-type");
   	  	}

   	  	if(this.attrIsset("data-infinite-window")){
	 		this.infiniteWindow = $(this).attr("data-infinite-window");
   	  	}

   	  	if(this.attrIsset("data-infinite-document")){
	 		this.infiniteDocument = $(this).attr("data-infinite-document");
   	  	}
		
	},

	attrIsset: function(name){

		return (typeof $(this).attr(name) !== "undefined" && $(this).attr(name).length > 0);

	},

	loadFMPhoto: function(){
		this.fmInit();

		if(this.requestType=="none"){
			$(this).append("<div class='loading'></di>");

			var that = this;
			var params = {
			    "method" :      'media.getFileInfo',
			    "id" : this.photoID
			}

			$.post('http://api.filemobile.com/services/json',params,function(data){
			    SignUp.log(data);
			    SignUp.log("successful ajax call in loadFMPhoto");
				if(data.status){
						var photo = data.result;
						var thediv = $("<div class='"+that.photoClassname+"'></div>");
						var thecaption = $("<div class='fm-photo-caption'></div>");
						var thewrapper = $("<div class='fm-photo-wrap'></div>")
						var theimg = $("<img />");
						thecaption.append("<div class='fm-single-photo-title'>"+photo.title+"</div>");
						thecaption.append("<div class='fm-single-photo-credit'>Photo By: "+photo.user_firstname+" "+photo.user_lastname+"</div>");
						
						theimg.attr("src",photo.thumbUrl+"/15");
						theimg.attr("title",photo.title);
						theimg.css("max-width",$(that).width()+"px");
						thewrapper.append(theimg)
						thediv.append(thewrapper);
						thediv.append(thecaption);
						that.html(thediv);	
				}
			});
		}

   	  

   	  return this.find( ":input" ).each(function() {
	    this.value = "";
	  }).end();
	},
	loadFMPhotos: function(show) {
		this.fmInit();
		

		if(typeof show == "undefined"){
			show = true;
		}
		var that = this;
		var params = {
		    "method" :      'media.getFiles',
		    "vhost" :       1097,
		    "limit" : this.limit,
		    "start" : this.startPosition,
		    "filters" :     this.attributes,
		    "fields" : this.fields
		}

		$.post('http://api.filemobile.com/services/json',params,function(data){
		    SignUp.log(data);
		    SignUp.log("successful ajax call in $.loadFMPhotos");
			if(data.status){
				that.photos = data.result.data;
				that.photoCount = data.result.totalCount;
				if(show){
					that.fmRenderGallery();
				}
			}else{
				SignUp.log("Get Photos Error: "+data.message);
			}
		});


	  return this.find( ":input" ).each(function() {
	    this.value = "";
	  }).end();
	},


    fmTimeSince: function(stamp){

    	return $.timeago(stamp);
		//SignUp.log(stamp);
		stamp = stamp.split(" ");
		//SignUp.log(stamp[1]);


		var date = Date.parse(stamp[0]);
		//SignUp.log(date);
		date = $(this).fmParseTime(stamp[1],date)


		//SignUp.log(date);
		
		var seconds = Math.floor((new Date() - date) / 1000);

	    var interval = Math.floor(seconds / 31536000);

	    if (interval > 1) {
	        return interval + " years";
	    }
	    interval = Math.floor(seconds / 2592000);
	    if (interval > 1) {
	        return interval + " months";
	    }
	    interval = Math.floor(seconds / 86400);
	    if (interval > 1) {
	        return interval + " days";
	    }
	    interval = Math.floor(seconds / 3600);
	    if (interval > 1) {
	        return interval + " hours";
	    }
	    interval = Math.floor(seconds / 60);
	    if (interval > 1) {
	        return interval + " minutes";
	    }
	    return Math.floor(seconds) + " seconds";
	},

	fmParseTime: function(timeStr, dt) {
	    if (!dt) {
	        dt = new Date();
	    }
	    if(typeof dt == "number"){
	    	dt = new Date(dt);
	    }

	    var time = timeStr.match(/(\d+)(?::(\d\d))?\s*(p?)/i);
	    if (!time) {
	        return NaN;
	    }
	    var hours = parseInt(time[1], 10);
	    if (hours == 12 && !time[3]) {
	        hours = 0;
	    }
	    else {
	        hours += (hours < 12 && time[3]) ? 12 : 0;
	    }

	    dt.setHours(hours);
	    dt.setMinutes(parseInt(time[2], 10) || 0);
	    dt.setSeconds(0, 0);
	    return dt;
	},


	fmPreloadImages: function(photos,callback){
		SignUp.log("DO SOMETHING WITH THE PHOTOS");
		var images = new Array()
		for(i=0;i<photos.length;i++){
			images[i] = new Image()
			images[i].src = photos[i].thumbUrl+"/14";
			//SignUp.log(photos[i].thumbUrl+"/14")
			//SignUp.log(i);
		}

		callback();
	},


	fmRenderGallery: function(){
		SignUp.log(this.photoCount);
		SignUp.log(this.layout);
		that = this;

		
		if(that.photoCount > 0){
			this.fmPreloadImages(this.photos,function(){
				console.log("IN HERE");		
				switch(that.layout){
					case "slider":
						that.fmRenderSlider();
						break;
					case "thumbs":
						that.fmRenderThumbs();
						break;
					case "lightbox":
						that.fmRenderLightbox();
						break;
					case "infinite":
						that.fmRenderInfinite();
						break;
					case "photo":
						that.fmRenderPhoto();
						break;
					case "carousel":
					default:
						that.fmRenderCarousel();
						break;
				}
			});
		}else{
			$(that).removeClass("loading");
		}
	},

	/*
	**** THIS VERSION USES TINY CAROUSEL

    *****/


	fmRenderSlider: function(){
		SignUp.log("Rendering "+this.photoCount+" photos in the Slider Style");
		
		var thecontainer = $("<div class='"+this.sliderClassname+"'></div>");	
		thecontainer.append('<a class="buttons prev-button prev" href="#"><</a>');
		var theviewport = $('<div class="viewport"></div>');

		var theul = $('<ul class="overview"></ul>');
		slidervar = this;
		for(var i = 0; i<this.photoCount; i++){
			if(this.photos[i] == undefined){continue;}
			var photo = this.photos[i];
			var the_name = "";

			if(typeof photo.metadataArray.user !== "undefined"){
				the_name = photo.metadataArray.user.name;
			}else{
				the_name = photo.user_firstname+" "+photo.user_lastname;
			}
			
			var theli = $("<li></li>");
			var thelink = $("<a class='pg-fancybox' data-fancybox-group='gallery' data-fancybox-type='image' data-fancybox-title=\""+photo.title+"\" data-photo-caption='"+photo.message+"' data-photo-timestamp='"+photo.upload+"'  data-photo-credit='"+the_name+"' data-photo-timestamp='"+photo.upload+"' data-photo-lastname='"+photo.user_lastname+"' data-photo-firstname='"+photo.user_firstname+"' data-fancybox-href='"+photo.publicUrl+"'></a>");

			thelink.attr("href",photo.publicUrl);
			thelink.attr("title",photo.title);
			thelink.attr("data-photo-id",photo.id);
			thelink.attr("id","photo-"+photo.id);
			
			var theimg = $("<img />");

			theimg.attr("src",photo.thumbUrl+"/14");
			theimg.attr("width",this.photoWidth);
			theimg.attr("data-photo-title",photo.title);
			theimg.attr("data-photo-caption",photo.message);			
			theimg.attr("data-photo-timestamp",this.fmTimeSince(photo.upload));
			thelink.attr("data-photo-id",photo.id);
			thelink.attr("id","photo-"+photo.id);
			
			if(!viewport.mobile){
				thelink.append(theimg);
				theli.append(thelink);
			}else{
				theli.append(theimg);
			}
			
			theul.append(theli);
		}
		theviewport.append(theul);
		thecontainer.append(theviewport);
		thecontainer.append('<a class="buttons next-button next" href="#">></a>');
		console.log(this);
		$(this).append(thecontainer);
		if(this.label !== undefined && this.label.length>0){thecontainer.before("<h2>"+this.label+"</h2>")}
		$(thecontainer).tinycarouselreloaded({animationTime:500});

		$(thecontainer).data("plugin_tinycarouselreloaded").forward = function (elem){ 
			var visible = Math.floor(elem.find(".viewport").width()/elem.find(".viewport li").width()); 
			visible = (visible > 0) ? visible : 1;
			var targetSlide = Math.floor(elem.data("plugin_tinycarouselreloaded").slideCurrent)+visible;
			SignUp.log(targetSlide);
			elem.data("plugin_tinycarouselreloaded").move(targetSlide);
		}

		$(thecontainer).data("plugin_tinycarouselreloaded").backward = function (elem){ 
			var visible = Math.floor(elem.find(".viewport").width()/elem.find(".viewport li").width()); 
			visible = (visible > 0) ? visible : 1;
			var targetSlide = Math.floor(elem.data("plugin_tinycarouselreloaded").slideCurrent)-visible;
			SignUp.log(targetSlide);
			elem.data("plugin_tinycarouselreloaded").move(targetSlide);
		}

		$(thecontainer).find(".prev-button").off();
		$(thecontainer).find(".next-button").off();

		$(thecontainer).find(".prev-button").on("click",function(e){
			e.preventDefault();
			var box = $(this).parent();
			box.data("plugin_tinycarouselreloaded").backward(box);
		})

		$(thecontainer).find(".next-button").on("click",function(e){
			e.preventDefault();
			var box = $(this).parent();
			box.data("plugin_tinycarouselreloaded").forward(box);
		})

		

		if(!viewport.mobile){
			$(".pg-fancybox").fancybox({
				type:"image",
				helpers: {
					title: {
						type: 'inside'
					}
				},
				afterLoad:function(){FMDriver.logHit(this.element);},
				beforeShow: function(){		

					var thecaption = $("<div class='fm-infinite-caption'></div>");
					thecaption.append("<div class='fm-infinite-photo-title'><strong>"+this.title+"</strong></div>");
					thecaption.append("<p class='fm-infinite-photo-message'>"+$(this.element).attr("data-photo-caption")+"</p>");
					thecaption.append("<div class='fm-infinite-photo-credit' style='font-style:italic; '>Taken By: "+$(this.element).attr("data-photo-credit")+"</div>");


					var thesocial = $("<div class='fm-infinite-social' />")
					var imgURL = encodeURIComponent($(this.element).attr("href"));
					var pageURL = encodeURIComponent('http://www.post-gazette.com/ugc-photos/?photo='+$(this.element).attr("data-photo-id"));

					var thefblink = $('<a class="btn-small btn-circle"><i class="icon icon-facebook"></i></a>');
					var thegplink = $('<a class="btn-small btn-circle"><i class="icon icon-google-plus"></i></a>');
					var theptlink = $('<a class="btn-small btn-circle"><i class="icon icon-pinterest"></i></a>');
					var thetwlink = $('<a class="btn-small btn-circle"><i class="icon icon-twitter"></i></a>');
					UGCSECTION = (typeof UGCSECTION !== "undefined") ? UGCSECTION : "general";;


					thefblink.attr("href",'http://www.facebook.com/sharer.php?s=100&p[title]='+encodeURIComponent(this.title) + '&p[summary]=' + encodeURIComponent("It's MyBurgh") + '&p[url]=' + pageURL + '&p[images][0]=' + imgURL);//"href","https://www.facebook.com/sharer/sharer.php?u="+pageURL+"&display=popup");

					//thefblink.attr("href","https://www.facebook.com/sharer/sharer.php?u="+pageURL+"&display=popup");
					thefblink.attr("target","social_blank");
					thesocial.append(thefblink);

					thetwlink.attr("href","http://twitter.com/home?status="+encodeURIComponent(this.title)+"+"+pageURL+"%26utm_source=twitter%26utm_campaign="+encodeURIComponent(UGCSECTION)+"%26utm_medium=myburgh%20@pittsburghpg");				
					thetwlink.attr("target","social_blank");
					thesocial.append(thetwlink);

					thegplink.attr("href","https://plus.google.com/share?url="+pageURL);
					thegplink.attr("target","social_blank");
					thesocial.append(thegplink);

					theptlink.attr("href","http://www.pinterest.com/pin/create/button/?url="+pageURL+"&media="+$(this.element).attr("href")+"&description="+photo.message);
					theptlink.attr("target","social_blank");
					thesocial.append(theptlink);



					this.title = "<div class='gallery-photo-caption'>"+thecaption.html()+"</div>";
					this.title += "<div class='gallery-photo-timestamp'>Uploaded: "+thecontainer.fmTimeSince($(this.element).attr("data-photo-timestamp"))+"</div>";
					this.title += '<div>'+thesocial.html()+'</div><div style="clear:both"></div>';










					/*this.title = "<div class='gallery-photo-title'>"+this.title+"</div>";
					this.title += "<div class='gallery-photo-credit'>Taken By: "+$(this.element).attr("data-photo-firstname")+" "+$(this.element).attr("data-photo-lastname")+"</div>";
					this.title += "<div class='gallery-photo-timestamp'>Uploaded: "+slidervar.fmTimeSince($(this.element).attr("data-photo-timestamp"))+"</div>";
					this.title += '<div id="sharre"></div><div style="clear:both"></div>';*/
					SignUp.log(this.title);
				},
				afterShow: function() {
				}
			});/**/
		}

		if(typeof(Modernizr) !== "undefined" && Modernizr.touch){
			SignUp.log("Add Swipe");
			$(thecontainer).swipe( {
				//Generic swipe handler for all directions
				swipeLeft:function(event, direction, distance, duration, fingerCount) {
					console.log("swipe left");
					console.log(event);
					//alert("swipe left");
					var box = $(this).data("plugin_tinycarouselreloaded");
					box.forward($(this));
				},
				swipeRight: function(event, direction, distance, duration, fingerCount) {
					console.log("swipe right");
					console.log(event);
					//alert("swipe right");
					var box = $(this).data("plugin_tinycarouselreloaded");
					box.backward($(this));
					//$(this).parent().carousel('next'); 
				},
				//Default is 75px, set to 0 for demo so any distance triggers swipe
				threshold:0
			});			
		}else{
			SignUp.log("No Swipe");
		}

		$(slidervar).removeClass("loading");
/*
		$(thecontainer).swiperight(function() {  
    		  //$(this).carousel('prev');
    		  console.log("swipe right");
    		  //alert("swipe right");
    		  var box = $(this).data("plugin_tinycarouselreloaded");
    		  box.move(box.slideCurrent-1)
	    });  
		$(thecontainer).swipeleft(function() {
			console.log("swipe left");
			//alert("swipe left");
			var box = $(this).data("plugin_tinycarouselreloaded");
			box.move(box.slideCurrent+1)

		    //  $(this).carousel('next');  
	   	});*/  
	},
	
	fmRenderThumbs: function(){
		SignUp.log("Rendering "+this.photoCount+" photos in the Thumbnail Style");
		SignUp.log(this.thumbClassname);
		var thecontainer = $("<div class='"+this.thumbClassname+"'></div>");
		var thehero = $("<div class='hero-image'></div>");

		var thehimg = $("<img />");
			thehimg.attr("src",this.photos[0].publicUrl);
		thehero.append(thehimg);
		thecontainer.append(thehero);



		for(var i = 0; i<this.photos.length; i++){
			if(this.photos[i] == undefined){continue;}
			var thediv = $("<div class='gallery-photo'></div>");
			
			var thelink = $("<a></a>");
			thelink.attr("href",this.photos[i].publicUrl);
			thelink.attr("title",this.photos[i].title);
			
			var theimg = $("<img />");
			theimg.attr("src",this.photos[i].thumbUrl+"/14");
			theimg.attr("width",this.photoWidth);
			
			var thedetails = $("<div class='photo-details'></div>");

			thedetails.append("<div class='photo-title'>"+this.photos[i].title+"</div>");
			thedetails.append("<div class='photo-caption'>"+this.photos[i].message+"</div>");
			thedetails.append("<div class='photo-timestamp'>"+this.fmTimeSince(this.photos[i].upload)+"</div>");
			
			thelink.append(theimg);
			thediv.append(thelink);
			thediv.append(thedetails);
			thecontainer.append(thediv);
		}

		thecontainer.append("<div style='clear:both'></div>")
		$(this).append(thecontainer);
		this.fmThumbsInit();
		$(this).removeClass("loading");
	},
	fmThumbsInit: function(){
		var gallery = this.find("."+this.thumbClassname);

		gallery.find(".gallery-photo a").click(function(e){
			e.preventDefault();
			var theimage = $(this).find("img");
			SignUp.log(theimage);
			$(gallery).find(".hero-image img").attr("src", theimage.attr('src'));
		})
	},
	fmRenderLightbox: function(render){
		if(typeof render == "undefined"){
			render = true;
		}

		//SignUp.log("Rendering "+this.photoCount+" photos in the Thumbnail Style");
		//SignUp.log(this.thumbClassname);
		var thecontainer = $("<div class='"+this.thumbClassname+"'></div>");

		for(var i = 0; i<this.photos.length; i++){
			var thediv = $("<div class='gallery-photo'></div>");
			
			var thelink = $("<a class='gallery-popup-link pg-fancybox' data-fancybox-group='gallery' data-fancybox-type='image' data-fancybox-title=\""+this.photos[i].title+"\" data-fancybox-href='"+this.photos[i].publicUrl+"' data-photo-lastname='"+photo.user_lastname+"' data-photo-firstname='"+photo.user_firstname+"'></a>");
			thelink.attr("href",this.photos[i].publicUrl);
			thelink.attr("title",this.photos[i].title);

			
			var theimg = $("<img />");
			theimg.attr("src",this.photos[i].thumbUrl+"/14");
			theimg.attr("width",this.photoWidth);
			theimg.attr("data-photo-title",this.photos[i].title);
			theimg.attr("data-photo-caption",this.photos[i].message);
			thelink.attr("data-photo-id",this.photos[i].id);
			theimg.attr("data-photo-timestamp",this.fmTimeSince(this.photos[i].upload));
			thelink.append(theimg);
			thediv.append(thelink);
			thecontainer.append(thediv);
		}
		$(this).append(thecontainer);

		$(".pg-fancybox").fancybox({
			type:"image",
			afterLoad:function(){FMDriver.logHit(this.element);},
			beforeShow: function(){
				this.title += '<br />';
				this.title += '<div id="sharre"></div>';
				SignUp.log(this.title);
			},
			afterShow: function() {
				// Render tweet button
				$('#sharre').sharrre({
				  share: {
					googlePlus: true,
					facebook: true,
					twitter: true,
					pinterest: true
				  },
				  url: 'http://www.post-gazette.com/ugc/?mid='+$(this.element).attr("data-photo-id"),
				  enableHover: false
				});
			}
		});



		if(render){
			this.fmLightboxInit();
		}
	},
	fmLightboxInit: function(){

		this.append("<div id='more'>Loading More Content</div>");
		this.append("<div id='no-more'>No More Photos to display</div>");


		pages = this.photoCount/this.limit;
		pagelimit = this.limit;

		infinite = this;
		ajaxSent = false;
		page = 1;             
		
		$(window).scroll(function () {                 
				$('#more').hide();                 
				$('#no-more').hide();                 
				if($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
                	$('#more').css("top","400");
                	$('#more').show();
            	}
            	if($(window).scrollTop() + $(window).height() == $(document).height()) {
					$('#more').hide();
                	$('#no-more').hide();
                	var data = {
                    	page_num: page
                	};

                	var actual_count = pages;

                	if(page+1 > pages ){
                    	$('#no-more').css("top","400");
                    	$('#no-more').show();
                	}else{
                		

						if(!ajaxSent){
							SignUp.log("GET MORE PHOTOS");

                    		var params = {
							    "method" :      'media.getFiles',
							    "vhost" :       1097,
							    "limit" : infinite.limit,
							    "start" : page*infinite.limit,
							    "filters" :     infinite.attributes
							}
							ajaxSent=true;
							$.post('http://api.filemobile.com/services/json',params,function(data){
							    SignUp.log(data);
							    SignUp.log("Successfully Got More Photos");
								if(data.status){
									infinite.photos = data.result.data;
									infinite.photoCount = data.result.totalCount;
									infinite.fmRenderLightbox(false);
									page+=1;
									ajaxSent=false;
									(function(window,undefined){

									    // Bind to StateChange Event
									    History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
									        var State = History.getState(); // Note: We are using History.getState() instead of event.state
									    });

									    // Change our States
									    History.pushState({state:1}, "Page "+page, "?start="+(page-1)*infinite.limit+"&limit="+infinite.limit); // logs {state:1}, "State 1", "?state=1"

									})(window);


								}else{
									SignUp.log("Get Photos Error: "+data.message);
								}
							});
							
						}




                	}

            }

        });

	},

	fmRenderInfinite: function(render){
		if(typeof render == "undefined"){
			render = true;
		}

		if(render){
			var thecontainer = $("<div class='"+this.infiniteClassname+"'></div>");
		}else{
			var thecontainer = $("."+this.infiniteClassname);
		}

		//SignUp.log("Rendering "+this.photoCount+" photos in the Thumbnail Style");
		SignUp.log(this.infiniteClassname);

		for(var i = 0; i<this.photos.length; i++){
			if(this.photos[i] == undefined){continue;}
			var photo = this.photos[i];
			var the_name = "";

			if(typeof photo.metadataArray.user !== "undefined"){
				the_name = photo.metadataArray.user.name;
			}else{
				the_name = photo.user_firstname+" "+photo.user_lastname;
			}
			var thediv = $("<div class='infinite-photo'></div>");
			var thelink = $("<a class='infinite-link pg-fancybox' data-fancybox-group='gallery' data-fancybox-type='image' data-fancybox-title='"+photo.title+"' data-photo-caption='"+photo.message+"' data-photo-timestamp='"+photo.upload+"'  data-photo-credit='"+the_name+"' data-photo-lastname='"+photo.user_lastname+"' data-photo-firstname='"+photo.user_firstname+"' data-fancybox-href='"+photo.publicUrl+"'></a>");
			var theimg = $("<img />");
			var thecaption = $("<div class='fm-infinite-caption'></div>");
			thecaption.append("<div class='fm-infinite-photo-title'>"+photo.title+"</div>");
			thecaption.append("<div class='fm-infinite-photo-credit'>Photo By: "+the_name+"</div>");
			thelink.attr("href",photo.publicUrl);
			thelink.attr("title",photo.title);
			UGCSECTION = (typeof UGCSECTION !== "undefined") ? UGCSECTION : "general";;
			

			var thesocial = $("<div class='fm-infinite-social' />")
			var imgURL = encodeURIComponent(photo.publicUrl);
			var pageURL = encodeURIComponent('http://www.post-gazette.com/ugc-photos/?photo='+photo.id);

			var thefblink = $('<a class="btn-small btn-circle"><i class="icon icon-facebook"></i></a>');
			var thegplink = $('<a class="btn-small btn-circle"><i class="icon icon-google-plus"></i></a>');
			var theptlink = $('<a class="btn-small btn-circle"><i class="icon icon-pinterest"></i></a>');
			var thetwlink = $('<a class="btn-small btn-circle"><i class="icon icon-twitter"></i></a>');


			
			thefblink.attr("href",'http://www.facebook.com/sharer.php?s=100&p[title]='+encodeURIComponent(photo.title) + '&p[summary]=' + encodeURIComponent(photo.message) + '&p[url]=' + pageURL + '&p[images][0]=' + imgURL);//"href","https://www.facebook.com/sharer/sharer.php?u="+pageURL+"&display=popup");


			thefblink.attr("target","social_blank");
			thesocial.append(thefblink);

			thetwlink.attr("href","http://twitter.com/home?status="+encodeURIComponent(photo.title)+"+"+pageURL+"%26utm_source=twitter%26utm_campaign="+encodeURIComponent(UGCSECTION)+"%26utm_medium=myburgh%20@pittsburghpg");
			thetwlink.attr("target","social_blank");
			thesocial.append(thetwlink);

			thegplink.attr("href","https://plus.google.com/share?url="+pageURL);
			thegplink.attr("target","social_blank");
			thesocial.append(thegplink);

			theptlink.attr("href","http://www.pinterest.com/pin/create/button/?url="+pageURL+"&media="+photo.publicUrl+"&description="+photo.message);
			theptlink.attr("target","social_blank");
			thesocial.append(theptlink);


			
			theimg.attr("src",photo.thumbUrl+"/14");
			theimg.attr("width",this.photoWidth);
			theimg.attr("data-photo-title",photo.title);
			theimg.attr("data-photo-caption",photo.message);
			theimg.attr("data-photo-timestamp",this.fmTimeSince(photo.upload));
			thelink.attr("data-photo-id",photo.id);
			thelink.attr("id","photo-"+photo.id);
			thelink.append(theimg);
			thediv.append(thelink);
			thediv.append(thecaption);
			thediv.append(thesocial);
			thecontainer.append(thediv);
		}
		$(this).html(thecontainer);

		if(!viewport.mobile){
			$(".pg-fancybox").fancybox({
				type:"image",
				helpers: {
					title: {
						type: 'inside'
					}
				},
				afterLoad:function(){FMDriver.logHit(this.element);},
				beforeShow: function(){	


					var thecaption = $("<div class='fm-infinite-caption'></div>");
					thecaption.append("<div class='fm-infinite-photo-title'><strong>"+this.title+"</strong></div>");
					thecaption.append("<p class='fm-infinite-photo-message'>"+$(this.element).attr("data-photo-caption")+"</p>");
					thecaption.append("<div class='fm-infinite-photo-credit' style='font-style:italic; '>Taken By: "+$(this.element).attr("data-photo-credit")+"</div>");


					var thesocial = $("<div class='fm-infinite-social' />")
					var imgURL = encodeURIComponent($(this.element).attr("href"));
					var pageURL = encodeURIComponent('http://www.post-gazette.com/ugc-photos/?photo='+$(this.element).attr("data-photo-id"));

					var thefblink = $('<a class="btn-small btn-circle"><i class="icon icon-facebook"></i></a>');
					var thegplink = $('<a class="btn-small btn-circle"><i class="icon icon-google-plus"></i></a>');
					var theptlink = $('<a class="btn-small btn-circle"><i class="icon icon-pinterest"></i></a>');
					var thetwlink = $('<a class="btn-small btn-circle"><i class="icon icon-twitter"></i></a>');
					UGCSECTION = (typeof UGCSECTION !== "undefined") ? UGCSECTION : "general";;


					thefblink.attr("href",'http://www.facebook.com/sharer.php?s=100&p[title]='+encodeURIComponent(this.title) + '&p[summary]=' + encodeURIComponent("It's MyBurgh") + '&p[url]=' + pageURL + '&p[images][0]=' + imgURL);//"href","https://www.facebook.com/sharer/sharer.php?u="+pageURL+"&display=popup");

					//thefblink.attr("href","https://www.facebook.com/sharer/sharer.php?u="+pageURL+"&display=popup");
					thefblink.attr("target","social_blank");
					thesocial.append(thefblink);

					thetwlink.attr("href","http://twitter.com/home?status="+encodeURIComponent(this.title)+"+"+pageURL+"%26utm_source=twitter%26utm_campaign="+encodeURIComponent(UGCSECTION)+"%26utm_medium=myburgh%20@pittsburghpg");				
					thetwlink.attr("target","social_blank");
					thesocial.append(thetwlink);

					thegplink.attr("href","https://plus.google.com/share?url="+pageURL);
					thegplink.attr("target","social_blank");
					thesocial.append(thegplink);

					theptlink.attr("href","http://www.pinterest.com/pin/create/button/?url="+pageURL+"&media="+$(this.element).attr("href")+"&description="+photo.message);
					theptlink.attr("target","social_blank");
					thesocial.append(theptlink);



					this.title = "<div class='gallery-photo-caption'>"+thecaption.html()+"</div>";
					this.title += "<div class='gallery-photo-timestamp'>Uploaded: "+infinite.fmTimeSince($(this.element).attr("data-photo-timestamp"))+"</div>";
					this.title += '<div>'+thesocial.html()+'</div><div style="clear:both"></div>';

					SignUp.log(this.title);
				},
				afterShow: function() {
					// Render tweet button
					$('#sharre').sharrre({
					  share: {
					    googlePlus: true,
					    facebook: true,
					    twitter: true,
					    linkedin: true
					  },
					  buttons: {
					    googlePlus: {size: 'tall', annotation:'bubble'},
					    facebook: {layout: 'box_count'},
					    twitter: {count: 'vertical'},
					    linkedin: {counter: 'top'}
					  },
					  url: 'http://www.post-gazette.com/ugc-photos/?photo='+$(this.element).attr("data-photo-id"),
					  enableHover: false,
					  enableCounter: false,
					  enableTracking: true
					});
				}
			});/**/
		}
		
		
		if(render){
			infinite=this;
			SignUp.log("MAYBE?");
			$(thecontainer).imagesLoaded(function(){
				SignUp.log("Images Loaded")
				infinite.fmInfiniteInit({obj:thecontainer,className:infinite.infiniteClassname,infiniteWindow: infinite.infiniteWindow});
			});
			
		}
		if(this.label !== undefined && this.label.length>0){thecontainer.before("<h2>"+this.label+"</h2>")}
		$(this).removeClass("loading");
	},

	fmSetColumns : function() { infinitecolumns = $( infinite.infiniteWindow ).width() > 960 ? 4 : $( infinite.infiniteWindow ).width() > 640 ? 3 : $( infinite.infiniteWindow ).width() > 320 ? 2 : 1; },


	fmInfiniteInit: function(obj){
		SignUp.log("Hopefully");
		this.append("<div id='more' class='loading'>Loading More Content</div>");
		this.append("<div id='no-more' class='well well-sm' style='text-align:center'><strong>End of Content</strong></div>"); 
		pages = this.photoCount/this.limit;
		pagelimit = this.limit;

		infinitecolumns    = 3;
		
		infinite = this;
		ajaxSent = false;
		page = 1;
		infinite.fmSetColumns();
        $( window ).resize( infinite.setColumns );             
		thecontainer = $('.pgfmgallery .'+obj.className);
		setTimeout(function(){
			SignUp.log("DESTROYED FIRST INSTANCE");
			thecontainer.masonry({
		        itemSelector: '.infinite-photo'
		    });
			$(infinite.infiniteWindow).scroll(infinite.fmInfiniteScroll);
		},1000);

	},

	fmInfiniteScroll: function () {                 
			$('#more').hide();                 
			$('#no-more').hide();                 
			if($(infinite.infiniteWindow).scrollTop() + $(infinite.infiniteWindow).height() > $(infinite.infiniteDocument).height() - ($(infinite.infiniteDocument).height()/4)) {
            	$('#more').css("top","400");
            	$('#more').show();
        	}
        	var scrollPos = $(infinite.infiniteWindow).scrollTop() + $(infinite.infiniteWindow).height();
        	var testHeight = $(infinite.infiniteDocument).height()-($(infinite.infiniteDocument).height()/4);
        	SignUp.log("LEFT SIDE: "+scrollPos);
        	SignUp.log("RIGHT SIDE: "+testHeight);
        	if( scrollPos >= testHeight) {
				$('#more').hide();
            	$('#no-more').hide();
            	var data = {
                	page_num: page
            	};

            	var actual_count = pages;

            	if(page+1 > pages ){
                	$('#no-more').css("top","400");
                	$('#no-more').show();
                	SignUp.log("END OF FEED");
                	//thecontainer.masonry("destroy");
                	thecontainer.imagesLoaded(function(){thecontainer.masonry();});
                	$(infinite.infiniteWindow).off("scroll", infinite.fmInfiniteScroll);
            	}else{
            		

					if(!ajaxSent){
						SignUp.log("GET MORE PHOTOS");

                		var params = {
						    "method" :      'media.getFiles',
						    "vhost" :       1097,
						    "limit" : infinite.limit,
						    "start" : page*infinite.limit,
						    "filters" :     infinite.attributes,
						    "fields": infinite.fields
						}
						ajaxSent=true;
						$.post('http://api.filemobile.com/services/json',params,function(data){
						    SignUp.log(data);
						    SignUp.log("Successfully Got More Photos");
							if(data.status){
								infinite.photos = data.result.data;
								infinite.photoCount = data.result.totalCount;
								//thecontainer.masonry("destroy");
								infinite.fmRenderInfinite(false);
								thecontainer.imagesLoaded(function(){
									thecontainer.masonry();
								});
								page+=1;
								ajaxSent=false;
							}else{
								SignUp.log("Get Photos Error: "+data.message);
							}
						});
						
					}




            	}

        }

	},

	fmRenderCarousel: function(){
		SignUp.log("Rendering "+this.photos.length+" photos in the Carousel Style");
		var thecontainer = $("<div class='"+this.carouselClassname+"'></div>");	
		
		var theviewport = $('<div class="carousel-viewport"></div>');

		var theul = $('<ul class="carousel-overview"></ul>');
		var thecount = this.photos.length;

		for(var i = 0; i<thecount; i++){
			if(this.photos[i] == undefined){continue}
			var theli = $("<li></li>");
			
			/*var thelink = $("<a></a>");
			thelink.attr("href",this.photos[i].publicUrl);
			thelink.attr("title",this.photos[i].title);
			*/


			var theimg = $("<img />");
			theimg.attr("width",this.photoWidth);
			theimg.addClass("lazyOwl");
			theimg.attr("data-src",this.photos[i].thumbUrl+"/14");
			
			/*var thedetails = $("<div class='photo-details'></div>");

			thedetails.append("<div class='photo-title'>"+this.photos[i].title+"</div>");
			thedetails.append("<div class='photo-caption'>"+this.photos[i].message+"</div>");
			thedetails.append("<div class='photo-timestamp'>"+this.timesince(this.photos[i].upload)+"</div>");*/
			
			theli.append(theimg);
			theul.append(theli);
		}
		theviewport.append(theul);
		thecontainer.append(theviewport);
		thecontainer.append('<a href="#" class="jcarousel-control-prev">&lsaquo;</a>');
		thecontainer.append('<a href="#" class="jcarousel-control-next">&rsaquo;</a>');
		$(this).append(thecontainer);
		$(this).fmCarouselInit({className:this.carouselClassname});
	},

	fmCarouselInit: function(obj){
		SignUp.log("."+obj.className+" .carousel-overview");
		$("."+obj.className+" .carousel-overview").owlCarousel({
		    items : 4,
		    lazyLoad : true,
		    navigation : true
		}); 
	},


	fmRenderPhoto: function(){

		if(this.photoID < 0){
			$(this).append("<h3>Invalid Photo</h3>");
		}

		$(this).append("<div class='loading'></di>");

		var that = this;
		var params = {
		    "method" :      'media.getFileInfo',
		    "id" : this.photoID
		}

		$.post('http://api.filemobile.com/services/json',params,function(data){
		    SignUp.log(data);
		    SignUp.log("successful ajax call in fmRenderPhoto");
			if(data.status){
				var photo = data.result;
				var photowidth = Math.min(photo.width,1000,viewport.width);
				SignUp.log("DEFAULT WIDTH: 800");
				SignUp.log("VIEWPORT WIDTH:"+viewport.width);
				SignUp.log("PHOTO WIDTH:"+photowidth);
				SignUp.log("FINAL WIDTH:"+photowidth);

				var thediv = $("<div class='single-photo'></div>");
				var thecaption = $("<div class='single-photo-caption'></div>")
				thediv.css("max-width",photowidth);

				var theholder = $("<div class='col-xs-12'></div>");
			
				var theimg = $("<img />");

				var phototext = (photo.title != photo.message) ? "<h3 class='single-photo-title'>"+photo.title+"</h3><p class='single-photo-copy'>"+photo.message+"</p>" : "<h3 class='single-photo-title'>"+photo.title+"</h3>";
				
				thecaption.html(phototext);
				thecaption.append("<div class='single-photo-credit'>Taken By: "+photo.user_firstname+" "+photo.user_lastname+"</div>");
				thecaption.append("<div class='single-photo-timestamp'>Uploaded: "+that.fmTimeSince(photo.upload)+"</div>");

				theimg.attr("src",photo.publicUrl);
				theimg.attr("width","100%");
				theimg.attr("title",photo.title);
				theimg.attr("title",photo.message);
				theimg.attr("data-photo-timestamp",that.fmTimeSince(photo.upload));
				theholder.append(theimg);
				theholder.append(thecaption)
				theholder.append("<div id='pic-share' data-url='http://www.post-gazette.com/ugc-photos/?photo="+photo.id+"'></div>");
				thediv.append(theholder);
				that.html(thediv);
				$('#pic-share').sharrre({
				  share: {
				    googlePlus: true,
				    facebook: true,
				    twitter: true,
				    linkedin: true,
				    pinterest: false
				  },
				  buttons: {
				    googlePlus: {size: 'tall', annotation:'bubble'},
				    facebook: {layout: 'box_count'},
				    twitter: {count: 'vertical'},
				    linkedin: {counter: 'top'},
				    pinterest: {media: "http://www.post-gazette.com/ugc-photos/?photo="+photo.id, description: photo.message, layout: 'vertical'}
				  },
				  urlCurl: "",
				  enableHover: false,
				  enableCounter: false,
				  enableTracking: true
				});
			}else{
				$(that).html("<h3 class='warning'>Photo Could Not Be Found</h3>");
			}
		});
	}
});



FMDriver  = {
	initialized: false,
	init: function(){
		if(!$.fn.tinycarouselreloaded){
			FMDriver.loadScript("http://www.post-gazette.com/libercus/default/js/jquery.tinycarouselreloaded.min.js",FMDriver.start)

		}else{
			FMDriver.start();
		}
		
	},
	start: function(){
		if(!this.initialized){
			SignUp.log("INIT FM DRIVER");
			
			if($(".pguploaderframe").length > 0){
				var ulsource = "https://my.post-gazette.com/purchase/uploader?t=1";
				
				if($(".pguploaderframe").attr("data-collection").length > 0){
					ulsource =  ulsource + "&collection="+$(".pguploaderframe").attr("data-collection")
				}

				if($(".pguploaderframe").attr("data-channel").length > 0){
					ulsource =  ulsource + "&channel="+$(".pguploaderframe").attr("data-channel")
				}

				if($(".pguploaderframe").attr("data-group").length > 0){
					ulsource =  ulsource + "&group="+$(".pguploaderframe").attr("data-group")
				}

				if($(".pguploaderframe").attr("data-event").length > 0){
					ulsource =  ulsource + "&event="+$(".pguploaderframe").attr("data-event")
				}
				
				var uploadframe = $("<iframe />");
				uploadframe.attr("src", ulsource);	
				uploadframe.css("border","0px");
				uploadframe.css("width","100%");
				uploadframe.css("height","330px");
				
				
				$(".pguploaderframe").html(uploadframe);
			}

			if($(".pgfmbutton, .fmsharelink").length > 0){
				$(".pgfmbutton, .fmsharelink").on("click",function(e){
					FMDriver.ugcBtnClick(e);
				});
				$(".pgfmbutton, .fmsharelink").each(function(){
					var ulsource = "https://my.post-gazette.com/purchase/uploader?t=1";

					if($(this).attrIsset("data-collection")){
						ulsource =  ulsource + "&collection="+$(this).attr("data-collection")
					}

					if($(this).attrIsset("data-channel")){
						ulsource =  ulsource + "&channel="+$(this).attr("data-channel")
					}

					if($(this).attrIsset("data-group")){
						ulsource =  ulsource + "&group="+$(this).attr("data-group")
					}

					if($(this).attrIsset("data-event")){
						ulsource =  ulsource + "&event="+$(this).attr("data-event")
					}
					$(this).attr("href",ulsource);

					if($(this).attrIsset("data-button-style") && $(this).attr("data-button-style") == "button"){
						var thetext = ($(this).attrIsset("data-button-text")) ? $(this).attr("data-button-text") : $(this).text();
						var thelabel = ($(this).attrIsset("data-button-label")) ? $(this).attr("data-button-label") : "Upload Photo";

						var theWidget = $('<div class="upload-widget tw-bs" />')
						theWidget.append($("<h3/>").text(thetext));
						var theButton = $("<a />");
						theButton.addClass("pgfmbutton")
						theButton.addClass("btn")
						theButton.addClass("btn-block")
						theButton.addClass("btn-primary")
						theButton.addClass("btn-lg");
						theButton.attr("href",$(this).attr("href"));
						theButton.html('<i class="icon icon-cloud-upload"></i><span>'+thelabel+'</span>');
						theWidget.append(theButton);		    		
				    	$(this).replaceWith(theWidget);
					}

				})
			}


			if($(".pgfmphoto").length > 0){
				this.loadPhotos();

			}



			
			if($(".pgfmgallery").length > 0){
				this.loadGalleries();
			}

			this.initialized = true;
		}
	},
	loadGalleries: function(){
		$(".pgfmgallery").each(function(index, element) {
			$(this).addClass("loading");
			//SignUp.log($(this));
        	$(this).loadFMPhotos();
        });
	},

	loadPhotos: function(){
		$(".pgfmphoto").each(function(index, element) {
        	$(this).loadFMPhoto();
        });
	},


	loadScript: function(url, callback){

		    var script = document.createElement("script")
		    script.type = "text/javascript";

		    if (script.readyState){  //IE
		        script.onreadystatechange = function(){
		            if (script.readyState == "loaded" ||
		                    script.readyState == "complete"){
		                script.onreadystatechange = null;
		                callback();
		            }
		        };
		    } else {  //Others
		        script.onload = function(){
		            callback();
		        };
		    }

		    script.src = url;
		    document.getElementsByTagName("head")[0].appendChild(script);
	},

	vote: function(photo,rating){
		var params = {
			"method" :      'media.rateFile',
			"id" :         $(photo).attr("data-photo-id"),
			"rating" :        rating
		}
		
		$.post('http://api.filemobile.com/services/json',params
		,function(response){
			console.log(response);
		});
	},
	logHit: function(photo ) {
		SignUp.log("PHOTO");
		SignUp.log(photo);
		
		
		
		
		var params = {
			"method" :      'media.getFileInfo',
			"id" :      $(photo).attr("data-photo-id")
			}
		$.post('http://api.filemobile.com/services/json',params
		,function(response){
			SignUp.log("GET FILE INFO RESPONSE");
			SignUp.log(response);
			var params = {
			"method" :      'media.logHit',
			"fileId" :      response.result.id,
			"fileType" :    response.result.filetype,
			"fileSize" :    response.result.ofilesize
			}
	
			$.post('http://api.filemobile.com/services/json',params
			,function(response){
				SignUp.log("LOG HIT RESPONSE");
				SignUp.log(response);
			});
		});
	},
	
	addToFavorites: function(photo) {
		var params = {
			"method" :      'media.addToFavorites',
			"mid" :         $(photo).attr("data-photo-id"),
			"uid" :         SignUp.cookieVal(s.cookieNames.fuid)
		}
		
		$.post('http://api.filemobile.com/services/json',params
		,function(response){
			console.log(response);
		})
	},
	addToCollection: function(collection,mid) {
		var params = {
			"method" :      'collections.addFileToCollection',
		    "collection" :  collection,
		    "id" :          id
		}
		
		$.post('http://api.filemobile.com/services/json',params
		,function(response){
			console.log(response);
		})
	},


	ugcBtnClick: function(e){
			e.preventDefault();
			SignUp.log(e);
            SignUp.log("UGC Button Clicked");
            SignUp.log(this);
            SignUp.settings.clickTarget=e.currentTarget;
            if(SignUp.settings.haveLogin){FMDriver.ugcUploadModal() }else{
                	SignUp.gigyaLogin();
                	gigya.accounts.addEventHandlers({
                    		onLogin: FMDriver.ugcUploadModal
                	})
            } 
    },
    ugcUploadModal: function(){
    	SignUp.log("***** UGC UPLOAD MODAL *******");
    	SignUp.log(SignUp.settings.clickTarget);
    	fbwidth = Math.min(800,viewport.width);


    	if(viewport.mobile){
    		
    		rurl = $(SignUp.settings.clickTarget).attr("href")+"&pg_url="+window.location.href;
    		//SignUp.setCookie("rurl",rurl)
    		SignUp.log(rurl);
    		window.location=rurl;
    	}else{
		 	$.fancybox({
	            type: "iframe",
	            href:$(SignUp.settings.clickTarget).attr("href"),
	            openEffect: "none",
	            closeEffect: "none",
	            margin: 0,
	            padding: 0,
	            autoSize: !1,
	            autoResize: !0,
	            closeBtn: !0,
	            width: "800px",
	            height: "600px",
	            helpers: {
	                overlay: {
	                    closeClick: !0,
	                    locked: !1,
	                    css: {
	                        background: "rgba(0,0,0,.93)"
	                    }
	                }
	            }
	        });
	 	}

    }

}

/***** EOF Filemobile driver******/
