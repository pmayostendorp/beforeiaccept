

$(document).ready(function(){
	$.urlParam = function(name){
			var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			if (results==null){
			return null;
			}else{
			return results[1] || 0;
			}
		}

	if ($.browser.msie  && parseInt($.browser.version, 10) === 7) {

	}else{
	var param = $.urlParam('notmct');
if(param == undefined ||  param != 1111 ){
	$('#hotSearch,.headerBookDiv img, .bookbg').removeClass('hideBooking').css('display','block');	
	$('#hotSearch table').css('margin-top','0px');
	$('#hotSearch a:eq(0)').attr('onclick','ga(\'send\',\'event\', \'Button\', \'Form Click\', \'Hotel Search\');').attr('href','javascript:checkAvailabilityMecT3()');
	$('#hotSearch a:eq(1)').attr('onclick','ga(\'send\',\'event\', \'Button\', \'Form Click\', \'B&B Search\');');
	$('#hotSearch a:eq(2)').addClass('advS').attr('onclick','ga(\'send\',\'event\', \'Button\', \'Form Click\', \'Advanced Search\'); checkAvailabilityMecAdv()').attr('href','#');
}

}
});





$(document).ready(function(){

$('.hotelcheck').trigger('click');

setTimeout(function(){$('.ui-datepicker-trigger').css('position','relative').css('top','5px');}, 900);


var url = "//code.jquery.com/ui/1.11.1/jquery-ui.js";
$.getScript( url, function() {

	  $( "#datepicker" ).datepicker({	  
      showOn: "button",
      buttonImage: "/images/MLABS/booking/icon-calendar.gif",
      buttonImageOnly: true,
      buttonText: "Select date",
	  defaultDate: "1",
	  minDate: "0",
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
      $( "#datepicker2" ).datepicker( "option", "minDate", selectedDate );
      }     
    });	

	$("#datepicker").datepicker("setDate", +14);	 

	$( "#datepicker2" ).datepicker({		
	  
      showOn: "button",
      buttonImage: "/images/MLABS/booking/icon-calendar.gif",
      buttonImageOnly: true,
      buttonText: "Select date",
	  defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        $( "#datepicker" ).datepicker( "option", "maxDate", selectedDate );
      }
    });	
    $("#datepicker2").datepicker("setDate", +16).datepicker('option', 'minDate', $( "#datepicker" ).val()); 

});

});





