LeadspendValidation = function () {
    return {
        Url: "https://primary.api.leadspend.com/v2/validity/",
        Timeout: 3000,    
        OriginalText: "",   
		EmailInput: "#email-input",  
        ValidationDiv: "#TMFECapWidgetErrorDiv",
        SubmitButton: null, 
		Submitted: false,  
		Validated: false, 

        run: function (inputSelector, params) {            
            var self = this;                
            if (typeof(inputSelector) !== "undefined") {
                self.EmailInput = inputSelector;                   
            }
            self.SubmitButton = jQuery(self.EmailInput).parent().find('input[type=submit]').first();  
            self.enableForm(); //If a user comes back to the page make sure form is re-enabled.
            self.SubmitButton.click(jQuery.proxy(this.validateEmailAddress, this));                         
        },

        validateEmailAddress: function (event) {
        	var self = this;                    	
        	var email = jQuery(self.EmailInput).first().val();

        	if (email == "" || email == "Email Address") {
        		this.showError('Please enter your email address');      
            } else if (email.indexOf('@...') > -1) {
                self.removeError();
                self.Submitted = true;
                self.Validated = true;

                self.SubmitButton.addClass('loading');
                self.SubmitButton.prop('disabled', true); 

                self.submitForm(); 	   	
        	} else {
	        	self.removeError();
	        	self.Submitted = true;
	        	self.Validated = false;

				setTimeout(jQuery.proxy(function() { self.timeoutRequest(); }, self), self.Timeout + 1000);

	        	self.SubmitButton.addClass('loading');
	        	self.SubmitButton.prop('disabled', true); 

	        	jQuery.ajax({
	                url: self.Url + encodeURIComponent(jQuery(self.EmailInput).first().val()),
	                data: { timeout: self.Timeout },
	                dataType: 'jsonp',
	                jsonp: 'callback',
	                jsonpCallback: 'leadspendValidation_' + Math.floor((Math.random()*100000000)+1),
	                crossDomain: true,
	                timeout: self.Timeout,
	                error: function () {
	                    self.ajaxRequestFailureCallBack();
	                },
	                success: function (data) {
	                    self.ajaxRequestSuccessCallBack(data);
	                }
	            });  

	        }
            if (typeof(event) !== "undefined") {
                event.preventDefault();         
            }            
        },

        timeoutRequest: function() {
        	var self = this;
        	if (!self.Validated && self.Submitted) {
        		self.submitForm();
        	}
        },

        ajaxRequestSuccessCallBack: function(data) {
        	var self = this;
        	self.Validated = true;

        	if (!self.isValid(data.result)) {
                self.validationFailure(data);
                self.enableForm();   		
        	} else {
        		self.validationSuccess(data.result);        	
        	}
        },

        ajaxRequestFailureCallBack: function() {
            var self = this;                        
        	self.SubmitButton.removeClass('loading');  
            if (typeof(mixpanel) !== "undefined") {
                mixpanel.track("LeadspendRequestFailure"); 
            }      	
        },

        enableForm: function() {
            var self = this;                        
            self.SubmitButton.removeClass('loading');
            self.SubmitButton.prop('disabled', false);      
        },

        validationSuccess: function(result) {
            var self = this;       
        	self.submitForm();
        },

        validationFailure: function(jsonDataFromApi) {
        	var self = this;       
            if (typeof(mixpanel) !== "undefined") {
            	mixpanel.track("InvalidEmail", {"ErrorReason": jsonDataFromApi.result}); 
            }
        	self.showError('Please enter a valid email');
        },

        submitForm: function() {
            var self = this;                        
			jQuery(self.EmailInput).closest('form').submit();
        },

        showError: function(msg) {        	
        	var self = this;
        	self.OriginalText = jQuery('#TMFECapWidgetErrorDiv').text();
        	jQuery(self.ValidationDiv).text(msg);
        	jQuery(self.ValidationDiv).addClass('error');
        	jQuery(self.EmailInput).addClass('ecapWidget_error');
        	jQuery(self.EmailInput).filter(':first').focus();
        },

        removeError: function() {
        	var self = this;
        	jQuery(self.ValidationDiv).text(self.OriginalText);
        	jQuery(self.ValidationDiv).removeClass('error');
        	jQuery(self.EmailInput).removeClass('ecapWidget_error');
        },

        isValid: function(apiResult) {
        	switch (apiResult) {
		        case "unreachable": 
                case "undeliverable":               
                case "illegitimate":                 
                    return false;	        		        
	            default:
	            	return true;
			}	            					
        }
    };
};