// JScript File
// needs core.js


function NotifyOpener(msg){
    try {
        if (typeof(window.opener) != 'undefined') {
            if (window.opener){
                if (window.opener.PopUpNotify) {
                    setTimeout("window.opener.PopUpNotify('" + msg + "')",500);
                }
            }else{
                NotifyFailure(msg);
            }
        }
    } catch (e) {
        NotifyFailure(msg);
    };
}

function NotifyFailure(msg) {
    if (msg == 'refresh') {
        alert('The browser window or tab that opened this dialog is no longer available, so it can not be refreshed automatically. Your changes have been saved but this dialog will now close.');
        window.close();
    }
}

function PopUpNotify(msg){

    switch (msg) {
        case 'refresh':
            setTimeout(CoreModalReloadPage,200);
    }

    if (window.OnPopUpNotify) {
        window.OnPopUpNotify(msg)
    }
}

function CoreModalReloadPage() {
    window.location=window.location.href;
}


function ShowNonModalDialogRedirectVerb(url, PostbackJS, OnCompleteFunctionName, windowFeatures, height, width, windowName, openFromTop) {

    //windowFeatures = "height=400, menubar=no, resizable=yes, status=no, toolbar=no, width=600"

    if(typeof(windowFeatures)=='string'){
        windowFeatures = ConvertModalFeatures(windowFeatures, height, width)
    }

    var winOpener = window

    if (openFromTop) {
    }    
    
    winOpener = window.top
    
    var win = winOpener.open(url, windowName, windowFeatures);
    
    if (win == null)
	    throw new Error(-1,"window has been blocked");

}

function showModalDialogRedirectVerb(URL, PostbackJS, OnCompleteFunctionName, windowFeatures, height, width, PostbackArg, externalCallbackFunction) {

    //externalCallbackFunction - is used by the API. Allows api users to provide a callback function and our internal callback to still be in the loop
    // api usage provides the internal callbacks found in api.js (e.g. ApiEditPartCallback()). 
    // So far this is only being used for the
    // PartEditButton api server control...
    
    if (!OnCompleteFunctionName)
        OnCompleteFunctionName = 'DefaultOnModalComplete'
    
    var dialogArguments = {};
    dialogArguments.PostbackJS = PostbackJS;
    dialogArguments.OnCompleteFunctionName = OnCompleteFunctionName;
    dialogArguments.PostbackArg = PostbackArg;
    dialogArguments.ExternalCallbackFunction = externalCallbackFunction;

    //if (isIE)
    //FF3 has a bug with resizable that needs to be addressed first - no maximize/minimize
    if (window.showModalDialog && isIE){
	    window.document.body.style.cursor = 'wait';

        //true modal support
        var ret = window_showModalDialog(URL, dialogArguments, windowFeatures);
        ret.dialogArguments = dialogArguments;

        CompleteModalCall(ret);
    }
    else{
        //home grown modal support - pretty cool though...
        openFakeModal(URL, dialogArguments, windowFeatures, CompleteModalCall, height, width)
    }
    // no return value (because sometimes it blocks and sometimes it doesn't)
}

function CompleteModalCall(ret) {
    // process return value and call desired completion function
    var cmd = ''

    window.document.body.style.cursor = 'default';
    
    // true modal we have the return value now    
    if (typeof(ret) != 'undefined') {
        if (typeof(ret.CMD) == 'undefined'){
            // modal did not set the eventArgument - default to cancel
            // contentcontrols should pass this down via the AddDialogCloseScript call
            cmd = "CANCEL"
        }
        else{
            if (ret.CMD == "") {
                cmd = "CANCEL"
            } else {
                cmd = ret.CMD
            }
        }
        if (typeof(ret.dialogArguments) != 'undefined'){
            eval(ret.dialogArguments.OnCompleteFunctionName)(cmd, ret.dialogArguments.PostbackJS, ret.dialogArguments.PostbackArg, ret.dialogArguments.ExternalCallbackFunction);
        }
    }
}

