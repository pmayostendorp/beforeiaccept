
//<script type="txt/javascript">
/*SCRIPT TO CREATE BUY NOW LINK ON REMOTE SITES*/
var myC_Remote = {

    init : function() {
        /* Primary Settings */
        this.BuyImageURL = "http://www.fnpinfocus.com/mycapture/remoteimage.asp"; // The URL to send the Image Request.
        this.DefaultLinkContents = "Buy this Image"; // The Default HTML to be linked to the Buy Image myCapture Page
        this.DefaultLinkLocation = "below"; // Is your Link "above" or "below" the image for purchase?
        this.DefaultImageElementID = null; // Does the Image for purchase have a specific DOM Element ID? (like: <img id="PurchaseImage" src="xxx.jpg" />)
        
        /* Secondary Settings */
        this.DefaultLinkClass = ""; // Set a value if you would like to place a default class on the anchor tag (<a>) on the Buy Image link.
        this.DefaultPricingSheetID = null; // Set a value for the default pricing sheet ID
        this.DefaultPhotographerID = null; // The default photographer ID
        this.DefaultExternalPhotographerID = null; // The default external ID of the photographer (not related to myCapture Photographers)
        this.DefaultExternalPhotographerName = ""; // The default external name of the photographer (not related to myCapture Photographers)
        this.DefaultBackText = ""; // The default value for the Back Text
        this.DefaultNotes = ""; // The default value for the Notes field
        this.DefaultCaption = ""; // The default value for the Caption
        this.DefaultCaptionElementID = ""; // The default value for the Caption Element DOM ID (like: <p id="Caption">...</p>)
        this.DefaultPageTitle = ""; // The default page title for the Image Enlarge page
        this.DefaultCredit = ""; // The default photo credit for the Image
        this.DefaultLinkTarget = ""; // The default target for the buy link
        this.DefaultClickEventFunction = ""; // The default function to be called when the link is clicked
        this.DefaultIsPDF = false; // The default setting for PDF Remotes
    },

    BuyLink : function(bAutoRender) {
        return new myC_Remote._BuyImageLink(bAutoRender);
    },
    
    // The Buy Image has been clicked!
    buyImage : function(sImageID, objLink, bWorkDown, sBuyImageURL, nPricingSheetID, nPhotographerID, nExternalPhotographerID, sExternalPhotographerName, sBackText, sNotes, sCaption, sCaptionElementID, sPageTitle, sCredit, sLinkTarget, sClickEventFunction, bIsPDF, evt) {
        var objImage = null;
        if (sImageID != null && sImageID != "") objImage = this.getObject(sImageID);

        if (objImage == null) {
            // try to find the adjacent image
            var objCheckObject = (bWorkDown) ? this.nextElementNode(objLink) : this.previousElementNode(objLink);
            while (objCheckObject != null) {
                objImage = this.checkTree(objCheckObject, "img", bWorkDown);
                if (objImage != null) {
                    // Try to check the height and width of the image
                    var nWidth = this.getImageWidth(objImage);
                    var nHeight = this.getImageHeight(objImage);
                    if ((nWidth > 100 || nWidth == null) && (nHeight > 100 || nHeight == null)) break;
                }
                objCheckObject = (bWorkDown) ? this.nextElementNode(objCheckObject) : this.previousElementNode(objCheckObject);
            }
        }

        if (objImage != null) {
            // We got our image!
            this.cancelEvent(evt);
            if (sBuyImageURL == null) sBuyImageURL = this.BuyImageURL;
            var sURL = sBuyImageURL + "?image=" + escape(objImage.src) + "&source=jsapi&backurl=" + escape(top.location.href);
            
            // Additional Parameters
            if (nPricingSheetID != null) sURL += "&pricingsheetid=" + nPricingSheetID;
            if (nPhotographerID != null) sURL += "&photographerid=" + nPhotographerID;
            if (nExternalPhotographerID != null) sURL += "&affphotographerid=" + nExternalPhotographerID;
            if (sExternalPhotographerName != null && sExternalPhotographerName != "") sURL += "&affphotographername=" + escape(sExternalPhotographerName);
            if (sBackText != null && sBackText != "") sURL += "&backtext=" + escape(sBackText);
            if (sNotes != null && sNotes != "") sURL += "&notes=" + escape(sNotes);
            if (sPageTitle != null && sPageTitle != "") sURL += "&PageTitle=" + escape(sPageTitle);
            if (sCaptionElementID != null && sCaptionElementID != "") {
                // Try to look up the Caption value frmo the DOM element text content
                var objCaptionElement = this.getObject(sCaptionElementID);
                if (objCaptionElement) sCaption = this.getInnerText(objCaptionElement);
            }
            if (sCaption != null && sCaption != "") sURL += "&caption=" + escape(sCaption);
            if (sCredit != null && sCredit != "") sURL += "&credit=" + escape(sCredit);
            if (bIsPDF) sURL += "&IsPDF=1";
            
            if (sLinkTarget == null) sLinkTarget = "";
            else if (sLinkTarget.toLowerCase() == "same" || sLinkTarget.toLowerCase() == "_self" || sLinkTarget.toLowerCase() == "self") sLinkTarget = "";

            switch (sLinkTarget) {
                case "opener":
                    // Try to open in the opener window
                    try {
                        if (window.opener) window.opener.location.href = sURL;
                        else {
                            var newWin = window.open(sURL, "buyWin");
                            newWin.focus();
                        }
                    }
                    catch (err) {
                        var newWin = window.open(sURL, "buyWin");
                        newWin.focus();
                    }
                    break;
                case "":
                    if (sClickEventFunction != "" && sClickEventFunction != null) eval(sClickEventFunction);
                    // Try to open in the same window
                    top.location.href = sURL;
                    break;
                default:
                    // Open in a named pop-up
                    var newWin = window.open(sURL, sLinkTarget);
                    newWin.focus();
                    break;
            }

            // Run some function after clicking
            if (sLinkTarget != "" && sClickEventFunction != "" && sClickEventFunction != null) eval(sClickEventFunction);

        }
        else {
            // Not Found
            //alert("Image Not Found");
        }
        return false;

    },
    
    // Gets the Reference to an Element By its ID
    getObject : function(sObj) {
        var obj = sObj;
        if (typeof sObj == "string") {
            if (document.getElementById) obj = document.getElementById(sObj);
            else if (document.all) obj = document.all[sObj];
            else if (document.layers) obj = document.layers[sObj];
            else {
                try {
                    obj = eval("document." + sObj);
                }
                catch (e) {
                    obj == null;
                }
            }
        }
        return obj;
    },
    
    // Gets the Width of an Image
    getImageWidth : function(sObj) {
        var obj = this.getObject(sObj);
        if (obj != null) {
            if (obj.width) if (!isNaN(obj.width)) return parseInt(obj.width);
            else if (obj.currentStyle) return parseInt(obj.currentStyle.width);
            else if (window.getComputedStyle) {
                var compStyle = window.getComputedStyle(obj, "");
                return compStyle.getPropertyValue("width");
            }
        }
        return null;
    },
    
    // Gets the Width of an Image
    getImageHeight : function(sObj) {
        var obj = this.getObject(sObj);
        if (obj != null) {
            if (obj.height) if (!isNaN(obj.height)) return parseInt(obj.height);
            else if (obj.currentStyle) return parseInt(obj.currentStyle.height);
            else if (window.getComputedStyle) {
                var compStyle = window.getComputedStyle(obj, "");
                return compStyle.getPropertyValue("height");
            }
        }
        return null;
    },
    
    // Get the inner text
    getInnerText : function(sObj) {
	    var obj = this.getObject(sObj);
    	if (obj) {
    		if (obj.innerText != null) return obj.innerText;
    		else if (obj.childNodes.length > 0) {
			    var s = "";
			    for (var i = 0; i < obj.childNodes.length; i++) {
				    if (obj.childNodes[i].nodeValue != null) s += obj.childNodes[i].nodeValue;
				    else if (obj.childNodes[i].childNodes.length > 0) s += this.getInnerText(obj.childNodes[i]);
			    }
			    return s;
			}
		}
	},
    
    // Formats a string for Javascript
    formatJS : function(sInput) {
        var sOutput = sInput;
        if (sOutput != null) {
            sOutput = sOutput.replace(new RegExp("'", "g"), "\\'");
            sOutput = sOutput.replace(new RegExp("\"", "g"), "\\\"");
            sOutput = "'" + sOutput + "'";
        }
        else {
            sOutput = "null";
        }
        return sOutput;
    },
    
    // Cancels an event
    cancelEvent : function(evt) {
        evt = (evt) ? evt : ((event) ? event : null);
        if (evt) {
            if (evt.cancelBubble != null) evt.cancelBubble = true;
            if (evt.stopPropagation != null) evt.stopPropagation();
        }
        // Return False to stop events
        return false;
    },
    
    // Returns a Reference to an Element of a specific TagName under an Element
    // Params:
    //  sObj = The Element (or ID of the Element) to search
    //  sTagName = The type of tag to search for. Example: "IMG"
    //  bWorkDown = If True, then finds the first element, if false, then finds the last element
    checkTree : function(sObj, sTagName, bWorkDown) {
        var sTagName = sTagName.toUpperCase();
        var obj = this.getObject(sObj);
        // Is This the Object we were looking for?
        var bIsCurrentTag = (obj.tagName == sTagName);
        if (bIsCurrentTag && bWorkDown) return obj;
        else {
            if (obj.getElementsByTagName) {
                // Get all the Elements with this Tag Name
                var aryTags = obj.getElementsByTagName(sTagName);
                if (aryTags.length > 0) {
                    // We have some children of this element type
                    if (bWorkDown) return aryTags[0];
                    else return aryTags[aryTags.length-1];
                }
                else if (bIsCurrentTag) {
                    // Working up, but this tag is it and has no matching children
                    return obj;
                }
            }
            else {
                // Iterate throught its children "manually"
                var aryChildren = (obj.childNodes != null) ? obj.childNodes : obj.children;
                if (aryChildren != null) {
                    if (bWorkDown) {
                        // Work our way DOWN the tree
                        for (var i = 0; i < aryChildren.length; i++) {
                            // Recursively check this child
                            var sCheckChildObj = this.checkTree(aryChildren[i], sTagName, bWorkDown);
                            if (sCheckChildObj != null) return sCheckChildObj;
                        }
                    }
                    else {
                        // Work our way UP the tree
                        for (var i = aryChildren.length-1; i >= 0; i--) {
                            // Recursively check this child
                            var sCheckChildObj = this.checkTree(aryChildren[i], sTagName, bWorkDown);
                            if (sCheckChildObj != null) return sCheckChildObj;
                        }
                    }
                }
            }
        }
    },

    // Returns a reference to the Next Element Node
    nextElementNode : function(sObj) {
        var obj = this.getObject(sObj);
        while (obj.nextSibling != null) {
            if (obj.nextSibling.nodeType == 1) return obj.nextSibling;
            else obj = obj.nextSibling;
        }
        if (obj.parentNode) return this.nextElementNode(obj.parentNode);
        else if (obj.parentElement) return this.nextElementNode(obj.parentElement);
        // Doesn't have a Next Sibling or a Parent, do return null
        return null;
    },
    
    // Returns a reference to the Previous Element Node
    previousElementNode : function(sObj) {
        var obj = this.getObject(sObj);
        while (obj.previousSibling != null) {
            if (obj.previousSibling.nodeType == 1) return obj.previousSibling;
            else obj = obj.previousSibling;
        }
        if (obj.parentNode) return this.previousElementNode(obj.parentNode);
        else if (obj.parentElement) return this.previousElementNode(obj.parentElement);
        // Doesn't have a Previous Sibling or a Parent, do return null
        return null;
    }
    
}

