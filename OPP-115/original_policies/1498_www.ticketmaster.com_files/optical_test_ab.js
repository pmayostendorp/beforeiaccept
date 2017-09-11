// The this should be set by optimizely
// forced_captcha = (1|2|Solve)
// 1        => will force Google reCaptcha v1
// 2        => will force Google reCaptcha v2
// Solve => will force Solve captcha
var forced_captcha = null;

function get_captcha_choice_for_optical_test_ab(is_solve_enabled, captcha_to_show) {
    var captcha_choice = this.get_forced_captcha_choice_for_optical_test_ab();

    if( captcha_choice && captcha_to_show != "immune") {
        if ( captcha_choice == 'Solve' && is_solve_enabled ) {
            return 'solve_media';
        } else if ( ( captcha_choice == '2' ) &&
		    ( ( typeof(obj_recaptchaV2) != 'undefined' && obj_recaptchaV2 != null && obj_recaptchaV2.settings.enable  ) ||
			  ( typeof(obj_recaptcha_V2) != 'undefined' && obj_recaptcha_V2 != null && obj_recaptcha_V2.settings.enable ) ) ) {
            return 'recaptchav2';
        } else if ( captcha_choice == '1' ) {
		obj_recaptchaV2  = null;
		obj_recaptcha_V2 = null;
            return 'recaptcha';
        }
    }
    return captcha_to_show;
}

function get_forced_captcha_choice_for_optical_test_ab() {
    var captcha_choice = forced_captcha === null ? "" : forced_captcha;
    if ( captcha_choice == 'Solve' || captcha_choice == '1' || captcha_choice == '2') {
        return captcha_choice;
    }
}

function get_solve_status_for_optical_test_ab(is_solve_enabled, captcha_to_show) {
    if (captcha_to_show == 'recaptcha' || captcha_to_show == 'recaptchav2' ) {
		return false;
	}
	return is_solve_enabled;
}
