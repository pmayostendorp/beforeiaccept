/*! BARNES-BUILDER 2015-06-29 */
BN.Modal.Membership=BN.Modal.Membership||{},BN.Modal.Membership.Base=BN.Modal.Membership.Base||Extend(function(){var a=function(){consoleLog("Instantiating BN.Modal.Membership.Base")};return a.prototype={defaultOptions:{tplDir:SITE_ROOT+"/modals/membership/"}},a}(),BN.Modal.Base,!0),BN.Modal.Membership=BN.Modal.Membership||{},BN.Modal.Membership.Benefits=BN.Modal.Membership.Benefits||Extend(function(){var a=function(a,b){this.data=b,consoleLog("Instantiating BN.Modal.Membership.Benefits")};return a.prototype={tplName:"membership-benefits"},a}(),BN.Modal.Membership.Base,!0),BN.Modal.Membership=BN.Modal.Membership||{},BN.Modal.Membership.CancelFree=BN.Modal.Membership.CancelFree||Extend(function(){var a=function(){consoleLog("Instantiating BN.Modal.Membership.CancelFree")};return a.prototype={tplName:"cancel-free-membership",initView:function(){this.initGenericView(),this.initForm()}},a}(),BN.Modal.Membership.Base,!0),BN.Modal.Membership=BN.Modal.Membership||{},BN.Modal.Membership.SignUp=BN.Modal.Membership.SignUp||Extend(function(){var a=function(){consoleLog("Instantiating BN.Modal.Membership.SignUp")};return a.prototype={tplName:"member-sign-up",initView:function(){this.initGenericView(),this.initForm()}},a}(),BN.Modal.Membership.Base,!0),BN.Modal.Membership=BN.Modal.Membership||{},BN.Modal.Membership.UseSavedCC=BN.Modal.Membership.UseSavedCC||Extend(function(){var a=function(){consoleLog("Instantiating BN.Modal.Membership.UseSavedCC")};return a.prototype={tplName:"renewal-membership-manage-card",defaultOptions:{tplDir:SITE_ROOT+"/modals/membership/"},initView:function(){var a=this.data,b=$(a.target),c=b.attr("href")||"",d=$(this.modal);d.find(".membership-id").val(a["membership-id"]),!a.redirectSuccessUrl&&b.length>-1&&""!=c&&"#"!=c&&("/"==c.substr(0,1)&&(c=SITE_DOMAIN_URL+c),consoleLog(c),a.redirectSuccessUrl=c),this.initGenericView(),this.initForm()}},a}(),BN.Modal.Account.Base,!0);