/*
	NAME:		jQuery Frame Plugin
	AUTHOR: 	Chris Norton
	VERSION:	2.0.1  updated:12/19/2012
	WEBSITE:	http://infinityspiral.github.com/jQuery-Frame-Plugin/
*/
(function($){
	var methods = {
		init:function(options, callback) {
			var settings = $.extend({
				callback:callback,
				size:((typeof options == 'number')? options : 100 ),
				className:'frame',
				fill:true, //if false then image is simple shrunk to fit
				orientation:'unknown',
				hAlign: 'center',
				vAlign: 'center'
			}, options);
			
			return this.each(function(){
				var $this = $(this);
					$this.hide();
					$this.data(settings);
					
					//wait for images to load otherwise they may show up as nothing
					$(window).load(function(){
						$this.data().oWidth = $this.width();
						$this.data().oHeight = $this.height();
						$this.frame('resize');
					});
			});
		
		},
		resize:function(){
			return this.each(function(){
				$this = $(this);
				var oWidth = $this.data().oWidth;
				var oHeight = $this.data().oHeight;

				// get orientation
				if( oWidth && oHeight ){
					if(oWidth>oHeight){
						$this.data().orientation = 'horizontal';
						
						if(!$this.data().fill){
							$this.css({
								width:$this.data().size,
								height:Math.round( oHeight * ($this.data().size/oWidth) )
							});
						}else{
							$this.css({
								height:$this.data().size,
								width:Math.round( oWidth * ($this.data().size/oHeight) )
							});
						}
					}else if(oWidth<oHeight){
						$this.data().orientation = 'vertical';
						if(!$this.data().fill){
							$this.css({
								height:$this.data().size,
								width:Math.round( oWidth * ($this.data().size/oHeight) )
							});
						}else{
							$this.css({
								width:$this.data().size,
								height:Math.round( oHeight * ($this.data().size/oWidth) )
							});
						}
					}else{
						$this.data().orientation = 'square';
						$this.css({
							width:$this.data().size,
							height:$this.data().size
						});
					};
				}else{
					$this.css({
						width:$this.data().size,
						height:$this.data().size
					});
				};
				
				// create frame parent
				$this.css('position','absolute').wrap('<span class="'+$this.data().className+'" />');
				var $frame = $this.parent();
					$frame.css({
						width:(!$this.data().fill) ? $this.width() : $this.data().size,
						height:(!$this.data().fill) ? $this.height() : $this.data().size,
						display:'block',
						overflow:'hidden',
						position:'relative'
					});
					
					//(!$this.data().fill && $this.data().orientation == 'horizontal') ? 'auto' : $this.data().size; 
					
					
				// align
				var $vAlign = $this.data().vAlign;
				var $hAlign = $this.data().hAlign;

				var hDif = $frame.width() - $this.width();
				var vDif = $frame.height() - $this.height();
				
				
				//vertical align
				if($vAlign == 'center'){
					if(vDif) $this.css('top', vDif/2);
				}else if($vAlign == 'bottom'){
					$this.css('top', vDif)
				}
				
				if($hAlign == 'center'){
					if(hDif) $this.css('left', hDif/2);
				}else if($hAlign == 'right'){
					$this.css('left', hDif);
				}
				
				$this.show();

				if (typeof $this.data().callback == 'function')
					$this.data().callback.call(this); // brings the scope to the callback
				
			});
		}
	};
	$.fn.frame = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || typeof method === 'number' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.frame' );
		};
	};
})(jQuery);