myC_Remote._BuyImageLink = function(bAutoRender) {
    // Auto Render Default Setting
    if (bAutoRender == null) bAutoRender = false;

    // Properties
    this.LinkContent = myC_Remote.DefaultLinkContents;
    this.IsAboveImage = (myC_Remote.DefaultLinkLocation == "above");
    this.ImageElementID = myC_Remote.DefaultImageElementID;
    this.LinkURL = myC_Remote.BuyImageURL;
    this.LinkClass = myC_Remote.DefaultLinkClass;
    this.PricingSheetID = myC_Remote.DefaultPricingSheetID;
    this.PhotographerID = myC_Remote.DefaultPhotographerID;
    this.ExternalPhotographerID = myC_Remote.DefaultExternalPhotographerID;
    this.ExternalPhotographerName = myC_Remote.DefaultExternalPhotographerName;
    this.BackText = myC_Remote.DefaultBackText;
    this.Notes = myC_Remote.DefaultNotes;
    this.Caption = myC_Remote.DefaultCaption;
    this.CaptionElementID = myC_Remote.DefaultCaptionElementID;
    this.PageTitle = myC_Remote.DefaultPageTitle;
    this.Credit = myC_Remote.DefaultCredit;
    this.LinkTarget = myC_Remote.DefaultLinkTarget;
    this.ClickEventFunction = myC_Remote.DefaultClickEventFunction;
    this.IsPDF = myC_Remote.DefaultIsPDF;
    
    // Write the link to Buy the Image
    this.Render = function() {
        // Set Null String versions of invalid values
        if (this.PricingSheetID == "" || isNaN(this.PricingSheetID) || this.PricingSheetID == null) this.PricingSheetID = "null";
        if (this.PhotographerID == "" || isNaN(this.PhotographerID) || this.PhotographerID == null) this.PhotographerID = "null";
        if (this.ExternalPhotographerID == "" || isNaN(this.ExternalPhotographerID) || this.ExternalPhotographerID == null) this.ExternalPhotographerID = "null";
        if (this.ImageElementID == "" || this.ImageElementID == null) this.ImageElementID = "null";
        else if (!this.IsAboveImage) {
            // There is a specific Image Element ID, so make sure it exists before writing out the link (ONLY WORKS IF BELOW THE IMAGE!!)
            if (!myC_Remote.getObject(this.ImageElementID)) return false; // Exit the function
            else if (myC_Remote.getObject(this.ImageElementID).src == null) return false; // Exit the function
            else this.ImageElementID = "'" + this.ImageElementID + "'";
        }

        var sWorkDown = (this.IsAboveImage) ? "true" : "false";
        var sIsPDF = (this.IsPDF) ? "true" : "false";

        // Write out the Link
        document.write("<a href=\"#\" onclick=\"return myC_Remote.buyImage(" + this.ImageElementID + ", this, " + sWorkDown + ", '" + this.LinkURL + "', " + this.PricingSheetID + ", " + this.PhotographerID + ", " + this.ExternalPhotographerID + ", " + myC_Remote.formatJS(this.ExternalPhotographerName) + ", " + myC_Remote.formatJS(this.BackText) + ", " + myC_Remote.formatJS(this.Notes) + ", " + myC_Remote.formatJS(this.Caption) + ", " + myC_Remote.formatJS(this.CaptionElementID) + ", " + myC_Remote.formatJS(this.PageTitle) + ", " + myC_Remote.formatJS(this.Credit) + ", " + myC_Remote.formatJS(this.LinkTarget) + ", " + myC_Remote.formatJS(this.ClickEventFunction) + ", " + sIsPDF + ", event);\"");
        if (this.LinkClass != "" && this.LinkClass != null) document.write(" class=\"" + this.LinkClass + "\"");
        document.write(">" + this.LinkContent + "</a>");
        
        return true;
    }
    
    // Render if requested
    if (bAutoRender) this.Render();
}

// Initialize our Library
myC_Remote.init();

//</script>