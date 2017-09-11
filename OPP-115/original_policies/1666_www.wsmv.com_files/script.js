


// Global vars
var _mdBaseUrl = 'http://dub.wsmv.com';
var ptPlayerDivName = "watch-player";
var ptPlayerObjId = "";
var ptEnableDubs    = "";
var mdPlayerWidthOvr = "";
var mdPlayerHeightOvr = "";
var mdPlayerMarginTop = "";
var mdPlayerMarginLeft = "";

var mdVideoConfig;
var mdPluginObj = mdVideoConfig = {
    "videoId": "4101595",
    "videoTitle": "This Web Site’s Privacy Policy",
    "videoDescription": "",
    "videoUri": "s-18990",
    "videoCreatedAtDate": "Wed Dec 21 02:41:56 UTC 2011",
    "videoDubCount": "1",
    "partnerId": "28"
};

try
{   var _mdVideoOptions = {"comments_custom_css_link_color":"#005594","twitter_reader_default_text":"Be the first to Tweet.","sso_hide_remember_me":"1","sso_sign_up_url":"/global/link.asp?L=104054\u0026function=manageprofile\u0026mode=create","twitter_enabled":"0","facebook_enabled":"1","sso_cookie_plaintext":"sso_mobdub_clientinfo","comments_enabled":"1","comments_reader_read_rate":"25","comments_reader_scroll_animation":"900","sso_sign_out_url":"/global/link.asp?L=104054\u0026function=manageprofile\u0026mode=create","sso_sign_up_function":"WNMemberCenterManager.gotoLoginLink('create')","sso_forgot_password_url":"/global/PM/forgotpassword.aspx?Email=","dubs_enabled":"0","twitter_layout_enabled":"0","twitter_layout":"","dubs_display":"0","comments_custom_css_text_color":"#3C3940","comments_reader_min_scroll_time":"2000","twitter_user":"@WSMV","twitter_layout_border_color":"","facebook_layout":"tabbed","sso_sign_out_function":"WNMemberCenterManager.gotoLoginLink('logout')","comments_reader_default_text":"Be the first to comment","twitter_search_url":"http://search.twitter.com/search.json?q=@WSMV OR %link% OR %title%","comments_editor_default_text":"What do you think?","comments_terms_of_service":"Terms of Use: We welcome your participation in our community. Notify us of any inappropriate comments by clicking the \"Flag\" link. You must be at least 13 years of age to post comments. By submitting a comment, you agree to these \u003Cspan\u003E\u003Ca target='blank' class='md-text-link'  href='http://www.wsmv.com/story/18991/this-sites-terms-of-service'\u003ETerms of Service\u003C/a\u003E\u003C/span\u003E.","twitter_layout_caption":"","twitter_layout_height":"","facebook_layout_enabled":"tabbed","facebook_login_enabled":"1","sso_login_label":"Email Address","sso_authenticate_function":"PLATFORM.EventMan.triggerEvent('membercenterupdate')","twitter_layout_title":"","sso_cookie_screen_name":"{ \"primary\": \"FirstName\", \"secondary\": \"UserName\"}","twitter_search":"@WSMV OR %link% OR %title%","sso_sign_in_url":"/global/PM/Login.aspx?L=%REG_LINK_ID%\u0026function=manageprofile\u0026mode=login\u0026referrer=http%3a%2f%2fdub.worldnow.com%2ftest%2fsso.html\u0026referrerDomain=dub.worldnow.com","stacked_widgets_order":"","twitter_layout_title_color":"","comments_bitlyAPI_login":"mobdub"};
    _mdVideoOptions.video_id =  '4101595';
    _mdVideoOptions.video_uri =  's-18990';
    _mdVideoOptions.video_title = 'This Web Site’s Privacy Policy';
    _mdVideoOptions.video_link_url = 'http://www.wsmv.com/video?clipId=s-18990 ';
    _mdVideoOptions.video_screen_width = '';
    _mdVideoOptions.partner_name = 'WSMV';
    _mdVideoOptions.partner_id = '28';
    _mdVideoOptions.partner_url = 'http://www.wsmv.com';
    _mdVideoOptions.guest_allowed = false;
    _mdVideoOptions.sso_enabled = true;
    _mdVideoOptions.sso_cookie = 'sso_mobdub_userinfo';
    _mdVideoOptions.comments_type_id = '3';
    _mdVideoOptions.comments_per_page = '15';

    
        _mdVideoOptions.comments_layout = 'autogrow';
        _mdVideoOptions.comments_type = 'text';
    
}
catch (e) {}





// Clean up required fields
if (!_mdVideoOptions.comments_per_page)
{
    _mdVideoOptions.comments_per_page = 15;    
}

// Load article comments data
try
{
	if(md_config.comments_enabled && md_config.comments_enabled != "")
	{
		_mdVideoOptions.comments_enabled = md_config.comments_enabled;	
	}	
} 
catch(e) {}

_mdVideoOptions.partner_get_comments_url = 'http://dub.wsmv.com/refs/' + _mdVideoOptions.video_id + '/smilTexts/comments.json?per_page=' + _mdVideoOptions.comments_per_page;
if (_mdVideoOptions.comments_enabled != '0')
{
    mdLoadScript( _mdVideoOptions.partner_get_comments_url + '&callback=mdLoadTextComments&cache_key_partner=28', 'md-plugin', 'javascript' );
}

// Load settings
Mobdub.Comments.loadSettings(_mdVideoOptions);

function mdLoadTextComments( comments_data )
{
    try
    {
        Mobdub.Comments.loadTextComments(comments_data);
    }
    catch (e)
    {
        //
    }
}




