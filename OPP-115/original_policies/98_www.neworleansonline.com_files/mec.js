

function clearInputs() {
	if (document.getElementById('eaText').value == "Enter your email") {
		document.getElementById('eaText').value = '';
		document.getElementById('eaText').style.color = 'black';
	}
}

function enterInputs() {
	if (document.getElementById('eaText').value == "") {
		document.getElementById('eaText').value = 'Enter your email';
		document.getElementById('eaText').style.color = '#acacac';				
	}
}
function closeCookie(){
		document.cookie = "close=1; path=/";
}
function bannerClose(){
		$('.banner_persist').remove();
}
function sgnPage(){
		document.cookie = "sgnPage=1; path=/";
}
function dltSign(){
		document.cookie = "sgnPage=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function clearFnInput() {
	if (document.getElementById('name_first').value == "First Name") {
		document.getElementById('name_first').value = '';
		jQuery('#name_first').removeClass('MLABS-input-default');
		}
	}
function enterFnInput() {
	if (document.getElementById('name_first').value == "") {
		document.getElementById('name_first').value = 'First Name';
		jQuery('#name_first').addClass('MLABS-input-default');
	}
}
function clearLnInput() {
	if (document.getElementById('name_last').value == "Last Name") {
		document.getElementById('name_last').value = '';
		jQuery('#name_last').removeClass('MLABS-input-default');
	}
}
function enterLnInput() {
	if (document.getElementById('name_last').value == "") {
		document.getElementById('name_last').value = 'Last Name';
		jQuery('#name_last').addClass('MLABS-input-default');
	}
}
function clearEmInput() {
	if (document.getElementById('ea').value == "john.doe@email.com") {
		document.getElementById('ea').value = '';
		jQuery('#ea').removeClass('MLABS-input-default');
	}
}
function enterEmInput() {
	if (document.getElementById('ea').value == "") {
		document.getElementById('ea').value = 'john.doe@email.com';
		jQuery('#ea').addClass('MLABS-input-default');
	}
}