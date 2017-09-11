// JavaScript Document
function StringBuilder() {
    if (!(this instanceof StringBuilder)) {
        return new StringBuilder();
    }

    this.values = [];
    this.length = 0;
}

StringBuilder.prototype.append = function (value) {
    this.values.push(value);
    this.length += value.length;
};
StringBuilder.prototype.valueOf = function () {
    return this.toString();
};
StringBuilder.prototype.toString = function () {
    return this.values.join("");
};

$(function () {
    var leading
    var newleading
    var A = 0
    var B = 0
    var C = 0
    var D = 0
    var E = 0
    var F = 0
    var G = 0
    var H = 0
    var I = 0
    var J = 0
    var K = 0
    var L = 0
    var M = 0
    var N = 0
    var O = 0
    var P = 0
    var Q = 0
    var R = 0
    var S = 0
    var T = 0
    var U = 0
    var V = 0
    var W = 0
    var X = 0
    var Y = 0
    var Z = 0


    var Afind = 0
    var Bfind = 0
    var Cfind = 0
    var Dfind = 0
    var Efind = 0
    var Ffind = 0
    var Gfind = 0
    var Hfind = 0
    var Ifind = 0
    var Jfind = 0
    var Kfind = 0
    var Lfind = 0
    var Mfind = 0
    var Nfind = 0
    var Ofind = 0
    var Pfind = 0
    var Qfind = 0
    var Rfind = 0
    var Sfind = 0
    var Tfind = 0
    var Ufind = 0
    var Vfind = 0
    var Wfind = 0
    var Xfind = 0
    var Yfind = 0
    var Zfind = 0


        function findReset() {

            Afind = 0
            Bfind = 0
            Cfind = 0
            Dfind = 0
            Efind = 0
            Ffind = 0
            Gfind = 0
            Hfind = 0
            Ifind = 0
            Jfind = 0
            Kfind = 0
            Lfind = 0
            Mfind = 0
            Nfind = 0
            Ofind = 0
            Pfind = 0
            Qfind = 0
            Rfind = 0
            Sfind = 0
            Tfind = 0
            Ufind = 0
            Vfind = 0
            Wfind = 0
            Xfind = 0
            Yfind = 0
            Zfind = 0

        }

    $.getJSON('http://services.sidearmsports.com/services/clients.ashx?callback=?', function (data) {
        var lettercount,
        lettertotals = [],
            $content = StringBuilder(),
            $container = $(".container"),
            $nav = $(".nav");

            
        $('.allbtn').addClass("filterOn")

        $.each(data.sites, function (key, val) {
			
            leading = val.client_name.substring(0, 1);


            if (leading === "A") {
                A++
            }
            if (leading === "B") {
                B++
            }
            if (leading === "C") {
                C++
            }
            if (leading === "D") {
                D++
            }
            if (leading === "E") {
                E++
            }
            if (leading === "F") {
                F++
            }
            if (leading === "G") {
                G++
            }
            if (leading === "H") {
                H++
            }
            if (leading === "I") {
                I++
            }
            if (leading === "J") {
                J++
            }
            if (leading === "K") {
                K++
            }
            if (leading === "L") {
                L++
            }
            if (leading === "M") {
                M++
            }
            if (leading === "N") {
                N++
            }
            if (leading === "O") {
                O++
            }
            if (leading === "P") {
                P++
            }
            if (leading === "Q") {
                Q++
            }
            if (leading === "R") {
                R++
            }
            if (leading === "S") {
                S++
            }
            if (leading === "T") {
                T++
            }
            if (leading === "U") {
                U++
            }
            if (leading === "V") {
                V++
            }
            if (leading === "W") {
                W++
            }
            if (leading === "X") {
                X++
            }
            if (leading === "Y") {
                Y++
            }
            if (leading === "Z") {
                Z++
            }

            if (leading != newleading) {
                $nav.append('<a class="scroll" href="#' + leading + '">' + leading + '</a>')
                $content.append('<div class="anchor" id="' + leading + '">' + leading + '</div>')
                newleading = leading

            }

            if (val.division == "SPECIALPROJECTS") {
                div = "SPECIAL PROJECTS"
            } else if (val.division == "HIGHSCHOOL") {
                div = "HIGH SCHOOL"
            } else {
                div = val.division
            }
			
			if(val.client_category==="Conference"){
			
            //console.log(val.client_url);
            if (val.client_url.search("sidearmsports") != -1) {
                $content.append('<div class="schoolbind  ' + val.client_category +" "+ val.division + '" data="' + leading + '">' +
                    '<div class="soon"></div>' +
                    '<div class="school"><img src="' + val.client_image_url + '"/>' + '<div class="schoolname">' + val.client_name + '</div>' + val.location + '<br>' + div + '</div>' +
                    '</div>')


            } else {
                $content.append('<div class="schoolbind  ' + val.client_category +" "+ val.division + '" data="' + leading + '">' +
                    '<div class="school"><img src="' + val.client_image_url + '"/>' + '<div class="schoolname">' + val.client_name + '</div>' + val.location + '<br>' + div + '</div>' +
                    '<div class="sitelaunch" style="display:none"><img src="/wp-content/themes/twentyeleven/images/launch-icon.png"><span class="launchtext"><a target="_blank" href="' + val.client_url + '">LAUNCH SITE</a></span></div>' +
                    '</div>')
            }
			}
			else{
				  if (val.client_url.search("sidearmsports") != -1) {
                $content.append('<div class="schoolbind  ' + val.division + '" data="' + leading + '">' +
                    '<div class="soon"></div>' +
                    '<div class="school"><img src="' + val.client_image_url + '"/>' + '<div class="schoolname">' + val.client_name + '</div>' + val.location + '<br>' + div + '</div>' +
                    '</div>')


            } else {
                $content.append('<div class="schoolbind  ' + val.division + '" data="' + leading + '">' +
                    '<div class="school"><img src="' + val.client_image_url + '"/>' + '<div class="schoolname">' + val.client_name + '</div>' + val.location + '<br>' + div + '</div>' +
                    '<div class="sitelaunch" style="display:none"><img src="/wp-content/themes/twentyeleven/images/launch-icon.png"><span class="launchtext"><a target="_blank" href="' + val.client_url + '">LAUNCH SITE</a></span></div>' +
                    '</div>')
            }
				}
			

        });

        $content.append('<div class="clear"></div>')

        $container.html($content.toString());


        function logoReset() {
            $(".container .schoolbind, .anchor").show();
        }
        
        $(document)
            .on("mouseenter", ".schoolbind", function () {
                $(this).find(".sitelaunch").fadeIn(200);
            })
            .on("mouseleave", ".schoolbind", function () {
                $(this).find(".sitelaunch").fadeOut(300);
            })
            .on("mouseenter", ".launchtext", function () {
                $(".sitelaunch img").animate({
                    top: "-=75"
                })
            })
            .on("mouseleave", ".launchtext", function () {
                $(".sitelaunch img").animate({
                    top: "+=75"
                })
            })
            .on("click", ".dibtn", function (event) {
                logoReset();
                $(".container .schoolbind:not('.DI')").hide();
                hideHeaders()
                btnManage()
                $(this).addClass("filterOn")
            })
            .on("click", ".diibtn", function (event) {
                logoReset();
                $(".container .schoolbind:not('.DII')").hide();
                hideHeaders()
                btnManage()
                $(this).addClass("filterOn")
            })
            .on("click", ".diiibtn", function (event) {
                logoReset();
                $(".container .schoolbind:not('.DIII')").hide();
                hideHeaders()
                btnManage()
                $(this).addClass("filterOn")
            })
            .on("click", ".naiabtn", function (event) {
                logoReset();
                $(".container .schoolbind:not('.NAIA')").hide();
                hideHeaders()
                btnManage()
                $(this).addClass("filterOn")
            })
            .on("click", ".njcaabtn", function (event) {
                logoReset();
                $(".container .schoolbind:not('.NJCAA')").hide();
                hideHeaders()
                btnManage()
                $(this).addClass("filterOn")
            })
            .on("click", ".cisbtn", function (event) {
                logoReset();
                $(".container .schoolbind:not('.CIS')").hide();
                hideHeaders()
                btnManage()
                $(this).addClass("filterOn")
            })
            .on("click", ".confbtn", function (event) {
                logoReset();
                $(".container .schoolbind:not('.Conference')").hide();
                hideHeaders()
                btnManage()
                $(this).addClass("filterOn")
            })
            .on("click", ".affilbtn", function (event) {
                logoReset();
                $(".container .schoolbind:not('.SPECIALPROJECTS')").hide();
                hideHeaders()
                btnManage()
                $(this).addClass("filterOn")
            })
            .on("click", ".chsbtn", function (event) {
                logoReset();
                $(".container .schoolbind:not('.HIGHSCHOOL')").hide();
                hideHeaders()
                btnManage()
                $(this).addClass("filterOn")
            })
            .on("click", ".allbtn", function (event) {
                logoReset();
                hideHeaders()
                btnManage()
                $(this).addClass("filterOn")
            })
            .on("click", ".scroll", function (event) {
                event.preventDefault();
                $('html,body').animate({
                    scrollTop: $(this.hash).offset().top - 200
                }, 500);
            });
        


        function hideHeaders() {
            findReset()

            $container.find(".schoolbind:hidden").each(function () {
                var leading = $(this).attr("data");

                if (leading === "A") {
                    Afind++
                }
                if (leading === "B") {
                    Bfind++
                }
                if (leading === "C") {
                    Cfind++
                }
                if (leading === "D") {
                    Dfind++
                }
                if (leading === "E") {
                    Efind++
                }
                if (leading === "F") {
                    Ffind++
                }
                if (leading === "G") {
                    Gfind++
                }
                if (leading === "H") {
                    Hfind++
                }
                if (leading === "I") {
                    Ifind++
                }
                if (leading === "J") {
                    Jfind++
                }
                if (leading === "K") {
                    Kfind++
                }
                if (leading === "L") {
                    Lfind++
                }
                if (leading === "M") {
                    Mfind++
                }
                if (leading === "N") {
                    Nfind++
                }
                if (leading === "O") {
                    Ofind++
                }
                if (leading === "P") {
                    Pfind++
                }
                if (leading === "Q") {
                    Qfind++
                }
                if (leading === "R") {
                    Rfind++
                }
                if (leading === "S") {
                    Sfind++
                }
                if (leading === "T") {
                    Tfind++
                }
                if (leading === "U") {
                    Ufind++
                }
                if (leading === "V") {
                    Vfind++
                }
                if (leading === "W") {
                    Wfind++
                }
                if (leading === "X") {
                    Xfind++
                }
                if (leading === "Y") {
                    Yfind++
                }
                if (leading === "Z") {
                    Zfind++
                }
            })

            if (A == Afind) {
                $('#A').hide()
            }
            if (B == Bfind) {
                $('#B').hide()
            }
            if (C == Cfind) {
                $('#C').hide()
            }
            if (D == Dfind) {
                $('#D').hide()
            }
            if (E == Efind) {
                $('#E').hide()
            }
            if (F == Ffind) {
                $('#F').hide()
            }
            if (G == Gfind) {
                $('#G').hide()
            }
            if (H == Hfind) {
                $('#H').hide()
            }
            if (I == Ifind) {
                $('#I').hide()
            }
            if (J == Jfind) {
                $('#J').hide()
            }
            if (K == Kfind) {
                $('#K').hide()
            }
            if (L == Lfind) {
                $('#L').hide()
            }
            if (M == Mfind) {
                $('#M').hide()
            }
            if (N == Nfind) {
                $('#N').hide()
            }
            if (O == Ofind) {
                $('#O').hide()
            }
            if (P == Pfind) {
                $('#P').hide()
            }
            if (Q == Qfind) {
                $('#Q').hide()
            }
            if (R == Rfind) {
                $('#R').hide()
            }
            if (S == Sfind) {
                $('#S').hide()
            }
            if (T == Tfind) {
                $('#T').hide()
            }
            if (U == Ufind) {
                $('#U').hide()
            }
            if (V == Vfind) {
                $('#V').hide()
            }
            if (W == Wfind) {
                $('#W').hide()
            }
            if (X == Xfind) {
                $('#X').hide()
            }
            if (Y == Yfind) {
                $('#Y').hide()
            }
            if (Z == Zfind) {
                $('#Z').hide()
            }
        }


        function btnManage() {

            $(".dibtn").removeClass("filterOn");
            $(".diibtn").removeClass("filterOn");
            $(".diiibtn").removeClass("filterOn");
            $(".naiabtn").removeClass("filterOn");
            $(".njcaabtn").removeClass("filterOn");
            $(".cisbtn").removeClass("filterOn");
            $(".confbtn").removeClass("filterOn");
            $(".affilbtn").removeClass("filterOn");
            $(".chsbtn").removeClass("filterOn");
            $(".allbtn").removeClass("filterOn");
        }

    });


})