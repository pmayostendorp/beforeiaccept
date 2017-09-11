if (typeof(COMMON_JS) == 'undefined') { // Run once
    var COMMON_JS = true;

	function refresh_banners(){    
       
	   googletag.pubads().refresh();

	   /*
		$(".refreshbanner").each(function(index,value){
            google_id = $(this).children().attr("id");
            defined_google_id = $("#"+google_id);
            bannerhtml = defined_google_id.html();
            defined_google_id.children('div').remove();
            defined_google_id.children('iframe').remove();
            defined_google_id.append(bannerhtml);
        });
		*/
    }
    function trim(s)
    {
        var t = "";
        var from_pos = to_pos = 0;

        for (i=0; i<s.length; i++)
        {
            if (s.charAt(i) == ' ')
                continue;
            else 
            {
                from_pos = i;
                break;
            }
        }

        for (i=s.length; i>=0; i--)
        {
            if (s.charAt(i-1) == ' ')
                continue;
            else 
            {
                to_pos = i;
                break;
            }
        }	

        t = s.substring(from_pos, to_pos);
        //				alert(from_pos + ',' + to_pos + ',' + t+'.');
        return t;
    }

	function checkFrm() {

		zsfCode = $('#wr_key').val();
		zsfCode = $.trim(zsfCode);

		if (!zsfCode) {
			$('#wr_key').focus();
			return false;
		}

		url = '/home/plugin/captcha/check.php';
		send = 'code='+zsfCode;
		
		$.ajax({
			type: 'GET',
			url: url,
			data: send,
			cache: false,
			async: false,
			success: function(result) {
				if (result < 1) {
					check_value = false;
				} else {
					check_value = true;
				}
			}

		});
		return check_value;

	}

    // javascript number_format
    function number_format(data) 
    {
        
        var tmp = '';
        var number = '';
        var cutlen = 3;
        var comma = ',';
        var i;
       
        len = data.length;
        mod = (len % cutlen);
        k = cutlen - mod;
        for (i=0; i<data.length; i++) 
        {
            number = number + data.charAt(i);
            
            if (i < data.length - 1) 
            {
                k++;
                if ((k % cutlen) == 0) 
                {
                    number = number + comma;
                    k = 0;
                }
            }
        }

        return number;
    }

    // new window
    function popup_window(url, winname, opt)
    {
        window.open(url, winname, opt);
    }



    // delete posts
    function del(href) 
    {
        if(confirm("You cannot recover the material that has been deleted.\n\nDo you still want to delete?")) {
           document.location.href = encodeURI(href);
        }
    }

    // set cookie
    function set_cookie(name, value, expirehours, domain) 
    {
        var today = new Date();
        today.setTime(today.getTime() + (60*60*1000*expirehours));
        var cook = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
        if (domain) 
            cook += "domain=" + domain + ";";
        document.cookie = cook;

    }

    // get cookie
    function get_cookie(name) 
    {
        var find_sw = false;
        var start, end;
        var i = 0;

        for (i=0; i<= document.cookie.length; i++)
        {
            start = i;
            end = start + name.length;

            if(document.cookie.substring(start, end) == name) 
            {
                find_sw = true
                break
            }
        }

        if (find_sw == true) 
        {
            start = end + 1;
            end = document.cookie.indexOf(";", start);

            if(end < start)
                end = document.cookie.length;

            return document.cookie.substring(start, end);
        }
        return "";
    }

    // delete cookie
    function delete_cookie(name) 
    {
        var today = new Date();

        today.setTime(today.getTime() - 1);
        var value = get_cookie(name);
        if(value != "")
            document.cookie = name + "=" + value + "; path=/; expires=" + today.toGMTString();
    }


    // window.open
    function win_open(url, name, option)
    {
        var popup = window.open(url, name, option);
        popup.focus();
    }

    // win article print
    function win_print(article)
    {
		url = "/home/news/services/print.php?article_id="+article;
        win_open(url, "print", "left=220, top=220, width=700, height=600, scrollbars=1");
    }
    // win article email
    function win_email(article)
    {
		url = "/home/news/services/email.php?article_id="+article;
        win_open(url, "email", "left=220, top=220, width=460, height=420, scrollbars=1");
    }
    // win scrap

    var last_id = null;
    function menu(id)
    {
        if (id != last_id)
        {
            if (last_id != null)
                document.getElementById(last_id).style.display = "none";
            document.getElementById(id).style.display = "block";
            last_id = id;
        }
        else
        {
            document.getElementById(id).style.display = "none";
            last_id = null;
        }
    }

    // check byte
    function check_byte(content, target)
    {
        var i = 0;
        var cnt = 0;
        var ch = '';
        var cont = document.getElementById(content).value;

        for (i=0; i<cont.length; i++) {
            ch = cont.charAt(i);
            if (escape(ch).length > 4) {
                cnt += 2;
            } else {
                cnt += 1;
            }
        }
        // number
        document.getElementById(target).innerHTML = cnt;

        return cnt;
    }

    function obj_movie(src, ids, width, height, autostart)
    {
        var wh = "";
        if (parseInt(width) && parseInt(height)) 
            wh = " width='"+width+"' height='"+height+"' ";
        if (!autostart) autostart = false;
//        return "<embed src='"+src+"' "+wh+" autostart='"+autostart+"'></embed>";
        return "<embed src='"+src+"' "+wh+" autostart='"+autostart+"' allowScriptAccess=sameDomain></embed>";
    }

    function doc_write(cont)
    {
        document.write(cont);
    }

} // end of common.js
