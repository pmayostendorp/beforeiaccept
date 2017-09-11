_satellite.pushAsyncScript(function(event, target, $variables){
  /*
 * Percent Page Viewed
 * 
 * This Adobe DTM snippet will allow you to capture when a visitor has scrolled a certain % of a page.
 * To use, add the below code as a 3rd party non-sequential JavaScript file to a page load rule with any trigger.
 *
 * The code is configurable so you can capture any % complete milestones as a user scrolls.  The
 * milestones are in the "milestones" array in the _satellite.ppv object.  The defaults are 25, 50, 75
 * and 100, but they can be configured to capture any milestone.  When a visitor scrolls past the 
 * milestone, it will fire a direct call rule named "Percent Page Viewed X", where X is the milestone.
 *
 * The snippet will also store the percent scrolled in the cookie "sat_ppv" as another option, which can
 * be read on the following page.  You can define a data element to use this cookie's value to return the
 * percent page viewed of the previous page.
 */
_satellite.ppv = {
  milestones: [25,50,75,100],
  tracked: [],
  calculate: function(){
    var d = document, b = document.body, w = window, m=_satellite.ppv.milestones.sort(function(a,b){return a-b});
    var dh = Math.max(Math.max(b.scrollHeight,d.documentElement.scrollHeight),Math.max(b.offsetHeight,d.documentElement.offsetHeight),Math.max(b.clientHeight,d.documentElement.clientHeight)),
      vph = w.innerHeight||(d.documentElement.clientHeight||b.clientHeight),
      st = w.pageYOffset||(d.documentElement.scrollTop||b.scrollTop),
      vh = st + vph,
      pv = Math.round(vh/dh*100);
    for(var i=0; i<m.length; i++){
      if((m[i] && m[i+1]) || m[i]==m[m.length-1]){
        if((m[i]<=pv && m[i+1]>pv) || (m[i]<=pv && m[i] == m[m.length-1] && pv <= 100)){
          if(_satellite.indexOf(_satellite.ppv.tracked,m[i])==-1){
            _satellite.track('Percent Page Viewed '+m[i]);
            _satellite.ppv.tracked.push(m[i]);
          }
        }
      }
    }
    if(pv > _satellite.ppv.percent && pv <= 100){
      _satellite.setCookie('sat_ppv', pv);
      _satellite.ppv.percent = pv;
    }
  },
  scroll: function(){
    _satellite.addEventHandler(window,'scroll',_satellite.ppv.calculate,false);
    _satellite.addEventHandler(window,'resize',_satellite.ppv.calculate,false);
    _satellite.ppv.calculate();
  },
  percent: 0
};
if(document.readyState=='complete'){
  _satellite.ppv.scroll();
  _satellite.ppv.calculate();
}
else {
  _satellite.addEventHandler(window,'load',_satellite.ppv.scroll,false);
}
});
