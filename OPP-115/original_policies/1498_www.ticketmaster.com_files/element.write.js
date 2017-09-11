/*
 * HTML Parser By Noah Sloan (http://noahsloan.com)
 * Supports parsing HTML in incomplete fragments.
 *
 * Modified from:
 * HTML Parser By John Resig (http://ejohn.org/files/htmlparser.js)
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 *
 * // Use like so:
 * var parser = HTMLParser({
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 * parser.parseMore(html);
 * parser.parseMore(html);
 * parser.end();
 *
 * You can write directly to an element with WriteToElement:
 * var writer = elementWrite.toElement(element);
 * writer.write(html);
 * writer.writeln(html);
 * writer.close(); // important
 *
 * toElement takes an optional 2nd argument: listeners.
 *
 * listeners is just like the handlers object passed to HTMLParser, but
 * with a few additions:
 * 1. If the handler function returns false, then no action is taken (the handler
 *	 is assumed to have handled the event).
 * 2. The last argument is a state object. The stack property is the current
 * element stack. last() is the current parent element. push() and pop() will
 * push and pop the current parent element, which affects where content is created.
 * 3. There is a close() listener that will be called when the writer is closed.
 *
 * See the listeners qunit test for an example.
 */

(function(define){

	// Regular Expressions for parsing tags and attributes
	var startTag = /^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
		endTag = /^<\/([\-A-Za-z0-9_]+)[^>]*>/,
		attr = /([\-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

	// Empty Elements - HTML 4.01
	var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");

	// Block Elements - HTML 4.01
	var block = makeMap("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul");

	// Inline Elements - HTML 4.01
	var inline = makeMap("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

	// Attributes that have their values filled in disabled="disabled"
	var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

	// Special Elements (can contain anything)
	var special = makeMap("script,style");

	function HTMLParser( handler ) {
		var index, chars, match, stack = [], last = '',
			waitingForSpecialBody;
		stack.last = function(){
			return this[ this.length - 1 ];
		};

		function processSpecial(all, text){
			text = text.replace(/<!--([\s\S]*?)-->/g, "$1")
				.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");

			if ( handler.chars )
				handler.chars( text );

			return "";
		}

		function parseMore(html) {
			html = last + html;
			last = html;

			if(module.debug.parse) console.log('PARSE parseMore',html);
			while ( html ) {

				chars = true;

				// Make sure we're not in a script or style element
				if ( waitingForSpecialBody || (stack.last() && special[ stack.last() ]) ) {

					waitingForSpecialBody = false;
					var specialBody = new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>","i");
					if(!html.match(specialBody)) {
						waitingForSpecialBody = true;
						return self;
					}
					html = html.replace(specialBody, processSpecial);

					parseEndTag( "", stack.last() );
				} else {

					// Comment
					if ( html.indexOf("<!--") === 0 ) {
						index = html.indexOf("-->");

						if ( index >= 0 ) {
							if(module.debug.parse) console.log('PARSE comment',match);
							if ( handler.comment )
								handler.comment( html.substring( 4, index ) );
							html = html.substring( index + 3 );
							chars = false;
						}

					// end tag
					} else if ( html.indexOf("</") === 0 ) {
						match = html.match( endTag );

						if ( match ) {
							if(module.debug.parse) console.log('PARSE end tag',match);
							html = html.substring( match[0].length );
							match[0].replace( endTag, parseEndTag );
							chars = false;
						}

					// start tag
					} else if ( html.indexOf("<") === 0 ) {
						match = html.match( startTag );

						if ( match ) {
							if(module.debug.parse) console.log('PARSE start tag',match);
							html = html.substring( match[0].length );
							match[0].replace( startTag, parseStartTag );
							chars = false;
						}
					}

					if ( chars ) {
						index = html.indexOf("<");

						var text = index < 0 ? html : html.substring( 0, index );
						html = index < 0 ? "" : html.substring( index );
						if(module.debug.parse) console.log('PARSE chars',text);

						if ( handler.chars )
							handler.chars( text );
					}
				}

				var done = html == last;
				last = html;
				if (done) break;
			}
			if(module.debug.parse) console.log('PARSE end parse');
			return self;
		}

		function parseStartTag( tag, tagName, rest, unary ) {
			tagName = tagName.toLowerCase();

			if ( block[ tagName ] ) {
				while ( stack.last() && inline[ stack.last() ] ) {
					parseEndTag( "", stack.last() );
				}
			}

			if ( closeSelf[ tagName ] && stack.last() == tagName ) {
				parseEndTag( "", tagName );
			}

			unary = empty[ tagName ] || !!unary;

			if ( !unary )
				stack.push( tagName );

			if ( handler.start ) {
				var attrs = [];

				rest.replace(attr, function(match, name) {
					var value = arguments[2] ? arguments[2] :
						arguments[3] ? arguments[3] :
						arguments[4] ? arguments[4] :
						fillAttrs[name] ? name : "";

					attrs.push({
						name: name,
						value: value,
						escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
					});
				});

				if ( handler.start )
					handler.start( tagName, attrs, unary );
			}
		}

		function parseEndTag( tag, tagName ) {
			if(module.debug.parse) console.log('PARSE parseEndTag',tag,tagName);
			var pos;
			// If no tag name is provided, clean shop
			if ( !tagName )
				pos = 0;

			// Find the closest opened tag of the same type
			else
				for ( pos = stack.length - 1; pos >= 0; pos-- )
					if ( stack[ pos ] == tagName )
						break;

			if ( pos >= 0 ) {
				// Close all the open elements, up the stack
				for ( var i = stack.length - 1; i >= pos; i-- )
					if ( handler.end )
						handler.end( stack[ i ] );

				if(module.debug.parse) console.log('PARSE parseEndTag pop',stack.slice(pos));
				// Remove the open elements from the stack
				stack.length = pos;
			}
		}

		function end(html) {
			if(html) {
				parseMore(html);
			}
			// Clean up any remaining tags
			parseEndTag();
		}

		var self = {
			parseMore: parseMore,
			end: end
		};

		return self;
	}

	function toElement( element, listeners ) {
		listeners = listeners || {};
		var curParentNode = element;

		var elems = [curParentNode],
			doc = element.ownerDocument ||
				element.getOwnerDocument && element.getOwnerDocument();

		elems.last = function() {
			return this[ this.length - 1 ];
		};

		elems.pop = function() {
			var el = Array.prototype.pop.call(this);
			curParentNode = this.last();
			return el;
		};

		elems.push = function(el) {
			Array.prototype.push.call(this,el);
			curParentNode = el;
		};

		function listen(event) {
			if(listeners[event]) {
				return listeners[event].apply(listeners,slice(arguments,1).concat([state()]));
			}
		}

		function state() {
			return {
				stack: elems
			};
		}

		var handlers, parser = HTMLParser(handlers = {
			start: function( tagName, attrs, unary ) {
				if(listen('start',tagName,attrs,unary) === false) return;

				if(module.debug.write) console.log('WRITE start',tagName,attrs,unary);
				var elem = doc.createElement( tagName );

				for ( var i = 0; i < attrs.length; i++ ) {
					var attr = attrs[i];
					elem.setAttribute( attr.name, attr.value );
				}

				if ( curParentNode && curParentNode.appendChild ) {
					curParentNode.appendChild( elem );
					if(module.debug.write) console.log('WRITE start append',elem,'to',curParentNode);
				}

				if ( !unary ) {
					if(module.debug.write) console.log('WRITE push',elem,elems.slice(0));
					elems.push( elem );
				}
				if(module.debug.write) console.log('WRITE start done - parent:',curParentNode);
			},
			end: function( tag ) {
				if(listen('end',tag) === false) return;
				elems.pop();
				if(module.debug.write) console.log('WRITE end',tag,'new parent:',curParentNode,'elems',elems);
			},
			chars: function( text ) {
				if(listen('chars',text) === false) return;
				if(module.debug.write) console.log('WRITE chars',text,'el:',element);
				curParentNode.appendChild( doc.createTextNode( text ) );
			},
			comment: function( text ) {
				if(listen('comment',text) === false) return;
				// create comment node
			},
			close: function() {
				if(listen('close') === false) return;
				if(module.debug.write) console.log('WRITE close el:',element);
			},
			_handle: function(event) {
				listen.apply(this,arguments);
			}
		});

		return listeners.writer = {
			/**
			 * Hook for calling custom listener methods.
			 *
			 * e.g., defining pause & resume methods.
			 */
			handle: function(event,args) {
				if(handlers[event]) {
					handlers[event].apply(handlers,args || []);
				} else {
					handlers._handle.apply(handlers,arguments);
				}
			},
			write: function(html) {
				parser.parseMore(html);
				return this;
			},
			writeln: function(html) {
				this.write(html+'\n');
				return this;
			},
			close: function(html) {
				parser.end(html);
				handlers.close();
				return this;
			}
		};
	}

	function makeMap(str){
		var obj = {}, items = str.split(",");
		for ( var i = 0; i < items.length; i++ )
			obj[ items[i] ] = true;
		return obj;
	}

	function slice(args,index) {
		return Array.prototype.slice.call(args,index);
	}

	var module = {
		toElement: toElement,
		HTMLParser: HTMLParser,
		debug: {
			parse: false,
			write: false
		}
	};

	define(module);
})(typeof define == 'function' ? define : function(ew) {
	if (typeof exports === 'object') {
		module.exports = ew;
	} else {
		this.elementWrite = ew;
	}
});
