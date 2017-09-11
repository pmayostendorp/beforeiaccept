P.when("A","csHelpOmniture").execute("hmd-workflow",function(A,csHelpOmniture){A.declarative("a-hmd-yes","click",function(event){A.$("#hmd-FeedbackBox").addClass("a-hidden");
A.$("#hmd-ConfirmYesBox").removeClass("a-hidden");
var feedbackKind="";
var freeformText="";
csHelpOmniture.storeHMDResults(true,feedbackKind,freeformText);
});
A.declarative("a-hmd-no","click",function(event){A.$("#hmd-FeedbackBox").addClass("a-hidden");
A.$("#hmd-ReasonBox").removeClass("a-hidden");
});
A.declarative("a-hmd-submit","click",function(event){var params=A.$("#hmd-ReasonBox input[type=radio]").serialize();
if(params){A.$("#hmd-ReasonBox").addClass("a-hidden");
A.$("#hmd-ConfirmNoBox").removeClass("a-hidden");
var feedbackKind=A.$("#hmd-ReasonBox input[type=radio]:checked").val();
var freeformText="";
csHelpOmniture.storeHMDResults(false,feedbackKind,freeformText);
}else{}});
});
if("undefined"!==typeof(amznJQ)){amznJQ.declareAvailable("cs-retail-help-digital-hmd-widget");
}