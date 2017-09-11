//=============================================================================
//
//  Core.js
//		This file contains JavaScript functions to handle the core common  
//		client-side functions 
//
//=============================================================================
var UNDEF='undefined';

function fadeElementIn(oel,duration){
	if(!oel){return}
	if(typeof(oel.style)!=UNDEF){
		if(typeof(oel.style.filter)!=UNDEF){
			oel.style.display="none";oel.style.visibility="hidden";
			oel.style.filter="progid:DXImageTransform.Microsoft.Fade(duration="+duration+")";oel.filters[0].Apply();
			oel.style.visibility="visible";oel.style.display="inline";oel.style.zIndex=999;
			oel.filters[0].Play();
		}else{oel.style.visibility="visible";oel.style.display="inline";}
	}
}
function showIt(oel){if(typeof(oel)!=UNDEF&&oel!=null&&typeof(oel.style)!=UNDEF){oel.style.visibility="visible";oel.style.display="inline";}}

function hideIt(oel){if(typeof(oel)!=UNDEF&&oel!=null&&typeof(oel.style)!=UNDEF){oel.style.visibility="hidden";oel.style.display="none";}}

function getAbsPos(el){
	var offsetTrail=el;var offsetLeft=0;var offsetTop=0;
	while(offsetTrail){offsetLeft+=offsetTrail.offsetLeft;offsetTop+=offsetTrail.offsetTop;offsetTrail=offsetTrail.offsetParent;}
	if(navigator.userAgent.indexOf("Mac")!=-1&&typeof(document.body.leftMargin)!=UNDEF){offsetLeft+=document.body.leftMargin;offsetTop+=document.body.topMargin;}
	return {left:offsetLeft,top:offsetTop};
}

function getElement(id){
    var d=document;
    return d.getElementById?d.getElementById(id):d.all?d.all[id]:d.layers[id];
}

function browseURL(sURL){
    window.open(sURL,'browsePreview');
    return;
}

function browseURLSelf(sURL){
    window.open(sURL,'_self');
    return;
}

function popupURL(sURL){
    window.open(sURL,'_blank');
    return;
}

function confirmPrompt(PostBackToCtlName,PostBackEventArg,prompt){
   var confirmed = window.confirm(prompt);
   if (confirmed) {javascript:__doPostBack(PostBackToCtlName,PostBackEventArg)}
}

var iGallerySelectedID =0

function galleryRadioSelected(radio, recID){

	iGallerySelectedID = recID

	unCheckOtherDGRadios(radio);

	if (window.OnGalleryRadioSelected) {
		//allow local handlers to play
		window.OnGalleryRadioSelected(recID)
	}

}

function unCheckOtherCBsInColumn(chk)
{
    if (chk.checked)
    {
        var otherChks = chk.parentNode.parentNode.parentNode.getElementsByTagName('input');
        var rowCount = otherChks.length;
        for (var index = 0; index < rowCount; index++)
        {
            var elem = otherChks[index];
            if ((elem != null) && (elem != chk) && (elem.parentNode != null) && chk.parentNode.cellIndex == elem.parentNode.cellIndex)
            {
                elem.checked = false;
            }
        }
    }
}

function unCheckOtherDGRadios(radio){
	var otherRadios=radio.parentNode.parentNode.parentNode.getElementsByTagName('input');
	var rowCount = otherRadios.length;
	var index;
	var elem;
	for (index=0;index<rowCount;index++){
		elem=otherRadios[index];
		if ((elem != null) && (elem != radio)){elem.checked = false;}
	}
}


function Page_BBValidate(ValidationGroup) {

    var i;
    var j=0;

	if (typeof(Page_Validators)!=UNDEF){
		var Temp = Page_Validators;
		Page_Validators=new Array();

		for (i = 0; i < Temp.length; i++) {
			if (typeof(Temp[i].ValidationGroup)!=UNDEF&&Temp[i].ValidationGroup==ValidationGroup) {
				if(!Temp[i].disabled){Page_Validators[j]=Temp[i];j++;}
			}
		}
	}
	if (typeof(Page_ValidationSummaries)!=UNDEF){
		var Temp2 = Page_ValidationSummaries;
		Page_ValidationSummaries=new Array();
		
		j=0;
		for (i = 0; i < Temp2.length; i++) {
			if (typeof(Temp2[i].ValidationGroup)!=UNDEF&&Temp2[i].ValidationGroup==ValidationGroup) {
				Page_ValidationSummaries[j]=Temp2[i]
				j++;
			}
		}
	}
	var bret=true;
	if (typeof(Page_ClientValidate)=='function'){
		bret=Page_ClientValidate();
	}	
	if (typeof(Page_Validators)!=UNDEF){Page_Validators=Temp};
	if (typeof(Page_ValidationSummaries)!=UNDEF){Page_ValidationSummaries=Temp2};
	
	return bret	
	
}


