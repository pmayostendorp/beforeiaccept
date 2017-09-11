/**
 * jQuery jCookies
 *
 * @url		http://scottreeddesign.com/project/jcookies-jquery-plugin
 * @author	Brian Reed <brian@scottreeddesign.com>
 * @version	1.0.0
**/ 
(function($){
			  
	// Main plugin function
	$.jCookies = function(options)
	{
		// Build main options before element iteration
		var o = $.extend({}, $.jCookies.defaults, options);
		
	// set raw_data for get or erase
		if(o.get || o.erase){	
			
			var raw_data = {}, name = '', names = [];
			var ca = document.cookie.split(';');
			for(var i = 0;i<ca.length;i++){
				var c = ca[i];
				while(c.charAt(0) == ' ') c = c.substring(1,c.length);
				name = c.split('=')[0];
				if(name.length == 0) break;
				raw_data[name] = c.substring((name.length+1), c.length);
				names[names.length] = name;
			}
			
		// erase cookie(s)
			if(o.erase){
	
				var date = new Date();
				date.setTime(date.getTime() + (-1*24*60*60*1000));
			// erase multiple cookies			
				if(o.erase == '*') {
					for(name in raw_data)
						document.cookie = name + "=erase; expires=" + date.toGMTString() + "; path=/";
					return true;
				}
	
			// erase single cookie						
				for(name in names)
					if(names[name] == o.erase){
						document.cookie = o.erase + "=erase; expires=" + date.toGMTString() + "; path=/";
						return true;
					}
			
				return false;

			} 
			
		// get cookie(s)
			else if(o.get){
				// get multiple cookies			
				if(o.get == "*" && raw_data) {
					for(name in raw_data)
						try{
							raw_data[name] = JSON.parse(atob(raw_data[name]));
						}catch(exception){
							try{
								raw_data[name] = JSON.parse(atob(decodeURIComponent(raw_data[name])));
							}catch(exception2){
								if(o.error) return exception2;								
							}							
							if(o.error) return exception;
						}
					return raw_data;
				}
			
			// get single cookies	
				for(x in names)
					if(names[x] == o.get)
					try{
						// to get around a problem with Tomcat surrounding cookies with double quotes
						var cookie_val = raw_data[o.get];
						var cookie_pattern = /^\".*\"$/;
						if (cookie_pattern.test(cookie_val)) {
							cookie_val = cookie_val.substr(1, (cookie_val.length - 2));
						}
						return JSON.parse(atob(cookie_val));
					}catch(exception){
						if(o.error) return exception;
					}
	
				return false;
				
			}
		
		} 
	// make cookie(s)
		else if(o.name && (o.value || o.days)){
			
			var date = new Date();
			if(!isNaN(o.seconds)){				
				date.setTime(date.getTime() + (o.seconds*1000));
			}else if(!isNaN(o.minutes)){				
				date.setTime(date.getTime() + (o.minutes*60*1000));
			}else if(!isNaN(o.hours)){				
				date.setTime(date.getTime() + (o.hours*60*60*1000));
			}else{
				date.setTime(date.getTime() + (o.days*24*60*60*1000));
			}
			document.cookie = o.name + "=" + btoa(JSON.stringify(o.value)) + "; expires=" + date.toGMTString() + "; path=/";
			return true;
	// get cookie			
		} else return false;			
	}
	
	// Default settings
	$.jCookies.defaults =
	{
		name : '',
		value : '',
		days : 27
	}
	
})(jQuery);

/* load base64 functions if not loaded (ie or opera!)*/
if(typeof btoa == 'undefined'){function btoa(str){var chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';var encoded=[];var c=0;while(c<str.length){var b0=str.charCodeAt(c++);var b1=str.charCodeAt(c++);var b2=str.charCodeAt(c++);var buf=(b0<<16)+((b1||0)<<8)+(b2||0);var i0=(buf&(63<<18))>>18;var i1=(buf&(63<<12))>>12;var i2=isNaN(b1)?64:(buf&(63<<6))>>6;var i3=isNaN(b2)?64:(buf&63);encoded[encoded.length]=chars.charAt(i0);encoded[encoded.length]=chars.charAt(i1);encoded[encoded.length]=chars.charAt(i2);encoded[encoded.length]=chars.charAt(i3)}return encoded.join('')}}
if(typeof atob == 'undefined'){function atob(str){var chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';var invalid={strlen:(str.length%4!=0),chars:new RegExp('[^'+chars+']').test(str),equals:(/=/.test(str)&&(/=[^=]/.test(str)||/={3}/.test(str)))};if(invalid.strlen||invalid.chars||invalid.equals)throw new Error('Invalid base64 data');var decoded=[];var c=0;while(c<str.length){var i0=chars.indexOf(str.charAt(c++));var i1=chars.indexOf(str.charAt(c++));var i2=chars.indexOf(str.charAt(c++));var i3=chars.indexOf(str.charAt(c++));var buf=(i0<<18)+(i1<<12)+((i2&63)<<6)+(i3&63);var b0=(buf&(255<<16))>>16;var b1=(i2 == 64)?-1:(buf&(255<<8))>>8;var b2=(i3 == 64)?-1:(buf&255);decoded[decoded.length]=String.fromCharCode(b0);if(b1>=0)decoded[decoded.length]=String.fromCharCode(b1);if(b2>=0)decoded[decoded.length]=String.fromCharCode(b2)}return decoded.join('')}}

/* load JSON if not loaded */
if(!this.JSON){this.JSON={}}(function(){function f(n){return n<10?'0'+n:n}if(typeof Date.prototype.toJSON!== 'function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key)}if(typeof rep==='function'){value=rep.call(holder,key,value)}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}if(typeof JSON.stringify!== 'function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' '}}else if(typeof space==='string'){indent=space}rep=replacer;if(replacer&&typeof replacer!== 'function'&&(typeof replacer!== 'object'||typeof replacer.length!== 'number')){throw new Error('JSON.stringify');}return str('',{'':value})}}if(typeof JSON.parse!== 'function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!== undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse');}}}()); /**/