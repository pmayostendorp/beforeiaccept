// JavaScript Document



/* this guy validates the advisor catalog order form */
function validate_advisorcatalogform() {
	var str = document.advisorcatalogform;

	if (!(str.pkg[0].checked || 
		  str.pkg[1].checked || 
		  str.pkg[2].checked || 
		  str.pkg[3].checked)) {
			alert("Choose a package.");
			return false;
	}
	if (str.firstname.value == "") {
		alert("Enter your first name.");
		str.firstname.focus();
		return false;
	}
	if (str.lastname.value == "") {
		alert("Enter your last name.");
		str.lastname.focus();
		return false;
	}
	if (str.title.value == "") {
		alert("Enter your title.");
		str.title.focus();
		return false;
	}
	if (str.university.value == "") {
		alert("Enter your university.");
		str.university.focus();
		return false;
	}
	if (str.address1.value == "") {
		alert("Enter your address.");
		str.address1.focus();
		return false;
	}
	if (str.city.value == "") {
		alert("Enter your city.");
		str.city.focus();
		return false;
	}
	if (str.state.value == "") {
		alert("Enter your state.");
		str.state.focus();
		return false;
	}
	if (str.code.value == "") {
		alert("Enter your zip/postal code.");
		str.code.focus();
		return false;
	}
	if (str.telephone.value == "") {
		alert("Enter your telephone.");
		str.telephone.focus();
		return false;
	}
	if (str.email.value == "") {
		alert("Enter your email.");
		str.email.focus();
		return false;
	}
	if (str.resourcelibrary.checked==0 &&
		str.professionalUse.checked==0 &&
		str.otherStaff.checked==0 &&
		str.other.checked==0 &&
		str.distributionToStudents.checked==0 &&
		str.distributionToFaculty.checked==0 &&
		str.generalAdvisingTool.checked==0) {
		alert("Select at least one way you use our catalogs.");
		return false;
	}

	/*  everything is cool, bring it on */
	else {
		return true;
	}
}





/* this guy validates the student catalog order form */
function validate_studentcatalogform() {
	var str = document.studentcatalogform;

	if (str.first_name.value == "") {
		alert("Enter your first name.");
		str.first_name.focus();
		return false;
	}
	if (str.last_name.value == "") {
		alert("Enter your last name.");
		str.last_name.focus();
		return false;
	}
	if (str.address1.value == "") {
		alert("Enter your address.");
		str.address1.focus();
		return false;
	}
	if (str.city.value == "") {
		alert("Enter your city.");
		str.city.focus();
		return false;
	}
	if (str.state.value == "") {
		alert("Enter your state.");
		str.state.focus();
		return false;
	}
	if (str.zip.value == "") {
		alert("Enter your zip/postal code.");
		str.zip.focus();
		return false;
	}
	if (str.university.value == "") {
		alert("Enter your university.");
		str.university.focus();
		return false;
	}
	if (str.email.value == "") {
		alert("Enter your email.");
		str.email.focus();
		return false;
	}
	if (str.viewbook.checked==0 &&
		str.england.checked==0 &&
		str.oxford.checked==0 &&
		str.ireland.checked==0 &&
		str.australia.checked==0 &&
		str.latin.checked==0 &&
		str.summer.checked==0 &&
		str.london.checked==0 &&
		str.china.checked==0) {
		alert("Select at least one informational booklet.");
		return false;
	}

	/*  everything is cool, bring it on */
	else {
		return true;
	}
}