var TemplateMsgElement;
var TemplateProcessingElement;
var TemplateContentElement;
var TemplateRepeatElement;
var savePostBackFunc;
var noPostBacks=false;
var saveEventTarget;
var saveEventArgument;

function ForcePostBack(){
    noPostBacks=false;
    return BBProcMsg(saveEventTarget,saveEventArgument);
}

function BBProcMsg(eventTarget, eventArgument){

	var omsg=TemplateMsgElement;var smsg;
	if(typeof(window.event) != UNDEF && window.event != null && typeof(window.event.srcElement)!= UNDEF && window.event.srcElement!=null){
	    smsg=window.event.srcElement.processingmsg;
	};

	if(typeof(savePostBackFunc)=='function'){
		if(!noPostBacks){
			noPostBacks=true;
			if( omsg && typeof(smsg) != UNDEF && smsg!=null) {
			    omsg.innerHTML=smsg+', please wait&nbsp;...';
			};
			
			savePostBackFunc(eventTarget, eventArgument);
			
			hideIt(TemplateContentElement);
			hideIt(TemplateRepeatElement);
			showIt(TemplateProcessingElement);
		}else{
			saveEventArgument=eventArgument;saveEventTarget=eventTarget;			
			showIt(TemplateRepeatElement);
		};
	};
};

function makeHot(oel,hotClass){
	if(typeof(oel.saveClassName)==UNDEF){
	    oel.saveClassName=oel.className;
	    oel.onmouseout=function(){
	        this.className=this.saveClassName;
	    };
	};
	if(typeof(hotClass)==UNDEF){
	    oel.className=oel.saveClassName+"Hot";
	}
	else{
	    oel.className=hotClass;
	};		
}
function hotImg(oel,hotImgSrc){
	if(typeof(oel.saveSrc)==UNDEF){
		oel.saveSrc=oel.src;
		oel.onmouseout=function(){
			if(this.src!=this.saveSrc){
				this.src=this.saveSrc
			}
		}
	};
	if(oel.src!=hotImgSrc){
		oel.src=hotImgSrc;
	};
}
function killEvent(){
    try 
    {
        if (window.event)
        {
            window.event.cancelBubble = true;
        }
    } 
    catch(e){
    }
    return false;
}

//Was in 5.0 & 5.1, yet not in 5.5
function addEvent( obj, type, fn )
{
	if (obj.addEventListener)
		obj.addEventListener( type, fn, false );
	else if (obj.attachEvent)
	{
		obj["e"+type+fn] = fn;
		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
		obj.attachEvent( "on"+type, obj[type+fn] );
	}
}

function removeEvent( obj, type, fn )
{
	if (obj.removeEventListener)
		obj.removeEventListener( type, fn, false );
	else if (obj.detachEvent)
	{
		obj.detachEvent( "on"+type, obj[type+fn] );
		obj[type+fn] = null;
		obj["e"+type+fn] = null;
	}
}

// Removes leading whitespaces
function LTrim( value ) 
{
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
}

// Removes ending whitespaces
function RTrim( value ) 
{
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
}

// Removes leading and ending whitespaces
function trim( value ) 
{
	return LTrim(RTrim(value));
}



function AddBorderToPaddedElement(elt, borderStyle, paddingWithBorder) {
    elt.style.border = borderStyle
    elt.style.padding = paddingWithBorder
}

function RemoveBorderFromPaddedElement(elt, paddingWithoutBorder) {
    elt.style.border = ''
    elt.style.padding = paddingWithoutBorder
}

function select_AddOption(selectControl, optionText, optionValue)
{
    var o = new Option(optionText, optionValue);
    o.Value = optionValue; // this is an object; "value" is a string
    selectControl.options.add(o);
}

function select_GetSelectedText(selectControl)
{
    if (selectControl.selectedIndex >= 0)
        return selectControl.options[selectControl.selectedIndex].text;
}

