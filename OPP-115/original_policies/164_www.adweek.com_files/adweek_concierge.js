$(window).load(function() {
  
  modConciergePopup = function() {
    var $thumb = $('#sailthru-concierge').find('.recommendationThumb'),
        $details = $('#sailthru-concierge').find('.recommendationDetails'),
        $image = $('#sailthru-concierge').find('img');

    $("<img/>").attr("src", $image.attr("src")).load(function() { 
      var imgsize = [],
          minwidth = 50,
          maxwidth = 85,
          minheight = 50,
          maxheight = 75;
          detailswidth = 205;

      imgw = this.width; 
      imgh = this.height; 

      imgsize.push(parseInt(imgw), parseInt(imgh));

      if (imgsize.length > 0) {
        imgw = imgsize[0];
        imgh = imgsize[1];
        if (imgw > imgh) { 
          $thumb.addClass('landscape');
          kf = imgh/minheight;
          _imagew = imgw/kf;
          _thumbw = (Math.floor(_imagew) <= maxwidth) ? Math.floor(_imagew) : maxwidth;
          _detailsw = (detailswidth - (_thumbw - minwidth));
          $image.attr('height', minheight);
          $thumb.css('width', _thumbw + "px");
          $details.css('width', _detailsw + "px");
        } else { 
          $thumb.addClass('portrait');
          kf = imgw/minwidth;
          _imageh = imgh/kf;
          _thumbh = (Math.floor(_imageh) <= maxheight) ? Math.floor(_imageh) : maxheight;
          $image.attr('width', minwidth);
          $thumb.css('height', _thumbh + "px");
        }
      }
    });

    console.log("Modify Concierge popup");
  }

  var step = 1;
  chekConciergePopup = setInterval(function() {
    img = $('#sailthru-concierge').find('img').attr('src');
    if (img) {
      clearInterval(chekConciergePopup);
      modConciergePopup();
    } else if (step >= 20) {
      clearInterval(chekConciergePopup);
    }
    ++step;
  }, 500);


});
