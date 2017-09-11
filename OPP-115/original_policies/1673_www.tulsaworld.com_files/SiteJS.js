﻿function SetFocus(astrElementID)
{
    document.getElementById(astrElementID).focus();
}

function EnterPress(e, buttonid)
{
    var btn = document.getElementById(buttonid);
    if(window.event) // IE
    {   
        if (window.event.keyCode == 13)
        { 
            btn.click();
            return false;
        } 
    }
    else if(e.which) // Netscape/Firefox/Opera
    {
        if (e.which == 13)
        { 
            btn.click();
            return false;
        } 
    }
}

function SetLeftNavSelected(astrElementID)
{
    if (document.getElementById(astrElementID))
    {
        document.getElementById(astrElementID).className = 'UPE-ListRowSelected';
    }
}

function HighlightLeftNav(aobjThis)
{
    aobjThis.style.backgroundColor='#eff0f6';
    aobjThis.style.cursor = 'pointer';
}
function UnHighlightLeftNav(aobjThis)
{
    aobjThis.style.backgroundColor = '';
    aobjThis.style.cursor = '';
}

function ClickLink(aobjThis)
{
    var elements = aobjThis.getElementsByTagName("A");
    var strURL = elements[0].href;
    if (window.location.href.toLowerCase().search('setupemail.aspx') == -1 && window.location.href.toLowerCase().search('setupsmsmessage.aspx') == - 1 &&
        window.location.href.toLowerCase().search('setupwidget.aspx') == - 1)
    {
        window.location.href = strURL;
    }
}

//Handles moving items from one listbox to another onclick
function MoveItem(CurrentListbox, NewListbox, SendToListbox)
{
    var ListboxOld = document.getElementById(CurrentListbox);
    var ListboxNew = document.getElementById(NewListbox);
    var ListboxSendTo = document.getElementById(SendToListbox);
    var optionNew = new Option(ListboxOld.options[ListboxOld.selectedIndex].text, ListboxOld.options[ListboxOld.selectedIndex].value, false, false);
    //Don't move the "None" option to the other listbox
    if (optionNew.value != '0')
    {
        //Delete option that was just selected
        ListboxOld.remove(ListboxOld.selectedIndex);
        //Delete "None" from the right if an option is chosen from the left
        if (ListboxSendTo.length == 1 && ListboxSendTo.options[0].value == '0')
        {
            ListboxSendTo.remove(ListboxSendTo.options[0]);
        }
        //Return "None" to the right if all options are removed
        else if (ListboxSendTo.length == 0)
        {
            try
            {
                ListboxSendTo.add(new Option('None', '0', false, false), null);
            }
            catch(e)
            { //in IE, try the below version instead
                ListboxSendTo.add(new Option('None', '0', false, false));
            }
        }
        //Add option selected on the left to the right or vice versa
        try
        {
            ListboxNew.add(optionNew, null);
        }
        catch(e)
        { //in IE, try the below version instead
            ListboxNew.add(optionNew);
        }
    }
}
function TitleOptions(selectBoxID)
{
    var objSelect = document.getElementById(selectBoxID);
    if(objSelect)
    {
        for (var loop = 0; loop < objSelect.length; loop++) 
        {
            objSelect.options[loop].title = objSelect.options[loop].text;
        }
    }
}

function ShowPopover(astrDiv)
{
    var oDiv = document.getElementById(astrDiv);
    oDiv.style.display = '';
}
function HidePopover(astrDiv)
{
    var oDiv = document.getElementById(astrDiv);
    oDiv.style.display = 'none';
}

function HandleSort(hdnFieldColumn, hdnFieldDirection, SortColumn, Form)
{
    if (document.getElementById(hdnFieldColumn).value == SortColumn)
    {
        if (document.getElementById(hdnFieldDirection).value == 'ASC')
        {
            document.getElementById(hdnFieldDirection).value = 'DESC';
        }
        else
        {
            document.getElementById(hdnFieldDirection).value = 'ASC'
        }
    }
    else
    {
        document.getElementById(hdnFieldColumn).value = SortColumn;
        document.getElementById(hdnFieldDirection).value = 'ASC';
    }
    document.getElementById(Form).submit();
}

function HandleSearch(hdnFieldSearchValue, SearchValue, hdnFieldSearchColumn, SearchColumn, Form)
{
    document.getElementById(hdnFieldSearchValue).value = SearchValue;
    document.getElementById(hdnFieldSearchColumn).value = SearchColumn;
    document.getElementById(Form).submit();
}

