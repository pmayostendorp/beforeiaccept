(function($, M) {

    var $html = $('html'),
        mprops = {},
        report='',
        ieon = false,
        ies = {
            54: 'oldie lt-ie10 lt-ie9 lt-ie8 lt-ie7', //ie6
            55: 'ie7 oldie lt-ie10 lt-ie9 lt-ie8', //ie7
            56: 'ie8 oldie lt-ie10 lt-ie9', //ie8
            57: 'ie9 lt-ie10', //ie9
            48: 'oldie lt-ie10 lt-ie9 lt-ie8 lt-ie7 ie7 ie8 ie9' //all off
        },
        keybindings = {
            86 : 'svg', //v
            70 : 'csstransforms', //f
            72 : 'boxshadow', //h
            71 : 'cssgradients', //g
            67 : 'generatedcontent', //c
            66 : 'boxsizing', //b
            65 : 'rgba', //a
            83 : 'backgroundsize', //s
            82 : 'borderradius', //r
            84 : 'touch', //t
            88 : 'flexbox' //f
        };
    /* check to see if Modernizr is actually detecting this property. Remove toggles if it's not, then record what's active. */
    $.each(keybindings, function(k,v){
        if (typeof(M[v])==='boolean'){
            report += '\n  '+v+': ctrl+'+String.fromCharCode(k).toLowerCase();
        }else {
            delete keybindings[k];
        }
    });

    /* report in the console what keybindings are available */
    console.log('Modernizr toggle props enabled: '+report+'\n  ies: ctrl+6,  ctrl+7,  ctrl+8,  ctrl+9 to toggle ie classes, ctrl+0 to toggle all ie classes off');

    /*save the original detects*/
    $.each(M,function(k,v){
        if (typeof(v)==='boolean'){
            mprops[k] = {
                "original": v
            };
        }
    });

    /* swap classes/no-classes */
    /*reproduces a toggle behavior similar to, for example $('html').toggleClass('boxsizing no-boxsizing') */
    function mtoggleClass(what,charcode){
        if($html.hasClass('no-'+what)) {
            $html.removeClass('no-'+what).addClass(what);
            console.log(((charcode)?'\\'+charcode+' ':'') + what + ': ON');
            M[what]=true;
        }
        else {
            $html.removeClass(what).addClass('no-'+what);
            console.log(((charcode)?'\\'+charcode+' ':'') + what + ': OFF' );
            M[what]=false;
        }
    }

    function mtoggleIEs(iecode){
        var alts = {'ie6':54,'ie7':55,'ie8':56,'ie9':57,'noie':48}; //if we're calling the function directly
        if(!!alts[iecode]){
            iecode = alts[iecode];
        }
        $html.removeClass(ies[48]);
        if(iecode!==48 && ieon!==iecode) {
            $html.addClass(ies[iecode]);
            ieon=iecode;
            console.log('ie props changed to ', ies[iecode]);
        }
        else if(iecode===48 || ieon===iecode){
            ieon = false;
            if (iecode===48){
                console.log('ie props removed');
            }
        }
    }

    /* return all the class states to the native detects */
    function mReset(){
        $.each(mprops,function(k,v){
            if ($html.hasClass(k) && !v.original){
                $html.removeClass(k).addClass('no-'+k);
            }
            else if($html.hasClass('no-'+k) && !!v.original){
                $html.removeClass('no-'+k).addClass(k);
            }
        });
        console.log('Modernizr properties reset to the browser\'s native capabilities');
    }

    function mshowKey(letterkey){
        console.log("keypress '"+letterkey.toLowerCase() + "' is character keyCode " + String.fromCharCode(letterkey.charCodeAt()).toUpperCase().charCodeAt());
    }

    /*expose functions to the global scope*/
    window.mshowKey = mshowKey;
    window.mtoggleClass = mtoggleClass;
    window.mtoggleIEs = mtoggleIEs;
    window.mReset = mReset;

    /*bind keys*/
    $html.on('keydown', function(e) {
        if(e.ctrlKey){
            if(e.keyCode===77){ //m
                mReset();
            }
            else if(!!keybindings[e.keyCode]){
                mtoggleClass(keybindings[e.keyCode], String.fromCharCode(e.keyCode).toLowerCase());
            }
            else if(!!ies[e.keyCode]){
                mtoggleIEs(e.keyCode);
            }
        }
    });

}(jQuery||bQuery, Modernizr));