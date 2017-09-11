/**
 * UTD search autocomplete
 */
	
(function ($) {

	$(document).ready(function(){
		txtSearch = $(".searchfield");
		searchBox = $("#search");
		initContainer = $("body");
		acTop = 0;
		initAC();
	});

	function initAC() {
		$(".searchfield").focus(function(){
			$(".currentSearch").removeClass("currentSearch");
			$(this).parents("form").parent().addClass("currentSearch");
		});
		
		txtSearch.bind('keyup', function(e){
			if (e.keyCode !== 13 && e.keyCode !== 35 && e.keyCode !== 36 && e.keyCode !== 37 && e.keyCode !== 38 && e.keyCode !== 39 && e.keyCode !== 40) {
				if(window.ac_timeout) {
					clearTimeout(ac_timeout);
				}
				if (this.value.length >= 1) {	
					var $this = this;
					ac_timeout = setTimeout(function() {
						ac_timeout = undefined;
						runAutoComplete($this.value);
					}, 500); // Keypress Timeout
				} else {
					$("body").removeClass("autoCompleteOpen");
					$(".autoCompleteList").hide();
					$(".autoCompleteList li").remove();
				}
			}
		});

		txtSearch.bind('keydown',function(e){
		  	var autoCompleteListActive = $(".currentSearch .autoCompleteList li.active");
			if (e.keyCode === 40) { // down arrow
				if ((autoCompleteListActive) && (autoCompleteListActive.index() < ($(".currentSearch .autoCompleteList li").length) - 1) ) {
					autoCompleteListActive.removeClass("active").next().addClass("active");
					this.value = $(".currentSearch .autoCompleteList li.active span").text();
				}
				if (autoCompleteListActive.index() === -1) {
					$(".currentSearch .autoCompleteList li:first").addClass("active");
					this.value = $(".currentSearch .autoCompleteList li.active span").text();
				}
			} else if (e.keyCode === 38) { // up arrow
				if ((autoCompleteListActive) && (autoCompleteListActive.index() > 0)) {
					autoCompleteListActive.removeClass("active").prev().addClass("active");
					this.value = $(".currentSearch .autoCompleteList li.active span").text();
				}
			}
		});
		
		$(".currentSearch .autoCompleteList").bind('mouseenter', function(){
			$(".currentSearch .autoCompleteList li.active").removeClass("active");
		});
		
		$(".currentSearch .autoCompleteOpen").live('click', function() {
			$("body").removeClass("autoCompleteOpen");
			$(".autoCompleteList").hide();
			$(".autoCompleteList li").remove();
		});
		
		$(".currentSearch .autoCompleteList li").live('click', function() {
			txtSearch.val($(this).children("span").text());
			$("form[name=cmssearch]").submit();
		});
		
		$(".currentSearch .autoCompleteList li a").live('click', function(event) {
			event.stopPropagation();
			var params = {entry: $(this).parent().children("span").text()};
			var url = $$.utilities.makeUrl('/services/HistoryEntryRemove', params);
			$.ajax(url, {cache: false});
			$(this).parent().remove();
		});
	}
			
	function runAutoComplete(term){
		var url = $$.utilities.makeUrl('/services/AutoComplete');
		$.getJSON(url, {prefix : term},
			 function(data) {
				if (data === null){
					return false; // break if response fails or is invalid
				}
				
				if ((data.historyList && data.historyList !== "") || (data.termList && data.termList !== "")){
					$(".autoCompleteList li").remove();
					$(".currentSearch .autoCompleteList li").hover(
							function () {
								$(this).addClass("active");
							}, 
							function () {
								$(this).removeClass("active");
							}
					);
					$(".currentSearch .autoCompleteList").show();
					$("*").scroll(function(){
						$("body").removeClass("autoCompleteOpen");
						$(".autoCompleteList").hide();
						$(".autoCompleteList li").remove();
					});
					$("*").click(function(e){
						if (!$(e.target).is(".currentSearch *")) {
							$("body").removeClass("autoCompleteOpen");
							$(".autoCompleteList").hide();
							$(".autoCompleteList li").remove();
							// return false; /* removed. was causing drupal inline admin stuff to not work */
						}
					});
					
					var results = data.historyList;
					if ($(data.historyList).length) {
						$("body").addClass("autoCompleteOpen");
						$.each(results, function(i, result) {
							$(".currentSearch .autoCompleteList").append("<li><span class=\"acHistory\">" + result.term 
									+ "</span> <a href=\"#\">"
									+ $$.search.removeTxt 
									+ "</a></li>");
						});
						
					}
					results = data.termList;
					if ($(data.termList).length) {
						$("body").addClass("autoCompleteOpen");
						
						$.each(results, function(i, result) {
							$(".currentSearch .autoCompleteList").append("<li><span>" + result.term + "</span></li>");
						});
					}
				} else {
					$("body").removeClass("autoCompleteOpen");
					$(".autoCompleteList").hide();
					$(".autoCompleteList li").remove();
				}
			});
	}


})(jQuery);