function NavigatePage(aintPage, aintPerGroup, astrIDNumber)
{   
    var intGroupInteger, intGroupMod;
    intGroupInteger = parseInt(aintPage / aintPerGroup);
    intGroupMod = aintPage % aintPerGroup;
    if (intGroupMod > 0)
    {
        intGroupInteger = intGroupInteger + 1
    }
    document.getElementById('hdnCurrentPage' + astrIDNumber).value = aintPage;
    document.getElementById('hdnPageGroup' + astrIDNumber).value =  intGroupInteger;  
    DisablePageFields(astrIDNumber);
    document.getElementById('PageForm').submit();
}

function NavigatePageGroup(aintPageGroup, aintPerGroup, astrIDNumber)
{
    document.getElementById('hdnCurrentPage' + astrIDNumber).value = (aintPerGroup * aintPageGroup) - (aintPerGroup - 1);
    document.getElementById('hdnPageGroup' + astrIDNumber).value = aintPageGroup ;  
    DisablePageFields(astrIDNumber);
    document.getElementById('PageForm').submit();
}

function DisablePageFields(astrIDNumber)
{
    if (document.getElementById('cmdPrevious'+ astrIDNumber))
    {
        document.getElementById('cmdPrevious' + astrIDNumber).disabled = true;
    }
    if (document.getElementById('cmdNext' + astrIDNumber))
    {
        document.getElementById('cmdNext' + astrIDNumber).disabled = true;
    }
    if (document.getElementById('cboPageGroup' + astrIDNumber))
    {
        document.getElementById('cboPageGroup' + astrIDNumber).disabled = true;
    }
}

function SetTimeZoneSelect(astrTimeZone, astrSelectBoxID)
{
    var selectTZ = document.getElementById(astrSelectBoxID);
    for (var loop = 0; loop < selectTZ.length; loop++)
    {
        if (selectTZ.options[loop].value ==  astrTimeZone)
        {
            selectTZ.options[loop].selected = true;
        }
    }
}

function UpdateClock (spanID, time, isFirstUpdate)
{
    var currentTime
    if (document.getElementById('hdnIsDST').value == 'True' && isFirstUpdate == 'True')
    {
        currentTime = new Date(time);
        currentTime.setHours(currentTime.getHours() + 1)
    }
    else
    {
        currentTime = new Date(time);
    }
    currentTime.setSeconds(currentTime.getSeconds() + 1);
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    var currentSeconds = currentTime.getSeconds();

    // Pad the minutes and seconds with leading zeros, if required
    currentMinutes = (currentMinutes < 10 ? '0' : '') + currentMinutes;
    currentSeconds = (currentSeconds < 10 ? '0' : '') + currentSeconds;

    // Choose either "AM" or "PM" as appropriate
    var timeOfDay = (currentHours < 12) ? "AM" : "PM";

    // Convert the hours component to 12-hour format if needed
    currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;

    // Convert an hours component of "0" to "12"
    currentHours = (currentHours == 0) ? 12 : currentHours;

    // Compose the string for display
    var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;

    // Update the time display
    document.getElementById(spanID).innerHTML = currentTimeString;
}

function IsDate(dateStr)
{
    var datePat = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var matchArray = dateStr.match(datePat); // is the format ok?
    var strAlert = 'Please enter a valid date in MM/DD/YYYY format';

    if (matchArray == null)
    {
        alert(strAlert);
        return false;
    }

    day = matchArray[3]; // parse date into variables
    month = matchArray[1];
    year = matchArray[5];

    if (month < 1 || month > 12)
    { // check month range
        alert(strAlert);
        return false;
    }

    if (day < 1 || day > 31)
    {
        alert(strAlert);
        return false;
    }

    if ((month==4 || month==6 || month==9 || month==11) && day==31)
    {
        alert(strAlert);
        return false;
    }

    if (month == 2)
    { // check for february 29th
        var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day > 29 || (day==29 && !isleap))
        {
            alert(strAlert);
            return false;
        }
    }
    
    return true; // date is valid
}

function IsDaylightSavingTime(astrTimeZone) 
{
    var datNow = new Date();
    var datJuly = new Date(datNow.getFullYear(), 6, 1, 0, 0, 0, 0);  //middle of possible daylight saving timeframe
    var datTemp = datJuly.toGMTString();
    var datClientTimeZone = new Date(datTemp.substring(0, datTemp.lastIndexOf(' -1'))); //get client TimeZone
    var hoursDiffDaylightTime = (datJuly - datClientTimeZone) / (1000 * 60 * 60);
    if (hoursDiffDaylightTime == parseFloat(astrTimeZone))  //determine whether the user set TimeZone matches the daylight saving TimeZone
    { 
        document.getElementById('hdnIsDaylightSavingTime').value = 'false';
    }
    else 
    {
        document.getElementById('hdnIsDaylightSavingTime').value = 'true';
    }
}