function select_GetSelectedStringValue(selectControl)
{
    if (selectControl.selectedIndex >= 0)
        return selectControl.options[selectControl.selectedIndex].value;
}

function select_GetSelectedObjectValue(selectControl)
{
    if (selectControl.selectedIndex >= 0)
        return selectControl.options[selectControl.selectedIndex].Value;
}

function newid()
{
    var result = '';
    for(var j=0; j<32; j++)
    {
        if( j == 8 || j == 12|| j == 16|| j == 20)
            result = result + '-';
        result = result + Math.floor(Math.random()*16).toString(16).toUpperCase();
    }
    return result;
}

function iframe_GetDocument(iframe)
{
    if (document.all) // IE
    {
        iframe = eval(iframe.id);
        return iframe.document;
    }
    else
    {
        return iframe.contentWindow.document;
    }
}

function isNumeric(str) {
    return str.length ? !isNaN(str/1) : false;
}

function repeatString(string, count)
{
    var temp = new Array(count+1);
    return temp.join(string);
}

// CHF: Making this a function allows one to override it.
function DisableMe(sender)
{
    sender.disabled = true;
}

function getMousePosition(e)
{
    var pos = new Object();
    if (isIE)
    {
        pos.x = event.clientX + document.body.scrollLeft;
        pos.y = event.clientY + document.body.scrollTop;
    }
    else
    {
        pos.x = e.clientX;
        pos.y = e.clientY;
    }
    return pos;
}

function PopUpDialogBB(controlName, sName, sFeatures, queryStringData, bHideCss){
	//controlName is the user control to load - use the ~/path syntax
	//sName is name of window use _blank for new window
	//sFeatures is the features for the new window
	//queryStringData is a string and is passed as-is on the query string and handed to your ctl's IBBDialog.data property
	//bHideCss is a boolean whether to include a StyleSheet in the page render - Nothing or 0 (default) will use a Css
	this.ctl = controlName
	this.name = sName
	this.features = sFeatures
	this.qsdata = queryStringData
	this.Show = Show
	this.HideCss = bHideCss
	
	function Show(){
		if(typeof(this.ctl)==UNDEF)	  {alert("PopUpDialogBB assert: ctl parameter not set in arg object")}
		var url = ROOT_PATH + "PopUp.aspx?ctl="+this.ctl+"&data="+this.qsdata+"&hidecss="+this.HideCss;
		var popwin = BLACKBAUD.netcommunity.baseWindow.open(url,this.name,this.features);
		if( typeof(popwin) != "undefined" && popwin )
		{
			popwin.focus();
		}
	}
}

/////////////////////////////////////////////////////////////////////////
// These functions counteract a memory leak in IE (and are harmless in other browsers)
// See http://javascript.crockford.com/memory/leak.html

// Shouldn't need to call this directly
function purge(d) {
    var a = d.attributes, i, l, n;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            n = a[i].name;
            if (typeof d[n] === 'function') {
                d[n] = null;
            }
        }
    }
    purgeChildren(d);
}

// Shouldn't need to call this directly
function purgeChildren(d) {
    a = d.childNodes;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            purge(d.childNodes[i]);
        }
    }
}

// Call this instead of setting innerHTML directly
function setInnerHTML(element, value) {
    if (isIE)
    {
        purgeChildren(element);
    }
    element.innerHTML = value;
}

// Call this instead of calling the parent's removeChild directly
function removeChild(parent, child) {
    if (isIE)
    {
        purge(child);
    }
    return parent.removeChild(child);
}

// Call this instead of calling the parent's replaceChild directly
function replaceChild(parent, newChild, oldChild) {
    if (isIE)
    {
        purge(oldChild);
    }
    return parent.removeChild(newChild, oldChild);
}

/////////////////////////////////////////////////////////////////////////

function removeClass(element, className)
{
    element.className = (" " + element.className + " ").replace(" " + className + " ", " ").trim();
}
function addClass(element, className)
{
    element.className += (element.className ? " " : "") + className;
}
function replaceClass(element, oldClassName, newClassName)
{
    element.className = (" " + element.className + " ").replace(" " + oldClassName + " ", " " + newClassName + " ").trim();
}
function hasClass(element, className)
{
    return (" " + element.className + " ").indexOf(" " + className + " ") >= 0;
}