function DefaultOnModalComplete(CMD, PostbackJS, PostbackArg, ExternalCallbackFunction) {

    //internal default implementation

    //alert('Cmd is ' + CMD)
    //PostbackJs will be a standard "__doPostback(target, arg)" 
    //PostbackArg is just the arg of the postback - not usefull here - but if
    //you provide your own OnCompleteFunctionName you can party on it client side if you want
    
    //default behavior - in 4.1 was to postback for no reason - no matter what happened in the modal
    
    //As of 5.0:
    //postbacks in the caller will only happen now if a MODAL SAVE verb fired in the modal 
    // - for CANCEL the modal will just close and go away - host page doesn't move 
    //Note that it is up to the modal control to provide the CMD via the AddDialogCloseScript - 4.1 and older
    //code did not do this and so all were being treated as CANCEL (which in the old days still round tripped you)
    
    // create your own OnComplete function if you don't want the default. You specify the name of 
    // that function when you create the ModalDialogRedirect verb. ExternalCallbackFunction is used by the api to 
    // provide api users a js callback mechanism that funnels safely through our internal ones - see api.js

    if (CMD == 'SAVE' || CMD == 'NEXT') {
        eval(PostbackJS)
    }
    
}

function ConvertModalFeatures(windowFeatures, height, width) {
    // takes windows features in ShowModalDialog() syntax and converts
    // them to window.open() syntax
    windowFeatures = windowFeatures.replace(";", ",");
    windowFeatures = windowFeatures.replace(/;/g,",");
    windowFeatures = windowFeatures.replace(/px/g,"");
    windowFeatures = windowFeatures.replace(/:/g,"=");
    windowFeatures = windowFeatures.replace(/dialogWidth/g,"width");
    windowFeatures = windowFeatures.replace(/dialogHeight/g,"height");
    windowFeatures = windowFeatures.replace(/scroll/g,"scrollbars");
    windowFeatures += ',left='+(screen.availWidth-width)/2+',top='+(screen.availHeight-height)/2;
    
    return windowFeatures;    
}

var lastmodalwindowtime = 0;