function SetSelectSearchDefault(strSearchColumn, strSelect)
{
    var selectSearch = document.getElementById(strSelect);
    for (var loop = 0; loop < selectSearch.length; loop++) 
    {
        if (selectSearch.options[loop].value == strSearchColumn)
        {
            selectSearch.options[loop].selected = true;
        }
    }
}

function CheckRadio(strRadio)
{
    document.getElementById(strRadio).checked = true;
}

function FlagSave()
{
    if(document.getElementById('hdnFlagSave'))
    {
        document.getElementById('hdnFlagSave').value = '1';
    }
}

function SetScreenWidthHeight() 
{
    var myWidth = 0, myHeight = 0;
    if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    }    
    else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    }   
    else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
        document.getElementById('hdnScreenWidth').value = (myWidth - 50) + 'px';
        document.getElementById('hdnScreenHeight').value = (myHeight - 100) + 'px';
}

function SearchManual()
{
    var search = document.getElementById('txtSearchManual').value;
    var url
    search = escape(search);
    url = 'http://secondstreetmedia.screenstepslive.com/spaces/eblast/manuals/eblast/searches?text=' + search + '&commit=Search';
    window.open(url, 'HelpManual', 'status=1,toolbar=1,location=1,resizable=1,scrollbars=1,height=700,width=1000,top=10,left=10');
}

// sort function - ascending (case-insensitive)
function SortFuncAsc(record1, record2)
{
    var value1 = record1.optText.toLowerCase();
    var value2 = record2.optText.toLowerCase();
    if (value1 > value2) return(1);
    if (value1 < value2) return(-1);
    return(0);
}

function SortSelect(selectToSort)
{
    // copy options into an array
    var select = document.getElementById(selectToSort);
    var myOptions = [];
    for (var loop=0; loop<select.options.length; loop++) {
        myOptions[loop] = { optText:select.options[loop].text, optValue:select.options[loop].value };
    }
    
    myOptions.sort(SortFuncAsc);

    // copy sorted options from array back to select box
    select.options.length = 0;
    for (var loop=0; loop<myOptions.length; loop++) {
        var optObj = document.createElement('option');
        optObj.text = myOptions[loop].optText;
        optObj.value = myOptions[loop].optValue;
        select.options.add(optObj);
    }
}

function CheckAll(hdnNumCheckboxes,hdnCheckAllOn)
{   
    for (var loop = 1; loop <= parseInt(hdnNumCheckboxes.value); loop++) 
    {
        if (document.getElementById('checkColumn' + loop))
        {
            if (hdnCheckAllOn.value == 'False')
            {
                document.getElementById('checkColumn' + loop).checked = true;
            }
            else
            {
                document.getElementById('checkColumn' + loop).checked = false;
            }
        }
    }
    if (hdnCheckAllOn.value == 'False')
    {
        hdnCheckAllOn.value = 'True';
        document.getElementById('btnCheckAll').value = 'Uncheck All';
    }
    else
    {
        hdnCheckAllOn.value = 'False';
        document.getElementById('btnCheckAll').value = 'Check All';
    }    
}

function ChangeCheckAll(hdnNumCheckboxes,hdnCheckAllOn)
{
    var blnAllOn = true;
    for (var loop = 1; loop <= parseInt(hdnNumCheckboxes.value); loop++) 
    {
        if (document.getElementById('checkColumn' + loop))
        {
            if (document.getElementById('checkColumn' + loop).checked == false)
            {
                blnAllOn = false;
            }
        }
    }
    if (blnAllOn == true)
    {
        hdnCheckAllOn.value = 'True';
        document.getElementById('btnCheckAll').value = 'Uncheck All';
    }
    else
    {
        hdnCheckAllOn.value = 'False';
        document.getElementById('btnCheckAll').value = 'Check All';
    }   
}

function CheckAtLeastOne(hdnNumCheckboxes)
{
    var blnOneChecked = false;
    for (var loop = 1; loop <= parseInt(hdnNumCheckboxes.value); loop++) 
    {
        if (document.getElementById('checkColumn' + loop))
        {
            if (document.getElementById('checkColumn' + loop).checked == true)
            {
                blnOneChecked = true;
            }
        }
    }
    if (blnOneChecked == true)
    {
        document.getElementById('btnExportAudience').disabled = false;
    }
    else
    {
        document.getElementById('btnExportAudience').disabled = true;
    }   
}

function ScrollDiv(strDirection, strDivID)
{
    var div = document.getElementById(strDivID);
    if (strDirection == 'left')
    {
        div.scrollLeft = (div.scrollLeft -250)
    }
    else
    {
        div.scrollLeft = (div.scrollLeft + 250)
    }
}