function bbAdminButton_setDisabled(buttonElement, disabled)
{
    var href;
    if (disabled)
    {
        replaceClass(buttonElement, "BBAdminButton", "BBAdminButtonDisabled");
        buttonElement.style.filter = "alpha(opacity=40)";
        buttonElement.style.MozOpacity = 0.5;
        cursor = "default";
    }
    else
    {
        replaceClass(buttonElement, "BBAdminButtonDisabled", "BBAdminButton");
        buttonElement.style.filter = "alpha(opacity=100)";
        buttonElement.style.MozOpacity = 1.0;
        cursor = "hand";
    }
    walkDom(buttonElement, function (element) {
        if (element.tagName === "A")
        {
            element.style.cursor = cursor;
        }
    });
}

function image_setDisabled(img, disabled)
{
    if (disabled)
    {
        img.style.cursor = "auto";
        img.style.filter = "alpha(opacity=40)";
        img.style.MozOpacity = 0.5;
    }
    else
    {
        img.style.cursor = "hand";
        img.style.filter = "alpha(opacity=100)";
        img.style.MozOpacity = 1.0;
    }
}

function createEnum(namspace, enumName, enumEntries)
{
    /*
    // Some examples using createEnum():
    
    var myEnums = {};
    
    createEnum(myEnums, "Weekend", [
        [0, "Saturday"],
        [1, "Sunday"]
    ]);
    createEnum(myEnums, "Weekend", [
        ["Saturday"],
        ["Sunday"]
    ]);
    createEnum(myEnums, "Weekend", [
        "Saturday",
        "Sunday"
    ]);
    // The three function calls above are equivalent and result in the following truths:
    // myEnums.Weekend.Saturday === 0
    // myEnums.WeekendText[0] === "Saturday"
    // etc.
    
    createEnum(myEnums, "Buttons", [
        [1, "OK", "Yes, this is OK."],
        [2, "Cancel", "Cancel my request."],
        [4, "Retry", "Retry the request."],
        [8, "Help", "Help!"]
    ]);
    // The function call above results in the following truths:
    // myEnums.Buttons.OK === 1
    // myEnums.ButtonsText[1] === "Yes, this is OK."
    // etc.
    
    // More examples in Query.js
    */
    var enumObj = namspace[enumName] = {};
    var textObj = namspace[enumName + "Text"] = {};
    for (var i = 0; i < enumEntries.length; i++)
    {
        var enumEntry = enumEntries[i];
        if (enumEntry)
        {
            if (typeof enumEntry === 'string')
            {
                enumObj[enumEntry] = i;
                textObj[i] = enumEntry;
            }
            else
            {
                var enumValue, enumSymbolIndex;
                if (typeof enumEntry[0] === 'number')
                {
                    enumValue = enumEntry[0];
                    enumSymbolIndex = 1;
                }
                else
                {
                    enumValue = i;
                    enumSymbolIndex = 0;
                }
                var symbol = enumEntry[enumSymbolIndex];
                var text = enumEntry[(enumEntry.length > enumSymbolIndex) ? enumSymbolIndex + 1 : enumSymbolIndex];
                enumObj[symbol] = enumValue;
                textObj[enumValue] = text;
            }
        }
    }
}

// Calls workerFunction on element and every child (recursive), aborts when workerFunction returns false
function walkDom(element, workerFunction)
{
    if (workerFunction(element) !== false)
    {
        for (var i = 0; i < element.childNodes.length; i++)
        {
            if (!walkDom(element.childNodes[i], workerFunction))
            {
                return false;
            }
        }
        return true;
    }
    return false;
}

// Put "evt = getEvent(evt);" at the begining of each event handler that takes an event argument
function getEvent(evt)
{
    evt = evt || event;
    evt.target = evt.target || evt.srcElement;
    return evt;
}

// Much faster than eval(objectName)
function getObject(objectName, allowUndefinedFunction)
{
    try
    {
        var parts = objectName.split('.');
        var reference = window;
        for (var i = 0; i < parts.length; i++)
        {
            reference = reference[parts[i]];
        }
        if (reference || allowUndefinedFunction)
        {
            return reference;
        }
    }
    catch (e) { }

    throw new Error(String.format("Object does not exist: '{0}'", objectName));
}

