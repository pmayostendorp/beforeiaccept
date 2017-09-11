$(document).ready(function() {
    $("[data-electiondate]").each(function() {
        $(this).html("<i class=\"icon-spinner icon-spin icon-large\"></i> <span class=\"loading-text\">LOADING ELECTION DATA...</span>");
        var dt = $(this).data("electiondate");
        var ua = !(window.XDomainRequest);
        if (ua) {
            getElectionResults(dt,$(this));
        }
        else {
            getIEResults(dt,$(this));
        }
    });
    
    $("[data-electionrace]").each(function() {
        var r = $(this).data("electionrace");
        var ua = !(window.XDomainRequest);
        if (ua) {
            getSingleRaceResults(r);
        }
        else {
            getIESingleResults(r);
        }
    });
    
});

function getElectionResults(dt, container) {
    var fill = "";
    $.ajax({
        type: "GET",
        url: "http://www.tulsaworldapps.com/elections/xml.aspx?edate=" + dt + "&timestamp=" + new Date().getTime(),
        dataType: "xml",
        async: false,
        cache: false,
        success: function(xml) {
            $(xml).find("item").each(function() {
                var raceid = $(this).find("RaceID").text();
                var title = $(this).find("DisplayName").text();
                var title2 = $(this).find("DisplayName2").text();
                var title3 = $(this).find("DisplayName3").text();
                var prec = $(this).find("Precincts").text();
                var totprec = $(this).find("TotalPrec").text();
                var pctrep = $(this).find("PctReporting").text();
                var candidateList = $(this).find("Candidate");
                
                fill += "<div class=\"race-container col-100\"><div><table class=\"race-details\"><tbody><tr><td colspan=\"2\"><span class=\"title1\">" + title + "</span><br /><span class=\"title2\">" + title2 + "</span><br /><span class=\"title3\">" + title3 + "</span></td></tr>";
                
                for (x = 0; x < candidateList.length; x ++) {
                    var cand = $(this).find("Candidate")[x];
                    var CandidateName = $(cand).find("Name").text();
                    var CandidateVotes = $(cand).find("Votes").text();
                    var CandidateVotePct = $(cand).find("VotePct").text();
                    var CandidateParty = $(cand).find("Party").text();
                    var img = $(cand).find("Image").text();
                    
                    fill += "<tr><td data-image=\"" + img + "\" class=\"logo " + CandidateParty.toLowerCase() + "\"></td><td class=\"candidate\"><table><tbody><tr><td class=\"nameplate\">" + CandidateName + "</td><td class=\"votetotal\">" + CandidateVotes + "</td><td class=\"votepct\">" + CandidateVotePct + "</td></tr><tr class=\"votebar\"><td colspan=\"3\"><div></div></td></tr></tbody></table></td></tr>";
                }
                
                fill += "<tr><td colspan=\"2\"><a class=\"precinct\" href=\"/news/elections/precinct/?raceid=" + raceid + "\">VIEW PRECINCT BY PRECINCT RESULTS</a><span class=\"pct\">" + prec + " of " + totprec + " precincts reporting (" + pctrep + ")</span></td></tr></tbody></table></div></div>";
            });
            $(container).html(fill);
        }
    });
    swapLogos();
    //sizeLogos();
    //colorize();
    barwidth();
}
	
