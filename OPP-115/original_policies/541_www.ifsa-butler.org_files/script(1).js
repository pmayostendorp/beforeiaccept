/**
 * Main JavaScript file
 *
 * @package     Slider
 * @version     1.6.0
 *
 * @author      Peter van Westen <peter@nonumber.nl>
 * @link        http://www.nonumber.nl
 * @copyright   Copyright © 2011 NoNumber! All Rights Reserved
 * @license     http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

window.addEvent( 'domready', function() {
	// Only do stuff if slider_nav is found
	if ( document.getElements( 'div.slider_slide' ).length && document.getElements( 'div.slider_content' ).length ) {
		(function() { Slider = new Slider(); }).delay( 100 );
	} else {
		// Try again 2 seconds later, because IE sometimes can't see object immediately
		(function() {
			if ( document.getElements( 'div.slider_slide' ).length && document.getElements( 'div.slider_content' ).length ) {
				Slider = new Slider();
			}
		}).delay( 2000 );
	}
});

var Slider = new Class({
	initialize: function()
	{
		var self = this;
		this.docScroll = new Fx.Scroll( window );
		this.containers = new Array();

		document.getElements( 'div.slider_container' ).each( function( container ) {
			if ( typeof( container ) != "undefined" ) {
				container.removeClass( 'slider_noscript' );

				var c_id = container.id.replace( 'slider_container_', '' );
				var active = 0;

				// add onclick events on slides and show them
				container.getElements( 'div.slider_slide' ).each( function( el ) {
					if ( typeof( el ) != "undefined" ) {
						if ( !el.hasClass( 'slide_noslide' ) ) {
							var id = el.id.replace( 'slider_slide_', '' );
							var set_id = id.slice( 0, id.indexOf( '-' ) );
							if ( set_id == c_id ) {
								self.containers[id] = c_id;
								// set first slide as active or active slide
								if ( el.hasClass( 'active' ) ) {
									active = id;
								}
								el.addEvent( 'click', function() { self.showSlide( id, c_id ); } );
							}
						}
					}
				});

				// add fx
				container.getElements( 'div.slider_content_wrapper' ).each( function( el ) {
					if ( typeof( el ) != "undefined" ) {
						el.setStyle( 'display', 'block' );
						var id = el.id.replace( 'slider_content_', '' );
						var set_id = id.slice( 0, id.indexOf( '-' ) );
						if ( set_id == c_id ) {
							el.fx = new Fx.Slide( el, { 'duration' : 0, onComplete: function() { self.autoHeight( el.getParent() );self.showItem( id ); } } );
							el.setStyle( 'visibility', 'hidden' );
							el.fx.hide();
						}
					}
				});

				if ( slider_use_cookies && active !== slider_url ) {
					active_cookie = self.getByCookie( c_id );
					if ( active_cookie ) {
						active = active_cookie;
					}
				}

				// add fx
				container.getElements( 'div.slider_item' ).each( function( el ) {
					if ( typeof( el ) != "undefined" ) {
						var id = el.id.replace( 'slider_item_', '' );
						var set_id = id.slice( 0, id.indexOf( '-' ) );
						if ( set_id == c_id ) {
							el.setStyle( 'display', 'block' );
							el.fade_in = new Fx.Tween( el, { property : 'opacity', 'duration' : slider_fade_in_speed } );
							el.fade_out = new Fx.Tween( el, { property : 'opacity', 'duration' : slider_fade_out_speed } );
							el.fx = new Fx.Slide( el, { 'duration' : slider_speed, onComplete: function() { self.autoHeight( el.getParent() );self.hideContent( id ); } } ).hide();
						}
					}
				});

				// hide content titles
				container.getElements( '.slider_title' ).each( function( el ) {
					if ( typeof( el ) != "undefined" ) {
						el.setStyle( 'display', 'none' );
					}
				});

				// show only active slide
				self.showSlide( active, c_id, 1, 0, ( active === slider_urlscroll ) );

				container.getElements( 'div.slider_slide' ).each( function( el ) {
					if ( typeof( el ) != "undefined" ) {
						el.setStyle( 'display', 'block' );
					}
				});
			}
		});

		// add onclick events on slide links {slidelink=...}
		document.getElements( 'a.slider_slidelink' ).each( function( el ) {
			if ( typeof( el ) != "undefined" && el.rel && typeof( self.containers[el.rel] ) != "undefined" ) {
				el.addEvent( 'click', function() {
					self.showSlide( el.rel, self.containers[el.rel], 0, 1, slider_slidelinkscroll );
				} );
				el.href = 'javascript://';
			}
		});
	},

	showSlide: function( id, c_id, first, open, scroll )
	{
		var self = this;
		var container = document.id( 'slider_container_'+c_id );
		var item = document.id( 'slider_slide_'+id );
		var show_slide = ( first || open || ( item && !item.hasClass( 'active' ) ) );

		// remove all active classes
		container.getElements( 'div.slider_slide' ).each( function( el ) {
			if ( typeof( el ) != "undefined" && el ) {
				var el_id = el.id.replace( 'slider_slide_', '' );
				var set_id = el_id.slice( 0, el_id.indexOf( '-' ) );
				if ( set_id == c_id ) {
					el.removeClass( 'show' );
				}
			}
		});

		if ( show_slide && typeof( item ) != "undefined" && item ) {
			item.addClass( 'show' );
			if ( first ) {
				item.addClass( 'active' );
			}
		}

		var el = document.id( 'slider_content_'+id );

		// show active blocks
		if ( typeof( el ) != "undefined" && el && typeof( el.fx ) != "undefined" ) {
			if ( show_slide ) {
				el.setStyle( 'visibility', 'visible' );
				el.fx.cancel();
				// show active content block
				if ( first ) {
					el.fx.show();
					this.autoHeight( el.getParent(), 1 );
				} else {
					el.fx.slideIn();
				}
				if ( scroll || item.hasClass( 'scroll' ) || ( slider_scroll && !first && !item.hasClass( 'noscroll' ) ) ) {
					if ( first || slider_scroll == 2 || item.hasClass( 'scroll' ) ) {
						if ( typeof( item ) != "undefined" && item ) {
							( function() { self.docScroll.cancel().toElement( item ); } ).delay( slider_speed );
						}
					} else {
						if ( typeof( container ) != "undefined" && container ) {
							this.docScroll.cancel().toElement( container );
							( function() { self.docScroll.cancel().toElement( container ); } ).delay( slider_speed );
						}
					}
				}
			}

			if ( show_slide || !first ) {
				if ( slider_use_cookies || slider_set_cookies ) {
					this.setCookie( id, c_id, show_slide );
				}
			}
		}

		// hide all non-active blocks
		container.getElements( 'div.slider_item' ).each( function( el ) {
			if ( typeof( el ) != "undefined" && el && typeof( el.fx ) != "undefined" ) {
				var el_id = el.id.replace( 'slider_item_', '' );
				var set_id = el_id.slice( 0, el_id.indexOf( '-' ) );
				if ( set_id == c_id ) {
					el.fx.cancel();
					if ( show_slide && id && el.id == 'slider_item_'+id ) {
						if ( first ) {
							el.fx.show();
							self.autoHeight( el.getParent() );
						}
					} else {
						el.fx.slideOut();
						el.fade_in.cancel();
						el.fade_out.cancel().start( 0 );
					}
				}
			}
		});
	},

	hideContent: function( id )
	{
		var item = document.id( 'slider_slide_'+id );
		if ( typeof( item ) != "undefined" && item && !item.hasClass( 'show' ) ) {
			// hide content block
			var el = document.id( 'slider_content_'+id );
			if ( typeof( el ) != "undefined" && el ) {
				el.fx.cancel().hide();
				el.setStyle( 'visibility', 'hidden' );
			}
			item.removeClass( 'active' );
		}
	},

	showItem: function( id )
	{
		var item = document.id( 'slider_slide_'+id );
		if ( typeof( item ) != "undefined" && item && item.hasClass( 'show' ) ) {
			item.addClass( 'active' );
			// show item block
			var el = document.id( 'slider_item_'+id );
			if ( typeof( el ) != "undefined" && el ) {
				el.removeClass( 'slider_item_inactive' );
				el.fx.cancel().slideIn();
				el.fade_out.cancel();
				el.fade_in.cancel().start( 1 );
			}
		}
	},

	autoHeight: function( el, force )
	{
		if ( typeof( el ) != "undefined" && el && el.getStyle( 'height' ) && ( force || parseInt( el.getStyle( 'height' ) ) > 0 ) ) {
			el.setStyle( 'height', 'auto' );
		}
	},

	setCookie: function ( id, c_id, add )
	{
		var set = c_id.slice( 0, c_id.indexOf( '___' ) );
		var obj = new Object();
		var cookies = Cookie.read( slider_cookie_name );
		if ( cookies ) {
			cookies = cookies.split( '___' );
			for( i = 0; i < cookies.length; i++ ) {
				var keyval = cookies[i].split( '=' );
				if ( keyval.length > 1 && keyval[0] != set ) {
					obj[keyval[0]] = keyval[1];
				}
			}
		}
		if ( add ) {
			obj[set] = id.slice( id.indexOf( '-' )+1 );
		}

		var arr = new Array();
		for( var i in obj ) {
			if ( i && obj[i] ) {
				arr[arr.length] = i+'='+obj[i];
			}
		}

		Cookie.write( slider_cookie_name, arr.join( '___' ) );
	},

	getByCookie: function ( c_id )
	{
		var set = c_id.slice( 0, c_id.indexOf( '___' ) );
		var cookies = Cookie.read( slider_cookie_name );
		if ( cookies ) {
			cookies = cookies.split( '___' );
			for( i = 0; i < cookies.length; i++ ) {
				if ( cookies[i] && cookies[i].slice( 0, cookies[i].indexOf( '=' ) ) == set ) {
					return c_id+'-'+cookies[i].slice( cookies[i].indexOf( '=' )+1 );
				}
			}
		}
		return 0;
	}
});