function TabInTextArea(event, obj) {

    //usage: <textarea onkeydown="return TabInTextArea(event, this);" .../>
    var tabKeyCode = 9;
    var keycode;
    
    if (event.which) // mozilla
        keycode = event.which;
    else // ie
        keycode = event.keyCode;

    if (keycode == tabKeyCode) {
        if (event.type == "keydown") {
            if (obj.setSelectionRange) {
                // mozilla
                var s = obj.selectionStart;
                var e = obj.selectionEnd;
                obj.value = obj.value.substring(0, s) + 
                    "\t" + obj.value.substr(e);
                obj.setSelectionRange(s + 1, s + 1);
                obj.focus();
            } else if (obj.createTextRange) {
                // ie
                document.selection.createRange().text="\t"
                obj.onblur = function() { this.focus(); this.onblur = null; };
            } else {
                // unsupported browsers
            }
        }
        if (event.returnValue) // ie ?
            event.returnValue = false;
        if (event.preventDefault) // dom
            event.preventDefault();
        return false; // should work in all browsers
    }
    return true;
}

function toggleDisabledById(ctrlId)
{
    var ctrl = document.getElementById(ctrlId);
    ctrl.disabled = !(ctrl.disabled);
}

function setDisabledById(ctrlId, disabled)
{
    var ctrl = document.getElementById(ctrlId);
    
    if(ctrl)
    {
        ctrl.disabled = disabled;
    }
}

function setDisabledByIds(ctrlIds, disabled)
{
    if(ctrlIds && ctrlIds.length)
    {
        for(var i = 0; i < ctrlIds.length; i++)
        {
            setDisabledById(ctrlIds[i], disabled);
        }
    }
}

function setFauxDisabledById(ctrlId, disabled)
{
    var color = (disabled ? "gray" : "");
    
    setStyleAttributeById(ctrlId, "color", color);
}

function setFauxDisabledByIds(ctrlIds, disabled)
{
    if(ctrlIds && ctrlIds.length)
    {
        for(var i = 0; i < ctrlIds.length; i++)
        {
            setFauxDisabledById(ctrlIds[i], disabled);
        }
    }
}

function setStyleAttributeById(ctrlId, styleAttribute, styleValue)
{
    var ctrl = getElement(ctrlId);
    
    if(ctrl && ctrl.style)
    {
        ctrl.style[styleAttribute] = styleValue;
    }
}

function swapStyleAttributeByIds(ctrl1Id, ctrl2Id, styleAttribute)
{
    var ctrl1 = getElement(ctrl1Id);
    var ctrl2 = getElement(ctrl2Id);
    
    if(ctrl1 && ctrl1.style && ctrl2 && ctrl2.style)
    {
        // If they have style, they should have currentStyle
        var style1 = ctrl1.currentStyle[styleAttribute];
        
        // Could use setStyleAttributeById, but to save a few cycles from re-getting the element,
        // we'll do it here
        ctrl1.style[styleAttribute] = ctrl2.currentStyle[styleAttribute];
        ctrl2.style[styleAttribute] = style1;
    }
}

// Parameters:
//    url - string containing the url to convert
//
// Returns:
//    string containing the converted url to
//    match the protocol of the current document
function convertToCurrentProtocol(url)
{
    if(url && url.replace)
    {
        url = url.replace(/http[s]?:/i, document.location.protocol);
    }
    
    return url;
}

function setChildrenDisabledById(ctrlId, disabled)
{
    var ctrl = document.getElementById(ctrlId);
    walkDom(ctrl, function (element)
    {
        if (element.disabled !== undefined)
        {
            element.disabled = disabled;
        }
    });
}

function resetScrollPositionElements()
{
   //Clear position stored due to MaintainScrollPositionOnPostback	
   var scrollX = document.getElementById('__SCROLLPOSITIONX');
   var scrollY = document.getElementById('__SCROLLPOSITIONY');
   if(scrollX && scrollY)
   {
      scrollX.value = 0;
      scrollY.value = 0;
   }
   
   //Clear position stored due to Ajax scripts
   Sys.WebForms.PageRequestManager.getInstance()._scrollPosition = null;
   
   //Actively scroll to the top.  IE seems to require this
   scrollTo(0,0);
}

function BuildBBNCAnalyticsURL(base, pagekeys, pagevals) {

    base = base.substring(base.indexOf('/') + 2);
    base = base.substring(base.indexOf('/'));
    
    if (pagekeys.length > 0) {
        var aKeys = pagekeys.split(";");
        var aVals = pagevals.split(";");
        var aCount = 0;
        base += "?";
        while (aCount < aKeys.length) {
            base += aKeys[aCount] + "=" + aVals[aCount] + "&";
            aCount += 1;
        }
        base = base.substring(0, base.length - 1);
    }
    if (isIE) {
        base = base.substring(0, 2000);
    }

    return base;
    
}