function checkAvailabilityMec(){
	
	if($('#datepicker').val() == 'MM/DD/YYYY' || $('#datepicker').val() == ""){
			$('.cal_error').css('display','block');			
			return false;
	}
	$('.cal_error').css('display','none');
	if($('#datepicker2').val() == 'MM/DD/YYYY' || $('#datepicker2').val() == ""){
			$('.cal_error').css('display','block');		
			return false;
			}
	if(!$('#hotelcheck').prop('checked') && !$('#bbcheck').prop('checked') && !$('.hotelcheck').hasClass('tab_check') && !$('.bbcheck').hasClass('tab_check')) {
			$('.cal_error2').css('display','block');
			return false;
	}	
	$('.cal_error2').css('display','none');
	
	var myArray = $('#datepicker').val().split('/');
	var myArray2 = $('#datepicker2').val().split('/');

	if (($("#hotelcheck").prop('checked') && !$("#bbcheck").prop('checked'))  || ($('.hotelcheck').hasClass('tab_check') && !$('.bbcheck').hasClass('tab_check')) ) {
			//document.hotSearch.action="http://travel.ian.com/index.jsp"+"?filter.hotelTypes=HOTEL";
			document.hotSearch.action="http://travel.ian.com//templates/75544/hotels/list?lang=en_US&targetId=AREA-24714305-67fd-42f7-83f1-672fc0071b2c|cities&destination=New%20Orleans,%20LA,%20United%20States&filter.hotelTypes=HOTEL&checkout="+$('#datepicker2').val()+"&checkin="+$('#datepicker').val();
			ga('send','event', 'Button','Form Click','Hotel Search');			
			document.hotSearch.submit();

			}
			else if(($("#hotelcheck").prop('checked') && $("#bbcheck").prop('checked')) || ($('.hotelcheck').hasClass('tab_check') && $('.bbcheck').hasClass('tab_check')) ){
				ga('send','event', 'Button','Form Click','Hotel Search');
				ga('send','event','Button','Form Click', 'B&B Search');
				document.hotSearch.action="http://travel.ian.com//templates/75544/hotels/list?lang=en_US&targetId=AREA-24714305-67fd-42f7-83f1-672fc0071b2c|cities&destination=New%20Orleans,%20LA,%20United%20States&filter.hotelTypes=HOTEL&filter.hotelTypes=BED_AND_BREAKFAST&checkout="+$('#datepicker2').val()+"&checkin="+$('#datepicker').val();
				document.hotSearch.submit();
			}
		
	else{
			ga('send','event','Button','Form Click', 'B&B Search');
			url = "http://www.neworleansonline.com/book/rooms/bandbs.html?arrivalDay=";
			url += parseInt(myArray[1]);
			url += "&arrivalMonth=" + parseInt(myArray[0]);
			url += "&departureDay=" + parseInt(myArray2[1]);
			url += "&departureMonth=" + parseInt(myArray2[0]);			
			window.open(url);
	    }
	}


	function checkAvailabilityMecT1(){
	
	if($('#datepicker').val() == 'MM/DD/YYYY' || $('#datepicker').val() == ""){
			$('.cal_error').css('display','block');			
			return false;
	}
	$('.cal_error').css('display','none');
	if($('#datepicker2').val() == 'MM/DD/YYYY' || $('#datepicker2').val() == ""){
			$('.cal_error').css('display','block');		
			return false;
			}
	var myArray = $('#datepicker').val().split('/');
	var myArray2 = $('#datepicker2').val().split('/');
	ga('send','event', 'Button','Form Click','Hotel Search');
    document.hotSearch.action="http://travel.ian.com//templates/75544/hotels/list?lang=en_US&targetId=AREA-24714305-67fd-42f7-83f1-672fc0071b2c|cities&destination=New%20Orleans,%20LA,%20United%20States&filter.hotelTypes=HOTEL&checkout="+$('#datepicker2').val()+"&checkin="+$('#datepicker').val();
	document.hotSearch.submit();

		
	}
	function checkAvailabilityMecT2(){
	
		if($('#datepicker').val() == 'MM/DD/YYYY' || $('#datepicker').val() == ""){
				$('.cal_error').css('display','block');			
				return false;
		}
			$('.cal_error').css('display','none');
			if($('#datepicker2').val() == 'MM/DD/YYYY' || $('#datepicker2').val() == ""){
			$('.cal_error').css('display','block');		
			return false;
			}
			var myArray = $('#datepicker').val().split('/');
			var myArray2 = $('#datepicker2').val().split('/');

			ga('send','event','Button','Form Click', 'B&B Search');
			url = "http://www.neworleansonline.com/book/rooms/bandbs.html?arrivalDay=";
			url += parseInt(myArray[1]);
			url += "&arrivalMonth=" + parseInt(myArray[0]);
			url += "&departureDay=" + parseInt(myArray2[1]);
			url += "&departureMonth=" + parseInt(myArray2[0]);			
			window.open(url);
	}

	function checkAvailabilityMecAdv(){		
		var params = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

		var dArrivalMo = params[$('#doa_mm').val()];		
		var dDepartureMo = params[$('#dod_mm').val()];
		var dDeparture = $('#dod_dd').val();
		if(dDeparture < 10){
			dDeparture = "0" + dDeparture;
		}		
		var dArrival = $('#doa_dd').val();
		if(dArrival < 10){
			dArrival = "0" + dArrival;
		}
		var checkoutDate = dDepartureMo+"/"+dDeparture+"/"+"2015";
		var checkinDate = dArrivalMo+"/"+dArrival+"/"+"2015";
		if($('#datepicker').val() == undefined){
			$('.advS').attr('href','http://travel.ian.com/templates/75544?currency=USD&searchType=DESTINATION&userCity=New+Orleans,LA,US&searchParam=24714305-67FD-42F7-83F1-672FC0071B2C&travelDetail=[20100217-8]2&propUnavail=null&mdpcid=75544.BookBoxAdvancedSearch&checkout='+checkoutDate+'&checkin='+checkinDate);
		}else{
			$('.advS').attr('href','http://travel.ian.com/templates/75544?currency=USD&searchType=DESTINATION&userCity=New+Orleans,LA,US&searchParam=24714305-67FD-42F7-83F1-672FC0071B2C&travelDetail=[20100217-8]2&propUnavail=null&mdpcid=75544.BookBoxAdvancedSearch&checkout='+$('#datepicker2').val()+'&checkin='+$('#datepicker').val());
		}
		
		
		
	}
	//end checkAvailabilityMecAdv()

	function checkAvailabilityMecT3(){

		//&checkout=01/23/2015&checkin=01/07/2015
		var params = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
		var dArrivalMo = params[$('#doa_mm').val()];		
		var dDepartureMo = params[$('#dod_mm').val()];
		var dDeparture = $('#dod_dd').val();
		if(dDeparture < 10){
			dDeparture = "0" + dDeparture;
		}		
		var dArrival = $('#doa_dd').val();
		if(dArrival < 10){
			dArrival = "0" + dArrival;
		}
		var checkoutDate = dDepartureMo+"/"+dDeparture+"/"+"2015";
		var checkinDate = dArrivalMo+"/"+dArrival+"/"+"2015";
		if(checkinDate > checkoutDate){
			alert('Please enter a valid date range');
			return false;
		}
		ga('send','event', 'Button','Form Click','Hotel Search');
	    document.hotSearch.action="http://travel.ian.com//templates/75544/hotels/list?lang=en_US&targetId=AREA-24714305-67fd-42f7-83f1-672fc0071b2c|cities&destination=New%20Orleans,%20LA,%20United%20States&filter.hotelTypes=HOTEL&checkout="+checkoutDate+"&checkin="+checkinDate;
		document.hotSearch.submit();
		}
	

