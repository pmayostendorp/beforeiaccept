(function(window, $){
    
    $.fn.pagination = function(method)
	{
	    var methods = {
	        'init' : function(options)
	        {
	            return this.each(function(){
	                var $el = $(this).empty(),
	                    settings = {
    	                    data : null,
    	                    addtl : null,
    	                    radius : 8,
    	                    space : $('<span />', {'class':'inline_block space', 'style':'width:4px;'})
    	                },
    	                page,
    	                p;
					if (typeof options !== 'undefined')
	                    $.extend(settings, options);
	                if (settings.data.pageCount < 2)
						return;
	                if (Number(settings.data.page) > settings.radius)
                    	$el.append(
                    	    $('<a />', {'href':'page:1'}).data('page', 1).html('First')).append(settings.space.clone()).append($('<span />').html(' .. ')
                    	);
                    for (var i=Number(settings.data.page)-settings.radius; i<Number(settings.data.page)+settings.radius; i++)
                    {
    					p = Number(i+1);
    					if (p < 1 || p > settings.data.pageCount)
    						continue;
    					page = $(document.createElement("a")).attr('href', 'page:' + p).data('page', p).html(p);
    					if (p == settings.data.page)
    						page.addClass('active');
    					$el.append(page);
    					if (i < Number(settings.data.page)+settings.radius-1)
    						$el.append(settings.space.clone());
    				}
                    if (Number(settings.data.page) + settings.radius < settings.data.pageCount)
                        $el.append(
                            $('<span />').html(' .. ')).append($('<a />', {'href':'page:' + settings.data.pageCount}).data('page', settings.data.pageCount).html('Last')
                        );
					if (settings.addtl !== null)
						$el.append(settings.addtl);
	            });
	        }
	    }
	    if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on $.pagination' );
		}
	}
    
})(window, window.jQuery);