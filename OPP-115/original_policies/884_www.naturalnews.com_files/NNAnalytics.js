var var_URL, ArrURL, ArrFileName, ArticleID;

ArticleID = 0;
var_URL = window.location.href;
ArrURL = var_URL.split("/")

if (ArrURL.length > 0) {
    ArrFileName = ArrURL[3].split("_")

    if (ArrFileName.length > 0)
        ArticleID = ArrFileName[0];

}
if (IsNumber(ArticleID)) {
    if (var_URL.indexOf('.html')) {
        var_URL = var_URL.substring(0, var_URL.indexOf('.html') + 5);
    }
    var url = "NNAnalytics/Pages/NNAjax.asp?articleid=" + ArticleID;
    if (window.XMLHttpRequest) {
        http = new XMLHttpRequest()
    }
    // code for IE
    else if (window.ActiveXObject) {
        http = new ActiveXObject("Microsoft.XMLHTTP")
    }
    http.open("GET", url, true)
    http.send();
}
function IsNumber(strString) //  check for valid numeric strings	
{
    if (!/\D/.test(strString)) return true; //IF NUMBER
    else if (/^\d+\.\d+$/.test(strString)) return true; //IF A DECIMAL NUMBER HAVING AN INTEGER ON EITHER SIDE OF THE DOT(.)
    else return false;
}

    

