(function(window, $){
    
    $.fn.imgShell = function(method)
    {
        var methods = {
            resize : function(nParentWidth, nParentHeight)
            {
                return this.each(function(){
                    var $el = $(this).css({'width':'auto','height':'auto'}),
                        nImgWidth = $el.width(),
                        nImgHeight = $el.height(),
                        nParentRatio = nParentWidth/nParentHeight,
                        nImgRatio = nImgWidth/$el.height(),
                        nWidth = nParentRatio > nImgRatio ? (nParentHeight/nImgHeight*nImgWidth) : nParentWidth,
                        nHeight = nParentRatio > nImgRatio ? nParentHeight : (nParentWidth/nImgWidth*nImgHeight);
                        
            		if (nWidth > nImgWidth)
            			nWidth = nImgWidth;

            		if (nHeight > nImgHeight)
            			nHeight = nImgHeight;

            		return $el.css({'width':nWidth,'height':nHeight});
                });
            },
            init : function(options)
            {
                return this.each(function(){
                    var $el = $(this);
                    if (typeof $el.data('imgsrc') === 'undefined' || typeof $el.data('imgShell') !== 'undefined')
						return;
					var settings = {width:null, height:null},
					    domImg = $('<img />').css('opacity', 0),
					    sSrc = $el.data('imgsrc');
					if (typeof options !== 'undefined')
					    $.extend(settings, options);
					if (settings.width === null)
					    settings.width = $el.width();
				    if (settings.height === null)
					    settings.height = $el.height();
					$el.append(domImg);
					domImg.bind({
						load : function()
						{
							domImg.imgShell('resize', settings.width, settings.height).animate({opacity:1}, 300);
						}
					});
					domImg.attr('src', sSrc);
					$el.data('imgShell', true);
                });
            }
        }
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on $.imgShell' );
        }
    }
})(window, window.jQuery);