function openFakeModal(url, myDialogArguments, windowFeatures, onCloseCallback, height, width)
{
    //firefox friendly modal window....
    
    if (window.openingFakeModal){
        // Must have been a double-click (double-fake :0).  Don't open two fake modals.
        return;
    }
    window.openingFakeModal = true;

    try{
        if(typeof(windowFeatures)=='string'){
            windowFeatures = ConvertModalFeatures(windowFeatures, height, width)
        }

	    lastmodalwindowtime = new Date().getTime();
    	
	    window.childsDialogArguments = myDialogArguments;
    	
	    // attach events to host window
	    $addHandler(window,"focus",window_focus);
	    $addHandler(window,"unload",host_unload);

	    var res = null;

	    var closehandled = false;
    	
	    //disable scrolling of main window
	    window.document.body.style.overflow = 'hidden';

	    var div = window.top.document.createElement("DIV");
	    div.style.cssText = "z-index:2000;position:absolute;left:0px;top:0px;background-color:gray;filter:alpha(opacity=30)";
        // Using the screen resolution means that the div will cover everything even if the parent window is maximized after creating the modal

        var docWidth=0
        var docHeight=0
        var scrollMaxX=0
                
        if (Sys.Browser.agent == Sys.Browser.InternetExplorer) {
            //not really nec. cause we use real modals for ie
            docWidth = window.top.document.body.scrollWidth
            docHeight = window.top.document.body.scrollHeight

        } else {

            docWidth = window.top.document.documentElement.scrollWidth
            docHeight = window.top.document.documentElement.scrollHeight
        }

        div.style.height = docHeight + 20 + "px";
        div.style.width = docWidth + "px";
	    
	    div.style.MozOpacity = 0.3;

	    div.innerHTML = "&nbsp;";

	    div.onclick = window_focus;

	    window.top.document.body.appendChild(div);
	    
	    // open new nonmodal window - but keep track of it
	    var win = window.open(url, '', windowFeatures);
        
	    if(win == null)
	    {
	        throw new Error(-1,"window has been blocked");
		}    
		
		// attach events to modal window
	    $addHandler(win,"unload",win_unload);
	    //$addHandler(win,"focus",modalwin_focus);
    	
	    if (typeof(win.returnValue)!='undefined') 
	    {
	        //This was originally win.returnValue = res, 
	        //why would we want to make the returnValue null if not undefined?
	        res = win.returnValue;
	    }
    }
    catch(e)
    {
        window.openingFakeModal = false;
        throw e;
    }
    
    window.openingFakeModal = false;
	return win;

    // child embedded functions follow
		
	function window_focus()
	{
	    // bring modal into focus - front of screen 

		if(!win)return;
                		
		if(win.closed)
		{
			closeit();
			return;
		}

		win.focus();
        return
	}


    function host_unload() {

        //hooked to modal caller to close modal if we leave this earth (back button, favorites, etc)
        
	    if(!win)return;

	    try{
	        win.close();
	    }
        catch(x){}       
        
    }
    
	function win_unload(){
	    //hooked to modal to clean up on unload when modal is closed
		try
		{
		    // grab return value object
			res = win.returnValue;
		}
		catch(x){}
		
		try
		{
		    //detach modal's close event
			$removeHandler(win,"unload",win_unload);
		}
		catch(x){}

        // complete the close process off of a short timer	
        // not sure why we have to do this this way...may be a timing/threading issue w/ unload event
		setTimeout(
		    function win_unload2(){
			    if(closehandled)return;
			    if(!win)return;
    			
			    if(!win.closed){
				    try{
					    $addHandler(win,"unload",win_unload);
				    }
				    catch(x){}
				    return;
			    }
                // close modal window
			    closeit();
            },100);
	}

	function closeit()
	{
	    // closes modal, and cleans up UI

		if(closehandled)return;

		closehandled = true;

		if(div)
		{
		    // whack greyed-out cover on calling window
			window.top.document.body.removeChild(div);
			div.onclick = null;
			div = null;
		}
		
		//re-enable scrolling of parent window
	    window.document.body.style.overflow = 'auto';
		
		try{
			//$removeHandler(editwin,"focus",window_focus);
			$removeHandler(window,"focus",window_focus);
	        $removeHandler(window,"unload",host_unload);
		}
		catch(x){}

		try{
			$removeHandler(win,"unload",win_unload);
		}
		catch(x){}
		
		try{
			try{
				if(res==null) {
				    // grab return value from modal
					if(typeof(win.returnValue)!='undefined') res = win.returnValue;
				}
			}
			catch(x){}

            if (!res) {
                // hmmm... modal did not return anything - need to return something
                res = {};
                res.CMD = "CANCEL";  //assume if nothing returned then modal window was axed - this is needed 
                // downstream in various callbacks for the different system modals (images, links, etc...)
            }

            // we need to keep dialogArguments passing along to ensure
            // the caller's callback function is called.
            res.dialogArguments = window.childsDialogArguments

            if (onCloseCallback) {
			    onCloseCallback(res);
			}
		}
		finally {
			win = null;
			res = null;
		}
	}
}



var modallvl;


////object used to call showModalDialog to show a usercontrol modally
//function ModalDialogBB(controlName, width, height, queryStringData, resizable, allowMaximize){
//    
//    //This verison of modal support is for those who wish to handroll modals at the javascript level
//    //where passing data back to modal host page on the client w/out postback is required.
//    
//    // TODO: this needs to be investigated for v6: where is it used? how will it morph into the verb-based modal 
//    // model that now supports firefox ???  mca 6/7/2007
//    // UPDATE: Anything that uses this function needs to be switched over to use ModalDialogBB_crossbrowser instead.   CHF 6/28/2007
//    
//	//controlName is the user control to load - use the ~/path syntax
//	//width/height should be string and include units eg. '400px'
//	//queryStringData is a string and is passed as-is on the query string and handed to your ctl's IBBDialog.data property
//	//the dialogArguments object will be passed to the client side JS code of the control and can be used for any arguments you like
//	this.ctl = controlName
//	this.width = width
//	this.height = height
//	this.dialogArguments = {};
//	this.qsdata = queryStringData
//	this.features = "scroll:no;status:no;"
//	this.Show = Show
//	this.getFeatureString = getFeatureString	
//	if(typeof(modallvl)==UNDEF||modallvl<=0){modallvl = 0;};
//	if(typeof(resizable)==UNDEF||resizable){this.resizable = 'yes'}else{this.resizable = 'no';}
//	if(typeof(allowMaximize)==UNDEF||!allowMaximize){this.maximize = 'no'}else{this.maximize = 'yes';}
//			
//	function getFeatureString(){return "center:yes;"+this.features+"help:no;dialogWidth:"+this.width+";dialogHeight:"+this.height+";resizable:"+this.resizable+";maximize:"+this.maximize}

