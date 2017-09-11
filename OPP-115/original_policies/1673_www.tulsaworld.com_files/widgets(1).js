var strSubDomain = 'affiliates';
function CreateEmailSignupWidget(WidgetConfig)
{   
    var objContainerDiv = document.getElementById(WidgetConfig.DivID);
    var objIFrameDiv = document.createElement('DIV');
    var strAllowTransparency = WidgetConfig.AllowTransparency;
    if (strAllowTransparency != undefined && strAllowTransparency.toLowerCase() == 'true')
    {
        strAllowTransparency = 'allowtransparency="allowtransparency"';
    }
    else
    {
        strAllowTransparency = '';
    }
    var strSRC = ('https://' + strSubDomain + '.eblastengine.com/Widgets/EmailSignup.aspx?wcguid=' + WidgetConfig.ConfigurationGUID + '&height=' + WidgetConfig.Height + '&width=' + WidgetConfig.Width);
    objIFrameDiv.innerHTML = ('<iframe src="' + strSRC + '" style="width:' + WidgetConfig.Width + 'px;height:' + WidgetConfig.Height + 'px;" ' +
                              'frameborder="0" vspace="0" hspace="0" marginwidth="0" marginheight="0" scrolling="' + WidgetConfig.Scroll + '" ' + strAllowTransparency +'></iframe>');
    if (objContainerDiv)
    {
	    objContainerDiv.appendChild(objIFrameDiv);
    }
    else
    {
	    return objIFrameDiv;
    }
}
function CreateEBlastIntegrationWidget(WidgetConfig)
{   
    var objContainerDiv = document.getElementById(WidgetConfig.DivID);
    var objIFrameDiv = document.createElement('DIV');
    var strSRC;
    var strDomain;
    var strUseNewAffiliateDesign = 'False';
    if (WidgetConfig.UseNewAffiliateDesign == true)
    {
        strUseNewAffiliateDesign = 'True'
    }
    if (WidgetConfig.SourceProductID == 5)
    {
        if (strSubDomain == 'dev')
        {
            strDomain = '//eblastenginedev.upickem.net';
        }
        else
        {
            strDomain = '//eblastengine.upickem.net';
        }
        strSRC = (strDomain + '/Login.aspx?LoginByGUID=1&aguid=' + WidgetConfig.AffiliateGUID + '&cid=' + WidgetConfig.ContestID + '&spid=' + WidgetConfig.SourceProductID +
                  '&Page=' + WidgetConfig.Page + '&UseNewAffiliateDesign=' + strUseNewAffiliateDesign)
    }
    objIFrameDiv.innerHTML = ('<iframe src="' + strSRC + '" style="width:' + WidgetConfig.Width + 'px;height:' + WidgetConfig.Height + 'px;" ' +
                              'frameborder="0" vspace="0" hspace="0" marginwidth="0" marginheight="0" scrolling="' + WidgetConfig.Scroll + '"></iframe>');
    if (objContainerDiv)
    {
	    objContainerDiv.appendChild(objIFrameDiv);
    }
    else
    {
	    return objIFrameDiv;
    }
}