function getIEResults(dt, container) {
    var fill = "";
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                
            var xmlDoc = xmlhttp.responseText;
    
            if (window.DOMParser) {
                parser = new DOMParser();
                var xDoc = parser.parseFromString(xmlDoc, "text/xml");
                var items = xDoc.getElementsByTagName("item").length;
                for (i=0;i<items;i++) {
                    var item = xDoc.getElementsByTagName("item")[i];
                    var raceid = item.childNodes[0].textContent;
                    var title = item.childNodes[1].textContent;
                    var title2 = item.childNodes[2].textContent;
                    var title3 = item.childNodes[3].textContent;
                    var prec = item.childNodes[4].textContent;
                    var totprec = item.childNodes[5].textContent;
                    var pctrep = item.childNodes[6].textContent;
                    var candidateList = item.getElementsByTagName("Candidate");
                    
                    fill += "<div class=\"race-container col-100\"><div><table class=\"race-details\"><tbody><tr><td colspan=\"2\"><span class=\"title1\">" + title + "</span><br /><span class=\"title2\">" + title2 + "</span><br /><span class=\"title3\">" + title3 + "</span></td></tr>";
                    
                    for (x=0;x<candidateList.length;x++) {
                        var cand = item.getElementsByTagName("Candidate")[x];
                        var CandidateName = $(cand).find("Name").text();
                        var CandidateVotes = $(cand).find("Votes").text();
                        var CandidateVotePct = $(cand).find("VotePct").text();
                        var CandidateParty = $(cand).find("Party").text();
                        var img = $(cand).find("Image").text();
                        
                        fill += "<tr><td data-image=\"" + img + "\" class=\"logo " + CandidateParty.toLowerCase() + "\"></td><td class=\"candidate\"><table><tbody><tr><td class=\"nameplate\">" + CandidateName + "</td><td class=\"votetotal\">" + CandidateVotes + "</td><td class=\"votepct\">" + CandidateVotePct + "</td></tr><tr class=\"votebar\"><td colspan=\"3\"><div></div></td></tr></tbody></table></td></tr>";
                    }
                    
                    fill += "<tr><td colspan=\"2\"><a class=\"precinct\" href=\"/news/elections/precinct/?raceid=" + raceid + "\">VIEW PRECINCT BY PRECINCT RESULTS</a><span class=\"pct\">" + prec + " of " + totprec + " precincts reporting (" + pctrep + ")</span></td></tr></tbody></table></div></div>";
                }
                $(container).html(fill);
                swapLogos();
                //sizeLogos();
                //colorize();
                barwidth();
            }
        }
    }
    xmlhttp.open("GET", "http://www.tulsaworldapps.com/elections/xml.aspx?edate=" + dt + "&timestamp=" + new Date().getTime());
    xmlhttp.send();
}



function getSingleRaceResults(raceid) {
    var cont = $("div[data-electionrace='"+raceid+"']");
    
    var fill = "";
    $.ajax({
        type: "GET",
        url: "http://www.tulsaworldapps.com/elections/embed.aspx?raceid=" + raceid + "&timestamp=" + new Date().getTime(),
        dataType: "xml",
        async: false,
        cache: false,
        success: function(xml) {
            $(xml).find("item").each(function() {
                var title = $(this).find("DisplayName").text();
                var title2 = $(this).find("DisplayName2").text();
                var title3 = $(this).find("DisplayName3").text();
                var prec = $(this).find("Precincts").text();
                var totprec = $(this).find("TotalPrec").text();
                var pctrep = $(this).find("PctReporting").text();
                var candidateList = $(this).find("Candidate");
                
                fill += "<div class=\"race-container\"><div><table class=\"race-details\"><tbody><tr><td colspan=\"2\"><span class=\"title1\">" + title + "</span><br /><span class=\"title2\">" + title2 + "</span><br /><span class=\"title3\">" + title3 + "</span></td></tr>";
                
                for (x = 0; x < candidateList.length; x ++) {
                    var cand = $(this).find("Candidate")[x];
                    var CandidateName = $(cand).find("Name").text();
                    var CandidateVotes = $(cand).find("Votes").text();
                    var CandidateVotePct = $(cand).find("VotePct").text();
                    var CandidateParty = $(cand).find("Party").text();
                    var img = $(cand).find("Image").text();
                    
                    fill += "<tr><td data-image=\"" + img + "\" class=\"logo " + CandidateParty.toLowerCase() + "\"></td><td class=\"candidate\"><table><tbody><tr><td class=\"nameplate\">" + CandidateName + "</td><td class=\"votetotal\">" + CandidateVotes + "</td><td class=\"votepct\">" + CandidateVotePct + "</td></tr><tr class=\"votebar\"><td colspan=\"3\"><div></div></td></tr></tbody></table></td></tr>";
                }
                
                fill += "<tr><td colspan=\"2\"><a class=\"precinct\" href=\"/news/elections/precinct/?raceid=" + raceid + "\">VIEW PRECINCT BY PRECINCT RESULTS</a><span class=\"pct\">" + prec + " of " + totprec + " precincts reporting (" + pctrep + ")</span></td></tr></tbody></table></div></div>";
            });
            $(cont).html(fill);
        }
    });
    swapLogos();
    //sizeLogos();
    //colorize();
    barwidth();
}