function nodeIsReallyVisible(node)
{
    if (node.style)
    {
        if (!Sys.UI.DomElement.getVisible(node))
        {
            return false;
        }
        if (node.parentNode)
        {
            return nodeIsReallyVisible(node.parentNode);
        }
    }
    return true;
}


function GetRadioListValue(ctrlID)
{
    var radioctrl = document.getElementById(ctrlID);
    var radio_inputs = radioctrl.getElementsByTagName('INPUT');

    for (var j = 0; j < radio_inputs.length; j++)
    {
        if (radio_inputs[j].checked)
        {
            return radio_inputs[j].value;
        }
    }
}

////////////////////////////////////////
//// This will cover a control with a Div.
//// In order for this div to redraw when it resizes, you need to add
//// the following line in the vb to register the redraw function on the resize event:
//// ScriptManager.RegisterStartupScript(Me, Me.GetType(), "coverElementOnResizeScript", "$addHandler(window, 'resize', coverElementWithDiv_Redraw);", True)
////
//// Also the control to cover should be styled "position: relative" so the child covering div will position correctly.
var coverElementWithDiv_DivArray=[];
function coverElementWithDiv(ctrlId, addCover)
{ 
    var divCover = coverElementWithDiv_DivArray[ctrlId];
    var elementToCover = document.getElementById(ctrlId);
    if (addCover)
    {
        //If the cover doesnt exist, create it
        if (divCover == undefined)
        {            
            divCover = window.top.document.createElement("DIV");
            divCover.style.cssText = "z-index:1000;position:absolute;left:-9px;top:-3px;background-color:gray;filter:alpha(opacity=15);";       
            divCover.style.MozOpacity = 0.15;
            elementToCover.appendChild(divCover);
            coverElementWithDiv_DivArray[ctrlId] = divCover;            
        }
        else
        {
            divCover.style.display='';
        }
        SetDivDimensions(divCover,elementToCover);
    }
    else
    {
        if (divCover !== undefined)
        {
            divCover.style.display = 'none';
        }
    }
};

function SetDivDimensions(div, elementToCover)
{
    div.style.height = Sys.UI.DomElement.getBounds(elementToCover).height + 10 + 'px';
    div.style.width = Sys.UI.DomElement.getBounds(elementToCover).width + 17 + 'px';
}

function coverElementWithDiv_Redraw()
{
    for (var ctrlId in coverElementWithDiv_DivArray)
    {        
        SetDivDimensions(coverElementWithDiv_DivArray[ctrlId],document.getElementById(ctrlId));        
        //Used to force other things being covered to redraw, since they like to disappear
        document.getElementById(ctrlId).style.display='none';
        document.getElementById(ctrlId).style.display='';        
    }
}

function getElementsByClassName(rootElement, className)
{
    var elements = [];
    walkDom(rootElement, function (element) {
        if (element.className && (" " + element.className + " ").indexOf(className, 0) >= 0)
        {
            elements.push(element);
        }
    });
    return elements;
}

function changeCursor(state)
{
	 document.body.style.cursor = state;
}

function CallWebServiceMethod(loc, methodName, onSuccess, onFail) {
    // Create a new array from the contents of arguments
    args = Array.prototype.slice.call(arguments);
    // Remove the first 4 args
    args = args.slice(4, args.length)
    // Serialize
    var argsString = "";
    argsString = ArrayToJsonString(args)

    $.ajax({
        type: "POST",
        url: loc + "/" + methodName,
        data: args,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        fail: onFail
    });

    function ArrayToJsonString(myArgs) {
        l = myArgs.length;
        args = "";

        // The arguments needs to be passed in pairs: name and value
        if (l % 2 != 0) return '-1';

        for (var i = 0; i < l; i += 2) {
            if (args.length != 0) args += ',';
            args += "'" + myArgs[i] + "':'" + myArgs[i + 1] + "'";
        }

        args = '{' + args + '}'
        return args
    }
}

BLACKBAUD.netcommunity.left = function (str, n)
{
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0,n);
}

BLACKBAUD.netcommunity.right = function (str, n)
{
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
}

