/**
	script.js
	==============

	Standalone JS by AREA17 2011
	-----------------------------

*/
var jquery_lib = 'https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js',
	raphael_lib = '/sites/all/themes/aw/js/lib/raphael-min.js',
	lettering_lib = '/sites/all/themes/aw/js/lib/jquery.lettering-0.6.min.js',
	slider_js = '/sites/all/themes/aw/js/slider.js',
	isIE67 = false;

var adweek = function(){
	if (typeof jQuery != 'undefined') {
		init();
	} else {
		$script([jquery_lib], 'bundle');
		$script.ready('bundle', function() {
			init();
		});
	}

    $(document).ready(function() {
        $("#video-item-for-meebo-bar-see-more a").hover(
            function () {
                $(this).css("background", "url(/sites/all/themes/aw/images/sitewide/see_more.png) no-repeat scroll center 125% transparent");
            },
            function () {
                $(this).css("background", "url(/sites/all/themes/aw/images/sitewide/see_more.png) no-repeat scroll center 0 transparent");
            }
        );

        $("#video-item-for-meebo-bar-wrapper").hover(
            function () {
                $(this).css("opacity", 0.7);
            },
            function () {
                $(this).css("opacity", 1);
            }
        );

        $(".editorial-calendar table tbody").each(function() {
            $(this).find("tr:nth-child(2n+1)").css("background-color", "#efefef");
        });

        $(".editorial-calendar table").each(function() {
            $(this).find("th:nth-child(4n)").css("text-align", "left").css("padding", "0 0 0 17px");
            $(this).find("td:nth-child(4n)").css("text-align", "left").css("padding", "3px 0 3px 17px");
            $(this).find("td:nth-child(4n+1)").css("font", "bold 24px/24px Arial");

            $(this).find("tbody tr").each(function() {
                var text = $(this).find("td:nth-child(2)").text().replace(/[\s\xA0]+/g,'');
                if(text === "noissue" || text === "") {
                    $(this).find("td:nth-child(1)").css("color", "#999");
                } else {
                    $(this).find("td:nth-child(1)").css("color", "#010000");
                }
            });
        });

        $(".on_calendar_top").click(function() {
            $("html, body").animate({
                scrollTop:0
            }, "slow");
            return false;
        });

        $(".mod.mod-featuredresearch li").each(function() {
            var li_height = $(this).height();
            var image_height = $(this).find(".whitepaper img").height();
            if(li_height > image_height){
                $(this).find(".whitepaper img").css("padding", (li_height - image_height) / 2 + "px 0px");
            } else {
                $(this).css("height", image_height + "px");
            }
        });

        $("#main .inner h1").each(function() {
          $(this).html($(this).html().replace("”", '"'));
          $(this).html($(this).html().replace("“", '"'));
          $(this).html($(this).html().replace("’", "'"));
          $(this).html($(this).html().replace("‘", "'"));
          $(this).html($(this).html().replace("“", '"'));
          $(this).html($(this).html().replace("”", '"'));
        });

        $("#main .inner h2").each(function() {
          $(this).html($(this).html().replace("”", '"'));
          $(this).html($(this).html().replace("“", '"'));
          $(this).html($(this).html().replace("’", "'"));
          $(this).html($(this).html().replace("‘", "'"));
          $(this).html($(this).html().replace("“", '"'));
          $(this).html($(this).html().replace("”", '"'));
        });
				/** // commented out because it caused iframe for cannes to reload randomly on load
        $("#main .inner p").each(function() {
          $(this).html($(this).html().replace("”", '"'));
          $(this).html($(this).html().replace("“", '"'));
          $(this).html($(this).html().replace("’", "'"));
          $(this).html($(this).html().replace("‘", "'"));
          $(this).html($(this).html().replace("“", '"'));
          $(this).html($(this).html().replace("”", '"'));
        });
        */

        $("#main .inner span").each(function() {
          $(this).html($(this).html().replace("”", '"'));
          $(this).html($(this).html().replace("“", '"'));
          $(this).html($(this).html().replace("’", "'"));
          $(this).html($(this).html().replace("‘", "'"));
          $(this).html($(this).html().replace("“", '"'));
          $(this).html($(this).html().replace("”", '"'));
        });
    });

	function init() {
		if (Modernizr.touch) {
			$('html').addClass('touch');
		}

		jscss();
		leftsidebar(300);
		itemClicks();
		defaultInputValues();
		//pie();
		refineSearch();

		if (typeof slider != 'undefined') {
  		featuresSlider();
  	} else {
  		$script([slider_js], 'slider');
  		$script.ready('slider', function() {
  			featuresSlider();
  		});
  	}
	}

	function featuresSlider() {
	    /* as seen on the franchise pages */
	    /* and also some listing pages 02_Listing */
	    var sA = ($("body#franchise").length > 0) ? 986 : 650;
	    //
	    $("#franchise #features.slideable").slider({
    	    sliderContainer: $("#franchise #features.slideable"),
            sliderInner: $("#franchise #features.slideable .slider"),
            slideAmount: sA,
            itemsVisible: 1,
            currentSet: 1,
            budge: 0,
            looping: true,
            automate: true,
            interval: 6,
            direction: "ltr",
            quickLinks: true,
            speed: 250,
            quickLinksChar: "bull"
    	});

    	/* for digital download franchise template */
    	//var sAddf = ($("body#ddf").length > 0) ? 986 : 650;

	    $("#ddf #features.slideable").slider({
    	    sliderContainer: $("#ddf #features.slideable"),
            sliderInner: $("#ddf #features.slideable .slider"),
            slideAmount: 986,
            itemsVisible: 1,
            currentSet: 1,
            budge: 0,
            looping: true,
            automate: true,
            interval: 6,
            direction: "ltr",
            quickLinks: true,
            speed: 250,
            quickLinksChar: "bull"
    	});
	}

	function jscss() {

		// Remove empty p tags
		var a = $('.article');
		if (a.length > 0) {
			a.find('p').each(function() {
				var p = $(this);
				if (p.length == 0)
					p.remove();
			});

			var af = $('.article-footer'),
				ad = a.eq(0).children('.ad');
			if (af.length > 0 && ad.length > 0) {
				if (af.offset().top <= ad.offset().top + ad.outerHeight(true))
					ad.addClass('mb20');
			}
		}





		var HTML = $('html'); //,
			/* dartcheck = function() {
			$.each($('.dart-tag').not('dart-tag-empty'), function(index, val){
			 	var img = $(val).find('a img'),
			 		z = $(this);
				if (img.length > 0 && img.height() == 1) {
			 		if (typeof z !== "undefined") z.addClass('dart-tag-empty').parent().css({'display':'none'});
			 	} else {
					if (typeof z !== "undefined") {
						z.addClass('v').parent().addClass('v');
					}
				}
			});
		};



		var dartid = setInterval(dartcheck, 1000); */

		if (HTML.hasClass('ie6') || HTML.hasClass('ie7'))
			isIE67 = true;

		// About/RSS fixes
		if ($('.article-generic').length > 0) {
			$('.article-generic').removeClass('article-generic');
			$('#main').addClass('article-generic');
		}

		var hover_klass = 'story-hover',
			extra_klass = 'story-listing',
			extra_hover_klass = extra_klass + '-hover';
		$('.story').hover(function() {
			var self = $(this);
			if (self.hasClass(extra_klass))
				hover_klass += ' ' +  extra_hover_klass;
			$(this).stop().addClass(hover_klass);
		}, function() {
			$(this).stop().removeClass(hover_klass + ' ' + extra_hover_klass);
		});

		$('.columns-landing .subheader .headings').hover(function() {
			var self = $(this);
			$(this).stop().addClass(hover_klass);
		}, function() {
			$(this).stop().removeClass(hover_klass);
		});

		var max = 0;
		$('.cols-316:not(#columns)').each(function() {
			var max = 0,
				cols = $(this);
			$(this).children('.col').each(function() {
				var h = $(this).find('.story-header').height();
				max = h > max ? h : max;
			});
			cols.find('.story-header').height(max).parents('.story').addClass('v');
		});

		max = 0;
		$('#events.speakers .cols-316').each(function() {
			var max = 0,
				cols = $(this);
			$(this).children('.col').each(function() {
				var h = $(this).find('.speaker-header').height();
				max = h > max ? h : max;
			});
			cols.find('.speaker-header').height(max).find('.speaker-name').addClass('align-bottom').parents('.col').addClass('v');
		});

		if ($('.article-list').length > 0) {
			var colright = $('.colright'),
				pcontinue = $('p.continue');
			if (colright.length > 0 && pcontinue.length > 0) {
				var gap = colright.offset().top + colright.height() - pcontinue.offset().top;
				if (gap > 0) {
					pcontinue.addClass('w485').next().addClass('w485');
				}
			}
		}

		// Legal
		if ($('#legal').length > 0)
			$('#shell').addClass('std');

		$('.story-listing:last').addClass('story-last');

		$('.archives-listing > li:last > a').addClass('story-last');

		// Blogs. Don't indent paragraphs that hold iframe or object elements
		if ($('#blog').length > 0 ) {
			$('#post.post > .col:last').children().eq(0).addClass('first');
			$('#post.post > .col:last > p').each(function() {
				var p = $(this);
				if (p.children('iframe').length > 0 || p.children('object').length > 0) {
					// p.addClass('media');
				}
			});
		}

		// Columns
		var i = $('#article.columns #main .content .image'),
			i_img = i.children('img'),
			i_p = i.children('p');
		if (i.length > 0 && i_img.length > 0 && i_p.length > 0) {
			i_p.css({
				top: i_img.height() + 9,
				bottom: 0
			});
		}

	}

	function itemClicks() {

		$('#close-alert').click(function(e) {
			e.preventDefault();
			$('#redirect').slideUp(300, function() {
				$(this).remove();
			});
		});

		$('.list-feed li').bind({
			mouseover: function() {
				$(this).addClass('hover');
			},
			mouseout: function() {
				$(this).removeClass('hover');
			}
		});

	    var applyTo = $(".list-x li");

	    applyTo.each(function(i, el) {
	    	var li = $(this);

			li.bind({
				mouseover: function() {
					li.addClass('mouseover');
				},
				mouseout: function() {
					li.removeClass('mouseover');
				},
				click: function(e) {
					e.preventDefault();
					var link= li.find('a').eq(0);
					if (link.length > 0 && link.attr('href').length > 0 && link.attr('href') != '#')
						window.location = link.attr('href');
				}
			});
	    });

		var listcolumns = $(".list-columns li");
	    listcolumns.each(function(i, el) {
	    	var img = $(this).find('img'),
				subheadline = $(this).find('.headlines');

			img.bind({
				mouseover: function() {
					$(this).parent('a').next('.column-name').addClass('mouseover');
				},
				mouseout: function() {
					$(this).parent('a').next('.column-name').removeClass('mouseover');
				}
			});
	    });


	}

	function defaultInputValues() {
	    var input = $("#search input[type=text], .job-search input[type=text]"),
	        initVal = input.val();

	    input.focus(function() {
			if (isIE67)
				$(this).addClass('searchFor').val("")
			else
	        	$(this).val("");
	    });

	    input.blur(function() {
	        if($(this).val() == "") {
	            $(this).removeClass('searchFor').val(initVal);
	        }
	    });
	}

	/**
	 * HSV to RGB color conversion
	 *
	 * H runs from 0 to 360 degrees
	 * S and V run from 0 to 100
	 *
	 * Ported from the excellent java algorithm by Eugene Vishnevsky at:
	 * http://www.cs.rit.edu/~ncs/color/t_convert.html
	 */
	function hsvToRgb(h, s, v) {
		var r, g, b;
		var i;
		var f, p, q, t;

		// Make sure our arguments stay in-range
		h = Math.max(0, Math.min(360, h));
		s = Math.max(0, Math.min(100, s));
		v = Math.max(0, Math.min(100, v));

		// We accept saturation and value arguments from 0 to 100 because that's
		// how Photoshop represents those values. Internally, however, the
		// saturation and value are calculated from a range of 0 to 1. We make
		// That conversion here.
		s /= 100;
		v /= 100;

		if(s == 0) {
			// Achromatic (grey)
			r = g = b = v;
			return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
		}

		h /= 60; // sector 0 to 5
		i = Math.floor(h);
		f = h - i; // factorial part of h
		p = v * (1 - s);
		q = v * (1 - s * f);
		t = v * (1 - s * (1 - f));

		switch(i) {
			case 0:
				r = v;
				g = t;
				b = p;
				break;

			case 1:
				r = q;
				g = v;
				b = p;
				break;

			case 2:
				r = p;
				g = v;
				b = t;
				break;

			case 3:
				r = p;
				g = q;
				b = v;
				break;

			case 4:
				r = t;
				g = p;
				b = v;
				break;

			default: // case 5:
				r = v;
				g = p;
				b = q;
		}

		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}

	function pie() {
	    // pie charter

	    if($("#pie").length > 0) {
			$('.article').addClass('article-pie');

			$script([raphael_lib], 'raphael');
	        $script.ready('raphael', function() {

				Raphael.fn.pieChart = function (cx, cy, r, values, labels, stroke) {
		            var paper = this,
		                rad = Math.PI / 180,
		                chart = this.set();
		            function sector(cx, cy, r, startAngle, endAngle, params) {
		                var x1 = cx + r * Math.cos(-startAngle * rad),
		                    x2 = cx + r * Math.cos(-endAngle * rad),
		                    y1 = cy + r * Math.sin(-startAngle * rad),
		                    y2 = cy + r * Math.sin(-endAngle * rad);
		                return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
		            }
		            var angle = 0,
		                total = 0,
		                start = 51,
						start_brightness = 100,
						step = Math.round(start / values.length),
						klass  = '',
		                process = function (j) {
		                    var value = values[j],
		                        angleplus = 360 * value / total,
		                        popangle = angle + (angleplus / 2),
		                        ms = 500,
		                        delta = 30,
		                        //bcolor = "hsb(" + start + ", 1, 1)",
								bcolor = "hsb(" + start + ", 99, "+ start_brightness + ")",
		                        //p = sector(cx, cy, r, angle, angle + angleplus, {gradient: "90-" + bcolor + "-" + color, stroke: stroke, "stroke-width": 3}),
								p = sector(cx, cy, r, angle, angle + angleplus, {fill: bcolor, stroke: stroke, "stroke-width": 3}),
		                        txt = paper.text(cx + (r + delta + 55) * Math.cos(-popangle * rad), cy + (r + delta + 25) * Math.sin(-popangle * rad), labels[j]).attr({fill: bcolor, stroke: "none", opacity: 0, "font-family": 'Fontin-Sans, Arial', "font-size": "20px"});



		                    var rgbcolor = hsvToRgb(start, 99, start_brightness);
							if (j >= 5) {
								if ($('#pielabels2').length == 0) {
									$(".graph").append('<ul id=\"pielabels2\" class=\"pielabels\">');
								}
								var lilabel = $("<li>", {
		                            html: labels[j] + "<span style=\"background-color: rgb(" + rgbcolor + ");\"></span>"
		                        }).appendTo($('#pielabels2'));

							} else {
								var lilabel = $("<li>", {
		                            html: labels[j] + "<span style=\"background-color: rgb(" + rgbcolor + ");\"></span>"
		                        }).appendTo($("#pielabels"));
							}
							if (j == 4 || j == 9)
								lilabel.addClass('nobd');

		                    lilabel.mouseover(function() {
		                        p.animate({scale: [1.1, 1.1, cx, cy]}, ms, "elastic");
								$(this).css({
		                        	"text-decoration": "underline"
		                        });
		                    }).mouseout(function() {
		                        p.animate({scale: [1, 1, cx, cy]}, ms, "elastic");
								$(this).css({
		                        	"text-decoration": "none"
		                        });
		                    });

		                    p.mouseover(function () {
		                        p.animate({scale: [1.1, 1.1, cx, cy]}, ms, "elastic");
		                        // txt.animate({opacity: 1}, ms, "elastic");
								$("#pielabels").find('li:contains('+labels[j]+')').css({
		                        	"text-decoration": "underline"
		                        });
		                    }).mouseout(function () {
		                        p.animate({scale: [1, 1, cx, cy]}, ms, "elastic");
		                        lilabel.removeClass(txt);
								// txt.animate({opacity: 0}, ms);
		                        $("#pielabels").find('li:contains('+labels[j]+')').css({
		                        	"text-decoration": "none"
		                        });
		                    });


		                    angle += angleplus;
		                    chart.push(p);
		                    // chart.push(txt);
		                    start -= step;
							if (start < 0)
								start = 1;
							start_brightness -= 1;
		                };
		            for (var i = 0, ii = values.length; i < ii; i++) {
		                total += values[i];
		            }
		            for (var i = 0; i < ii; i++) {
		                process(i);
		            }
		            return chart;
		        };

		        (function (raphael) {
		            $(function () {
		                var values = [],
		                    labels = [];
		                $("#pie tr").each(function () {
		                    values.push(parseInt($("td", this).text(), 10));
		                    labels.push($("th", this).text());
		                });
		                $("#pie").hide();
		                raphael("pieholder", 350, 350).pieChart(175, 175, 160, values, labels, "#fff");
		            });
		        })(Raphael.ninja());

			});

	    }

	}

	function refineSearch() {
	    // basic hide/show for refine-search
	    if($("#jobs").length > 0) {
	        var label_active = "Hide Options",
				label_inactive = "Refine Search";
			$("#refine-trigger").click(function(event) {
	            event.preventDefault();
	            var refine =  $("#refine-search"),
					label = refine.is(':visible') ? label_inactive : label_active;
				refine.toggle().toggleClass('hidden');
				$(this).children('span').html(label);

	        });
	    }
	}

	function leftsidebar(_spacing) {
		var idarticle = $('#article'),
			leftsidebar = idarticle.find('.leftsidebar');
		if (leftsidebar.length == 0 || leftsidebar.children().length == 0 ) return;
    if (leftsidebar.find(".mod-author").size() > 0) {
      return false;
    }
		var paragraphs = $('.article-long > *'),
		spacingMeta = parseInt($('.subheader > .meta').css('margin-bottom').replace('px','')),
		spacing = _spacing,
		target_paragraph = '',
		target_word = '';

		if (isIE67) {
			if ($('.article-footer').length > 0 && leftsidebar.find('.mod-photo').length > 0) {
				$('.article-footer').children().eq(0).before(leftsidebar.find('.mod-photo'));
			}

		} else {
			$script([lettering_lib], 'lettering');
	        $script.ready('lettering', function() {
				paragraphs.each(function() {
					var gap = $(this).position().top + spacingMeta;
					if (gap > spacing) {
						target_paragraph = $(this).prev();
						return false;
					} else if (gap == spacing) {
						target_paragraph = $(this);
						return false;
					}

				});
				if (target_paragraph.length == 0) return;
				target_paragraph.addClass('target').lettering('words');
				target_paragraph.children('span[class*=word]').each(function(i) {
					var top = $(this).position().top + spacingMeta,
						left = $(this).position().left;
					if (left == 0 && top >= spacing - 30 && top <= spacing) {
						target_word = $(this);
						target_word.before(leftsidebar);
						$('.article-long').find('.leftsidebar').addClass('col colleft');
						var extra = spacing - ($('.colleft').position().top + spacingMeta);
						$('.colleft').css('margin-top', extra);
						return false;
					} else if (left == 0 && top >= spacing && top <= spacing + 30) {
						target_word = $(this);
						target_word.before(leftsidebar);
						$('.article-long').find('.leftsidebar').addClass('col colleft');
						return false;
					}

				});
			});
		}



	}
}();