function getIESingleResults(raceid) {
    var cont = $("div[data-electionrace='"+raceid+"']");
    
    var fill = "";
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                
            var xmlDoc = xmlhttp.responseText;
    
            if (window.DOMParser) {
                parser = new DOMParser();
                var xDoc = parser.parseFromString(xmlDoc, "text/xml");
                var items = xDoc.getElementsByTagName("item").length;
                for (i=0;i<items;i++) {
                    var item = xDoc.getElementsByTagName("item")[i];
                    var raceid = item.childNodes[0].textContent;
                    var title = item.childNodes[1].textContent;
                    var title2 = item.childNodes[2].textContent;
                    var title3 = item.childNodes[3].textContent;
                    var prec = item.childNodes[4].textContent;
                    var totprec = item.childNodes[5].textContent;
                    var pctrep = item.childNodes[6].textContent;
                    var candidateList = item.getElementsByTagName("Candidate");
                    
                    fill += "<div class=\"race-container\"><div><table class=\"race-details\"><tbody><tr><td colspan=\"2\"><span class=\"title1\">" + title + "</span><br /><span class=\"title2\">" + title2 + "</span><br /><span class=\"title3\">" + title3 + "</span></td></tr>";
                    
                    for (x=0;x<candidateList.length;x++) {
                        var cand = item.getElementsByTagName("Candidate")[x];
                        var CandidateName = $(cand).find("Name").text();
                        var CandidateVotes = $(cand).find("Votes").text();
                        var CandidateVotePct = $(cand).find("VotePct").text();
                        var CandidateParty = $(cand).find("Party").text();
                        var img = $(cand).find("Image").text();
                        
                        fill += "<tr><td data-image=\"" + img + "\" class=\"logo " + CandidateParty.toLowerCase() + "\"></td><td class=\"candidate\"><table><tbody><tr><td class=\"nameplate\">" + CandidateName + "</td><td class=\"votetotal\">" + CandidateVotes + "</td><td class=\"votepct\">" + CandidateVotePct + "</td></tr><tr class=\"votebar\"><td colspan=\"3\"><div></div></td></tr></tbody></table></td></tr>";
                    }
                    
                    fill += "<tr><td colspan=\"2\"><a class=\"precinct\" href=\"/news/elections/precinct/?raceid=" + raceid + "\">VIEW PRECINCT BY PRECINCT RESULTS</a><span class=\"pct\">" + prec + " of " + totprec + " precincts reporting (" + pctrep + ")</span></td></tr></tbody></table></div></div>";
                }
                $(cont).html(fill);
                
                swapLogos();
                //sizeLogos();
                //colorize();
                barwidth();
            }
        }
    }
    xmlhttp.open("GET", "http://www.tulsaworldapps.com/elections/xml.aspx?edate=" + dt + "&timestamp=" + new Date().getTime());
    xmlhttp.send();
}

function swapLogos() {
    $("td.logo").each(function() {
        var img = $(this).data('image');
        if (img != '') {
            $(this).css({
                'background-image': 'url("http://tulsaworld.com/content/tncms/live/global/resources/images/_elections/' + img + '")'
            });
        }
    });
}

	
function sizeLogos() {
    var w = $("td.logo").width();
    var x = $("table.race-details").width();
    $("td.logo").height(w).width(w);
    $("td.logo.none").width(1);
    if (x > 500) {
        $("tr.votebar > td > div").css({'min-height': 15});
        $("div.race-container").css({'font-size': 20});
    }
    else {
        $("tr.votebar > td > div").css({'min-height': 10});
        $("div.race-container").css({'font-size': 12});
    }
}
		
function colorize() {
    $("div.race-container").each(function() {
        $(this).find("tr.votebar:eq(0) > td > div").css({'background-color': '#00f'});
        $(this).find("tr.votebar:eq(1) > td > div").css({'background-color': '#c00'});
        $(this).find("tr.votebar:eq(2) > td > div").css({'background-color': '#0a0'});
        $(this).find("tr.votebar:eq(3) > td > div").css({'background-color': '#cc0'});
        $(this).find("tr.votebar:eq(4) > td > div").css({'background-color': '#f60'});
    });			
}
	
function barwidth() {
    $("td.candidate").each(function() {
        var pct = $(this).find("td.votepct").text();
        $(this).find("tr.votebar > td > div").animate({
            width: pct
        }, 1000);
    });
}