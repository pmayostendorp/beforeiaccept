/* ==========================================================================
   Kraft JS
   ========================================================================== */

var kraft = kraft || {};
kraft = {
	_window: $(window),
	viewportWidth: -1,
	desktopHeaderHeight: -1,
	desktopHeaderOffset: -1,
	stickyHeaderHeight: -1,
	currentScrollPosition: 0,
	currentBootstrapEnv: "xs",
	breakpoint: 767,
	templateName: "",
	clickEventName: (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) ? 'touchend' : 'click',
	ads: [],
	facebookAppId: -1,
	krError: "An error has occured",
	ckError: "Ha ocurrido un error",
	recipeId: -1,
	shoppingListId: -1,
	editMode: false,
	inlineBV: []
};