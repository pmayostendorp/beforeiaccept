var ANX_async_load_flag;
if (!ANX_async_load_flag) {
	ANX_async_load_flag = true;
	function AN_async_load(responses) {
		var u;
		if (!responses) {
			return;
		}
		for(var i = 0; i < responses.length; i++) {
			if (responses[i].tagtype === "iframe" || responses[i].tagtype === "javascript") {
				u = document.createElement("iframe");
			} else {
				u = document.createElement("img");
			}
			u.height = 1;
			u.width = 1;
			u.style.display = "none";
			u.src = responses[i].url;
			document.body.appendChild(u);
		}
	}
	(function() {
		function ANX_async_load_init() {
			var s = document.createElement("script");
			s.type = "application/javascript";
			s.async = true;
			s.src = ("https:" === document.location.protocol ? "https://secure" : "http://ib") + ".adnxs.com/async_usersync?cbfn=AN_async_load";
			var x = document.getElementsByTagName("script")[0];
			x.parentNode.insertBefore(s, x);
		}
		if (document.readyState === "complete") {
			ANX_async_load_init();
		} else if (window.attachEvent) {
			window.attachEvent("onload", ANX_async_load_init);
		} else if (window.addEventListener) {
			window.addEventListener("load", ANX_async_load_init, false);
		}
	})();
}
