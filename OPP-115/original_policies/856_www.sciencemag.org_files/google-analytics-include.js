// Google analytics javascript
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-2369900-16']);
_gaq.push(['_setDomainName', '.sciencemag.org']);


// specific to the main Science site
var citation_taxonomy = document.getElementsByName("citation_taxonomy"),
article_type      = document.getElementsByName("citation_article_type");
article_doi       = document.getElementsByName("citation_doi");

if (article_type.length > 0) {
  _gaq.push(['_setCustomVar', 1, 'Article Type', article_type[0].content, 3]);
}
if (citation_taxonomy.length > 0) {
  _gaq.push(['_setCustomVar', 2, 'Taxonomy', citation_taxonomy[0].content, 3]);
}
// added 2012-04-11
if (citation_taxonomy.length > 0) {
  _gaq.push(['_setCustomVar', 3, 'DOI', article_doi[0].content, 3]);
}

_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

/*
* Google Pageview/Event Tracking Block
*
*/
$(document).ready( function() { 

  var $citations = $("a.cit-ref-sprinkles");

  $('a[rel$="pdf"]').click( function() { 
    _gaq.push(['_trackPageview', $(this).attr('href')] );
  });

  // 20110714 cac track user registration events 
  $('a[href^="https://pubs.aaas.org/register"]').add('a[href^="http://promo.aaas.org/regsci"]').click(function() { 
    _gaq.push(['_trackEvent','Register for access', 'Content', document.location.pathname]); 
  } );

  // 20120411 cac track clicks on abstract pages
  if ( $citations.size() > 0) {
    $citations.each( function() { 
      var citation_source = $(this).text();
      citation_source = citation_source.replace(/Abstract\/FREE Full Text/,'Science');
      $(this).click(function() { 
        _gaq.push(['_trackEvent','outgoing link', 'Article References', citation_source]); 
      });
    });
  }
  // 20130110 Track related article clicks (found on TOC pages)
  $(".named-content").filter(function() {
    return $(this).text().match("Also see");})
    .find('a').each(function() { $(this)
      .click(function(evt) { 
        $target = evt.currentTarget.href;
        if (typeof _gaq != "undefined") {
          _gaq.push(['_trackEvent', 'Also See', 'click', $target]);
        }
        evt.preventDefault();
        setTimeout('document.location = "' + $target + '"', 150);
        return false;
      })
    });


});