function CreateXMLHttpRequestObject()
{
    try {  // Firefox, Opera 8.0+, Safari  
        xmlHttp = new XMLHttpRequest();
    }
    catch (e) {  // Internet Explorer  
        try
    { xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {
            try
            { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (e) {
                alert("Your browser does not support AJAX!");
                return false;
            }
        }
    }
    return xmlHttp;
}

function CreateErrorResponse(strError,blnIsMaxRequestError)
{
    var strHTML;
    if (blnIsMaxRequestError == true)
    {
        strError = 'The eBlast Engine cannot process files larger than 10 megabytes.';
    }
    strHTML = '<table cellspacing="1" cellpadding="5" border="0" style="width: 100%;" class="UPE-ListRowTableError" id="tblError">' +
              '<tr>' +
              '<td colspan="4" class="UPE-ListRowHeaderError">There was 1 problem found with your request.</td>' +
              '</tr>' +
              '<tr><td colspan="4" class="UPE-ListRowError">' + strError + '</td></tr>'+
              '</table>';
    return strHTML;
}

var notWhitespace = /\S/;
function CleanWhitespace(node)
{
    for (var x = 0; x < node.childNodes.length; x++)
    {
        var childNode = node.childNodes[x]
        if ((childNode.nodeType == 3)&&(!notWhitespace.test(childNode.nodeValue)))
        {
            // that is, if it's a whitespace text node
            node.removeChild(node.childNodes[x])
            x--
        }
        if (childNode.nodeType == 1)
        {
            // elements can have text child nodes of their own
            CleanWhitespace(childNode)
        }
    }
}

function ConfirmLeave(e)
{
    var msg = "You may have unsaved information. Are you sure you want to leave this page?";
    var strID = '';
    var intType;
    var element;
    if (e.srcElement)
    {
        element = e.srcElement;
        intType = 1;
    }
    else
    {
        element = e.target;
        intType = 2;
    }
            
    if (element.tagName == 'TD')
    {
        if(element.childNodes[0])
        {
            if(element.childNodes[0].id)
            {
                strID = element.childNodes[0].id;
            }
        }
    }
    else
    {
        strID = element.id;
    }
    if (strID.search('aConfirm') != -1 && element.id != 'NoLink')
    {
        if (document.getElementById('hdnFlagSave').value == '1')
        {                
            var answer = confirm(msg);
            if (answer)
            {
                if (element.tagName == 'TD')
                {
                    window.location.href = element.childNodes[0].href;
                }
            }
            else
            {
                if (intType == 1) 
                {
                    if (e.preventDefault) 
                    {
                        e.preventDefault();
                    }
                    else {
                        e.returnValue = false;
                    }
                }
                else if (intType == 2)
                {
                    e.preventDefault();
                    return false;
                }
            }
        }
        else
        {
            if (element.tagName == 'TD')
            {
                window.location.href = element.childNodes[0].href;
            }
        }
    }
}

function AddOptionToAudienceListbox(objSelect, strValue, strText)
{
    if (objSelect.length == 1 && objSelect.options[0].text == 'None')
    {
        objSelect.remove(0);
    }
    try
    {
        objSelect.add(new Option(strText, strValue, false, false), null);
    }
    catch(e)
    { //in IE, try the below version instead
        objSelect.add(new Option(strText, strValue, false, false));
    }
}

//Use to add a special message to the eBlast Header
function AddHeaderNote()
{
    if (document.getElementById('MainTable') && document.getElementById('MainTable').style.width == '1000px')
    {
        var objElement = document.getElementById('PageForm');
        objElement = objElement.getElementsByTagName('TABLE')[0];
        if (objElement.getElementsByTagName('TBODY')[0])
        {
            objElement = objElement.getElementsByTagName('TBODY')[0]
        }
        var objTR = document.createElement('TR');
        var objTD = document.createElement('TD');
        objTD.colSpan = '3';
        objTD.style.padding = '10px 0px 0px 0px';
        objTD.style.color = '#ff0000';
        objTD.style.fontWeight = 'bold';
        objTD.innerHTML = 'Second Street Support will be closed on Thursday, 11/24. Our abbreviated hours for Friday, 11/25, ' + 
                          'will be 8 am - 6 pm CT for email support. Please leave voice mail if you can\'t email in and we will return calls as quickly as we can.';
        objTR.appendChild(objTD);
        objElement.appendChild(objTR);
    }
}
//if (window.location.href.search('Widgets/EmailSignup.aspx') == -1)
//{
//    window.onload = function(){AddHeaderNote();};
//}