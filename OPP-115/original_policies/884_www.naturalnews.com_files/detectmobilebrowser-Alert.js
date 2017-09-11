var MobisiteRedirectMsg = "Do you want to redirect to the NaturalNews mobile site?";
var MobisiteRedirectURL = "http://m.naturalnews.com";
(
function(a,b){
if(/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))
)
{
    
        
        // default url to redirect
        var redirecturl;

        // code for live url
        var tempurl = document.URL;
        
        // code for live site 
        var patt1 = /(http\:\/\/www.|http\:\/\/)naturalnews.com\/\d{6,}\_/gi;
        var patt11 = /(www.)*naturalnews.com/gi;
        
        //alert(tempurl.match(patt11));
        // code for testing site 
        //var patt1 = /testing.naturalnews.com\/\d{6,}\_/gi;
        //var patt11 = /testing.naturalnews.com/gi;

        var patt2 = /buzz.naturalnews.com\/\d{6,}\_/gi;
        var patt22 = /buzz.naturalnews.com/gi;
        var patt3 = /tv.naturalnews.com\/v.asp\?v\=/gi;
        var Arr1 = tempurl.match(patt1);
        var Arr2 = tempurl.match(patt2);
        var Arr3 = tempurl.match(patt3);        
        
        if(Arr1 != null && Arr1.length > 0)
        {
            redirecturl = tempurl.replace(patt11,"m.naturalnews.com/news");
        }        
        if(Arr2 != null && Arr2.length > 0)
        {
            redirecturl = tempurl.replace(patt22,"m.naturalnews.com/buzz");            
        }        
        if( Arr3 != null && Arr3.length > 0)
        {
            redirecturl = tempurl.replace(patt3,"m.naturalnews.com/video/video_detail_");
            redirecturl = redirecturl + ".html";            
        }
        if(tempurl == "http://www.naturalnews.com/readerregistration.html" || tempurl == "http://naturalnews.com/readerregistration.html")
        {
            redirecturl = "http://m.naturalnews.com/readerregistration.html";
        }
        if(tempurl == "http://www.naturalnews.com/readerregistration.html#Included" || tempurl == "http://naturalnews.com/readerregistration.html#Included")
        {
            redirecturl = "http://m.naturalnews.com/what_included.html";
        }
        if(tempurl == "http://www.naturalnews.com/readerregistration.html#Message" || tempurl == "http://naturalnews.com/readerregistration.html#Message")
        {
            redirecturl = "http://m.naturalnews.com/messagefromeditor.html";
        }
        if(tempurl == "http://www.naturalnews.com/AmazingFoodFactMachine.asp" || tempurl == "http://naturalnews.com/AmazingFoodFactMachine.asp" || tempurl == "http://www.naturalnews.com/AmazingFoodFactMachine.asp?ShowIntro=False" || tempurl == "http://naturalnews.com/AmazingFoodFactMachine.asp?ShowIntro=False")
        {
            redirecturl = "http://m.naturalnews.com/foodfactmachine.html";
        }
        if(tempurl == "http://www.naturalnews.com/disease-mongering-engine.asp" || tempurl == "http://naturalnews.com/disease-mongering-engine.asp" || tempurl == "http://www.naturalnews.com/disease-mongering-engine.asp?generate=roll-me-a-new-disease" || tempurl == "http://naturalnews.com/disease-mongering-engine.asp?generate=roll-me-a-new-disease")
        {
            redirecturl = "http://m.naturalnews.com/disease-mongering-engine.html";
        }
        if(tempurl == "http://www.naturalnews.com/newstips/NewsTips.asp" || tempurl == "http://naturalnews.com/newstips/NewsTips.asp")
        {
            redirecturl = "http://m.naturalnews.com/sendatip.html";
        }

        if(tempurl == "http://www.naturalnews.com/" || tempurl == "http://www.naturalnews.com/index.html" || tempurl == "http://www.naturalnews.com" || tempurl == "http://naturalnews.com/" || tempurl == "http://naturalnews.com" || tempurl == "http://naturalnews.com/index.html" )
        {
            redirecturl = "http://m.naturalnews.com";
        }

        if(redirecturl != null && redirecturl != "")
        {
            var nnmobi = getCookie("nnmobi");
            if(nnmobi != null && nnmobi != "")
            {
                if(nnmobi == "true")
                {
                    window.location = redirecturl;
                }else
                {
                    return false;
                }
            }
            else
            {
                if(confirm(MobisiteRedirectMsg))
                {
                    setCookie("nnmobi","true",365);
                    window.location = redirecturl;
                }
                else
                {
                    setCookie("nnmobi","false",365);
                    return false;
                }
            }
        }                
        return false;
}
}
)(navigator.userAgent||navigator.vendor||window.opera,MobisiteRedirectURL);

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}