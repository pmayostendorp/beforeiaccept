﻿function registerNS(ns) {
    var nsParts = ns.split(".");
    var root = window;

    for (var i = 0; i < nsParts.length; i++) {
        if (typeof root[nsParts[i]] == "undefined")
            root[nsParts[i]] = new Object();

        root = root[nsParts[i]];
    }
}

registerNS("SiteCatalystManager");

SiteCatalystManager.AddProduct = function(s, product) {
    if (s) {
        product = ";" + product;
        if (SiteCatalystManager.HasProducts(s) && s.products.search(product) == -1) {
            s.products = s.products + "," + product;
        }
        else {
            s.products = product;
        }
    }
}

SiteCatalystManager.RemoveProduct = function(s, product) {
    if (s && SiteCatalystManager.HasProducts(s)) {
        product = ";" + product;
        s.products.replace(product, "");
        s.products.replace(",,", ",");
    }
}

SiteCatalystManager.HasProducts = function(s)
{
    return s.products != null && s.products != "";
}

SiteCatalystManager.AddEvent = function(s, event) {
    if (s) {
        if (s.events && s.events != "" && s.events.search(event) == -1) {
            s.events = s.events + "," + event;
        }
        else
            s.events = event;
    }
}

SiteCatalystManager.CartLineItemAdded = function(s, product, isFirst, isPreOrder) {

    s.linkTrackVars = "products,events,eVar11,eVar18,eVar28";

    var linkTrackEvents = "scAdd";
    var events = "scAdd";

    if (isFirst) {
        linkTrackEvents = linkTrackEvents + ",scOpen";
        events = events + ",scOpen";
    }

    if (isPreOrder) {
        linkTrackEvents = linkTrackEvents + ",event36";
        events = events + ",event36";
    }

    s.linkTrackEvents = linkTrackEvents;
    s.events = events;
    s.products = ";" + product;

    s.tl(true, 'o', 'Add to Cart');
}

SiteCatalystManager.DownloadableProductAddToCart = function(s, productId, sku) {

    s.events = "event26";
    s.products = ";" + productId + ";;;;eVar11=" + sku;
    
    SiteCatalystManager.WriteCode(s);
}

SiteCatalystManager.WishListItemAdded = function(s, productId, sku) {

    s.linkTrackVars = "products,events";
    s.linkTrackEvents = "event25";
    
    s.events = "event25";
    s.products = ";" + productId + ";;;;eVar11=" + sku;
    
    s.tl(true, 'o', 'Add to Wishlist');
}

SiteCatalystManager.OrderPreviewClicked = function(s) {

    s.linkTrackVars='events';
    s.linkTrackEvents = 'event21';
    
    s.events = 'event21';
    
    s.tl(true,'o','Checkout Review');
}

SiteCatalystManager.CrossSellClicked = function(s) {
    s.linkTrackVars='eVar5';
    s.linkTrackEvents='None';
    s.eVar5=gs.pageName;
    s.tl(this,'o','Link Name');
}

SiteCatalystManager.CartLineItemRemoved = function (s, productId, sku) {
    s.linkTrackVars = "products,events";
    s.linkTrackEvents = "scRemove";
    
    s.events = "scRemove";
    s.products = ";" + productId + ";;;;eVar11=" + sku;
    
    s.tl(true, 'o', 'Remove from Cart');
}

SiteCatalystManager.PromoCodeSuccessfullyAdded = function (s, campainLineItemId) {
    s.linkTrackVars = "events,eVar29";
    s.linkTrackEvents = "event9";

    s.events = "event9";
    s.eVar29 = campainLineItemId;

    s.tl(true, 'o', 'PromoCode added to Cart');
}

SiteCatalystManager.PromoCodeUnsuccessfullyAdded = function (s) {
    s.linkTrackVars = "events";
    s.linkTrackEvents = "event10";

    s.events = "event10";

    s.tl(true, 'o', 'PromoCode not added to Cart');
}

SiteCatalystManager.LoyaltyCardSet = function (s, cardName, cardNumber) {
    s.linkTrackVars = "eVar24,eVar30";

    s.eVar24 = cardName;
    s.eVar30 = cardNumber;

    s.tl(true, 'o', 'Loyalty Card Set');
}


SiteCatalystManager.ViewingProduct = function(s, productId, hasReviews, conditions) {

    SiteCatalystManager.AddEvent(s, "prodView");

    var product = productId;
    if (hasReviews)
        product = product + ";;;;eVar28=Reviews Available";
    if (conditions && conditions != "")
        product = product + (hasReviews ? "|" : ";;;;") + "eVar18=" + conditions;

    SiteCatalystManager.AddProduct(s, product);

    SiteCatalystManager.WriteCode(s);
}

SiteCatalystManager.ProductReviewWritten = function(s) {

    SiteCatalystManager.AddEvent(s, "event30");

    SiteCatalystManager.WriteCode(s);
}

SiteCatalystManager.CheckoutFailed = function(s) {

    SiteCatalystManager.AddEvent(s, "event22");

    SiteCatalystManager.WriteCode(s);
}

SiteCatalystManager.HOPSCheckoutComplete = function (s, sku, productName) {
    s.events = "event35,event40";
    s.pageName = "pustore:confirmation:sku:" + sku + ":" + productName;
    s.prop1 = "pustore request confirmation";
    s.channelManager = "pustore";
    SiteCatalystManager.WriteCode(s);
}

SiteCatalystManager.UserUnsuccessfullyLoggedIn = function (s) {
    SiteCatalystManager.AddEvent(s, "event32");
    SiteCatalystManager.WriteCode(s);
}

SiteCatalystManager.UserSuccessfullyLoggedIn = function (s) {
    SiteCatalystManager.AddEvent(s, "event31");
    SiteCatalystManager.WriteCode(s);
}

SiteCatalystManager.CheckoutAccountCreated = function (s, fromGuest) {
    if (fromGuest) {
        SiteCatalystManager.AddEvent(s, "event23");
    }
    else {
        SiteCatalystManager.AddEvent(s, "event14");
    }
    SiteCatalystManager.WriteCode(s);
}

SiteCatalystManager.WriteCode = function(s) {
    var s_code = s.t();
    if (s_code)
        document.write(s_code);
}