/*
document.write('<script type="text/javascript">
setTimeout(function(){var a=document.createElement("script");
var b=document.getElementsByTagName("script")[0];
a.src=document.location.protocol+"//dnn506yrbagrg.cloudfront.net/pages/scripts/0018/6980.js?"+Math.floor(new Date().getTime()/3600000);
a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)}, 1);
</script>');
*/

CSWxManager.setOption('defaultHandler', 'wsi');
CSWxManager.loadConfig([
	{station: '37202', name: 'Nashville'},
	{station: '37042', name: 'Clarksville'},
	{station: '38572', name: 'Crossville'}
]);

Worldnow.EventMan.event('WNMenuCol1done', function() {
	csSocialLinks();
	csRebuildMember();
});

function csSocialLinks() {
	$wn('#WNContainerMemberSearch-headertop').append(
						'<div id="csSocial">' +
							'<span>Connect: </span>' +
							'<a href="/category/209615/news-team" id="facebook"></a>'	+	
							'<a href="/category/209615/news-team" id="twitter"></a>'	+	
							'<a href="https://plus.google.com/117143042785436999262/posts" id="google" target="blank"></a>' +
							'<a href="/category/213264/4-news-now" id="mobile"></a>'	+	
							'<div class="wnClear></div>' +
						'</div>'
					);
}

function csRebuildMember() {
	$wn("#WNHeader .wnMemberCenter strong").text("Newsletters + Alerts:");
	
	// cache selectors
	var $csMem1 = $wn("#WNHeader .wnMemberCenter li.wnMemberOption-accountCreate a");
	var $csMem2 = $wn("#WNHeader .wnMemberCenter li.wnMemberOption-logIn a");
	
	$wn($csMem1).text("E-mail");
	$wn($csMem1).attr("href", "/category/218135/direct-email-sign-up");
	$wn($csMem2).text('Text');
	$wn($csMem2).attr("href", "http://my.textcaster.com/asa/Default.aspx?ID=21fd0e35-633f-45be-aed1-96aa8e8c2014");
	$wn($csMem2).attr("target","_blank");
}