/*
=pod

=head1 NAME

global.js - functions and classes used globally across all pages

=head1 FUNCTIONS and CLASSES

=cut

*/

if (typeof __GLOBALS === 'undefined') {
    __GLOBALS = {};
}
if (typeof __GLOBALS.components === 'undefined') {
    __GLOBALS.components = {};
}
if (typeof __GLOBALS.util === 'undefined') {
    __GLOBALS.util = {};
}

__GLOBALS.util.parseURI = function (uri) {
    if (typeof uri !== 'string') {
        return null;
    }
    // RFC-3986
    var URI_regexp = /^(?:\s*)(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/;
    var matchResult;
    matchResult = uri.match(URI_regexp);
    if (!matchResult) {
        return null;
    }
    return {
        protocol: matchResult[1],
        host: matchResult[2],
        path: matchResult[3],
        query: matchResult[4],
        hash: matchResult[5]
    };
};

__GLOBALS.util.parseAndDecodeURIQuery = function (query, separator) {
    if (typeof query !== 'string') {
        return null;
    }
    if (typeof separator !== 'string') {
        separator = '&';
    }
    var result;
    var pairs,
        key_value,
        key,
        value,
        i;
    result = {};
    if (!query) {
        return result;
    }
    pairs = query.split(separator);
    for (i = 0 ; i < pairs.length ; i++) {
        key_value = pairs[i].split('=');
        key = decodeURIComponent( key_value.shift() );
        value = key_value.length == 0 ? undefined : decodeURIComponent( key_value.length > 1 ? key_value.join('=') : key_value[0] );
        if (result.hasOwnProperty(key)) {
            if (result[key] instanceof Array) {
                result[key].push(value);
            } else {
                result[key] = [ result[key], value ];
            }
        } else {
            result[key] = value;
        }
    }
    return result;
};

__GLOBALS.util.encodeAndBuildURIQuery = function (data, separator) {
    if (data == undefined) {
        return '';
    }
    if (typeof separator !== 'string') {
        separator = '&';
    }
    var result = '';
    var key_value,
        key,
        key_encoded,
        value,
        i;
    for (key in data) {
        key_value = '';
        key_encoded = encodeURIComponent(key);
        value = data[key];
        if (value instanceof Array) {
            for (i = 0 ; i < value.length ; i++) {
                key_value += key_encoded + '=' + encodeURIComponent( value[i] );
                if (i !== value.length - 1) {
                    key_value += separator;
                }
            }
        } else {
            key_value += key_encoded + '=' + encodeURIComponent( value );
        }
        result += key_value + separator;
    }
    result = result.slice(0, result.length - separator.length);
    return result;
};

__GLOBALS.util.buildURI = function (uri_parts) {
    if (uri_parts == undefined) {
        return '';
    }
    var result = ( uri_parts.protocol ? uri_parts.protocol + ':' : '' ) + ( uri_parts.host ? '//' + uri_parts.host : '' ) + ( uri_parts.path ? uri_parts.path : '' ) + ( uri_parts.query ? '?' + uri_parts.query : '' ) + ( uri_parts.hash ? '#' + uri_parts.hash : '' );
    // RFC-3986
    var URI_regexp = /^(?:\s*)(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/;
    if ( URI_regexp.test(result) ) {
        return result;
    }
    return '';
};

//For nav - probably will change/delete

//////////////////////////////////////////////////////////////////////////
// Find the location of the main nav tab for proper placement of the dropdown
//////////////////////////////////////////////////////////////////////////
function findPos(obj) {
    obj = document.getElementById(obj);
    var curleft = curtop = 0;
    if (obj.offsetParent) {
        curleft = obj.offsetLeft;
        curtop = obj.offsetTop;
        while (obj = obj.offsetParent) {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        }
    }
    return [curleft,curtop];
}
//////////////////////////////////////////////////////////////////////////
// Close all of th emain nav drop downs
//////////////////////////////////////////////////////////////////////////
function closeAll() {
 $('music_menu').style.display = "none";
 $('sports_menu').style.display = "none";
 $('arts_menu').style.display = "none";
 $('family_menu').style.display = "none";
 $('especiales_menu').style.display = "none";
 $('toros_menu').style.display = "none";
}
//////////////////////////////////////////////////////////////////////////
// Open a main nav dropdown - deprecated, do NOT use
//////////////////////////////////////////////////////////////////////////
function menu( cat, effect, delay ) {
    if (typeof(effect_queue) != 'undefined'){ clearTimeout(effect_queue); };
    menu_name = cat + '_menu';
    myEffect = effect;
    timeDelay = delay;
    if( effect == "show_menu" && $(menu_name) ){
        menu_height = $(menu_name).getDimensions().height ? $(menu_name).getDimensions().height : 3;
        menu_width = $(menu_name).getDimensions().width ? $(menu_name).getDimensions().width : 4;
        $(menu_name).setStyle({display: "block"});
        var coord = $(cat).cumulativeOffset();
        var h_space = coord[0];
        var v_space = coord[1] + $(cat).getHeight();
        $(menu_name).setStyle({top: v_space+'px', left: h_space+'px'});
        $('drop_shim').setStyle({display: "block", top: v_space+'px', left: h_space+'px', height: menu_height - 3 + 'px', width: menu_width - 4 + 'px'});
        $(cat).addClassName('hover');

    }
    else if( effect == "hide_menu" && $(menu_name) ){
        $(cat).removeClassName('hover');
        $(menu_name).hide();
        $('drop_shim').hide();
    }
}
//////////////////////////////////////////////////////////////////////////
// Apply a scriptaculous effect to the main nav dorp down
// (Currently unused, due to side effect of "Flashing" and JS breaking
// when too many are rolled over)
//////////////////////////////////////////////////////////////////////////
function runEffect() {
    switch( myEffect ) {
        case "appear":
            new Effect.Appear( $(menu_name), {queue: {position: 'end', scope: 'topnavscope'}, delay: timeDelay} );
        break;
        case "fade":
            new Effect.Fade( $(menu_name), {queue: {position: 'end', scope: 'topnavscope'}, delay: timeDelay} );
        break;
        case "puff":
            new Effect.Puff( $(menu_name), {queue: {position: 'end', scope: 'topnavscope'}, delay: timeDelay} );
        break;
        case "blind_down":
            new Effect.BlindDown( $(menu_name), {queue: {position: 'end', scope: 'topnavscope', limit:2}, delay: timeDelay} );
        break;
        case "blind_up":
            new Effect.BlindUp( $(menu_name), {queue: {position: 'end', scope: 'topnavscope'}, delay: timeDelay} );
        break;
        case "switch_off":
            new Effect.SwitchOff( $(menu_name), {queue: {position: 'end', scope: 'topnavscope'}, delay: timeDelay} );
        break;
        case "slide_down":
            new Effect.SlideDown( $(menu_name), {queue: {position: 'end', scope: 'topnavscope'}, delay: timeDelay} );
        break;
        case "slide_up":
            new Effect.SlideUp( $(menu_name), {queue: {position: 'end', scope: 'topnavscope'}, delay: timeDelay} );
        break;
        case "drop_out":
            new Effect.DropOut( $(menu_name), {queue: {position: 'end', scope: 'topnavscope'}, delay: timeDelay} );
        break;
        case "shake":
            new Effect.Shake( $(menu_name), {queue: {position: 'end', scope: 'topnavscope'}, delay: timeDelay} );
        break;
        case "pulsate":
            new Effect.Pulsate( $(menu_name), {queue: {position: 'end', scope: 'topnavscope'}, delay: timeDelay} );
        break;
        case "squish":
            new Effect.Squish( $(menu_name), {queue: {position: 'end', scope: 'topnavscope'}, delay: timeDelay} );
        break;
        case "fold":
            new Effect.Fold( $(menu_name), {queue: {position: 'end', scope: 'topnavscope'}, delay: timeDelay} );
        break;
        case "grow":
            new Effect.Grow( $(menu_name), {direction: 'top-left', queue: {position: 'end', scope: 'topnavscope'}, delay: timeDelay} );
        break;
        case "shrink":
            new Effect.Shrink( $(menu_name), {direction: 'top-left', queue: {position: 'end', scope: 'topnavscope'}, delay: timeDelay} );
        break;
        case "highlight":
            new Effect.Highlight( $(menu_name), {queue: {position: 'end', scope: 'topnavscope'}, delay: timeDelay} );
        break;
        case "show":
            $( $(menu_name) ).show();
        break;
        default:
            $('music_menu','sports_menu','arts_menu','family_menu').invoke('hide');
        break;
    }
}
//////////////////////////////////////////////////////////////////////////
// USed FOR "CHANGE LOCATION" BOX AND LEFT NAV
//////////////////////////////////////////////////////////////////////////
function toggleA(box_id,input_id){
    var box = $(box_id);
    var input = $(input_id);

    if( input.visible() ) {
        box.className = 'more';
        input.hide();
    }
    else {
        box.className = 'less';
        input.show();
        $('location_input').focus();
    }
}
//////////////////////////////////////////////////////////////////////////
// Change Location JS for Top Nav
//////////////////////////////////////////////////////////////////////////
function verifyLocationString(form) {
    $('location_eror_blank','location_eror_multiple','location_eror_multiple_dropdown','location_eror_not_found').invoke('hide');
    if( $F('location_input').strip().empty() || $F('location_input') == location_text ){
        $('location_eror_blank').show();
        $('location_eror_multiple').hide();
        $('location_eror_multiple_dropdown').hide();
        $('location_eror_not_found').hide();
        $('location_input').addClassName('error').focus();
        if ($('location_input_label')){ $('location_input_label').addClassName('error');}
        $F('location_input').value = location_text;
        return false;
    } else {
        $('location_input').removeClassName('error');
        if ($('location_input_label')) { 
            $('location_input_label').removeClassName('error'); 
        }
        $(form).request({
            parameters: { uri: page_context_uri, use_json: 1 },
            onSuccess: function(t) {
                var loc_data = t.responseText.evalJSON();
                if( loc_data.redirect == 1 ) {
                    wt_stringscrape($F('location_input'), '1');
                    self.location.href = loc_data.location;
                }
                else if( loc_data.count > 1 ) {
                    $('location_multiple_dropdown').childElements().invoke('remove');
                    $('location_results').update( $F('location_input') );
                    $('location_eror_multiple').show();
                    buildMulti( loc_data );
                    $('location_eror_multiple_dropdown').show();
                    jQuery("#location_eror_multiple_dropdown").jScrollPane({ "showArrows":false, "autoReinitialise": false, "contentHeight": 112 });
                    wt_stringscrape($F('location_input'));
                }
                else {
                    $('location_eror_blank').hide();
                    $('location_eror_multiple').hide();
                    $('location_eror_multiple_dropdown').hide();
                    $('location_eror_not_found').show();
                    $('location_input').addClassName('error').focus();
                    $('location_input_label').addClassName('error');
                    wt_stringscrape($F('location_input'));
                }
            },
            onFailure: function(t) {
            }
        });
        return false;
    }
}


function verifyDmaString(form) {
    $('dma_eror_blank','dma_eror_not_found').invoke('hide');
    if( $F('dma_area').strip().empty() || $F('dma_area') == location_text ){
        $('dma_eror_blank').show();
        $('dma_eror_not_found').hide();
        $('dma_area').focus();
        return false;
    } else {
        $(form).request({
            parameters: { uri: page_context_uri, use_json: 1 },
            onSuccess: function(t) {
                var loc_data = t.responseText.evalJSON();
                if( loc_data.redirect == 1 ) {
                    wt_stringscrape($F('dma_area'), '1');
                    document.changelocation.submit();
                }
                else if( loc_data.count > 1 ) {
                    wt_stringscrape($F('dma_area'), '1');
                    document.changelocation.submit();
                }
                else {
                    wt_stringscrape($F('dma_area'));
                    $('dma_eror_blank').hide();
                    $('dma_eror_not_found').show();
                }
            },
            onFailure: function(t) {
            }
        });
        return false;
    }
}


//////////////////////////////////////////////////////////////////////////
// Location Module - Builds the faux select box of found cities
//////////////////////////////////////////////////////////////////////////
function buildMulti( theData, theType ) {
    var to_insert;
    var tm_link = theData.tm_link;
    if( theType == 'browse' ) {
        to_insert = 'browse_location_multiple_dropdown';
    }
    else if( theType == 'search' ) {
        to_insert = 'search_location_multiple_dropdown';
    }
    else {
        to_insert = 'location_multiple_dropdown';
    }
    theData.countries.each(
        function( c ) {
            if( c != theData.countries.first() ) {
                var dv = new Element('div', {'className': 'locDivide'} ).update( theData.country[c] );
                Element.insert($(to_insert), dv);
            }
            theData.dmas[c].sortBy( function( dma ) { return dma.desc; } ).each(
                function( dma ) {
                    var a_link;
                    if( theType == 'browse' ) {
                        a_link = new Element('a', { title: dma.desc, href: '/' }).update( dma.desc );
                        $(a_link).onclick = new Function( 'browse_loadDMA("' + dma.desc + '", ' + dma.dma + '); return false;' );
                    }
                    else {
                        a_link = new Element('a', { title: dma.desc, href: '/change_area?uri=' + page_context_uri + '&dma=' + dma.dma + '&desc=' + encodeURI(dma.desc) + '&tm_link=' + tm_link }).update( dma.desc );
                    }
                    Element.insert($(to_insert), a_link);
                }
            );
        }
    );
}
//////////////////////////////////////////////////////////////////////////
// updates fields upon selection from city faux-select box
//////////////////////////////////////////////////////////////////////////
function browse_loadDMA( theDesc, theID ) {
    $('browse_area').value = theDesc;
    $('browse_location_eror_multiple_dropdown').hide();
    $('browse_location_eror_multiple').hide();
    $('browse_go_button').disable();
    $('browse_go_button').className = 'go_wait';
    new Ajax.Request('/change_area', {
        method: 'get',
        parameters: { dma: theID },
        onSuccess: function(t) {
            multiSelect = true;
            $('browse_go_button').enable();
            $('browse_go_button').className = 'go';
        },
        onFailure: function(t) {
            multiSelect = false;
            $('browse_go_button').enable();
            $('browse_go_button').className = 'go';
        }
    } );
    if( $('rdc_select') && $('rdc_select').value != 'range' ) {
        $('calendar_from_input').disable().setStyle({backgroundColor: '#ffffff'});
        $('calendar_to_input').disable().setStyle({backgroundColor: '#ffffff'});
    }
    if( $('rdc_select') && $('rdc_select').value == 'range' ) {
        $('rdc_select').remove();
    }
}

function convertDate( date_from, date_to ) {
    if( Object.isElement($(date_from)) && Object.isElement($(date_to)) ) {
        calendar_from_input_str = $(date_from).value;
        calendar_to_input_str = $(date_to).value;

        if (date_string_format == '%d/%m/%Y'){
            date_separater = date_string_format.substr(2,1);
            calendar_from_input_str = calendar_from_input_str.split(date_separater);
            calendar_from_input_str = calendar_from_input_str[1] + date_separater + calendar_from_input_str[0] + date_separater + calendar_from_input_str[2];
            calendar_to_input_str = calendar_to_input_str.split(date_separater);
            calendar_to_input_str = calendar_to_input_str[1] + date_separater + calendar_to_input_str[0] + date_separater + calendar_to_input_str[2];
        }
        return true;
    }
    else {
        return false;
    }
}

//////////////////////////////////////////////////////////////////////////
// Misc form preprocessing and validation before submit
//////////////////////////////////////////////////////////////////////////
function preProcessBrowse() {
    $('browse_go_button').disable();
    // First we hide all errors
    $$('.error.padV5.txt11.lh13').invoke('hide');
    if( $('browse_location_eror_multiple_dropdown') ) {
        $('browse_location_eror_multiple_dropdown').hide();
    }

    // If we have no category error out right away
    if( $('category').value == "NULL" ){
        $('major_cat_missing').show();
        $('browse_go_button').enable();
        return false;
    }
    if( browse_us_national && ($('rdc_select').value == "n93") && (($('browse_area').value == "") || ($('browse_area').value == browse_area_default_text)) ) {
        $('browse_error_us_national_90_days').show();
        $('browse_go_button').enable();
        return false;
    }
    if( browse_us_national && ($('rdc_select').value == "n186") && (($('browse_area').value == "") || ($('browse_area').value == browse_area_default_text)) ) {
        $('browse_error_us_national_180_days').show();
        $('browse_go_button').enable();
        return false;
    }
    if( ($('rdc_select') && $('rdc_select').value == 'range') || $('type').value == 'range' ) {
        // Re-enable the form fields just in case
        $('rdc_smonth','rdc_sday','rdc_syear','rdc_emonth','rdc_eday','rdc_eyear').invoke('enable');
        // We convert date formats to the one we want
        var date_check = convertDate( $('calendar_from_input'), $('calendar_to_input') );
        if( !date_check ) {
            alert("Calendar input field are blank");
            $('browse_go_button').enable();
            return false;
        }
        // We check for a date range that is too long
        if( $D(calendar_to_input_str).diff(calendar_from_input_str, 'days') > 60 && browse_us_national == 1 && (($('browse_area').value == "") || ($('browse_area').value == browse_area_default_text)) ) {
            $('date_range_too_large').show();
            $('browse_go_button').enable();
            return false;
        }
        else {
            // Since we are ranged we have to set the type parameter
            $('type').value = 'range';
            // We also have to disable of the rdc_select input
            if( $('rdc_select') ) {
                $('rdc_select').disable();
            }
            // Since we are ranged we also need the teVal parameter for some reason
            if( !Object.isElement($('teVal')) ) {
                var teval_field = new Element('input', { type: "hidden", name: "teVal", id: "teVal" });
                $('ccs_form').appendChild( teval_field );
            }
            // We set up the values in the form now and get ready to submit
            $('rdc_smonth').value   = $D(calendar_from_input_str).getMonthNumber();
            $('rdc_sday').value     = $D(calendar_from_input_str).getDate();
            $('rdc_syear').value    = $D(calendar_from_input_str).getFullYear();
            $('rdc_emonth').value   = $D(calendar_to_input_str).getMonthNumber();
            $('rdc_eday').value     = $D(calendar_to_input_str).getDate();
            $('rdc_eyear').value    = $D(calendar_to_input_str).getFullYear();
            // Disable the values for the date range faux input boxes
            $('calendar_from_input').disable().setStyle({backgroundColor: '#ffffff'});
            $('calendar_to_input').disable().setStyle({backgroundColor: '#ffffff'});
        }
    }
    else {
        // If the date is not range, change the hidden 'type' field to selected
        $('type').value = 'selected';
        // The the hidden field to be set is not "range", remove "teval", which may exist if the user selected range then hit the back button
        if( Object.isElement($('teVal')) ){
            $('teVal').remove();
        }
        // Disable the date value fields since we don't need those in the form
        $('rdc_smonth','rdc_sday','rdc_syear','rdc_emonth','rdc_eday','rdc_eyear').invoke('disable');
    }

    // Okay time to handle location now
    // If we are nationalized then empty out the area parameter and send the form
    if( $('browse_area').value.indexOf(checkUni(browse_area_default_text)) !=-1 && !browse_area_default_text.empty() ) {
        $('browse_area').value = "";
        $('browse_go_button').enable();
        return true;
    }
    else {
        if( multiSelect || (current_location == $('browse_area').value ) ) {
            if( multiSelect != 'browse' ) {
                $('browse_area').disable().setStyle({backgroundColor: '#ffffff'});
            }
            $('browse_go_button').enable();
            return true;
        }
        else {
            multiSelect = false;
            var return_value = new Ajax.Request('/find_area', {
                method: 'get',
                parameters: { uri: page_context_uri, use_json: 1, area: $F('browse_area') },
                onSuccess: function(t) {
                    var browse_loc_data = t.responseText.evalJSON();
                    if( browse_loc_data.redirect == 1 ) {
                        if( $('rdc_select') && $('rdc_select').value != 'range' ) {
                            $('calendar_from_input').disable().setStyle({backgroundColor: '#ffffff'});
                            $('calendar_to_input').disable().setStyle({backgroundColor: '#ffffff'});
                        }
                        
                        if( $('rdc_select') && $('rdc_select').value == 'range' ) {
                            $('rdc_select').remove();
                        }

                        if( $('browse_area') && $('browse_area').type != 'hidden' ) {
                            wt_stringscrape($('browse_area').value, '1');
                        }

                        if( window.submitBrowseForm ) {
                            submitBrowseForm($('ccs_form'));
                        } else {
                            $('ccs_form').submit();
                        }
                    }
                    else if( browse_loc_data.count > 1 ) {
                        if($('browse_area') && $('browse_area').type != 'hidden' ){
                           wt_stringscrape($('browse_area').value);
                        }
                        $('browse_location_multiple_dropdown').childElements().invoke('remove');
                        $('browse_location_results').update( $F('browse_area') );
                        $('browse_location_eror_multiple').show();
                        buildMulti( browse_loc_data, 'browse' );
                        $('browse_location_eror_multiple_dropdown').show();
                    }
                    else {
                        if($('browse_area') && $('browse_area').type != 'hidden' ){
                             wt_stringscrape($('browse_area').value);
                         }
                        $('browse_location_eror_not_found').show();
                    }
                    $('browse_go_button').enable();
                },
                onFailure: function(t) {
                }
            });
            return false;
        }
    }
}
// With this implementation, you don't have to set event handlers on the HTML level (no onclick, onmouseover, or onmouseout)
// This is DropMenu Class Constructor
var DropMenu = Class.create( {
    initialize: function(title, dropdown){
            var timer = null;
            $(title).observe('click', function(e) {
                    $(dropdown).toggle();
            });
            $(dropdown).observe('mouseover', function(e) {
                    clearTimeout(timer);
            });
            $(dropdown).observe('mouseout', function(e) {
                    timer = setTimeout( function(){$(dropdown).hide();},500);
            });
    } // end of initialize
});

function initLoc() {
    var ndma_c = GetCookie('NDMA');
    var npdma_c = GetCookie('NPDMA');
    if( ( npdma_c && ndma_c ) && stored_dma != ndma_c && stored_dma != npdma_c ) {
        self.location.reload();
    }
}

function initHPB() {
    if( $F('root') != 'NULL' && $F('category') != 'NULL' ) {
        var cat = $F('category');
        var root = $F('root');
        if( current_domain == 'au' || current_domain == 'nz' ) {
            if( cat == '711' || cat == '8' ) {
                root = '8';
            }
        }
    }
    if( $F('browse_area').empty() && !browse_area_default_text.empty() ) {
        $('browse_area').value = browse_area_default_text;
    }
    if( $('browse_area').present() && $F('browse_area') != current_location ) {
        if( browse_area_default_text.empty() ) {
            $('browse_area').value = current_location.unescapeHTML();
        }
        else {
            $('browse_area').value = browse_area_default_text;
        }
    }
}

function add_did_to_links() {
    if ( spcOffer_did ) {
        var links = Element.extend(document.body).select('a.link_needs_did');

        links.each( function(link) {
            delim = link.href.search ( /[?]/ ) == -1 ? '?' : '&';
            link.href += delim + "did=" + spcOffer_did;
        });
    }
}

function add_query_args ( url, args ) {
    var delim = url.search( /\?/ ) < 0 ? '?' : '&';

    for ( key in args ) {
        if ( args[key] ) {
            url += delim + key + "=" + escape(args[key]);
            delim = '&';
        }
    }

    return url;
}

TMCookie = Class.create( {
    initialize: function( name, options ) {
        this.name = name;
        this.options = this._setup_options( options );
    },

    _setup_options: function( options ) {
        options = options || {};

        if ( !options.expire_date ) {
            var expire_date = new Date();

            if ( options.duration ) {
                options.expire_date = expire_date.setTime( expire_date.getTime() + options.duration * 1000 );
            }
        }

        options.expires = options.expire_date ? options.expires.expire_date.toGMTString() : '';

        var details = '';

        if ( options.path ) {
            details += '; path=' + options.path;
        }
        else {
            details += '; path=/';
        }

        if ( options.domain ) {
            details += '; domain=' + options.domain;
        }

        if ( options.secure ) {
            details += '; secure';
        }

        details += '; expires=';

        options.details = details;

        return options;
    },

    set: function( value ) {
        if ( this.options.json ) {
            value = Object.toJSON( value );
        }

        if ( this.options.escape ) {
            value = escape( value );
        }

        this._set( this.name + '=' + value + this.options.details, this.options.expires );
    },

    _set: function( data, expires ) {
        document.cookie = data + expires;
    },

    get: function() {
        var cookies = document.cookie.split( ';' );

        for ( var i = 0 ; i < cookies.length ; i ++ ) {
            var cookie = cookies[i];
            if ( cookie.charAt(0) == ' ' ) {
                cookie = cookie.substr( 1 );
            }
            var parts = cookie.split('=');
            if ( parts[0] == this.name ) {
                parts.shift();
                var value = parts.join('=');

                if ( this.options.escape ) {
                    value = unescape( value );
                }

                if ( this.options.json ) {
                    value = value.evalJSON();
                }

                return value;
            }
        }

        return null;
    },

    remove: function() {
        var lastyear = new Date();

        lastyear.setFullYear( lastyear.getFullYear() - 1 );

        this._set( this.name + '=' + this.options.details, lastyear.toGMTString() );
    }
} );

TMCookie.get = function( name, options ) {
    return TMCookie.prototype.get.apply( { name: name, options: options || {} } );
};

TMCookie.set = function( name, value, options ) {
    new TMCookie( name, options ).set( value );
};

TMCookie.remove = function( name, options ) {
    new TMCookie( name, options ).remove();
};

CookieStore = Class.create( {
    initialize: function( store_name ) {
        this.store_name = store_name;

        this._load();
    },

    _load: function() {
        var json = GetCookie( this.store_name );
        if ( json ) {
            try {
                this.data = unescape(json).evalJSON();
            }
            catch (e) {
                this.clear();
            }
        }
        else
            this.clear();
    },

    clear: function() {
        this.data = {};
        this._store();
    },

    _store: function() {
        document.cookie = this.store_name + "=" + escape(Object.toJSON( this.data )) + "; path=/;expires=";
    },

    get: function( key ) {
        return this.data[key];
    },

    set: function( key, value ) {
        this.data[key] = value;
        this._store();
    },

    remove: function ( key ) {
        delete this.data[key];
        this._store();
    }
} );

CookieTree = Class.create( {
    initialize: function () {
        this.keys = $A(arguments);
        this.store = new CookieStore( this.keys.shift() );
    },

    _get_data: function() {
        var datakey = this.keys[0];
        var data = this.store.get( datakey ) || {};

        for( var i = 1 ; i < this.keys.length ; i ++ ) {
            var key = this.keys[i];
            data = data[key] || {};
        }

        return data;
    },

    _set_data_for_key: function ( ikey, storedata, newdata ) {
        storedata = storedata || {};

        if ( ikey == this.keys.length - 1 )
            storedata[this.keys[ikey]] = newdata;
        else if ( ikey < this.keys.length )
            // only recurse if there are more and we are not at the end
            storedata[this.keys[ikey]] = this._set_data_for_key( ikey + 1, storedata[this.keys[ikey]], newdata );

        return storedata;
    },

    _set_data: function( data ) {
        var datakey = this.keys[0];
        var storedata = this.store.get( datakey );

        storedata = this._set_data_for_key( 1, storedata, data );

        this.store.set( datakey, storedata );
    },

    get: function( key ) {
        if ( this.keys.length ) {
            var data = this._get_data();
            return data[key];
        }
        else
            return this.store.get( key );
    },

    set: function( key, value ) {
        if ( this.keys.length ) {
            var data = this._get_data();
            data[key] = value;
            this._set_data( data );
        }
        else
            this.store.set( key, value );
    },

    remove: function( key ) {
        if ( this.keys.length ) {
            var data = this._get_data();
            delete data[key];
            this._set_data( data );
        }
        else
            this.store.remove( key );
    }
} );

var Discrete = {
    setup: function( event_id ) {
        var url_did = "null";
        var cookie = new CookieTree( '_E' );
        var did = cookie.get( 'did' );

        if ( !Object.isUndefined( event_id ) ) {
            url_did = new $H( location.search.toQueryParams() ).get('did');

            // reset the saved DID if not for this event
            if ( !did || did[0] != event_id ) {
                did = [ 0, '' ];
                Discrete.clear();
            }
        }

        // the discrete is either passed in or, if we are on the same event,
        // fetched from the cookie
        if ( !url_did || url_did == "null" ) {
            if ( Object.isArray( did ) && did.length == 2 ) {
                Discrete.id = did[1] || '';
            }
            else {
                Discrete.id = '';
            }
        }
        else {
            Discrete.id = url_did.toLowerCase();
        }

        // store the did if we got one
        // only if we have an event_id
        if ( Discrete.id && !Object.isUndefined( event_id ) )
            cookie.set( 'did', [ event_id, Discrete.id ] );
    },
    clearURL: function() {
        this.clear();
        return (removeGetParam(window.location.href.toString(), "did"));
    },
    clear: function() {
        new CookieTree( '_E' ).remove( 'did' );
        delete Discrete.id;
    }
};

function removeGetParam(lnk, param) {
    if (lnk && param) {
        var url = decodeURIComponent(lnk);
        var regex = new RegExp('(\\s+)?\\b' + param + '(\\s+)?(=[^&]*)?(&|$)', "gi");
        var reg = {"&": /\&+/g, "?": /\?\&/g, "": /(\?|\&)$/};
        url = url.replace(regex, "");
        for (var r in reg) {
            url = url.replace(reg[r], r);
        }
        return url;
    } else {
        return false;
    }
}
var ISCLanding = {
    
    setup: function (id, kill) {
        ISCLanding.type = '';

        var cookie = new CookieTree('_E');
        var url_type = new $H(location.search.toQueryParams()).get('landing');
        
        if(id && url_type && ( url_type === 'c' || url_type === 's')){
            cookie.set('landing', [id, url_type]);
        }

        if (id && id['type'] && id['type'] === "event_id") {
            var landing = cookie.get('landing');
            if (landing && (landing[1] === 'c' || landing[1] === 's')) {
                ISCLanding.type = landing[1];
            }
            else {
                if (!kill['crash'] && (!id['onsale_on_date'] || id['onsale_on_date'] <= Math.floor( ( new Date() ).getTime() / 1000 ))) {
                    ISCLanding.type = 'c';
                }
            }
        }
    },
    
    clear: function () {
        new CookieTree('_E').remove('landing');
        delete ISCLanding.type;
    }
    
};

var EventState = {
    touch: function( event_id ) {
        var events = new CookieTree( '_E' ).get( 'el' ) || [];
        events = events.without( event_id );
        events.push( event_id );

        if ( events.length > 10 ) {
            var oldest = events.shift();
            new CookieTree( "_E" ).remove( oldest );
        }
        new CookieTree( '_E' ).set( 'el', events );
    }
};

function getSearch( uri, h, k, args ) {
    var validPage = (typeof TM != "undefined" && TM.config && TM.config.page_type )? /^(search|browse|artist|venue|venueartist|microsite_amex|microsite_generic|microsite_citi)$/.test(TM.config.page_type) : false; 

    new Ajax.Request(uri, {
        method: 'get',
        parameters: args,
        onCreate: function() {
           if(validPage) { 
               TM.MetricsCollection.timings.facade('startTimer', { 
                    'name': 'searchResultsLoad_' + k,
                   'mtype': 'web.page.cs_xhr_response.timer.millis'
               });
           }
        },
        onSuccess: function(t) {
            var data = t.responseText.evalJSON();
            if( k == 'histogram' ) {
                h.set( k, data.facet_counts.facet_fields );
            }
            else if( k == 'didyoumean' ) {
                h.set( k, data.spellcheck );
                h.set( 'seealso', data.response.docs );
            }
            else if( k == 'scorebig' ) {
                h.set( 'local', data.response.local );
                h.set( 'national', data.response.national );
                h.set( 'domain', {"numFound":0,"start":0,"docs":[]} );  
                h.set( 'total', h.get('local').numFound + h.get('national').numFound );
                h.set( 'total_docs', h.get('local').docs.length + h.get('national').docs.length);
            }
            else {
                h.set( k, data.response );
                h.set( 'total', h.get('total') + h.get( k ).numFound );
                h.set( 'total_docs', h.get('total_docs') + h.get( k ).docs.length );
            }
            if(validPage) {
                var statuses = {"0": "success", "2": "no_results", "3": "error"};
                TM.MetricsCollection.timings.facade('endTimer', { 
                            'name': 'searchResultsLoad_' + k,
                    'web_resource': 'searchResultsLoad_' + k,
                 'response_status': (data.responseHeader && data.responseHeader.status)? (statuses[data.responseHeader.status])? statuses[data.responseHeader.status]: data.responseHeader.status : 'success', 
                          'cached': (data.responseHeader && data.responseHeader.cached)? data.responseHeader.cached : 0
                }); 
                jQuery(document.body).trigger("searchresultsload", [{"searchType": k}]);
            }
        },
        onFailure: function(t) {
            h.set( 'response_errors', 1 );
             if(validPage) {
                TM.MetricsCollection.timings.facade('endTimer', { 
                            'name': 'searchResultsLoad_' + k,
                    'web_resource': 'searchResultsLoad_' + k,
                 'response_status': t.status, 
                          'cached': 0
                }); 
                jQuery(document.body).trigger("searchresultsload", [{"searchType": k}]);
            }
       }
   });
}

function getMenu( uri, h, k, args ) {
    new Ajax.Request(uri, {
        method: 'get',
        parameters: args,
        onSuccess: function(t) {
            if( k == 'popular_events' ) {
                h.set( k, t.responseText.evalJSON() );
            }
            else {
                h.set( k, t.responseText.evalJSON().facet_counts.facet_fields );
            }
        }
    } );
}

function getMember( uri, h, k, args ) {
    
    var mid_cookie = (window.GetCookie && window.GetCookie('MID')) ? window.GetCookie('MID') : "";
    
    if (mid_cookie) {
        new Ajax.Request(uri, {
            method: 'get',
            parameters: args,
            onSuccess: function(t) {
                h.set( k, t.responseText.evalJSON().member );
            }
        });
    }
}

function anchorClick()
{
    var theAnchor = $$('a') ;
    for(var i=0;i<theAnchor.length;i++)
    {
        theAnchor[i].onfocus = function () { if(this.blur)this.blur(); };
    }
}

Currency = Class.create( {
    amount_regexp: new RegExp( '333\(.\)222\(.\)11', '' ),

    initialize: function( template ) {
        this._template = template;
        var results = template.match( this.amount_regexp );
        this._thou = results[1];
        this._dec = results[2];
    },

    format: function( amount ) {
        var dollars = Math.floor( amount );
        // Math.round to deal with javascript precision errors
        var cents = Math.round( (amount - dollars) * 100 );
        cents = cents.toString();
        if ( cents.length == 1 )
            cents = '0' + cents;

        var formatted_amount = this._dec + cents;

        dollars = dollars.toString();
        while ( true ) {
            var hundreds = dollars.slice( -3 );
            formatted_amount = hundreds + formatted_amount;
            dollars = dollars.slice( 0, -3 );

            if ( dollars == '' )
                // no more digits.  we're done
                break;
            else
                // add a hundreds separator
                formatted_amount = this._thou + formatted_amount;
        }

        // replace the amount in the template with the formatted amount and return it
        return this._template.replace( this.amount_regexp, formatted_amount );
    }
} );

function url_append_arg(url, key, value){
   url = url.replace(/\/$/, '');
   if (url.search(/[?]/) > 0 ) {
    url += "&" + encodeURI( key + "=" + value );
   } else {
    url += "?" + encodeURI( key + "=" + value );
   }
   return url;
}

/*
package global::OnWindowLoad;

=pod

=over 4

=item Class: B<OnWindowLoad>

Manages and call functions after the window.onload event in sequence

=over 4

=item SYNOPSIS

  new OnWindowLoad( function() {
    // do some stuff
  } );

  new OnWindowLoad( function() {
    // do some stuff
  }, { load_last: true } );


=item DESCRIPTION

Different browsers execute events attached to window.onload in different order.  For example, IE executes them in the reverse order compared to Firefox.  This class manages lists of functions and calls them squentially in the order that they were added.

Optionally you can specify a flag to have the function executed last (or nearly last).

=back

=back

=cut

*/

OnWindowLoad = Class.create( {
    to_load: [],
    to_load_last: [],
    loaded: [],
    flags: {
        is_running: false,
        window_loaded: false
    },

    initialize: function( f, options ) {
        this.f = f;

        options = Object.extend( {
            load_last: false
        }, options );

        if ( options.load_last ) {
            this.to_load_last.push( this );
        }
        else {
            this.to_load.push( this );
        }
    },

    run: function() {
        if ( !this.flags.window_loaded || this.flags.is_running ) {
            return;
        }
        else {
            this.flags.is_running = true;
        }

        // run it
        this.f();

        this.flags.is_running = false;

        // shift the loader object to the finish list
        this.loaded.push( this.to_load.shift() );

        // run the next one after letting the browser get some time
        var next = this.next.bind( this );
        window.setTimeout( next, 50 );
    },

    next: function() {
        this.flags.window_loaded = true;

        if ( !this.to_load.length && this.to_load_last.length ) {
            while ( this.to_load_last.length ) {
                this.to_load.push( this.to_load_last.shift() );
            }
        }

        // run 'em if we got 'em
        if ( this.to_load.length ) {
            this.to_load[0].run();
        }
    }
} );
Event.observe( window, 'load', OnWindowLoad.prototype.next.bind( OnWindowLoad.prototype ) );

/*
package global::DialogChain;

=pod

=over 4

=item Class: B<DialogChain>

A simple manager class to string sequenced dialogs together

=over 4

=item SYNOPSIS


=item DESCRIPTION


=back

=back

=cut

*/

DialogChain = Class.create( {
    chains: [],
    queue: [],
    flags: {},

    tlog: TMDebug.gen_tlog( 'dialog-chain' ),

    initialize: function( data ) {
        this.dialogs = [];
        if ( data ) {
            this.begin_function = data.begin_function;
            this.end_function = data.end_function;
            this.cancel_function = data.cancel_function;
        }
        this.current_dialog = -1;

        this.chains.push( this );
    },

    add_dialog: function( data ) {
        this.dialogs.push( data );
    },

    block: function() {
        this.flags.is_blocked = true;
    },

    unblock: function() {
        this.flags.is_blocked = false;

        this.queue_next();
    },

    start: function( context, event ) {
        this.tlog( 'start' );

        // wire the context up
        this.context = context;
        this.context.dialog_chain = this;
        if ( event ) {
            context.event = event;
        }

        this.queue.push( this );

        // return if more than one chain is in the queue
        if ( this.queue.length == 1 && !this.flags.is_blocked ) {
            this.run();
        }

        return false;
    },

    run: function() {
        this.flags.current_dialog_chain = this;
        this.current_dialog = -1;

        if ( this.begin_function )
            this.begin_function( this );

        this.show_next();

        if ( this.context.event ) {
            Event.stop( this.context.event );
        }
    },

    previous: function() {
        this.tlog( 'previous' );

        this.hide( this.dialogs[this.current_dialog] );

        this.show_previous();
    },

    _show: function() {
        window.setTimeout( this.show.bind( this ), 0 );
    },

    go_to: function( dialog ) {
        this.tlog( 'to_to' );

        this.hide( this.dialogs[this.current_dialog] );

        this.current_dialog = this.dialogs.indexOf( dialog );

        this._show();
    },

    next: function() {
        this.tlog( 'next' );

        this.hide( this.dialogs[this.current_dialog] );

        this.show_next();
    },

    show_previous: function() {
        this.tlog( 'show previous' );

        this.current_dialog --;

        this._show();
    },

    show_next: function() {
        this.tlog( 'show next' );

        this.current_dialog ++;

        this._show();
    },

    show: function() {
        if ( this.current_dialog < this.dialogs.length ) {
            var current_dialog = this.current_dialog;

            var dialog = this.dialogs[current_dialog];
            dialog.dialog_chain = this;

            if ( dialog.check( this.context ) ) {
                if ( current_dialog == this.current_dialog ) {
                    // only show this dialog if current_dialog did not change
                    if( dialog.show ) {
                        dialog.show();
                        if( dialog.showCallBack && ( typeof dialog.showCallBack == 'function' ) ){
                            dialog.showCallBack( dialog );
                        }
                    }
                }
            }
            else {
                if ( current_dialog == this.current_dialog )
                    // only show next dialog if current_dialog did not change
                    this.show_next();
            }
        }
        else
            this.finish();
    },
    
    hide: function (dialog) {
        if (dialog) {
            if (dialog.hide) {
                dialog.hide();
            }
            delete dialog.dialog_chain;
        }
    },
    
    cancel: function() {
        this.tlog( 'cancel' );

        this.hide( this.dialogs[this.current_dialog] );

        if ( this.cancel_function )
            this.cancel_function( this );

        this.finish();
    },

    queue_next: function() {
        if ( !this.flags.current_dialog_chain && this.queue.length && !this.flags.is_blocked ) {
            this.queue[0].run();
        }
    },

    finish: function() {
        this.tlog( 'finish' );

        this.current_dialog = -1;

        if ( this.end_function )
            this.end_function( this );

        delete this.flags.current_dialog_chain;

        // advance the queue
        this.queue.shift();

        this.queue_next();
    }
} );


/**
 * This singleton was meant to be as simple as possible for
 * solving the back button problem through checkout only. Refer
 * to YUI or MooTool's History Manager if you want to keep track
 * of the state of the AJAX app.
 * 
 * Tested on:
 *   1. Firefox 3.5
 *   2. IE7
 *
 * @class A singleton class for detecting and dispatching an event when
 *     the browser back button is used.
 * @example
 * // following iframe must be part of DOM during load.
 * // <iframe id="bif" src="blank.html"
 * //     style="width:1px;height:1px;border:0;position:absolute;top:0;
 * //     left:0;visibility:hidden"></iframe>
 * 
 * DetectBackButton.getInstance({
 *     init_state_name: 'somestate'
 * });
 * DetectBackButton.startDetect();
 * 
 * // listen on document.body for the event DetectBackButton.EVENT_NAME
 * // and do whatever you want when it fires.
 * // the memo object contains:
 * //    h {DetectBackButton} instance of the class
 * //    state {string} the name of the state transitioning into 
 * // check Event.fire in the prototypejs api for arguments to the handler.
 * document.body.observe(DetectBackButton.EVENT_NAME, function(e) {
 *     DetectBackButton.stopDetect(); // or e.memo.h.stopDetect();
 *     alert('oh you pressed the back button. please dont leave....');
 * });
 */
var DetectBackButton = (function(){
    /** @type {DetectBackButton} */
    var instance = null;

    /** @const */
    var EVENT_NAME = 'tm:bh_change';

    /** @type {Object} */
    var config = {
        /** @type {number} interval in ms to check for change of state */
        timeout_interval: 100,
        /** @type {string} id of the HTMLDOMIFrame */
        iframe_id: 'dbb_iframe',
        /** @type {string} name of the initial state */
        init_state_name: 'pagetype',
        /** @type {boolean} whether to force user into this state
         *      when class instantiates
         */
        force_init_state: true
    };

    /** @type: {string} Keeps track of the current state browser is in */
    var _curr_state = null;

    /** @type {DOMWindow} Reference to the iframe, if _useIFrame */
    var _d = null;

    /** @type {integer} id of the setInterval() */
    var _iid = 0;

    /** @type {boolean} */
    var _useIFrame = Prototype.Browser.IE
                     && navigator.appVersion.indexOf("MSIE 7.") != -1;

    /** @type {boolean} is ie 8 or 9 */
    var _old_browser = false;
    /**
     * Checks if an instance is created. If not, create it.
     *
     * @param {Object=} opt_obj Config value for createInstance()(optional)
     * @return {?DetectBackButton} instance of the class, null if loading
     *     from a non-supported browser.
     * @public
     */
    function getInstance (opts) {
        if (navigator.appVersion.indexOf("MSIE 8") != -1 || navigator.appVersion.indexOf("MSIE 9") != -1) {
            _old_browser = true;
        }

        if (!instance) {
            createInstance(opts);
            instance = this;
            config.force_init_state && writeState();
        }

        return instance;
    };

    /**
     * Creates an instance of DetectBackButton.
     *
     * @param {Object=} opt_obj Object holding config values (optional)
     * @throws {string} If iframe not present when _useIFrame is truthy
     * @protected
     */
    function createInstance (opts) {
        Object.extend(config, opts); 

        if (_useIFrame) {
            _d = $(config.iframe_id);
            if (!_d) throw "error: no iframe";
            _d = _d.contentWindow;
        }
    };

    /**
     * @param {string} sn name of the state
     */
    function writeState (sn) {
        sn = sn || config.init_state_name;
        if (_useIFrame) {
            // dealing with IE6/7
            var doc = _d.document;
            doc.open();
            doc.write(sn);
            doc.close();
        } else {
            // everything else
            // manually set initial state
            if (_old_browser) {
                window.location.hash = sn;
            } else {
                window.history.pushState('', '', '#' + sn);
            }
        }
        _curr_state = sn;
    };

    /**
     * clears the current polling
     */
    function stopDetect() {
        s = 'idle';
        window.clearInterval(_iid);
    };
    /**
     * Starts the polling
     * @return {boolean} truthy if successfully started. false otherwise.
     */
    function startDetect() {
        if (instance) {
            _iid = window.setInterval(
                handler,
                config.timeout_interval
            );
            s = 'detecting...';
            return true;
        } else {
            return false;
        }
    };
    /**
     * Polling handler
     */
    function handler() {
        var state;

        // fetch current state
        if (_useIFrame) {
            state = _d.document.body.innerHTML;
        } else {
            state = window.location.hash;
            state = state.substr( state.indexOf('#') + 1 );
        }
        // changed?
        if (state !== _curr_state) {
            _curr_state = state;
            Event.fire(document.body, EVENT_NAME,
                {h:instance, state:state}
            );
        }
    };

    return {
        EVENT_NAME: EVENT_NAME,
        getInstance: getInstance,
        startDetect: startDetect,
        stopDetect: stopDetect
    };
})();

TMAd = Class.create( {
    global: {
        ad_num: 1
    },

    initialize: function( config ) {
        this.iframe = $(config.iframe);
        this.src = config.src;
    },

    hide: function() {
        this.iframe.hide();
    },

    _get_iframe_name: function() {
        var num = this.global.ad_num;
        this.global.ad_num = num + 1;
        return "TMAd" + num;
    },

    clear: function() {
        this.iframe.setAttribute( 'src', '' );
    },

    _get_uri: function( params ) {
        var src = this.src;

        for ( var param in params ) {
            var new_param = param + '=' + params[param];
            var r = new RegExp( param + "=[^&]*" );
            if ( src.search( r ) > -1 ) {
                // replace the current param
                src = src.replace ( r, new_param );
            }
            else {
                // add the param
                src = src + '&' + new_param;
            }
        }
        return src;
    },

    load: function( params ) {
        var uri = this._get_uri( params || {} );
        var name = this._get_iframe_name();

        this.iframe.show();
        this.iframe.setAttribute( 'name', name );
        this.iframe.setAttribute( 'src', uri );
    }
} );


SortedArray.prototype._insert = function( context ) {
    var middle = context.left + Math.floor( (context.right+1 - context.left) / 2 );
    var comp = this.sortedCompare( context.object, this[middle] );

    if ( comp < 0 ) {
        // insert in to the list before middle object
        if ( middle == context.left ) {
            this.splice( context.left, 0, context.object );
        }
        else {
            SortedArray.prototype._insert.apply( this, [ {
                object: context.object,
                left: context.left,
                right: middle-1
            } ] );
        }
    }
    else if ( comp > 0 ) {
        // insert in to the list after middle object
        if ( middle == context.right ) {
            this.splice( context.right+1, 0, context.object );
        }
        else {
            SortedArray.prototype._insert.apply( this, [ {
                object: context.object,
                left: middle+1,
                right: context.right
            } ] );
        }
    }
    else {
        // equal.  put it before the middle
        this.splice( middle, 0, context.object );
    }
};

SortedArray.prototype.insert = function( object ) {
    if ( !this.length ) {
        this.push( object );
    }
    else {
        SortedArray.prototype._insert.apply( this, [ {
            object: object,
            left: 0,
            right: this.length-1
        } ] );
    }
};

SortedArray.prototype._find = function( context ) {
    var middle = context.left + Math.floor( (context.right+1 - context.left) / 2 );
    var comp = this.sortedCompare( context.object, this[middle] );

    if ( comp < 0 ) {
        // insert in to the list before middle object
        if ( middle == context.left ) {
            return -1;
        }
        else {
            return SortedArray.prototype._find.apply( this, [ {
                object: context.object,
                left: context.left,
                right: middle-1
            } ] );
        }
    }
    else if ( comp > 0 ) {
        // insert in to the list after middle object
        if ( middle == context.right ) {
            return -1;
        }
        else {
            return SortedArray.prototype._find.apply( this, [ {
                object: context.object,
                left: middle+1,
                right: context.right
            } ] );
        }
    }
    else {
        // this is it (or one of them)
        if ( this[middle] == context.object ) {
            return middle;
        }
        else {
            // look left and right for matching objects
            var left = middle - 1;
            // do this while object sorting comparison matches
            while ( left >= 0 && !this.sortedCompare( context.object, this[left] ) ) {
                if ( context.object == this[left] ) {
                    return left;
                }
                left --;
            }
            var right = middle + 1;
            while ( right < this.length && !this.sortedCompare( context.object, this[right] ) ) {
                if ( context.object == this[right] ) {
                    return right;
                }
                right ++;
            }
        }
    }

    return -1;
};

SortedArray.prototype.find = function( object ) {
    if ( !this.length ) {
        return -1;
    }
    else {
        return SortedArray.prototype._find.apply( this, [ {
            object: object,
            left: 0,
            right: this.length-1
        } ] );
    }
};

SortedArray.prototype.remove = function( object ) {
    try {
        if ( this.length ) {
            var index = SortedArray.prototype._find.apply( this, [ {
                object: object,
                left: 0,
                right: this.length-1
            } ] );

            if ( index >= 0 ) {
                // remove it out
                this.splice( index, 1 );
            }
            else {
                throw ( "SortedArray.remove: object not in list" );
            }
        }
        else {
            throw ( "SortedArray.remove: array is empty" );
        }
    }
    catch( e ) {
        throw ( e );
    }

    return object;
};

function SortedArray( arr, comp ) {
    arr.insertSorted = SortedArray.prototype.insert;
    arr.removeSorted = SortedArray.prototype.remove;
    arr.findSorted = SortedArray.prototype.find;
    arr.sortedCompare = comp;

    return arr;
}

LiveChatTemplate = {
    initialize: function( $super, data ) {
        $super(data);

        this.adads = window.location.href.slice(window.location.href.indexOf('?') + 1).match(/adads_id/i) ? true : false;

        // setup checkboxs and "start live chat" buttons
        this._reset_cnt = (function(){
            var cb = [ $('ada_lc_cb1'), $('ada_lc_cb2') ].filter(function(v) {return v});
            var s = $('ada_lc_start');
            var tar = cb.length;
            var cnt = 0;


            var f = function(ev) {
                ev.target.checked ? ++cnt : (cnt?--cnt:0);
                if( cnt === tar ) {
                    //checked
                    s.writeAttribute('class','button').writeAttribute('disabled',false);                     
                }               
                else {
                    s.writeAttribute('class','button-disabled button').writeAttribute('disabled');
                }
            };

            cb.each(function(item){
               item.observe('click', f); 
            });
            var reset = function() {
                s.writeAttribute('class','button-disabled button').writeAttribute("disabled");
                cb.each(function(item){ item.checked = false });
                cnt = 0;
            };

            return reset;
        })();
        
        $('ada_lc_start').observe('click',function(){
            this._reset_cnt();
            var live_chat_url = data.live_chat_url;
            if (live_chat_url.indexOf("?") != -1) {
                live_chat_url += "&";
            }
            else {
                live_chat_url += (live_chat_url.charAt(live_chat_url.length-1) != "/") ? "/?" : "?";
            }
            live_chat_url += "refer="+encodeURIComponent(window.location.href);
            this.popUpWin = window.open(live_chat_url, "chatWindow", "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=640,height=640");
            omniTracking.navigation_link("EDP_accessible_chat", false);
            if (navigator.appName === "Netscape") {
                this.popUpWin.focus();
            }
        }.bind(this));
        
        this.livechat =  new Popup('ada_live_chat_dialog', {
            close_id: ['ada_lc_close','ada_lc_cancel'],
            zIndex: 109,
            lightbox: { opacity: 0.5 },
            onShow: this._reset_cnt,
            onHide: function( instance ){
                if( instance && instance.current_anchor ){
                    instance.current_anchor.focus();
                }
            }
        });
        
        $('ada_lc_ada_form_link').observe('click', this._handle_form_link.bind(this));
    },
    
    _handle_form_link: function () {
        if (this._parentShow) {
            this.livechat.hide();
            this._parentShow();
        }
        else {
            var url = url_append_arg(document.URL, 'adads_id', 1);
            jQuery('#ada_lc_ada_form_link').attr('href', url);
        }
    },
    
    show: function( $super, overrideShow ) {
        overrideShow = typeof overrideShow === 'function' ? overrideShow : false;
        var original_target = (overrideShow && (overrideShow.currentTarget || overrideShow.srcElement)) || false;
        this._parentShow = this._parentShow || overrideShow || $super;
        if (this.adads) { 
            this._parentShow();
            return;
        }
        this.livechat.show({
            anchor_id: document.body,
            popup_align: { x:'center', y:'center' }
        });
        this.livechat.current_anchor = original_target ? original_target : this.livechat.current_anchor;
        var lightboxWin = this.livechat.layer;
        if( lightboxWin ){
            $('ada_live_chat_dialog').focus();
        }
    }
};

function listToString( list, max_char, mtext) {
        max_char = max_char || 70;
        mtext = mtext || 'and # more';

        var tmp_list = [],
            cur_len = 0,
            total_len = list.length,
            added_len = mtext.length,
            pcnt = mtext.split('#').length-1;

        for( var i=0; i < total_len; i++ ) {
            // test if adding next name and "and x more" text will exceed limit
            if( (cur_len + list[i].length + 4 + added_len - pcnt + (total_len-i>9?2:1)) > max_char ) {
                tmp_list.push( mtext.replace('#', (total_len-i)) );
                break;
            }
            else {
                cur_len += list[i].length + (i===0?0:2);
                tmp_list.push( list[i] );
            }
        }
        return tmp_list.join(', ');
};

/**
 * MultiAct Support frontend code to test height of container when
 * to determine if a popup is needed to house the artist names
 * @param containerEL {HTMLDomElement} Container element
 * @param listContainer {HTMLDomElement} Container for names
 * @param names {Array.<strings>} Names in the list
 * @param opts {Object} Options
 */
function masbuilder( containerEL, listContainer, names, opts) {
    var options = Object.extend({ height: 35, tu:{details:"Details", more:"more..."},namelist_element:'span' }, opts||{});
    if( !(Object.isArray(names) && names.length) ) {
        $(containerEL).hide();
        return;
    }
    var tmp2 = $(containerEL);
    var num_names = 0;
    var dEl = $('masDummyEl');
    var originalContainer = null;
    var namelistContainer = listContainer;
    if( !namelistContainer ) {
        namelistContainer = document.createElement('span');
        tmp2.appendChild(namelistContainer);
    }
    var details_text = options.tu.details+":";

    // if using dummy container to do height calculation
    // defaults to a width of 400px
    if (!dEl && options.dummy_container) {
        dEl = (new Element ('div', {id:'masDummyEl'}));
        dEl.setStyle({"width":(options.dummy_container.width||"400px"),"marginLeft":"-1000px","position":"absolute","top":"0"});
        document.body.appendChild(dEl);
    }

    if (dEl) {
        originalContainer = tmp2.up();
        tmp2.remove();
        dEl.appendChild(tmp2);
    }
    names.each( Element.remove );
    namelistContainer.update("");
    tmp2.show();

    do {
        if(num_names) namelistContainer.appendChild(document.createTextNode(', '));
        namelistContainer.appendChild( names[num_names++] );
    }
    while( tmp2.getDimensions().height <= options.height && num_names < names.length );

    if( tmp2.getDimensions().height > options.height ) {
        var more_el = new Element( 'a', { 'class': 'ma-more-link', 'href': 'javascript://' } );
        more_el.appendChild(document.createTextNode(options.tu.more));
        //num_names is 1 at least
        if( num_names == 1 ) {
            namelistContainer.update("").appendChild(more_el);
        } else {
            // attach "more" link and do regression
            namelistContainer.appendChild(document.createTextNode(', '));
            namelistContainer.appendChild(more_el);
            var tmp = namelistContainer.childNodes;
            while( tmp2.getDimensions().height > options.height && num_names > 0 ) {
                namelistContainer.removeChild( tmp[tmp.length-3] );
                if (num_names > 1)
                    namelistContainer.removeChild( tmp[tmp.length-3] );
                num_names--;
            }
            if (num_names == 0)
                namelistContainer.removeChild( tmp[tmp.length-2] );
        }
        var popupContainer = options.popupContainer || 'multi_act_dialog'+options.mad_index;
        var popupContainerClose = options.popupContainerClose || 'mad_close'+options.mad_index;

        if (options.type == "tt") {
            new Popup(popupContainer, {
                close_id: popupContainerClose,
                zIndex: 40,
                links: [{
                    group: 'edp',
                    toggle: true,
                    link_id: more_el,
                    popup_align:  { x: -1, y: -1 },
                    anchor_align: { x: 1, y: 1 }
                }],
                constrain: { right: 0, anchor:1 },
                onShow: function(){var t=tm_omn;t.linkTrackVars='prop14,eVar14,events';t.linkTrackEvents='event27';t.eVar14=t.prop14=options.mad_prop14;t.events='event27';t.tl(true,'o','Navigation Link')},
                onShowCallBack: function( tigger, popWin ) {
                    if( popWin.layer ) {
                        popWin.layer.writeAttribute({
                            role: 'alert',
                            'aria-live': 'assertive',
                            tabindex: '-1'
                        });
                        if( $( popupContainerClose ) ) {
                            $( popupContainerClose ).focus();
                        }
                    }
                },
                onHide: function( instance ) {
                    if( instance.layer ) {
                        instance.layer.removeAttribute('role');
                        instance.layer.removeAttribute('aria-live');
                        instance.layer.removeAttribute('tabindex');
                    }
                    if( instance.current_anchor ) {
                        instance.current_anchor.focus();
                    }
                }
            });
        } else {
            new Popup(popupContainer, {
               close_id: [popupContainerClose, 'mad_close_btn'+options.mad_index],
               lightbox: { opacity: 0.5, zIndex: 120 },
               links: [{
                    link_id: more_el,
                    anchor_id: document.body,
                    popup_align:  { x: 'center', y: 'center' },
                    anchor_align: { x: 1, y: 1 }
               }],
               zIndex: 151,
               onShow: function(){var t=tm_omn;t.linkTrackVars='prop14,eVar14,events';t.linkTrackEvents='event27';t.eVar14=t.prop14=options.mad_prop14;t.events='event27';t.tl(true,'o','Navigation Link')},
               onShowCallBack: function( trigger, popWin ) {
                   if( popWin.layer ) {
                       popWin.layer.writeAttribute({
                           role: 'alert',
                           'aria-live': 'assertive',
                           tabindex: '-1'
                       });
                       if( $( popupContainerClose ) ) {
                           $( popupContainerClose ).focus();
                       }
                   }
               },
               onHide: function( instance ) {
                   if( instance.layer ) {
                       instance.layer.removeAttribute('role');
                       instance.layer.removeAttribute('aria-live');
                       instance.layer.removeAttribute('tabindex');
                   }
                   if( instance.current_anchor ) {
                       instance.current_anchor.focus();
                   }                   
               }
            });
        }

    }

    if (typeof tm_omn !== "undefined" && tm_omn.prop12.match && !tm_omn.prop12.match(/Mu/)) {
        tm_omn.prop12 = tm_omn.prop12 + 'Mu';
    }

    // restore from dummy container for calculations
    if (originalContainer) {
        tmp2.remove();
        originalContainer.appendChild(tmp2);
        dEl.empty();
    }
};

//////////////////////////////////////////////////////////////////////////
// lazy load will wait until the page has finish loading
// ideally for scripts hosted on slow third party servers
// -- trung lam
//////////////////////////////////////////////////////////////////////////
function lazy_load_script(url, callback) {
    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.onload = callback;
    script.onreadystatechange = function() {
        if (this.readyState === 'complete' || this.readyState === 'loaded') {
            callback();
        }
    };
    script.src = url;
    body.appendChild(script);
};

//////////////////////////////////////////////////////////////////////////
// return the unique items by feeding it the original array
// -- trung lam
//////////////////////////////////////////////////////////////////////////
function get_unique_array(o_array) {
    var n_array = [];
    var o_len = o_array.length;
    for (var x = 0; x < o_len; x++) {
        var found = false;
        var n_len = n_array.length;
        for (var y = 0; y < n_len; y++) {
            if (o_array[x] === n_array[y]) {
                found = true;
                break;
            }
        }
        if (!found) {
            n_array.push(o_array[x]);
        }
    }
    return n_array;
};

//////////////////////////////////////////////////////////////////////////
// return the url param value by feeding it the url param key
// -- trung lam
//////////////////////////////////////////////////////////////////////////
function get_url_param(name) {
    var results = new RegExp('[\\?&]'+name+'=([^&#]*)').exec(window.location.href);
    return results ? results[1] : null;
};

//////////////////////////////////////////////////////////////////////////
// return all the url parameters in a hash
// -- trung lam
//////////////////////////////////////////////////////////////////////////
function get_url_params() {
    var params = {};
    var tmp;
    var q = window.location.href.split('?')[1];
    if (q !== undefined) {
        q = q.split('&');
        for (var i = 0; i < q.length; i++) {
            tmp = q[i].split('=');
            params[tmp[0]] = tmp[1];
        }
    }
    return params;
};

/*
Return truncated text with dots, depending on provided template
*/
function limit_with_dots (name, limit, template) {
    var template = template || {truncated: '...', full: ''};
    if (name.length <= limit - template['full'].length) {
        return(name + template['full']);
    }
    return(name.substr(0, limit - template['truncated'].length) + template['truncated']);
}

/**
 * always create namespace under TM
 * adopted from YUI namespace()
 * https://github.com/yui/yui3/blob/master/src/yui/js/yui.js#L1272
 *
 * @method namespace
 * @param {String} namespace* One or more namespaces to create.
 * @return {Object} Reference to the last namespace object created.
 */
function createNamespace() {
    var a = arguments, o, i = 0, j, d, arg,
        ns = this,
        PERIOD = ".";

    // force namespace to TM
    ns.TM = ns.TM || {};
    ns = ns.TM;

    for (; i < a.length; i++) {
      o = ns; //Reset base object per argument or it will get reused from the last
      arg = a[i];
      if (arg.indexOf(PERIOD) > -1) { //Skip this if no "." is present
        d = arg.split(PERIOD);
        for (j = (d[0] == 'TM') ? 1 : 0; j < d.length; j++) {
          o[d[j]] = o[d[j]] || {};
          o = o[d[j]];
        }
      } else {
        o[arg] = o[arg] || {};
        o = o[arg]; //Reset base object to the new object so it's returned
      }
    }
    return o;
}

createNamespace("TM.util", "TM.config");
/**
 * @method formatCurrency
 *
 * uses the format rules defined by TM.config.currency_format_rules, which
 * can be re-assigned to override the default of:
 *   [ ",", ".", "", "" ]
 * use currency_format.get_format_rules() in TT for proper currency setting
 *
 * @param {Number|String} value a valid number or string in number format
 * @param {Object} Objects default values are:
 *   pre: true
 *   post: true
 *   decimal: true
 *   symbolOnly: false => this will only return dollar sign
 * @return {String}
 */
TM.util.formatCurrency = function(value, options, currencyOnly) {
  options = jQuery.extend({
    pre: true,
    post: true,
    decimal: true,
    symbolOnly: false,
    decimalWrap:{
        open:"",
        close:""
    }
  }, options);
  var numAry = Number(value).toFixed(2).split(/[^0-9]/),
      formatted = "",
      rules = TM.config.currency_format_rules || [",",".","",""],
      dollars = numAry[0],
      dec = numAry[1],
      symbol_pre = rules[2].replace(/^[\s]+|[(A-Za-z)]\w/g,'');
      symbol_post = rules[3].replace(/[(A-Za-z)]\w/g,'');

      symbolWithCurrency = rules[2] ? rules[2].replace(" ", "") : rules[3].replace(" ", "");   
  
  if (rules[0]) {
    while ( true ) {
        var hundreds = dollars.slice( -3 );
        formatted = hundreds + formatted;
        dollars = dollars.slice( 0, -3 );

        if ( dollars == '' )
            break;
        else
            formatted = rules[0] + formatted;
    }
  } else {
    formatted = dollars;
  }
  if(currencyOnly){
      return symbolWithCurrency;
  } else {
      return ( options.pre ? options.symbolOnly ? symbol_pre || "" : rules[2] || "" : "" ) + formatted + ( options.decimal ? ( rules[1] || "" ) + options.decimalWrap.open + dec + options.decimalWrap.close : "" ) + ( options.post ? options.symbolOnly ? symbol_post || "" : (rules[3] || "") : "" );
  }
};

// checks for nested property that are not null/undefined
// @params o the object
// @params {Strings}* nested properties
// @returns false if obj or any nested property is null/undefined
TM.util.checkNested = function(o) {
  var l = arguments.length;
  if (o !== undefined && o !== null) {
    if (l > 1) {
      for(var i=1; i<l; i++) {
        if(o[arguments[i]] === undefined || o[arguments[i]] === null) {
          return false;
        } else {
          o = o[arguments[i]];
        }
      }
    }
    return true;
  }
  return false;
}

/**
 * @object TMTextMoreLess
 *
 * generic text trimmer for more/less interaction.
 * @param {Object}: TextMoreLess.opts : defaults. Overrides in calling doc
 * @param {Object}: setup
 * see ECOM/TextMoreLess dashboard for indepth documentation
 */

;(function( $, window, document, undefined ) {
    function TMTextMoreLess(elem, opts){
            this.opts = $.extend( {}, $.fn.TextMoreLess.opts, opts );
            this.elem = elem;
            this.$elem = $( elem );
            this.limit = this.opts.limit || false;
            this.contentType = this.opts.contentType || 'text';
            this.loadedTxt = $(this.elem)[this.contentType]();
            this.txt = this.retrieveDisplayTxt();
            this.txtCnt = $('<i>' + this.txt + '</i>').text().length;
            this.elemWidth = parseInt(this.opts.width, 10) || $(this.elem).width() || false;
            this.dataStore = {};
            this.setup = {
                more : { txt : '', toggleData: 'less', delimiter: this.opts.delimiter, expand: 'false' },
                less : { txt : this.txt, toggleData: 'more', delimiter: ' ', expand: 'true' },
                toggle: (this.opts.captureState && this.opts.savedToggle ) ? this.opts.savedToggle : 'more'
            }
     }

            TMTextMoreLess.prototype = {
                init: function() {
                    if((this.elemWidth || this.limit) && this.txt ){
                        if(this.limit || this.contentType === 'html'){
                            this.limit = this.limit || 35;
                            this.byTextLimit();
                        }else{
                            this.byCharWidth();
                        }
                        this.dataStore.txt = this.txt;
                    }
                },

                fireMethods: function(){
                    this.generateDisplay();
                    this.assignListeners();
                },

                byTextLimit: function(){
                    if(this.limit < this.txtCnt){
                        this.setup['more'].txt = (this.contentType === 'html' ? this.cullHtmlDisplay() : this.txt.substring(0, this.limit));
                        this.fireMethods();
                    }
                },

                cullHtmlDisplay: function(){
                    var conf = {
                        regex: /(<.*?>)|(\S+?(?=[\s<]))/g,
                        regexHtml: /^\<\.*\>?/,
                        count: 0,
                        arr : [],
                        strVal: "",
                        isHtml: false
                    },that = this;
                    conf.arr=that.txt.match(conf.regex);
                        return $.map(conf.arr,function(val){
                            conf.strVal = "";
                            conf.isHtml = !!val.match(conf.regExHtml);
                                if(!conf.isHtml){
                                    if(conf.count <= that.limit){
                                        conf.count = conf.count + val.length;
                                        conf.strVal = val;
                                            if(conf.count > that.limit){
                                                conf.strVal = val.substring(0,(val.length - (conf.count - that.limit)));
                                            }
                                    }
                                }else{
                                    conf.strVal = val;
                                }
                            return conf.strVal;
                        }).join('');
                },

                byCharWidth: function(){
                    var tempTxt = this.txt, 
                        i = 0, 
                        lngth = this.txt.length, appendTxt = this.opts.delimiter + this.opts.more;
                    if(this.calculateWidth() > this.elemWidth){
                        for( ;i < lngth; i++){
                           tempTxt = tempTxt.slice(0, -1);
                           var w = this.calculateWidth(tempTxt + appendTxt);
                           if(this.calculateWidth(tempTxt + appendTxt) <= this.elemWidth){
                               this.setup.more.txt = tempTxt;
                               this.fireMethods();          
                               break;
                           }
                        }
                    }
                },

                generateDisplay: function(){
                    var opt = this.opts,
                        dir = this.setup.toggle,
                        $wrapElem = $( opt.wrapDisplay ).addClass( opt.wrapClass )
                            .wrapInner('<a aria-expanded="' + this.setup[dir].expand + '"  aria-live="polite" role="button" href="#">' + opt[dir] + '</a>');
                    $(this.elem).html(this.setup[dir].txt + this.setup[dir].delimiter).append($wrapElem);
                    this.setup.toggle = this.setup[dir].toggleData;
                    this.dataStore.savedToggle = dir;
                    this.dataStore.cachedTxt = $(this.elem)[this.contentType]();
                    opt.captureState = false; 
                },

                assignListeners: function(){
                    var that = this;
                    $(this.elem).delegate('[data-textlimiter] > a','click.textlimiter',function(e){
                        that.generateDisplay();
                        $.isFunction(that.opts.callback) ? that.opts.callback(): null;
                        e.preventDefault();
                    })

                },

                calculateWidth: function(tmpTxt){
                    var fnt = $(this.elem).css('font-size') || $('body').css('font-size') || '11px',
                        tmpTxt = tmpTxt || this.setup['less'].txt,
                        tmpContainer = $('<span>',{ text: tmpTxt })
                                       .css({'position': 'absolute','float': 'left', 'font': fnt, 'visibility': 'hidden', 'white-space': 'nowrap'})
                                       .appendTo($('body')),
                        txtW = tmpContainer.width() || 0;
                        tmpContainer.remove();
                        return txtW;                            
                },

                retrieveDisplayTxt: function(){      
                    return ( 
                        this.opts.contentText 
                            ? this.opts.contentText 
                            : ( this.opts.txt ) 
                                ? ( this.loadedTxt == this.opts.cachedTxt ) ? this.opts.txt : this.loadedTxt
                                : this.loadedTxt || null
                    );
                }
            };

        $.fn.TextMoreLess = function( opts ) {
            if(this.length){
                if($(this).data('TextMoreLess')){
                    $.extend(opts, $(this).data('TextMoreLess').dataStore);
                }
                this.each(function() {
                    var tmtextmoreless = new TMTextMoreLess( this, opts );
                        tmtextmoreless.init();
                        $(this).data('TextMoreLess', tmtextmoreless );
                })
            }
        };

        $.fn.TextMoreLess.opts = {
                 more: 'more',
                 less: 'less',
                 width: false,
                 delimiter: ' ... ',
                 wrapDisplay: '<span data-textlimiter="true"></span>',
                 wrapClass: 'note',
                 callback: false          
        };
})( jQuery, window, document );
