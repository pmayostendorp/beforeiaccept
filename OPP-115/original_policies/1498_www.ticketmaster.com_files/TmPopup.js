var TMPopup = (function($){
    "use strict";
    /*
     *  
     *
     */
    function Popup(link, orientation){
        
        this.orientation = orientation || "right";
        this._setupUI(link);

    }
    /*
     * TODO: 
     */
    Popup.prototype._setupUI = function(linkNode){
        var link = $(linkNode);
        link.wrap("<span class='relative inline' ></span>");
        var wrapper = link.parent();

        var popup = $("<span></span>", { 
            "class": "tm-popup", 
            "aria-describedby": link.attr("id")
        }).hide();

        var tmp = {};
        tmp[this.orientation] = (/(\d+)/).exec(link.css("width"))[0]/2 - 15 - 7 + "px";
        popup.css(tmp);

        wrapper.append(popup);
        var contentWrapper = $("<span></span>", { "class": "popupContentWrapper " + this.orientation + "Orientation"});
        popup.append(contentWrapper);

        var content = $(link.attr("href"));

        content.addClass("popupContent")
              .attr("tabindex", -1);

        popup.attr("id", content.attr("id"));
        content.attr("id", "").show();

        contentWrapper.append(content);

        var closeBox = $("<a></a>", {
            "class": "popupCloseBox grayLink",
            "role": "button",
            "href": "#" + link.attr("id")
        }).html("Close <img src='http://media.ticketmaster.com/tm/en-us/img/sys/common_new/edp/icn_close.gif' alt=''>");

        contentWrapper.append(closeBox);

        var carrot = $("<span></span>", { 
            "class": "popupCarrot " + this.orientation+"Orientation"
        });
        contentWrapper.append(carrot);

        this.UI = {
            "link": link,
            "wrapper": wrapper,
            "content": content,
            "popup": popup,
            "contentWrapper": contentWrapper,
            "closeBox": closeBox,
            "carrot": carrot
        };
        this._attachEvents();
    };

    Popup.prototype._attachEvents = function(){
        var UI = this.UI,
            self = this;

        UI.link.click(function(e){
            e.preventDefault();
            self.show();
            UI.content.focus();
        });

        UI.closeBox.click(function(e){
            e.preventDefault();
            self.hide();
            UI.link.focus();
        });

        UI.popup.keyup(function(e){
            if(e.which === 27) { // ESC
                self.hide();
                UI.link.focus();
            }
        }).delegate("a, input, select, textarea, button, object, [tabindex]", "blur",function(){
            setTimeout(function(){
                if($(document.activeElement).closest("#"+UI.popup.attr("id")).length === 0){
                    self.hide();
                }
            },0);
        });

    };

    Popup.prototype.hide = function(){
        this.UI.popup.hide()
                     .attr("aria-hidden", true);

    };

    Popup.prototype.show = function(){
        this.UI.popup.show()
                     .attr("aria-hidden", false);
    };

    return Popup;
})(jQuery);
