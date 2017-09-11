_satellite.pushAsyncScript(function(event, target, $variables){
    window.Krux || ((Krux = function () {
    Krux.q.push(arguments);
  }).q = []);
  (function (w, d, nv) {


    function retrieve(n) {
      var m, k = 'kxtkm_'+n;
      if (w.localStorage) {
        return  w.localStorage[k] || "";
      } else if (nv.cookieEnabled) {
        m = d.cookie.match(k + '=([^;]*)');
        return  (m && unescape(m[1])) || "";
      } else {
        return  '';
      }
    }

    w.Krux.user = retrieve('user');
    w.Krux.segments = retrieve('segs') && retrieve('segs').split(',') || [];
  })(window,document,navigator);

});
