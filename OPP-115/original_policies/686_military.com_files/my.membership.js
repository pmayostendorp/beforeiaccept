var serviceNames = new Array();
serviceNames['airfrc'] = 'USAF';
serviceNames['army'] = 'USA';
serviceNames['coastg'] = 'USCG';
serviceNames['dod'] = 'DoD';
serviceNames['govern'] = 'GOVT';
serviceNames['marine'] = 'USMC';
serviceNames['navy'] = 'USN';
serviceNames['none'] = 'Military';
serviceNames['other'] = 'Other';

var statusNames = new Array();
statusNames['A'] = 'Active';
statusNames['ACDMEM'] = 'Active';
statusNames['ACTRES'] = 'Reserve';
statusNames['CONJON'] = 'Support';
statusNames['DEFCON'] = 'Contractor';
statusNames['ENTHUS'] = 'Support';
statusNames['F'] = 'Family';
statusNames['GOVEMP'] = 'Govt';
statusNames['INTRES'] = 'Inactive';
statusNames['MILOTH'] = 'Military';
statusNames['NATGRD'] = 'Guard';
statusNames['NONE'] = 'Supporter';
statusNames['OTHMIL'] = 'Military';
statusNames['RESTRA'] = 'ROTC';
statusNames['SA'] = 'Spouse';
statusNames['SACTRE'] = 'Spouse';
statusNames['SAV20P'] = 'Spouse';
statusNames['SV20MI'] = 'Spouse';
statusNames['V20MIN'] = 'Veteran';
statusNames['V20PLU'] = 'Retired';
statusNames['DISVET'] = 'Veteran';
statusNames['SPOUSE'] = 'Spouse';


function selectService() {
    var loginInfoCookie = GetCookie('LoginInfo');
    var service = 'no';
    var status  = 'no';
    if(loginInfoCookie != null) {
        var str = loginInfoCookie.split('|');
        service = str[5].toLowerCase(); 
        status  = str[6];       
    }
    
    if (service=='no') {
        $('#selectServiceTitle').show();        
    } else {
        $('#myMembershipTitle').show();
        $('#serviceLogo').addClass(service);
        if (service=='notset') {
            $('#serviceLogo .service').html( "<a href='http://www.military.com/profile/member-profile.html'>Update Service</a>");
        } else {
           $('#serviceLogo .service').text(serviceNames[service]);           
        }

        if (status=='NOTSET') {
            $('#serviceLogo .status').html( "<a href='http://www.military.com/profile/member-profile.html'>Update Status</a>");
        } else {
           $('#serviceLogo .status').text(statusNames[status]);
        }
        $('#serviceLogo').show();    
    }  
    
    var selector = '#' + service + 'ServiceSelected';
    if ($(selector).length==0) {
        selector = '#otherServiceSelected';
    }        
    $(selector).show();                    
}