//	function Show(){
//		if(typeof(this.ctl)==UNDEF)	  {alert("showModalDialogBB assert: ctl parameter not set in arg object")}
//		if(typeof(this.width)==UNDEF) {alert("showModalDialogBB assert: width parameter not set in arg object")}
//		if(typeof(this.height)==UNDEF){alert("showModalDialogBB assert: height parameter not set in arg object")}
//		modallvl++;
//	    
//		var AdminURLBase = "AdminPage.aspx"

//		//if the modal request for the adminpage comes from an aspx page 
//		//not in the app root (e.g. cutesoft javascript) - the path to adminpage will be wrong 
//		//strip it down to the root location
//		var sLocURL = document.location.href
//		var iPos = sLocURL.indexOf('CuteSoft')
//		if (iPos != -1) {
//			AdminURLBase = sLocURL.substring(0,iPos) + AdminURLBase
//		}

//		var url = AdminURLBase + "?edit=3&md="+modallvl+"&ctl="+this.ctl+"&data="+this.qsdata;
//		var ret = window.showModalDialog(url, this.dialogArguments, this.getFeatureString());
//		modallvl--;
//		return ret;
//	}
//}

function Browser()
{
	var agent = new Object()
	try{agent.AgentName=navigator.userAgent.toLowerCase();}catch(e){agent.AgentName="";}
	agent.IsSafari=agent.AgentName.indexOf("safari")>=0;
	agent.IsOpera=agent.AgentName.indexOf("opera")>=0;
	agent.IsFireFox=agent.AgentName.indexOf("firefox")>=0;
	agent.IsIE=document.all!=null&&!agent.IsOpera&&!agent.IsSafari;
	
	return agent
}

