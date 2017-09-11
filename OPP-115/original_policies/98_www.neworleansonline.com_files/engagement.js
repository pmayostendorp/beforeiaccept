$(document).ready(function(){	

			$("#newNav2").insertAfter(".navTable");	
			$(".searchTD").remove();
			$('.right').css('top','-8px');			
			if($('.headerDiv').height() < 300){
			$('#newNav2').css('height','46px');
			}
					
			$('#gsc-banner').css('position','relative').css('bottom','7px');
			if((/iPhone|iPod|iPad/).test(navigator.userAgent)) {				
				$('#q').css('width','95px').css('height','22px').css('position','relative').css('left','4px').css('padding-top','4px');					
			}
			var d = navigator.userAgent.toLowerCase(),
			isSafari = (~d.indexOf("safari") && !~d.indexOf("chrome"));
			if(isSafari) {
				$('.drop1 .col-1 li:eq(4), .drop2 .col-1 li:eq(0), .drop3 .col-1 li:eq(1),.drop3 .col-2 li:eq(0)').css('font-size','15px');
				$('#searchButton').css('bottom','-1px');
			}	
			var d = navigator.userAgent.toLowerCase(),
			isSafari = (~d.indexOf("safari") && ~d.indexOf("chrome"));
			if(isSafari) {
				$('.drop1 .col-1 li:eq(4), .drop2 .col-1 li:eq(0), .drop3 .col-1 li:eq(1),.drop3 .col-2 li:eq(0)').css('font-size','15px');
				$('.drop3 .col-1 li:eq(1)').css('font-size','14px');
				$('#searchButton').css('bottom','-1px');					
				
			}				
			
			$( ".drop1" ).hover(
			  function() {
				 $('.box1').css('background-image','url(/images/MLABS/engagement/bg-nav-2-things.png)').css('color','#416ed0');
				$( ".box1 p" ).css('color','#416ed0');
				$( ".drop1" ).css('visibility','visible');
			  }, function() {	
			    $( '.box1').css('background-image','url()').css('z-index','10').css('color','#fff');
				$( ".box1 p" ).css('color','#fff');
				$( ".drop1" ).css('visibility','hidden');
			  }
			);
			$( ".drop2" ).hover(
			  function() {
				 $('.box2').css('background-image','url(/images/MLABS/engagement/bg-nav-1-where.png)').css('color','#416ed0');
				$( ".box2 p" ).css('color','#416ed0');
				$( ".drop2" ).css('visibility','visible');
			  }, function() {	
			    $( '.box2').css('background-image','url()').css('z-index','10').css('color','#fff');
				$( ".box2 p" ).css('color','#fff');
				$( ".drop2" ).css('visibility','hidden');
			  }
			);
			$( ".drop3" ).hover(
			  function() {
				 $('.box3').css('background-image','url(/images/MLABS/engagement/bg-nav-1-plan.png)').css('color','#416ed0');
				$( ".box3 p" ).css('color','#416ed0');
				$( ".drop3" ).css('visibility','visible');
			  }, function() {	
			    $( '.box3').css('background-image','url()').css('z-index','10').css('color','#fff');
				$( ".box3 p" ).css('color','#fff');
				$( ".drop3" ).css('visibility','hidden');
			  }
			);
			$( ".drop34" ).hover(
			  function() {
				 $('.box34').css('background-image','url(/images/MLABS/engagement/bg-nav-1-plan.png)').css('color','#416ed0');
				$( ".box34 p" ).css('color','#416ed0');
				$( ".drop34" ).css('visibility','visible');
			  }, function() {	
			    $( '.box34').css('background-image','url()').css('z-index','10').css('color','#fff');
				$( ".box34 p" ).css('color','#fff');
				$( ".drop34" ).css('visibility','hidden');
			  }
			);

			$( ".box1" ).hover(
			  function() {
			    $( this ).css('background-image','url(/images/MLABS/engagement/bg-nav-2-things.png)').css('color','#416ed0');
				$( ".box1 p" ).css('color','#416ed0');
				$( ".drop1" ).css('visibility','visible');
			  }, function() {
					$( ".drop1" ).css('visibility','hidden');
					$( ".box1 p" ).css('color','#fff');
					$( this ).css('background-image','url()').css('z-index','10').css('color','#fff');				
			  }
			);
			$( ".box2" ).hover(
			  function() {
			    $( this ).css('background-image','url(/images/MLABS/engagement/bg-nav-1-where.png)').css('color','#416ed0');
				$( ".box2 p" ).css('color','#416ed0');	
				$( ".drop2" ).css('visibility','visible');
			  }, function() {
					$( ".drop2" ).css('visibility','hidden');
					$( ".box2 p" ).css('color','#fff');
					$( this ).css('background-image','url()').css('z-index','10').css('color','#fff');
			  }
			);
			$( ".box3" ).hover(
			  function() {
			    $( this ).css('background-image','url(/images/MLABS/engagement/bg-nav-1-plan.png)').css('color','#416ed0');
				$( ".box3 p" ).css('color','#416ed0');
				$( ".drop3" ).css('visibility','visible');
			  }, function() {
			    $( this ).css('background-image','url()').css('z-index','10').css('color','#fff');
				$( ".drop3" ).css('visibility','hidden');
				$( ".box3 p" ).css('color','#fff');
			  }
			);

			$( ".box34" ).hover(
			  function() {
			    $( this ).css('background-image','url(/images/MLABS/engagement/bg-nav-1-plan.png)').css('color','#416ed0');
				$( ".box34 p" ).css('color','#416ed0');
				$( ".drop34" ).css('visibility','visible');
			  }, function() {
			    $( this ).css('background-image','url()').css('z-index','10').css('color','#fff');
				$( ".drop34" ).css('visibility','hidden');
				$( ".box34 p" ).css('color','#fff');
			  }
			);

			$( ".col-1 li, .col-2 li" ).hover(
			  function() {
			    $( this ).css('background-image','url(/images/MLABS/engagement/bg-blue-nav.png)').css('color','#fff').css('cursor','pointer');
				
			  }, function() {
			    $( this ).css('background-image','url()').css('bottom','0px');
				$( this ).css('color','#416ed0');
			  }
			);

			$( ".drop1 li" ).hover(
			  function() {
			    $( this ).css('text-decoration','none').css('cursor','pointer').css('background-color','#456dcd');
				$( this ).find('p').css('color','#fff');
				$( this ).find('.right-arrw').css('background-position','0px 14px');
				$( ".drop1 a" ).css('text-decoration','none');
			  }, function() {
				$( this ).find('p').css('color','#406ed0');
				$( this ).find('.right-arrw').css('background-position','0px 0px');
			   $( this ).css('background-color','transparent');
			  }
			);

			$( ".drop2 p" ).hover(
			  function() {
			    $( this ).css('text-decoration','none').css('color','#fff').css('cursor','pointer').css('background-color','#456dcd');
				$( ".drop2 a" ).css('text-decoration','none');
			  }, function() {
			   $( this ).css('color','#406ed0').css('background-color','transparent');
			  }
			);

			$( ".drop3 li" ).hover(
			  function() {
			    $( this ).css('text-decoration','none').css('cursor','pointer').css('background-color','#456dcd');
				$( this ).find('p').css('color','#fff');
				$( this ).find('.hotels-img').css('background-position','0px 18px');
				$( this ).find('.bbs-img').css('background-position','0px 15px');
				$( this ).find('.right-arrw').css('background-position','0px 14px');
				$( ".drop3 a" ).css('text-decoration','none');
			  }, function() {
			   $( this ).find('p').css('color','#406ed0');
			   $( this ).find('.hotels-img').css('background-position','0px 0px');
				$( this ).find('.bbs-img').css('background-position','0px 0px');
			   $( this ).css('background-color','transparent');
			   $( this ).find('.right-arrw').css('background-position','0px 0px');
			  }
			);

			$( ".drop34 li" ).hover(
			  function() {
			   $( this ).css('text-decoration','none').css('cursor','pointer').css('background-color','#456dcd');
			   $( this ).find('.calendar-img').css('background-position','0px 29px');
				$( this ).find('p').css('color','#fff');
				$( ".drop34 a" ).css('text-decoration','none');
			  }, function() {
				$( this ).find('p').css('color','#406ed0');
				$( this ).find('.calendar-img').css('background-position','0px 0px');
			    $( this ).css('background-color','transparent');
			  }
			);

			$(document).ready(function(){
				if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
				$( ".box1 p, .box2 p, .box3 p, .box4 p").css('font-size','14px');
				$( ".drop1 p, .drop2 p, .drop3 p, .drop34 p").css('font-size','14px');
				$( "#q").css('bottom','16px').css('line-height','29px').css('bottom','10px');
			}
			});		

});


