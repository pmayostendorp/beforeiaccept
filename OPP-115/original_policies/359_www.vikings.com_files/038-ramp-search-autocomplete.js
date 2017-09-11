/* Searchbox Autocomplete */

//var ezAutocompleteServiceUrl = "http://://[base_ramp_url]/autocomplete/[sitetoken]?callbackName=queryExpansion_callback&q=";
//var ezAutocompleteSearchUrl = "http://[base_ramp_url]/search?";


queryExpansion_init = function(searchBox, listBox, serviceUrl, searchUrl){

    searchBox = jQuery(searchBox);
    listBox = jQuery(listBox);

    if (searchUrl == null || searchUrl.length == 0){
        searchUrl = ezAutocompleteSearchUrl;
    }

    var searchTimer = null;

    var getData = function(){
        var url = serviceUrl + encodeURIComponent(jQuery(searchBox)[0].value);
        var head = document.getElementsByTagName("head")[0];
        var newScript = document.createElement("script");
        newScript.type = "text/javascript";
        newScript.src = url;
        head.appendChild(newScript);
    };

    var init = function(){
        searchBox.attr("autocomplete", "off");

        searchBox.bind("blur", function(event){
            listBox.css("display", "none");
        });

        listBox.bind("blur", function(){
            listBox.css("display", "none");
        });

		listBox.bind("mouseover", function(){
            listBox.find("a").removeClass("hover");
        });

        searchBox.bind("keydown", function(event){
            var selected = jQuery("a.selected", listBox);
            listBox.find("a").removeClass("hover");

            // The up/down key events
            if (event.keyCode == 38 || event.keyCode == 40) {
                if (selected.length > 0) {
                    if (event.keyCode == 38) {
						$nflcs("a").removeClass("hover");
                        selected = selected.prev().addClass("hover");//up
                    }
                    else {
						$nflcs("a").removeClass("hover");
                        selected = selected.next().addClass("hover");//down
                    }
                }

                if (selected.length == 0) {
                    if (event.keyCode == 38) {
                        selected = jQuery("a:last-child", listBox);
						selected.addClass("hover");
                    }
                    else {
                        selected = jQuery("a:first-child", listBox);
						selected.addClass("hover");
                    }
                }

                if (selected.length == 0) {
                    return;
                }

                listBox.css("display", "block");
                selected.addClass("selected").siblings().removeClass("selected");
                jQuery(searchBox)[0].value = jQuery(selected[0]).text();

            //Any other keys pressed
            }
            else {
                if (searchTimer != null) {
                    clearTimeout(searchTimer);
                }
                searchTimer = setTimeout(getData, 300);
            }
        });
    };

    var callback = function(data){
        var list = data.ac.q;
        var content = "";

        if (list.length > 0){
            listBox.css("display", "block");
        }else{
            listBox.css("display", "none");
        }

        for (var i = 0; i < list.length; i+=1){
			var encodedQ = encodeURIComponent(list[i]);
        	var url = searchUrl + "q=" + encodedQ.replace(/'/g, "%27").replace(/%20/g, "+");
        	content += "<a href='' onmousedown='window.location=\""+ url + "\"'>" + list[i] + "</a>";
        }

        listBox.each(function(){
            this.innerHTML = content;
        });
    };

    init();

    return callback;
};