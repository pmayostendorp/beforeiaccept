if (typeof mybuys.setupJsRun == "undefined")
{
	mybuys.setupJsRun = true;

mybuys.setWebrecRoot("http://g.p.mybuys.com/");

mybuys.base_initPage = mybuys.initPage;
mybuys.initPage = function()
{
     if((this.params["pt"]) && (this.params["pt"].indexOf("purchase") != -1))
     {
			var testemail = Math.max(this.params['email'].toUpperCase().indexOf("JOE.TEST3@EMAIL.COM"),this.params['email'].toUpperCase().indexOf("QATEST@BRANDINGBRAND.COM"),this.params['email'].toUpperCase().indexOf("QATEST@GLOBALSPORTS.COM"),this.params['email'].toUpperCase().indexOf("JOE.TEST@EMAIL.COM"),this.params['email'].toUpperCase().indexOf("FOO@BAR.COM"),this.params['email'].toUpperCase().indexOf("GOMEZTEST"),this.params['email'].toUpperCase().indexOf("GSITEST-ACTIVE1@SHOPRUNNER.COM"));
          if(testemail<0)
          {
               this.base_initPage();
          }
     }
     else
     {
          this.base_initPage();
     }
}


mybuys.processResponseHTML = function(zoneHtmls)
	{	clearTimeout(this.requestProcId);
		if (!this.renderOK) return;
		var leftoverZones=[]
		for (var zk=0;zk<this.zoneKeysToZoneDivIds.length;zk++)
		{	if (this.zoneKeysToZoneDivIds[zk])
				leftoverZones[zk]=true;
		}
		for (zonekey in zoneHtmls)
		{
			var zoneDivId = this.zoneKeysToZoneDivIds[zonekey];
			if (!zoneDivId) continue;
			var zoneDiv = document.getElementById(zoneDivId);
			
			if (zoneDiv)
			{
				
				zoneDiv.innerHTML=zoneHtmls[zonekey];
				leftoverZones[zonekey]=false;
			}
		}
		for (var zk=0;zk<leftoverZones.length;zk++)
		{	if (leftoverZones[zk])
				this.loadFailoverImage(zk);
		}
	
	    if (mybuys.params['chn'] && mybuys.params['chn'] == 'm')
	    {

			$myBuysjQuery("#mybuyspagezone10 .carousel").slideshow({
			width:320,
			height:210,
			panel:true,
			playframe:false,
			title:false,
			//imgresize:true,
			//imgzoom:false,
			effecttime:'fast',

			controls: {
				'hide':false,   // show controls bar on mouse hover
				'first':false,  // goto first frame
				'prev':true,   // goto previouse frame (if it first go to last)
				'play':false,    // play slideshow
				'next':true,   // goto next frame (if it last go to first)
				'last':false,   // goto last frame
				'help':false,   // show help message
				'counter':false  // show slide counter				
			}
		    });
			$myBuysjQuery("#mybuyspagezone11 .carousel").slideshow({
			width:320,
			height:210,
			panel:true,
			playframe:false,
			title:false,
			//imgresize:true,
			//imgzoom:false,
			effecttime:'fast',

			controls: {
				'hide':false,   // show controls bar on mouse hover
				'first':false,  // goto first frame
				'prev':true,   // goto previouse frame (if it first go to last)
				'play':false,    // play slideshow
				'next':true,   // goto next frame (if it last go to first)
				'last':false,   // goto last frame
				'help':false,   // show help message
				'counter':false  // show slide counter				
			}
		    });
		}
		
	}
mybuys.setClient("MLB");
mybuys.enableZones();
//  MOBILE
mybuys.setStyleByPageType('CATEGORY','.catZoneMobile', 'width','320px');
mybuys.setStyle('.citem .item .bold','display','block');
mybuys.setStyle('.citem .item .on_sale a','color','#FF0000','text-decoration','none','font-weight','bold','display','block');
mybuys.setStyle('#mybuyspagezone10 .citem .item .img img','max-height','148px','max-width','148px');
mybuys.setStyle('#mybuyspagezone10 .citem .item .img','height','148px','width','148px');
mybuys.applyStyles();
mybuys.setFailOverMsecs(5000);

}