//object used to call showModalDialog to show a usercontrol modally
function ModalDialogBB_crossbrowser(controlName, width, height, queryStringData, resizable, allowMaximize) {
    
    //This verison of modal support is for those who wish to handroll modals at the javascript level
    //where passing data back to modal host page on the client w/out postback is required.
    
	//controlName is the user control to load - use the ~/path syntax
	//width/height should be string and include units eg. '400px'
	//queryStringData is a string and is passed as-is on the query string and handed to your ctl's IBBDialog.data property
	//the dialogArguments object will be passed to the client side JS code of the control and can be used for any arguments you like

	try{this.AgentName=navigator.userAgent.toLowerCase();}catch(e){this.AgentName="";}

    //browser detection can not depend on presense of Atlas - cuteedit calls our modals from its own aspx pages...
    //detect the old fashioned way.
	this.IsSafari=this.AgentName.indexOf("safari")>=0;
	this.IsOpera=this.AgentName.indexOf("opera")>=0;
	this.IsFireFox=this.AgentName.indexOf("firefox")>=0;
	this.IsIE=document.all!=null&&!this.IsOpera&&!this.IsSafari;

	this.ctl = controlName;
	this.width = width;
	this.height = height;
	this.dialogArguments = {};
	this.qsdata = queryStringData;
	this.features = "scroll:no;status:no;";
	this.Show = Show;
	this.getFeatureString = getFeatureString;
	if(typeof(modallvl)==UNDEF||modallvl<=0) {modallvl = 0;}
	if(typeof(resizable)==UNDEF||resizable) {this.resizable = 'yes'}else{this.resizable = 'no';}
	if(typeof(allowMaximize)==UNDEF||!allowMaximize) {this.maximize = 'no'}else{this.maximize = 'yes';}
	
	function getFeatureString()
	{
	
	    /*************************************************************************
	    * This will be used once we seriously support FF3's real showModalDialog *
	    **************************************************************************/
	    //if(isIE) || !window.showModalDialog)
	   // {
	        return "location:no;center:yes;"+this.features+"help:no;dialogWidth:"+this.width+"px;dialogHeight:"+this.height+"px;resizable:"+this.resizable+";maximize:"+this.maximize
	  //  }
//	    else
//	    {
//	        var parentWin = window
//	        while(parentWin.opener != null)
//	        {
//	            parentWin = parentWin.opener
//	        }
//	        //Center does not correctly work for FF3, so lets try to center it manually
//	        return "center:on;dialogWidth:"+this.width+"px;dialogHeight:"+this.height+"px;scroll:no;resizable:"+this.resizable+";maximize:"+this.maximize+";dialogLeft:"+(parentWin.document.documentElement.scrollWidth/2-this.width/2)+"px;dialogTop:"+(parentWin.document.documentElement.scrollHeight/4)+"px;";
//	    }
	}
    
	function Show(onCloseCallback){
		if(typeof(this.ctl)==UNDEF)	  {alert("showModalDialogBB assert: ctl parameter not set in arg object")}
		if(typeof(this.width)==UNDEF) {alert("showModalDialogBB assert: width parameter not set in arg object")}
		if(typeof(this.height)==UNDEF){alert("showModalDialogBB assert: height parameter not set in arg object")}
		modallvl++;
	    
		var AdminURLBase = "AdminPage.aspx"
        
		//if the modal request for the adminpage comes from an aspx page 
		//not in the app root (e.g. cutesoft javascript) - the path to adminpage will be wrong 
		//strip it down to the root location
		var sLocURL = document.location.href
		var iPos = sLocURL.indexOf('CuteSoft')
		if (iPos != -1) {
			AdminURLBase = sLocURL.substring(0,iPos) + AdminURLBase
		}
		else
		{
			AdminURLBase = ROOT_PATH + AdminURLBase;
		}

		this.ctl = encodeURIComponent(this.ctl);
        
		var url = AdminURLBase + "?edit=3&md="+modallvl+"&ctl="+this.ctl+"&data="+this.qsdata;
		
		//REAL Modal's for FF3 now too!
		//Feature detect >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> isIE
        if(window.showModalDialog && this.IsIE) 
        {
            var ret = window_showModalDialog(url, this.dialogArguments, this.getFeatureString());
            
            //Have to set the dialogArguments otherwise they don't exist in FF3
            ret.dialogArguments = this.dialogArguments
            
            if(onCloseCallback)
            {
                onCloseCallback(ret);
            }
        }
        else
        {
            //openFakeModal(url, this.dialogArguments, this.getFeatureString(), function(retObj){modallvl--; onCloseCallback(retObj);}, height, width)
            openFakeModal(url, this.dialogArguments, this.getFeatureString(), openFakeModalCallback, height, width)
        }
        
        function openFakeModalCallback(retObj){
            modallvl--; 
            if (onCloseCallback)
            {
                onCloseCallback(retObj);
            }
        }

	}
}

function window_showModalDialog(url, args, features)
{
    var start = (new Date()).getTime();
    try
    {
        args = (args || {});
        
        args.baseWindow = BLACKBAUD.netcommunity.baseWindow;
        
        //CR305233-072408 If they closed using the X, return cmd = CANCEL
        return window.showModalDialog(url, args, features) || {CMD:'CANCEL'};
    } catch (e) {
        if ((new Date()).getTime() - start < 500)
        {
            alert("A pop-up window was blocked.  To ensure proper functionality, please configure your browser to allow pop-ups for this site.");
        }
        else
        {
            // I'm not sure if this block can ever be reached.
        }
        return {};
    }
}


////////////////////////////////////////////
// End of script
if (typeof(Sys) !== 'undefined')
{
    Sys.Application.notifyScriptLoaded();
}
////////////////////////////////////////////
// Do not add any code below this
////////////////////////////////////////////
