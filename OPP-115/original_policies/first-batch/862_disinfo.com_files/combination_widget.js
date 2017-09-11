

function dsqComboTab(tab) {
	document.getElementById('dsq-combo-people').style.display = "none";
	document.getElementById('dsq-combo-popular').style.display = "none";
	document.getElementById('dsq-combo-recent').style.display = "none";
	document.getElementById('dsq-combo-tab-people').className = "dsq-combo-tab";
	document.getElementById('dsq-combo-tab-popular').className = "dsq-combo-tab";
	document.getElementById('dsq-combo-tab-recent').className = "dsq-combo-tab";

	document.getElementById('dsq-combo-' + tab).style.display = "block";
	document.getElementById('dsq-combo-tab-' + tab).className = "dsq-combo-tab dsq-active";
}

document.write(' \
<style type="text/css" media="screen">\
	 #dsq-combo-widget ul,\
	 #dsq-combo-widget li,\
	 #dsq-combo-widget ol,\
	 #dsq-combo-widget div,\
	 #dsq-combo-widget p,\
	 #dsq-combo-widget a,\
	 #dsq-combo-widget cite,\
	 #dsq-combo-widget img {\
	 border: 0;\
	 padding: 0;\
	 margin: 0;\
	 float: none;\
	 text-indent: 0;\
	 background: none;\
	 }\
	 #dsq-combo-widget ul,\
	 #dsq-combo-widget li,\
	 #dsq-combo-widget ol {\
	 list-style-type: none;\
	 list-style-image: none;\
	 background: none;\
	 display: block;\
	 }\
	 #dsq-combo-widget #dsq-combo-content ul,\
	 #dsq-combo-widget #dsq-combo-content li,\
	 #dsq-combo-widget #dsq-combo-content ol,\
	 #dsq-combo-widget #dsq-combo-content div,\
	 #dsq-combo-widget #dsq-combo-content p,\
	 #dsq-combo-widget #dsq-combo-content a,\
	 #dsq-combo-widget #dsq-combo-content cite,\
	 #dsq-combo-widget #dsq-combo-content img {\
	 border: 0;\
	 padding: 0;\
	 margin: 0;\
	 float: none;\
	 text-indent: 0;\
	 background: none;\
	 }\
	 #dsq-combo-widget #dsq-combo-content ul,\
	 #dsq-combo-widget #dsq-combo-content li,\
	 #dsq-combo-widget #dsq-combo-content ol {\
	 list-style-type: none;\
	 list-style-image: none;\
	 background: none;\
	 display: block;\
	 }\
	 .dsq-clearfix:after {\
	 content:".";\
	 display: block;\
	 height: 0;\
	 clear: both;\
	 visibility: hidden;\
	 }\
	 /* end reset */\
	 #dsq-combo-widget { ;\
	 text-align: left;\
	 }\
	 #dsq-combo-widget #dsq-combo-tabs {\
	 float: left;\
	 }\
	 #dsq-combo-widget #dsq-combo-content {\
	 position: static;\
	 }\
	 #dsq-combo-widget #dsq-combo-content h3 {\
	 float: none;\
	 text-indent: 0;\
	 background: none;\
	 padding: 0;\
	 border: 0;\
	 margin: 0 0 10px 0;\
	 font-size: 16px;\
	 }\
	 #dsq-combo-widget #dsq-combo-tabs li {\
	 display: inline;\
	 float: left;\
	 margin-right: 2px;\
	 padding: 0px 5px;\
	 text-transform: uppercase;\
	 }\
	 #dsq-combo-widget #dsq-combo-tabs li a {\
	 text-decoration: none;\
	 font-weight: bold;\
	 font-size: 10px;\
	 }\
	 #dsq-combo-widget #dsq-combo-content .dsq-combo-box {\
	 margin: 0 0 20px;\
	 padding: 12px;\
	 clear: both;\
	 }\
	 #dsq-combo-widget #dsq-combo-content .dsq-combo-box li {\
	 padding-bottom: 10px;\
	 margin-bottom: 10px;\
	 overflow: hidden;\
	 word-wrap: break-word;\
	 }\
	 #dsq-combo-widget #dsq-combo-content .dsq-combo-avatar {\
	 float: left;\
	 height: 48px;\
	 width: 48px;\
	 margin-right: 15px;\
	 }\
	 #dsq-combo-widget #dsq-combo-content .dsq-combo-box cite {\
	 font-weight: bold;\
	 font-size: 14px;\
	 }\
	 span.dsq-widget-clout {\
	 background-color:#FF7300;\
	 color:#FFFFFF;\
	 padding:0pt 2px;\
	 }\
	 #dsq-combo-logo { text-align: right; }\
	 /* Blue */\
	 #dsq-combo-widget.blue #dsq-combo-tabs li.dsq-active { background: #E1F3FC; }\
	 #dsq-combo-widget.blue #dsq-combo-content .dsq-combo-box { background: #E1F3FC; }\
	 #dsq-combo-widget.blue #dsq-combo-tabs li { background: #B5E2FD; }\
	 #dsq-combo-widget.blue #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #B5E2FD; }\
	 /* Grey */\
	 #dsq-combo-widget.grey #dsq-combo-tabs li.dsq-active { background: #f0f0f0; }\
	 #dsq-combo-widget.grey #dsq-combo-content .dsq-combo-box { background: #f0f0f0; }\
	 #dsq-combo-widget.grey #dsq-combo-tabs li { background: #ccc; }\
	 #dsq-combo-widget.grey #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #ccc; }\
	 /* Green */\
	 #dsq-combo-widget.green #dsq-combo-tabs li.dsq-active { background: #f4ffea; }\
	 #dsq-combo-widget.green #dsq-combo-content .dsq-combo-box { background: #f4ffea; }\
	 #dsq-combo-widget.green #dsq-combo-tabs li { background: #d7edce; }\
	 #dsq-combo-widget.green #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #d7edce; }\
	 /* Red */\
	 #dsq-combo-widget.red #dsq-combo-tabs li.dsq-active { background: #fad8d8; }\
	 #dsq-combo-widget.red #dsq-combo-content .dsq-combo-box { background: #fad8d8; }\
	 #dsq-combo-widget.red #dsq-combo-tabs li { background: #fdb5b5; }\
	 #dsq-combo-widget.red #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #fdb5b5; }\
	 /* Orange */\
	 #dsq-combo-widget.orange #dsq-combo-tabs li.dsq-active { background: #fae6d8; }\
	 #dsq-combo-widget.orange #dsq-combo-content .dsq-combo-box { background: #fae6d8; }\
	 #dsq-combo-widget.orange #dsq-combo-tabs li { background: #fddfb5; }\
	 #dsq-combo-widget.orange #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #fddfb5; }\
	 </style>\
	 <div id="dsq-combo-widget" class="grey">\
	 <ul id="dsq-combo-tabs">\
	 <li id="dsq-combo-tab-people" ><a href="#" onclick="dsqComboTab(\'people\'); return false">People</a></li>\
	 <li id="dsq-combo-tab-recent" ><a href="#" onclick="dsqComboTab(\'recent\'); return false">Recent</a></li>\
	 <li id="dsq-combo-tab-popular" class="dsq-active"><a href="#" onclick="dsqComboTab(\'popular\'); return false">Popular</a></li>\
	 </ul>\
	 <div id="dsq-combo-content">\
	 <div id="dsq-combo-people" class="dsq-combo-box" style="display:none">\
	 <h3>Top Commenters</h3>\
	 <ul>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/BuzzCoastin/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/385/8168/avatar92.jpg?1408763038">\
	 </a>\
	 <cite><a href="https://disqus.com/by/BuzzCoastin/">BuzzCoastin</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;9036 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/echar/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/3395/6517/avatar92.jpg?1406839250">\
	 </a>\
	 <cite><a href="https://disqus.com/by/echar/">Echar Lailoken</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;6406 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/Wanooski/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/1738/9378/avatar92.jpg?1431733261">\
	 </a>\
	 <cite><a href="https://disqus.com/by/Wanooski/">Anarchy Pony</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;5487 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/Jin_The_Ninja/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/1375/4255/avatar92.jpg?1342337527">\
	 </a>\
	 <cite><a href="https://disqus.com/by/Jin_The_Ninja/">Jin The Ninja</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;5099 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_qmcvukjF4e/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/3882/2995/avatar92.jpg?1427654832">\
	 </a>\
	 <cite><a href="https://disqus.com/by/disqus_qmcvukjF4e/">Andrew</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;4575 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/Hadrian999/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/206/6023/avatar92.jpg?1267474565">\
	 </a>\
	 <cite><a href="https://disqus.com/by/Hadrian999/">Hadrian999</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;3300 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/Liam_McGonagle/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/451/2296/avatar92.jpg?1383754798">\
	 </a>\
	 <cite><a href="https://disqus.com/by/Liam_McGonagle/">Liam_McGonagle</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;3261 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/InfvoCuernos/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/3020/7649/avatar92.jpg?1352526143">\
	 </a>\
	 <cite><a href="https://disqus.com/by/InfvoCuernos/">InfvoCuernos</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;3102 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/ChaorderGradient/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/541/6619/avatar92.jpg?1353386138">\
	 </a>\
	 <cite><a href="https://disqus.com/by/ChaorderGradient/">Chaorder Gradient</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;2802 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/kowalityjesus/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/2808/4103/avatar92.jpg?1404009445">\
	 </a>\
	 <cite><a href="https://disqus.com/by/kowalityjesus/">kowalityjesus</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;2704 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/adamgoodwin/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/5474/8523/avatar92.jpg?1417015606">\
	 </a>\
	 <cite><a href="https://disqus.com/by/adamgoodwin/">Rhoid Rager</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;2400 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/voxmagi/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/72/2058/avatar92.jpg?1289160381">\
	 </a>\
	 <cite><a href="https://disqus.com/by/voxmagi/">VoxMagi</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;2337 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/ted_heistman/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/3966/6673/avatar92.jpg?1403198699">\
	 </a>\
	 <cite><a href="https://disqus.com/by/ted_heistman/">Ted Heistman</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;2311 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_XY0TOlwFgm/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/4254/2726/avatar92.jpg?1397584964">\
	 </a>\
	 <cite><a href="https://disqus.com/by/disqus_XY0TOlwFgm/">Juan</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;2252 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/simonvalentine/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/5884/5871/avatar92.jpg?1434662014">\
	 </a>\
	 <cite><a href="https://disqus.com/by/simonvalentine/">Simon Valentine</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;2051 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/Emperor_Reagan/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/88/8188/avatar92.jpg?1435852885">\
	 </a>\
	 <cite><a href="https://disqus.com/by/Emperor_Reagan/">emperorreagan</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;2025 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/tunaghost/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/209/9213/avatar92.jpg?1399079511">\
	 </a>\
	 <cite><a href="https://disqus.com/by/tunaghost/">Tuna Ghost</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;1983 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/hpmclovincraft/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/6182/1651/avatar92.jpg?1434127912">\
	 </a>\
	 <cite><a href="https://disqus.com/by/hpmclovincraft/">HP McLovincraft</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;1733 posts</div>\
	 </li>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="http://disqus.com"><img src="//a.disquscdn.com/1435694139/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 <div id="dsq-combo-recent" class="dsq-combo-box" style="display:none">\
	 <h3>Recent Comments</h3>\
	 <ul>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/ericmcoo/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/6547/0/avatar92.jpg?1422479250"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/ericmcoo/">Eric Mcoo</a>\
	 <span class="dsq-widget-comment"><p>This World - Don\'t Panic: The Truth About Population (BBC Documentary) Professor Hans Rosling presents a spectacular portrait of our rapidly changing world. With seven billion people already on our...</p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/?p=139501">The Future of Facebook is Telepathy</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/?p=139501#comment-2113061434">3 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/ericmcoo/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/6547/0/avatar92.jpg?1422479250"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/ericmcoo/">Eric Mcoo</a>\
	 <span class="dsq-widget-comment"><p>It\'s the same in Britain. The world has been massively dumbed down. I suspect there may be a very simple reason for it. Poor people have more children. So every generation has a higher percentage...</p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/?p=139501">The Future of Facebook is Telepathy</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/?p=139501#comment-2113060232">4 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/izzyizzo/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/1522/8821/avatar92.jpg?1435031027"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/izzyizzo/">izzyizzo</a>\
	 <span class="dsq-widget-comment"><p>Mork from Ork.  <i>Q.E.D.</i></p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/2015/07/forget-little-green-men-aliens-will-look-like-humans/">Forget Little Green Men – Aliens Will Look Like Humans</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/2015/07/forget-little-green-men-aliens-will-look-like-humans/#comment-2113057483">6 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/Number1Framer/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/9978/2095/avatar92.jpg?1434254481"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/Number1Framer/">Number1Framer</a>\
	 <span class="dsq-widget-comment"><p>If I\'m not mistaken, I believe part of Texas\'s history includes being a part of Mexico. Where\'s the Mexican flag over the statehouse in Austin? </p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/?p=139524">Confronting Southern ‘Victimhood’</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/?p=139524#comment-2113054739">7 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/Wanooski/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/1738/9378/avatar92.jpg?1431733261"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/Wanooski/">Anarchy Pony</a>\
	 <span class="dsq-widget-comment"><p>Yes but in TNG they found that an ancient advanced species did some tinkering with the early life on a wide range of planets in order to make the evolution of sapience far more common.</p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/2015/07/forget-little-green-men-aliens-will-look-like-humans/">Forget Little Green Men – Aliens Will Look Like Humans</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/2015/07/forget-little-green-men-aliens-will-look-like-humans/#comment-2113049694">9 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/rfvictor/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/6265/4934/avatar92.jpg?1435859819"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/rfvictor/">RF Victor</a>\
	 <span class="dsq-widget-comment"><p>So... Star Trek got it right!</p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/2015/07/forget-little-green-men-aliens-will-look-like-humans/">Forget Little Green Men – Aliens Will Look Like Humans</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/2015/07/forget-little-green-men-aliens-will-look-like-humans/#comment-2113042917">13 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/Number1Framer/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/9978/2095/avatar92.jpg?1434254481"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/Number1Framer/">Number1Framer</a>\
	 <span class="dsq-widget-comment"><p>I applied for the blunt artist opening but failed the piss test...</p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/2015/07/the-dopest-blunts-ever/">The Dopest Blunts Ever</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/2015/07/the-dopest-blunts-ever/#comment-2113037566">16 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/sgtdoom/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/forums/18/3669/avatar92.jpg?1427745295"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/sgtdoom/">sgtdoom</a>\
	 <span class="dsq-widget-comment"><p><i>I can\'t believe I actually agree with Mark Zuckerberg.</i><br>The part where he\'s sticking his tongue out obscenely?<br>Or the part where he supports Chris Christie?</p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/?p=139501">The Future of Facebook is Telepathy</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/?p=139501#comment-2113037526">16 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/sgtdoom/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/forums/18/3669/avatar92.jpg?1427745295"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/sgtdoom/">sgtdoom</a>\
	 <span class="dsq-widget-comment"><p>Really, is telepathy even required today? I used to think most people weren\'t retarded prior to the introduction of cell phones, but in overhearing far too many coversations (and they are usually...</p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/?p=139501">The Future of Facebook is Telepathy</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/?p=139501#comment-2113035677">17 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/sgtdoom/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/forums/18/3669/avatar92.jpg?1427745295"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/sgtdoom/">sgtdoom</a>\
	 <span class="dsq-widget-comment"><p>Normally, I would inquire as to why Zuckerberg is sticking out his tongue in such an obscene manner, but I recently found out that he\'s a big Chris Christie supporter. Question asked and answered,...</p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/?p=139501">The Future of Facebook is Telepathy</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/?p=139501#comment-2113032687">18 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/little_dixie/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/16387/9253/avatar92.jpg?1435859367"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/little_dixie/">Little Dixie</a>\
	 <span class="dsq-widget-comment"><p>Good one.</p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/?p=139524">Confronting Southern ‘Victimhood’</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/?p=139524#comment-2113028707">20 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/hpmclovincraft/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/6182/1651/avatar92.jpg?1434127912"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/hpmclovincraft/">HP McLovincraft</a>\
	 <span class="dsq-widget-comment"><p>what a stupid point of view.</p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/?p=139524">Confronting Southern ‘Victimhood’</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/?p=139524#comment-2113026216">22 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/little_dixie/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/16387/9253/avatar92.jpg?1435859367"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/little_dixie/">Little Dixie</a>\
	 <span class="dsq-widget-comment"><p>Throwing out notions of good and bad there\'s still the fact that for an american to choose to fly the confederate flag is for that person to choose to fly the flag of a defeated, destroyed enemy...</p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/?p=139524">Confronting Southern ‘Victimhood’</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/?p=139524#comment-2112992548">28 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/cgntvdssdnt/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/4204/6627/avatar92.jpg?1435858855"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/cgntvdssdnt/">CgntvDssdnt</a>\
	 <span class="dsq-widget-comment"><p>I need the glasses!</p><p>I NEED THE GLASSES!!!</p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/2015/04/hal-hefners-live-inspired-consume-series/">Hal Hefner&#8217;s &#8220;They Live&#8221; Inspired &#8220;Consume&#8221; Series</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/2015/04/hal-hefners-live-inspired-consume-series/#comment-2112990087">29 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/hpmclovincraft/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/6182/1651/avatar92.jpg?1434127912"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/hpmclovincraft/">HP McLovincraft</a>\
	 <span class="dsq-widget-comment"><p>I likes me some Blondie. Lou not so much.</p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/?p=139524">Confronting Southern ‘Victimhood’</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/?p=139524#comment-2112984742">30 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/Wanooski/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/1738/9378/avatar92.jpg?1431733261"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/Wanooski/">Anarchy Pony</a>\
	 <span class="dsq-widget-comment"><p>Evolutionarily, the grays are already (if we are taking it seriously) quite similar. Bipedal, two arms with long dextrose hands and fingers, basic bilateral symmetry. Also, some have theorized that...</p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/2015/07/forget-little-green-men-aliens-will-look-like-humans/">Forget Little Green Men – Aliens Will Look Like Humans</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/2015/07/forget-little-green-men-aliens-will-look-like-humans/#comment-2112968476">33 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/ericmcoo/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/6547/0/avatar92.jpg?1422479250"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/ericmcoo/">Eric Mcoo</a>\
	 <span class="dsq-widget-comment"><p>I have a negative attitude to American politics because it impacts the whole world. Still love Debbie Harry and Lou Reed (RIP). I read British books about America for obvious reasons. No mythology....</p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/?p=139524">Confronting Southern ‘Victimhood’</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/?p=139524#comment-2112955112">36 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/hpmclovincraft/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/6182/1651/avatar92.jpg?1434127912"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/hpmclovincraft/">HP McLovincraft</a>\
	 <span class="dsq-widget-comment"><p>I don\'t see color. that\'s how special I am.</p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/?p=139523">The Hazards of Being a Man Who Writes About Men and Masculinity</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/?p=139523#comment-2112940276">38 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/echar/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/3395/6517/avatar92.jpg?1406839250"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/echar/">Echar Lailoken</a>\
	 <span class="dsq-widget-comment"><p>Below these words is a picture of the unique-iest specialist of special ultra uber snow flakes. It\'s in the center of the square. Can you see it?</p><p><a href="http://i.imgur.com/rGTok6i.jpg" rel="nofollow">http://i.imgur.com/rGTok6i.jpg</a></p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/?p=139523">The Hazards of Being a Man Who Writes About Men and Masculinity</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/?p=139523#comment-2112933497">39 minutes ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/hpmclovincraft/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/6182/1651/avatar92.jpg?1434127912"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/hpmclovincraft/">HP McLovincraft</a>\
	 <span class="dsq-widget-comment"><p>I was doing my Social Justice Warrior impersonation.</p><p>everything is problematic.</p></span>\
	 <p class="dsq-widget-meta"><a href="http://disinfo.com/?p=139524">Confronting Southern ‘Victimhood’</a>&nbsp;&middot;&nbsp;<a href="http://disinfo.com/?p=139524#comment-2112923680">42 minutes ago</a></p>\
	 </li>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="http://disqus.com"><img src="//a.disquscdn.com/1435694139/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 <div id="dsq-combo-popular" class="dsq-combo-box" >\
	 <h3>Most Discussed</h3>\
	 <ul>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/?p=139524">Confronting Southern ‘Victimhood’</a>\
	 <p class="dsq-widget-meta">61 comments &middot; 7 minutes ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/?p=139523">The Hazards of Being a Man Who Writes About Men and Masculinity</a>\
	 <p class="dsq-widget-meta">8 comments &middot; 38 minutes ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/?p=139484">Conspiracy or Coincidence? Gmail version</a>\
	 <p class="dsq-widget-meta">77 comments &middot; 21 hours ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/2015/07/forget-little-green-men-aliens-will-look-like-humans/">Forget Little Green Men – Aliens Will Look Like Humans</a>\
	 <p class="dsq-widget-meta">6 comments &middot; 6 minutes ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/?p=139560">Getting Down with Damh the Bard</a>\
	 <p class="dsq-widget-meta">1 comment &middot; 1 hour ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/?p=139553">Historian of Hippies, Yoga, and Vegetarianism in Interview</a>\
	 <p class="dsq-widget-meta">1 comment &middot; 1 hour ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/2015/06/racism-sexism-viewed-aristotelian-virtues/">Racism and Sexism Viewed as Aristotelian Virtues</a>\
	 <p class="dsq-widget-meta">838 comments &middot; 1 week ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/?p=139501">The Future of Facebook is Telepathy</a>\
	 <p class="dsq-widget-meta">19 comments &middot; 3 minutes ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/2015/06/the-poor-the-young-the-black-and-the-stupid-inside-big-tobaccos-plans-to-kill-a-billion-people/">&#8220;The poor, the young, the black and the stupid&#8221;: Inside Big Tobacco&#8217;s plans to kill a billion people</a>\
	 <p class="dsq-widget-meta">20 comments &middot; 20 hours ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/2015/07/colonial-americans-drank-roughly-three-times-as-much-as-americans-do-now/">Colonial Americans Drank Roughly Three Times as Much as Americans Do Now</a>\
	 <p class="dsq-widget-meta">12 comments &middot; 9 hours ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/2015/06/some-physicists-believe-were-living-in-a-giant-hologram-and-its-not-that-far-fetched/">Some physicists believe we&#8217;re living in a giant hologram — and it&#8217;s not that far-fetched</a>\
	 <p class="dsq-widget-meta">34 comments &middot; 15 hours ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/2015/06/why-meditation-should-be-taught-in-schools/">Why meditation should be taught in schools</a>\
	 <p class="dsq-widget-meta">17 comments &middot; 18 hours ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/2015/06/worlds-persecuted-religion/">World&#8217;s Most Persecuted Religion</a>\
	 <p class="dsq-widget-meta">51 comments &middot; 47 minutes ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/2015/07/the-dopest-blunts-ever/">The Dopest Blunts Ever</a>\
	 <p class="dsq-widget-meta">5 comments &middot; 16 minutes ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/2015/07/the-surprisingly-imperfect-science-of-dna-testing/">The Surprisingly Imperfect Science of DNA Testing</a>\
	 <p class="dsq-widget-meta">1 comment &middot; 4 hours ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/2015/06/why-are-beggars-despised-by-george-orwell/">Why Are Beggars Despised? by George Orwell</a>\
	 <p class="dsq-widget-meta">26 comments &middot; 18 hours ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/2015/06/its-time-for-us-to-have-a-modern-post-confederate-constitution/">It’s Time for Us to Have a Modern (post-Confederate) Constitution</a>\
	 <p class="dsq-widget-meta">21 comments &middot; 1 day ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/?p=139534">Black Metal Presidential Logos are totally, um, Metal!</a>\
	 <p class="dsq-widget-meta">5 comments &middot; 17 hours ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/?p=139525">Magic and Politics</a>\
	 <p class="dsq-widget-meta">4 comments &middot; 15 hours ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://disinfo.com/2015/06/self-centeredness-anti-intellectualism-what-is-killing-america/">Self-centeredness, Anti-intellectualism — What is Killing America?</a>\
	 <p class="dsq-widget-meta">96 comments &middot; 5 days ago</p>\
	 </li>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="http://disqus.com"><img src="//a.disquscdn.com/1435694139/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 </div>\
	 </div>\
');
