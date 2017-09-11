/*
function showhidediv(rad) {
  var rads = document.getElementsByName(rad.name);
  for (var i=0;i<rads.length;i++) {
    var rad = rads[i];  
    var sectionName = rad.value.split("_")[1];  
    document.getElementById( 'existing_'+sectionName+'_section' ).style.display = ( rad.checked ) ? 'block' : 'none';
  }    
}

window.onload=function() {
  var rads = document.getElementsByName("cx");
  for (var i=0;i<rads.length;i++) {
    rads[i].onclick=function() {
      showhidediv(this);
    }
    if (rads[i].checked) {
      rads[i].click();
    }
  }
}



var localSearch = document.getElementById("search_local");
var defaultSearch = document.getElementById("search_pg");
var archiveSearch = document.getElementById("search_archive");
/*
/*searchField.onblur = function(){
if(this.value == ""){
	this.value ="Search the Post-Gazette";
	}
}

searchField.onfocus = function(){
	if(this.value == "Search the Post-Gazette"){
		this.value = "";
	}
}*/

	/*$(function(){
			if(!$.support.placeholder || typeof $.support.placeholder == "undefined") { 
				$('[placeholder]').focus(function() {  var input = $(this);  if (input.val() == input.attr('placeholder')) {    input.val('');    input.removeClass('placeholder');  }}).blur(function() {  var input = $(this);  if (input.val() == '' || input.val() == input.attr('placeholder')) {    input.addClass('placeholder');    input.val(input.attr('placeholder'));  }}).blur().parents('form').submit(function() {  $(this).find('[placeholder]').each(function() {    var input = $(this);    if (input.val() == input.attr('placeholder')) {      input.val('');    }  })});
			}
			Activation.init();
		});*/

//local.com Search Script 
/*
localSearch.onclick = function(){
    if(localSearch.checked){
	    document.searchform.action='http://local.post-gazette.com/search.pg?q=';
	    var searchField = document.getElementById("search");
	    searchField.setAttribute("class", "searchbox");
	    //var querlySearch = document.getElementById("searchboxQ");
	    
		//var searchFieldName = searchField.getAttribute("name");
		//var searchBtn = document.getElementById("search-btn");
		if(searchFieldName == "http://www.google.com/cse?cx= "){
		searchField.setAttribute("name", "q");
	
		}	
		
		//querlySearch.style.display = "none";
		//searchField.style.display = "block";
		//searchBtn.style.display = "block";
    }
}
*/

//function createSearch(searchId,searchAction){
//	$(".search-submit-btn").onclick = function(){
	    /*if(searchId.checked){
		    //document.searchform.action= searchAction;
		    //var searchField = document.getElementById(inputID);
		    var query = $(inputID).val();
		    //searchField.setAttribute("class", switchClass);
			//searchField.setAttribute("name", searchName);	
			var url = searchAction+query;
	    }*/
	    
//	    alert("hello");
	
//	}
			
//}

	$(function() {
		$('#mysearchbox').keydown(function(event){    
		    if(event.keyCode==13){
		       $('.search-submit-btn').trigger('click');
		    }
		});
	
    	$( ".search-submit-btn" ).click(function() {
    		//alert("blsdfdsf");
    		setTimeout(function(){ 
				switch($("input:radio[name=mysearch]:checked").val()) {
				    case 'pg':
				        var searchAction = "http://search.queryly.com/post-gazette.aspx?query=";
				        break;
				    case 'business':
				        var searchAction = "http://local.post-gazette.com/search.pg?q=";
				        break;
				    case 'archive':
				    	var searchAction = "http://archives.post-gazette.com/search/#query=";
				    	break;
				    default:
				        // do nothing
				}
				
		    	
		    	var query = $('#mysearchbox').val();
		    	var url = searchAction+query;
		    	
		    	//console.log(url);	    	
		    	window.location = url;
	    	}, 0);
	    });
	    
    	$( "#mysearchbox" ).click(function() {
			switch($("input:radio[name=mysearch]:checked").val()) {
			    case 'pg':
			        $("#mysearchbox").addClass("queryly");
			        break;
			    case 'business':
			        $("#mysearchbox").removeClass("queryly");
			        break;
			    case 'archive':
			    	$("#mysearchbox").removeClass("queryly");
			    	break;
			    default:
			        // do nothing
			}
	    });	    
    });
  
//createSearch(defaultSearch,'http://search.queryly.com/post-gazette.aspx?query=','search','searchbox queryly','query');



//createSearch(localSearch,'http://local.post-gazette.com/search.pg?q=','search','searchbox','q');


//createSearch(archiveSearch,'http://archives.post-gazette.com/search/','search','searchbox','query');






	
