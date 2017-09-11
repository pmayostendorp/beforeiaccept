if ($(".tw-embed-race").length) {
    $(".tw-embed-race").each(function () {
        var raceid = $(this).data("raceid");
        var myRaceBlock = $(this);
        var txt = "";
        getEmbeddedRaceResults(raceid);

        function getEmbeddedRaceResults(raceid) {
            var xmlhttp;
            if (window.XDomainRequest) {
                xmlhttp = new XDomainRequest();
            }
            else {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var xmlDoc = xmlhttp.responseText;

                    if (window.DOMParser) {
                        parser = new DOMParser();
                        xDoc = parser.parseFromString(xmlDoc, "text/xml");
                        numItems = xDoc.getElementsByTagName("item").length;
                        for (i = 0; i < numItems; i++) {
                            itm = xDoc.getElementsByTagName("item")[i];
                            DisplayName = itm.childNodes[0].textContent;
                            DisplayName2 = itm.childNodes[1].textContent;
                            DisplayName3 = itm.childNodes[2].textContent;
                            Precincts = itm.childNodes[3].textContent;
                            TotalPrec = itm.childNodes[4].textContent;
                            PrecRep = itm.childNodes[5].textContent;

                            txt += "<table class=\"table table-condensed table-bordered\">";
                            txt += "<thead><tr><th colspan=\"3\" style=\"background-color: #efefef;\">";
                            txt += "<h3>";
                            if (DisplayName != '') { txt += DisplayName; }
                            if (DisplayName2 != '') { txt += " -  " + DisplayName2; }
                            txt += "</h3>";
                            if (DisplayName3 != '') { txt += "<span style=\"font-size: 10px;\">" + DisplayName3 + " </span><br />"; }
                            txt += "</th></tr></thead>";
                            var candidateList = itm.getElementsByTagName("Candidate");
                            for (x = 0; x < candidateList.length; x++) {
                                var cand = itm.getElementsByTagName("Candidate")[x];
                                CandidateName = cand.childNodes[0].textContent;
                                CandidateVotes = cand.childNodes[1].textContent;
                                CandidateVotePct = cand.childNodes[2].textContent;
                                txt += "<tbody><tr><td>" + CandidateName + "</td><td style=\"text-align: right;\">" + CandidateVotes + "</td><td style=\"text-align: right;\">" + CandidateVotePct + "</td></tr></tbody>";
                            }

                            if (Precincts != '' && TotalPrec != '' && PrecRep != '') { txt += "<tfoot><tr><td colspan=\"3\"><span style=\"font-size: 10px; font-family: Arial;\">" + Precincts + " of " + TotalPrec + " (" + PrecRep + ") precincts reporting<br /><a href=\"/news/elections/precinct/?raceid=" + raceid + "\">PRECINCT-BY-PRECINCT RESULTS</a></span></td></tr></tfoot>"; }

                            txt += "</table>";
                            myRaceBlock.html(txt);
                        }
                    }
                }
            }

            if (window.XDomainRequest) {
                xmlhttp.open("GET", "http://www.tulsaworldapps.com/elections/embed.aspx?raceid=" + raceid);
                xmlhttp.onload = function () {
                    var xDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xDoc.async = false;
                    xDoc.loadXML(xmlhttp.responseText);

                    numItems = xDoc.getElementsByTagName("item").length;
                    for (i = 0; i < numItems; i++) {
                        itm = xDoc.getElementsByTagName("item")[i];
                        DisplayName = itm.childNodes[0].text;
                        DisplayName2 = itm.childNodes[1].text;
                        DisplayName3 = itm.childNodes[2].text;
                        Precincts = itm.childNodes[3].text;
                        TotalPrec = itm.childNodes[4].text;
                        PrecRep = itm.childNodes[5].text;

                        txt += "<table class=\"table table-condensed table-bordered\">";
                            txt += "<thead><tr><th colspan=\"3\" style=\"background-color: #efefef;\">";
                            txt += "<h3>";
                            if (DisplayName != '') { txt += DisplayName; }
                            if (DisplayName2 != '') { txt += " -  " + DisplayName2; }
                            txt += "</h3>";
                            if (DisplayName3 != '') { txt += "<span style=\"font-size: 10px;\">" + DisplayName3 + " </span><br />"; }
                            txt += "</th></tr></thead>";
                            var candidateList = itm.getElementsByTagName("Candidate");
                            for (x = 0; x < candidateList.length; x++) {
                                var cand = itm.getElementsByTagName("Candidate")[x];
                                CandidateName = cand.childNodes[0].text;
                                CandidateVotes = cand.childNodes[1].text;
                                CandidateVotePct = cand.childNodes[2].text;
                                txt += "<tbody><tr><td>" + CandidateName + "</td><td style=\"text-align: right;\">" + CandidateVotes + "</td><td style=\"text-align: right;\">" + CandidateVotePct + "</td></tr></tbody>";
                            }

                            if (Precincts != '' && TotalPrec != '' && PrecRep != '') { txt += "<tfoot><tr><td colspan=\"3\"><span style=\"font-size: 10px; font-family: Arial;\">" + Precincts + " of " + TotalPrec + " (" + PrecRep + ") precincts reporting<br /><a href=\"/news/elections/precinct/?raceid=" + raceid + "\">PRECINCT-BY-PRECINCT RESULTS</a></span></td></tr></tfoot>"; }
                            txt += "</table>";
                            myRaceBlock.html(txt);
                    }
                }
                xmlhttp.send();
            }
            else if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp.open("GET", "http://www.tulsaworldapps.com/elections/embed.aspx?raceid=" + raceid, true);
                xmlhttp.send();
            }
            else {
                // code for IE6, IE5
                xmlhttp.open("GET", "http://www.tulsaworldapps.com/elections/embed.aspx?raceid=" + raceid, true);
                xmlhttp.send();
            }
        }
        $(this).html(txt);
    });
}