BLACKBAUD.netcommunity.getDateTime = function ()
{
    var right = BLACKBAUD.netcommunity.right;
    var d = new Date();
    var year   = d.getYear();
    var month  = right('0' + (d.getMonth() + 1), 2);
    var day    = right('0' + d.getDate(), 2);
    var hour   = right('0' + d.getHours(), 2);
    var minute = right('0' + d.getMinutes(), 2);
    var second = right('0' + d.getSeconds(), 2);
    if(year < 2000)
    {
        year += 1900;
    }
    return year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second;
}

BLACKBAUD.netcommunity.setBrowserDateTimeForServer = function (controlId)
{
    var hidBrowserDateTime = $get(controlId);
    if (hidBrowserDateTime)
    {
        hidBrowserDateTime.value = BLACKBAUD.netcommunity.getDateTime();
    }
}

BLACKBAUD.netcommunity.consoleLog = function (stuff)
{
    if (typeof(console) !== 'undefined' && console.log)
    {
        console.log(stuff);
    }
};

// Useful in Infragistics event handlers so that the error is not ignored
BLACKBAUD.netcommunity.debuggerMaybe = function ()
{
    if (DebugMode)
    {
        debugger;
    }
};

BLACKBAUD.netcommunity.scrollIntoView = function (id)
{
    var ctrl = $get(id);
    if (ctrl && ctrl.scrollIntoView)
    {
        ctrl.scrollIntoView();
    };
};

// When you window.open from a modal, it is considered in a different zone.
// We need to track the base window so that when we call window.open,
// we can use the original window to make the call so that address bars
// do not appear on the window which we are opening.
BLACKBAUD.netcommunity.baseWindow = function()
{
    if(window.dialogArguments && window.dialogArguments.baseWindow)
    {
        return window.dialogArguments.baseWindow;
    }
    else
    {
        return window;
    }
} ();

BLACKBAUD.netcommunity.download = function(url)
{
    BLACKBAUD.netcommunity.baseWindow.document.getElementById("BBDownloadFrame").src = url;
};

BLACKBAUD.netcommunity.submitDownload = function(form, postbackCall)
{
    var previousTarget = form.target;
    form.target = "BBDownloadFrame";
    postbackCall();
    form.target = previousTarget;
};

