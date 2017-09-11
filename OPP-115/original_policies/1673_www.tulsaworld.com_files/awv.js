$(".all-world-category").each(function () {
    var categoryid = $(this).data('categoryid');
    var block = $(this);
    var txt = "";

    getAllWorldCategory(categoryid);

    function getAllWorldCategory(categoryid) {
        var xmlhttp;
        if (window.XDomainRequest) {
            xmlhttp = new XDomainRequest();
        }
        else {
            xmlhttp = new XMLHttpRequest();
        }

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var xmlDoc = xmlhttp.responseText;

                if (window.DOMParser) {
                    

                    parser = new DOMParser();
                    xDoc = parser.parseFromString(xmlDoc, "text/xml");

                    numItems = xDoc.getElementsByTagName("item").length;
                    
                    txt += "<table class=\"table table-condensed table-bordered\">";
                    txt += "<tbody>";
                    
                    //title = xDoc.getElementsByTagName("title")[0].textContent;
                    //txt += "<tr><td colspan=\"3\"><h3 class=\"aw-title\">" + title + "</h3></td></tr>";

                    for (i = 0; i < numItems; i++) {
                        itm = xDoc.getElementsByTagName("item")[i];
                        if (itm.childNodes[0].nodeName != 'IsActive') {
                            
                            PlayerID = itm.childNodes[0].textContent;
                            FirstName = itm.childNodes[1].textContent;
                            LastName = itm.childNodes[2].textContent;
                            School = itm.childNodes[3].textContent;
                            Photo = itm.childNodes[4].textContent;
                            Description = itm.childNodes[5].textContent;

                            txt += "<tr>";
                            txt += "<td><img src=\"" + Photo + "\" /></td>";
                            txt += "<td><h3>" + FirstName + " " + LastName + "</h3><h6>" + School + "</h6><span>" + Description + "</span></td>";
                            txt += "<td><button data-playerid=" + PlayerID + " class=\"vote btn btn-primary\"><i class=\"glyphicon glyphicon-thumbs-up\"></i> VOTE</button></td>";
                            txt += "</tr>";
                        }
                        else {
                            txt += "<tr><td>" + itm.childNodes[0].textContent + "</td></tr>";
                        }
                    }
                    txt += "</tbody>";
                    txt += "</table>";

                    block.html(txt);
                    activateButtons(categoryid);
                }
            }
        }

        if (window.XDomainRequest) {
            xmlhttp.open("GET", "http://www.tulsaworldapps.com/all-world/player-list.aspx?CategoryID=" + categoryid);
            xmlhttp.onload = function() {
                var xDoc = new ActiveXObject("Microsoft.XMLDOM");
                xDoc.async = false;
                xDoc.loadXML(xmlhttp.responseText);

                numItems = xDoc.getElementsByTagName("item").length;

                txt += "<table class=\"table table-condensed table-bordered\">";
                txt += "<tbody>";
                
                //title = xDoc.getElementsByTagName("title")[0].text;
                //txt += "<tr><td colspan=\"3\"><h3 class=\"aw-title\">" + title + "</h3></td></tr>";
                    
                for (i = 0; i < numItems; i++) {
                    itm = xDoc.getElementsByTagName("item")[i];
                    if (itm.childNodes[0].nodeName != 'IsActive') {
                        PlayerID = itm.childNodes[0].text;
                        FirstName = itm.childNodes[1].text;
                        LastName = itm.childNodes[2].text;
                        School = itm.childNodes[3].text;
                        Photo = itm.childNodes[4].text;
                        Description = itm.childNodes[5].text;

                        txt += "<tr>";
                        txt += "<td><img src=\"" + Photo + "\" /></td>";
                        txt += "<td><h3>" + FirstName + " " + LastName + "</h3><h6>" + School + "</h6><span>" + Description + "</span></td>";
                        txt += "<td><button data-playerid=" + PlayerID + " class=\"vote btn btn-primary\"><i class=\"glyphicon glyphicon-thumbs-up\"></i> VOTE</button></td>";
                        txt += "</tr>";
                    }
                    else {
                        txt += "<tr><td>" + itm.childNodes[0].text + "</td></tr>";
                    }
                }

                txt += "</tbody>";
                txt += "</table>";

                block.html(txt);
                activateButtons(categoryid);
            }
            xmlhttp.send();
        }
        else {
            xmlhttp.open("GET", "http://www.tulsaworldapps.com/all-world/player-list.aspx?CategoryID=" + categoryid, true);
            xmlhttp.send();
        }
    }

    function activateButtons(cat) {
        $(".all-world-category[data-categoryid='" + cat + "'] button.vote").click(function () {
            var blockid = $(this).parent().parent().parent().parent().parent();
            var playerid = $(this).data('playerid');
            
            if (window.XDomainRequest) {
                rHttp = new XDomainRequest();
                rHttp.open("GET", "http://www.tulsaworldapps.com/all-world/vote.aspx?PlayerID=" + playerid);
                rHttp.onload = function () {
                    blockid.html('<p class="confirmation">Thank you for your vote. To vote again, please reload this page.<br /><a href="http://www.chrisnikel.com/?ref=TulsaWorld" target="_blank"><img class="sponsor-logo" src="http://tulsaworld.com/content/tncms/live/global/resources/images/chris-nikel.png" /></a><br />The All-World Football Contest is sponsored by Chris Nikel Chrysler Jeep Dodge. Learn how they have served the Tulsa area for more than 40 years at <a href="http://www.chrisnikel.com/?ref=TulsaWorld" target="_blank">chrisnikel.com</a>.</p>');
                }
                rHttp.send();
            }
            else {
                $.ajax({
                    type: "GET",
                    cache: false,
                    url: "http://www.tulsaworldapps.com/all-world/vote.aspx?PlayerID=" + playerid,
                    success: function (msg) {
                        blockid.html('<p class="confirmation">Thank you for your vote. To vote again, please reload this page.<br /><a href="http://www.chrisnikel.com/?ref=TulsaWorld" target="_blank"><img class="sponsor-logo" src="http://tulsaworld.com/content/tncms/live/global/resources/images/chris-nikel.png" /></a><br />The All-World Football Contest is sponsored by Chris Nikel Chrysler Jeep Dodge. Learn how they have served the Tulsa area for more than 40 years at <a href="http://www.chrisnikel.com/?ref=TulsaWorld" target="_blank">chrisnikel.com</a>.</p>');
                    }
                });
            }            
        });
    }
});