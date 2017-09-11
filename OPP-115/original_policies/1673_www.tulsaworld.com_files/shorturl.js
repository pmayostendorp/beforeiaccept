$(window).load(function() {
    $("div.blox-social-item.blox-twitter-share > a").each(function() {
        var url = $(this).attr('tw:url');
        var src = $(this);
        related = $(this).attr("tw:related");
        txt = $(this).attr("tw:text");
        
        src.click(function(e) {
            e.preventDefault();
            bit_url(url,src);
        });
        
        function bit_url(url,src) {
            var username = "tulsaworld";
            var key = "R_10754ae1654b03bf50b55b0237ea2a70";
            $.ajax({
                url: "http://api.bit.ly/v3/shorten",
                data: {longUrl: url, apiKey: key, login: username},
                dataType: "jsonp",
                async: false,
                success: function(v) {
                    var bit_url = v.data.url;
                    if (typeof bit_url == 'undefined' || bit_url == null || bit_url == '') {
                        tryGoogle(url,src);
                    }
                    else {
                        src.attr("tw:url", bit_url);
                        src.attr("tw:counturl", bit_url);
                        window.open("https://twitter.com/intent/tweet?original_referer=" + url + "&related=" + related + "&text=" + txt + "&tw_p=tweetbutton&url=" + bit_url,"","height=300,width=500,top=25,left=25");
                    }
                },
                error: function(xhr) {
                    tryGoogle(url, src);
                }
            });
        
            function tryGoogle(url,src) {
                gapi.client.setApiKey('AIzaSyDV5_Ca9cEVSFaiLkyzGIcDcbnV_4CiA0o');
                gapi.client.load('urlshortener', 'v1', function () {
                    var request = gapi.client.urlshortener.url.insert({
                        'resource': {
                                'longUrl': url
                        }
                    });
                    request.execute(function (response) {
                        if (response.id != null) {
                            var bit_url = response.id;
                            src.attr("tw:url", bit_url);
                            src.attr("tw:counturl", bit_url);
                            window.open("https://twitter.com/intent/tweet?original_referer=" + url + "&related=" + related + "&text=" + txt + "&tw_p=tweetbutton&url=" + bit_url,"","height=300,width=500,top=25,left=25");
                        }
                        else {
                            src.attr("tw:url", url);
                            src.attr("tw:counturl", url);
                            window.open("https://twitter.com/intent/tweet?original_referer=" + url + "&related=" + related + "&text=" + txt + "&tw_p=tweetbutton&url=" + url,"","height=300,width=500,top=25,left=25");
                        }
                    });
                });
            }
        }
    });
});