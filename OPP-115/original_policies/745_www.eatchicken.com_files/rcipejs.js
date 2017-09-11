//By: Dexter Zafra www.ex-designz.net and www.myasp-net.com

//Handle popup window
function Start(page) {
OpenWin = this.open(page,'CtrlWindow', 'width=650,height=500,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes')
}
function openWindow(url) {
  popupWin = window.open(url,'new_page','width=400,height=400')
}

//Handle textarea comment and URL description character count 
function textCounter(field, countfield, maxlimit) 
  {
     if (field.value.length > maxlimit) 
         field.value = field.value.substring(0, maxlimit);
     else 
         countfield.value = maxlimit - field.value.length;
}

//Handles bookmark in recipedetail page.
/* Modified to support Opera */
function bookmark(title,url){
if (window.sidebar) // firefox
	window.sidebar.addPanel(title, url, "");
else if(window.opera && window.print){ // opera
	var elem = document.createElement('a');
	elem.setAttribute('href',url);
	elem.setAttribute('title',title);
	elem.setAttribute('rel','sidebar');
	elem.click();
} 
else if(document.all)// ie
	window.external.AddFavorite(url, title);
}

//Handle ckeck keyword for search
function doSubmit(obj) 
 {

   if (obj.find.value != '' && obj.find.value != 'Find it here...') 
       {
          var keywords = obj.find.value.split(' ');
          var validKeyword = 0;

             for(key in keywords) 
                  {
	        keyword = keywords[key];
	        keyword = keyword.replace(/^\\s+|\\s+$/g,'');

	            if (keyword.length >= 3) 
                              {
		        validKeyword += 1;
		     }
	     }
			
                        if (validKeyword <= 0) 
                             {
		       alert('Your keywords used must contain at least 3 characters!\n\nPlease try again...');
		       return false;
		    } 
                              else 
                              {
		       return true;
		    }

      } 
      else 
      {
         alert('You must enter at least ONE keyword!\n\nPlease try again...');
          return false;
      }
}