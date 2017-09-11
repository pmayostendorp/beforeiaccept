

(function () {
var oldonload = window.onload;
window.onload = function(){

	var subItem = document.getElementById("subnav");
	var subItemDiv = subItem.getElementsByTagName("a");

	for(var i=0;i<subItemDiv.length;i++){
	        var subItemAttribute = subItemDiv[i].getAttribute("class");
	        if(subItemAttribute == "sublinks"){
	            var subItemTextNode = subItemDiv[i].innerHTML;       
	            var charLength = 50;
	            if( charLength < subItemTextNode.length){
	                var checkSubItemNode = subItemTextNode.slice(0,charLength) + "...";
	                var changeValue = subItemDiv[i].innerHTML = checkSubItemNode;
	                //console.log(changeValue);
	            }        
	        } 
	    }	

if(oldonload){oldonload()}};

}());