BLACKBAUD.netcommunity.SafeDocWriteInUpdatePanel = function(str) {

    function makeMap(str) {
        var obj = {}, items = str.split(",");
        for (var i = 0; i < items.length; i++)
            obj[items[i]] = true;
        return obj;
    }
    //-- Begin HTML Parser By John Resig (ejohn.org) ---------------------
    // Regular Expressions for parsing tags and attributes
    var startTag = /^<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
                       endTag = /^<\/(\w+)[^>]*>/,
                       attr = /(\w+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

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

    //document.write(): this HTMLParser function has been turned into an object which allows
    //  for incremental parsing via HTMLParser.parse(moreHTML). This conversion was done late
    //  at night so it surely has areas of stylistic and functional improvement
    var HTMLParser /*= this.HTMLParser*/ = function(html, handler) {
        var index, chars, match, stack = []; //, last = html;
        stack.last = function() {
            return this[this.length - 1];
        };

        //parse method added for document.write()
        this.parse = function(moreHTML) {
            last = html = moreHTML;
            while (html) {
                chars = true;

                // Make sure we're not in a script or style element
                if (!stack.last() || !special[stack.last()]) {

                    // Comment
                    if (html.indexOf("<!--") == 0) {
                        index = html.indexOf("-->");

                        if (index >= 0) {
                            if (handler.comment)
                                handler.comment(html.substring(4, index));
                            html = html.substring(index + 3);
                            chars = false;
                        }

                        // end tag
                    } else if (html.indexOf("</") == 0) {
                        match = html.match(endTag);

                        if (match) {
                            html = html.substring(match[0].length);
                            match[0].replace(endTag, parseEndTag);
                            chars = false;
                        }

                        // start tag
                    } else if (html.indexOf("<") == 0) {
                        match = html.match(startTag);

                        if (match) {
                            html = html.substring(match[0].length);
                            match[0].replace(startTag, parseStartTag);
                            chars = false;
                        }
                    }

                    if (chars) {
                        index = html.indexOf("<");

                        var text = index < 0 ? html : html.substring(0, index);
                        html = index < 0 ? "" : html.substring(index);

                        if (handler.chars)
                            handler.chars(text);
                    }

                } else {
                    html = html.replace(new RegExp("(.*)<\/" + stack.last() + "[^>]*>"), function(all, text) {
                        text = text.replace(/<!--(.*?)-->/g, "$1")
                                            .replace(/<!\[CDATA\[(.*?)]]>/g, "$1");

                        if (handler.chars)
                            handler.chars(text);

                        return "";
                    });

                    parseEndTag("", stack.last());
                }

                if (html && html == last)
                    throw "Parse Error: " + html;
                last = html;
            }
        };

        // Clean up any remaining tags
        //parseEndTag(); //for document.write(), do not do this!

        function parseStartTag(tag, tagName, rest, unary) {
            if (block[tagName]) {
                while (stack.last() && inline[stack.last()]) {
                    parseEndTag("", stack.last());
                }
            }

            if (closeSelf[tagName] && stack.last() == tagName) {
                parseEndTag("", tagName);
            }

            unary = empty[tagName] || !!unary;

            if (!unary)
                stack.push(tagName);

            if (handler.start) {
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

                if (handler.start)
                    handler.start(tagName, attrs, unary);
            }
        }

        function parseEndTag(tag, tagName) {
            // If no tag name is provided, clean shop
            if (!tagName)
                var pos = 0;

            // Find the closest opened tag of the same type
            else
                for (var pos = stack.length - 1; pos >= 0; pos--)
                if (stack[pos] == tagName)
                break;

            if (pos >= 0) {
                // Close all the open elements, up the stack
                for (var i = stack.length - 1; i >= pos; i--)
                    if (handler.end)
                    handler.end(stack[i]);

                // Remove the open elements from the stack
                stack.length = pos;
            }
        }

        //This gets everything going
        this.parse(html);
    };
    //-- End HTML Parser By John Resig (ejohn.org) ---------------------

    var htmlns = 'http://www.w3.org/1999/xhtml';
    var win = window;
    var doc = document;

    //Keep track of when the document has been loaded
    var isDOMLoaded = false;
    function markLoaded() {
        isDOMLoaded = true;
    }
    if (doc.addEventListener)
        doc.addEventListener('DOMContentLoaded', markLoaded, false);
    if (win.addEventListener)
        win.addEventListener('load', markLoaded, false);
    if (win.attachEvent)
        win.attachEvent('onload', markLoaded);

    //Any script element IDs specified here will cause them to be ignored
    var scriptIgnoreIDs = makeMap("_firebugConsoleInjector,_firebugConsole");

    var parentNode;
    var lastScript;
    var parser;

    //Find where new nodes will be placed
    var thisScript;
    if (!isDOMLoaded) {
        //Get the last script element, the one that is calling document.write()
        var scripts = doc.getElementsByTagName('script');
        for (var i = scripts.length - 1; i >= 0; i--) {
            if (!scripts[i].id || !scriptIgnoreIDs[scripts[i].id]) {
                thisScript = scripts[i];
                break;
            }
        }

        //Set where new nodes will be appended to
        if (!parentNode) {
            parentNode = thisScript.parentNode;
        }

        //If we're in the same script element, then continue where left off, 
        //  but if calling from new script element, reset the parentNode.
        //  It will be better in the future to actually keep track of the 
        //  nodes in between the two script elements and to move them to be
        //  inside of any HTML fragment that had yet to be closed.
        if (thisScript != lastScript) {
            parentNode = thisScript.parentNode;
            parser = null; //destroy the parser
            lastScript = thisScript;
        }
    }
    else if (!parentNode) {
        parentNode = doc.getElementsByTagName('body')[0];
    }

    if (parser) {
        parser.parse(str);
    }
    else {
        parser = new HTMLParser(str, {
            start: function(tag, attrs, unary) {
                var el = doc.createElement(tag);
                for (var i = 0; i < attrs.length; i++)
                    el.setAttribute(attrs[i].name, attrs[i].value);

                parentNode.appendChild(el);
                if (!unary)
                    parentNode = el;
            },
            end: function(tag) {
                parentNode = parentNode.parentNode;
            },
            chars: function(text) {
                if (text) {
                    parentNode.appendChild(doc.createTextNode(text));
                }
            },
            comment: function(text) {
                parentNode.appendChild(doc.createComment(text));
            }
        });
    }
};
////////////////////////////////////////////
// End of script
if (typeof(Sys) !== 'undefined')
{
    Sys.Application.notifyScriptLoaded();
}
////////////////////////////////////////////
// Do not add any code below this
////////////////////////////////////////////
