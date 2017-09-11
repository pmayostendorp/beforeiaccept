// generates the left navigation

// if title of module wraps, add <br> at linebreak

var shipping = new Array(
	"Delivery, Returns & More", //Title of the module	
	"Print Your Tickets",
	"Delivery Options",
	"Refund & Exchange Policy",
	"Lost or Destroyed Tickets"
);

var shippingLink = new Array (
	"//www.ticketmaster.com/h/print.html?tm_link=help_nav_1_print",
	"//www.ticketmaster.com/h/delivery.html?tm_link=help_nav_1_shipping",
	"//www.ticketmaster.com/h/returns.html?tm_link=help_nav_1_return",
	"//www.ticketmaster.com/h/lost-tickets.html?tm_link=help_nav_1_lost"
);

var account = new Array(
	"Using Your Account", //Title of the module	
	"Sign In or Create Account",
	"View Your Order History",
	"Forgot Your Password?",
	"Edit Profile",
	"Edit Preferences",
	"Edit Billing Info"
);

var accountLink = new Array (
	"https://www.ticketmaster.com/member?tm_link=help_nav_2_account",
	"https://www.ticketmaster.com/member/order_history?tm_link=help_nav_2_orders",
	"https://www.ticketmaster.com/member?tm_link=help_nav_2_forgotpass",
	"https://www.ticketmaster.com/member/edit_profile?tm_link=help_nav_2_editprofile",
	"https://www.ticketmaster.com/member/edit_subscriptions?tm_link=help_nav_2_preferences",
	"https://www.ticketmaster.com/member/edit_billing?tm_link=help_nav_2_billing"
);

var buying = new Array(
	"Buying Tickets", //Title of the module	
	"Order Online",
	"Order by Phone",
	"Ticketmaster Retail Outlets",
	"Ticket Tips",
	"Accessible Seating"
);

var buyingLink = new Array (
	"//www.ticketmaster.com/h/order-online.html?tm_link=help_nav_3_online",
	"//www.ticketmaster.com/h/order-by-phone.html?tm_link=help_nav_3_phone",
	"//www.ticketmaster.com/retail-outlets?tm_link=help_nav_3_retail",
	"//www.ticketmaster.com/h/help-tips.html?tm_link=help_nav_3_faqs",
	"//www.ticketmaster.com/h/accessible-seating.html?tm_link=help_nav_3_seating"
);

var werehere = new Array(
	"We&#39;re Here To Help", //Title of the module						 	
	"Read All FAQs",
	"Correct Your Order",
	"Closing Your Account",
	"Contact Us"
);

var werehereLink = new Array (
       "//help.ticketmaster.com/faqs/?tm_link=help_nav_4_top10",
	"//www.ticketmaster.com/h/correcting.html?tm_link=help_nav_4_correcting",
	"//www.ticketmaster.com/h/close-account.html?tm_link=help_nav_4_close",
	"//www.ticketmaster.com/h/customer-service.html?tm_link=help_nav_4_contact"
);

var policies = new Array(
"Policies and Security", //Title of the module	
"Terms of Use",
"Purchase Policy",
"Privacy Policy",
"AdChoices"
);

var policiesLink = new Array (
	"//www.ticketmaster.com/h/terms.html?tm_link=help_nav_5_terms",
	"//www.ticketmaster.com/h/purchase.html?tm_link=help_nav_5_purchase",
	"//www.ticketmaster.com/h/privacy.html?tm_link=help_nav_5_privacy",
	"//www.ticketmaster.com/h/ad-choices.html?tm_link=help_nav_5_adchoices"
);

var whoweare = new Array(
	"Who We Are", //Title of the module	
	"About Ticketmaster",
	"Our Fan Guarantee",
	"Ticketmaster Blog",
	"Across the Globe",
	"Careers",
	"Ticketmaster Logos"
);

var whoweareLink = new Array (
	"http://www.ticketmaster.com/about/about-us.html?tm_link=help_nav_6_about",
	"http://www.ticketmaster.com/ourguarantee?tm_link=help_nav_6_guarantee",
	"http://blog.ticketmaster.com/?tm_link=help_nav_6_ticketology",
	"http://www.ticketmaster.com/international?tm_link=help_nav_6_intl",
	"http://www.livenationentertainment.com/careers/?tm_link=help_nav_6_careers",
	"http://www.ticketmaster.com/brandguidelines?tm_link=help_nav_6_logos"
);

var beapart = new Array(
	"Be A Part of It", //Title of the module	
	"Ticket Your Event"
);

var beapartLink = new Array (
	"http://www.ticketmaster.com/ticketyourevent/"
);

//Write out the entire right navigation
function createNav(){
	writeLid(shipping[0]);
	showModule(shipping,shippingLink);
	writeLid(account[0]);
	showModule(account,accountLink);
	writeLid(buying[0]);
	showModule(buying,buyingLink);
	writeLid(werehere[0]);
	showModule(werehere,werehereLink);
	writeLid(policies[0]);
	showModule(policies,policiesLink);
	writeLid(whoweare[0]);
	showModule(whoweare,whoweareLink);
	writeLid(beapart[0]);
	showModule(beapart,beapartLink);
}

//define module title
function writeLid(title) {
	document.write('<div role="heading" aria-level="2">' + title + '</div>');
}

//Find current page
var theURL = window.location.pathname.split('/');
var thePage = theURL[theURL.length-1];
var currSite = location.hostname;

//write out the links within a module
function showModule(leftNavArray, navLink) {
	document.write("<ul>");
	
	for (var counter=1,counter2=0; counter< leftNavArray.length,counter2<navLink.length; counter ++,counter2++){
		if (currSite != "help.ticketmaster.com") {
			if ( navLink[counter2].match(thePage) ){
				document.write("<li><strong>");
				document.write(leftNavArray[counter]);		
				document.write("</strong></li>");
			} 
			else {
				document.write("<li><a href=\"");
				document.write(navLink[counter2]);		
				document.write("\">" + leftNavArray[counter]);
				document.write("</a></li>");
			}
		}
		else {
      document.write("<li><a href=\"");
			document.write(navLink[counter2]);		
			document.write("\">" + leftNavArray[counter]);
			document.write("</a></li>");

		}

	}
	document.write("</ul>");
}

// Open a new window
function liveChatWindow(url) {
	omniTracking.navigation_link('help_nav_4_chat',false);
	popUpWin = window.open(url,'chatWindow','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=640,height=640' );
	if (navigator.appName == 'Netscape') {
		popUpWin.focus();
	}
} 

