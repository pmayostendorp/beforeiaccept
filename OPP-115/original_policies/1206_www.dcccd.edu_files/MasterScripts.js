// Author: Travis Haapala
// Description: DCCCD Script Library
// Prequisites: JQuery 1.8.3

// String overrides
String.prototype.trim = function () {
	return this.replace(/(^[\s\xA0]+|[\s\xA0]+$)/g, "");
}
String.prototype.ltrim = function () {
	return this.replace(/^[\s\xA0]+/, "");
}
String.prototype.rtrim = function () {
	return this.replace(/[\s\xA0]+$/, "");
}

// Title: DCCCD_OnLoadEvents
// Description: Stores a list of function calls to make as soon as the page has fully loaded.
var DCCCD_OnLoadEvents = DCCCD_OnLoadEvents ? DCCCD_OnLoadEvents : function () {
	// private tracking variables
	var _event_array = new Array();

	// return public methods and properties
	return {
		AddEvent: function (event) {
			// add the event to the array
			if (typeof event == "function")
				_event_array[_event_array.length] = event;
		},

		Execute: function () {
			// iterate through each event and execute it
			for (var i = 0; i < _event_array.length; i++)
				try { _event_array[i](); }
				catch (e) { }
		}
	};
}();


// Title: DCCCD_Utils
// Description: A place to put all those functions that I end up re-writing over and over.
var DCCCD_Utils = DCCCD_Utils ? DCCCD_Utils : function () {
	// return public methods and properties
	return {
		IsNull: function (item) {
			return (!item || item == undefined || item == null)
		},

		GetElement: function (id) {
			var element = document.getElementById(id);
			if (!DCCCD_Utils.IsNull(element))
				return element;
			return null;
		},

		HideElement: function (id) {
			var element = DCCCD_Utils.GetElement(id);
			if (!DCCCD_Utils.IsNull(element))
				try { element.style.display = 'none'; }
				catch (e) { }
		},

		ShowElement: function (id) {
			var element = DCCCD_Utils.GetElement(id);
			if (!DCCCD_Utils.IsNull(element))
				try { element.style.display = 'block'; }
				catch (e) { }
		},

		HasClass: function (element, class_name) {
			if (DCCCD_Utils.IsNull(element) || 				// the element is null
				DCCCD_Utils.IsNull(element.className) || // the element has no classes
				DCCCD_Utils.IsNull(class_name))				// the class name is null

				return false;

			else {
				var class_list = element.className.split(" ");

				for (var i = 0; i < class_list.length; ++i) {
					if (class_list[i].toLowerCase().trim() == class_name.toLowerCase().trim()) {
						return true
					}
				}
			}

			// if we got here, it's not there
			return false;
		},
		AppendClass: function (element, class_name) {
			// if the element doesn't already have the class we want to add
			if (!DCCCD_Utils.HasClass(element, class_name) && !DCCCD_Utils.IsNull(class_name))

				element.className += (" " + class_name);
		},
		RemoveClass: function (element, class_name) {
			// if the element has the class we want to remove
			if (DCCCD_Utils.HasClass(element, class_name)) {
				// convert the classes into an array
				var class_list = element.className.split(" ");
				var new_class_str = "";

				for (var i = 0; i < class_list.length; ++i) {
					if (class_list[i].toLowerCase().trim() != class_name.toLowerCase().trim()) {
						if (new_class_str == "")
							new_class_str = class_list[i].trim();
						else
							new_class_str += " " + class_list[i].trim();
					}
				}

				element.className = new_class_str;
			}
		},

		IsChildOf: function (parent, child) {
			if (DCCCD_Utils.IsNull(parent) || DCCCD_Utils.IsNull(child))
				return false;

			var cur_child = child;
			while (cur_child.parentNode) {
				if ((cur_child = cur_child.parentNode) == parent)
					return true;
			}
			return false;
		},

		PeekAlert: function (stuff) {
			var msg = '';
			stuff.find('*').each(function () {
				msg = msg + $(this).prop('tagName') + ') ' + $(this).attr('id') + ' : ' + $(this).attr('style') + '\n';
			});
			alert(msg);
		},

		IsPublishedSite: function () {
			try { return (window.location.href.indexOf('//www.') > -1); }
			catch (e) { return -1; }
		}
	};
}();


// Title: DCCCD_MegaNav
// Description: Handles the 'mega bar' nav system
var DCCCD_MegaNav = DCCCD_MegaNav ? DCCCD_MegaNav : function () {
	// private constants
	var kNavItemPrefix = "MainNav_";
	var kNavGroupPrefix = "SubNav_";

	// styling
	var SelectedStyle = "Selected";
	var ExpandedHeight = 100;
	var CollapsedHeight = 0;

	// private tracking variables
	var _timer = null;
	var _interval = 5;
	var _incriment = 10;
	var _height = 0;
	var _selected = null;
	var _state = "collapsed";
	var _delayon = null;
	var _delayoff = null;
	var _delaywait = 15;


	// gets the ID of the main nav item div
	function BuildNavItemID(name) {
		return kNavItemPrefix + name;
	}
	// gets the ID of the subnav group div
	function BuildNavGroupID(name) {
		return kNavGroupPrefix + name;
	}

	// get / set element style height
	function GetHeight(obj) {
		return obj.style.height.replace("px", "");
	}
	function SetHeight(obj, value) {
		obj.style.height = value + "px";
	}

	// clear timer
	function ClearTimer(timer) {
		if (!DCCCD_Utils.IsNull(timer))
			window.clearTimeout(timer);
		timer = null;
	}

	// set normal / selected CSS class on target object
	function SetSelected(name) {
		if (!DCCCD_Utils.IsNull(name) && name != _selected) {
			if (!DCCCD_Utils.IsNull(_selected))
				ClearSelected();

			var nav_item = DCCCD_Utils.GetElement(BuildNavItemID(name));
			var nav_group = DCCCD_Utils.GetElement(BuildNavGroupID(name));

			if (!(DCCCD_Utils.IsNull(nav_item) || DCCCD_Utils.IsNull(nav_group))) {
				// add item style
				if (!DCCCD_Utils.IsNull(SelectedStyle))
					DCCCD_Utils.AppendClass(nav_item, SelectedStyle);

				// set group attributes
				nav_group.style.display = 'block';
				SetHeight(nav_group, _height);

				// store selected
				_selected = name;
			}
		}
	}
	function ClearSelected() {
		if (!DCCCD_Utils.IsNull(_selected)) {
			var nav_item = DCCCD_Utils.GetElement(BuildNavItemID(_selected));
			var nav_group = DCCCD_Utils.GetElement(BuildNavGroupID(_selected));

			if (!(DCCCD_Utils.IsNull(nav_item) || DCCCD_Utils.IsNull(nav_group))) {
				// remove item style
				if (DCCCD_Utils.HasClass(nav_item, SelectedStyle))
					DCCCD_Utils.RemoveClass(nav_item, SelectedStyle);

				// set group attributes
				nav_group.style.display = 'none';
				SetHeight(nav_group, CollapsedHeight);

				// unset selected
				_selected = null;
			}
		}
	}

	// resolves user clicks
	function ResolveInput(name, force) {

		// determine the current state of the nav
		switch (_state) {
			// if we're collapsed, set content and expand                                                                                                     
			case 'collapsed':
				SetSelected(name);
				Expand_Begin(force);
				break;

				// if we're collapsing, start expanding from current position                                                                                                     
			case 'collapsing':
				SetSelected(name);
				Expand_Begin(force);
				break;

				// if we're expanded                                                                                                     
			case 'expanded':
				// if they clicked the selected, collapse
				if (name == _selected)
					Collapse_Begin(force);

					// otherwise, just swap content
				else
					SetSelected(name);

				break;

				// if we're expanding                                                                                                     
			case 'expanding':
				// if they clicked the selected, start collapsing from current position
				if (name == _selected)
					Collapse_Begin(force);

					// otherwise, just swap content
				else {
					SetSelected(name);

					// if we're forcing it, auto-complete expansion
					if (force)
						Expand_Begin(force);
				}
				break;

			default:
				break;
		}
	}

	// resolves user mouseover
	function DelayBeginOpen() {
		Expand_Begin(false);
		ClearTimer(_delayon);
	}
	function DelayForceOpen() {
		Expand_Begin(true);
		ClearTimer(_delayon);
	}
	function ResolveMouseOver(name) {
		// set the new intended subnav
		SetSelected(name);
		if (!DCCCD_Utils.IsNull(_delayoff)) {
			ClearTimer(_delayon);
		}

		// determine the current state of the nav
		switch (_state) {
			// if we're collapsed, start delay to expand                                                                                                      
			case 'collapsed':
				if (DCCCD_Utils.IsNull(_delayon))
					_delay = window.setTimeout(DelayBeginOpen, _delaywait);
				break;

				// if we're collapsing, start expanding from current position                                                                                                      
			case 'collapsing':
				_state = 'expanding';
				if (!DCCCD_Utils.IsNull(_delayon)) {
					ClearTimer(_delayon);
				}
				SetSelected(name);
				break;

				// if we're expanded or expanding, just swap out the subnav content                       
			case 'expanded':
			case 'expanding':
				SetSelected(name);
				break;

			default:
				break;
		}
	}

	// resolves user mouseout
	function DelayBeginClose() {
		StopMouseOut();
		Collapse_Begin(false);
	}
	function StopMouseOut() {
		ClearTimer(_delayoff);
		ResolveMouseOver(name);
	}
	function ResolveMouseOut(name) {
		if (!DCCCD_Utils.IsNull(_delayon)) {
			ClearTimer(_delayon);
		}
		_delayoff = window.setTimeout(DelayBeginClose, _delaywait);
	}

	function Expand_Begin(force) {
		// if forced, auto-complete expansion
		if (force) {
			Expand_Complete();
		}

			// otherwise, set the animation
		else {
			_state = 'expanding';

			ClearTimer(_timer);
			_timer = window.setTimeout(Update, _interval);
		}
	}

	function Expand_Complete() {
		_state = 'expanded';
		_height = ExpandedHeight;

		ClearTimer(_timer);

		var nav_group = DCCCD_Utils.GetElement(BuildNavGroupID(_selected));
		if (!DCCCD_Utils.IsNull(nav_group)) {
			SetHeight(nav_group, ExpandedHeight);
		}
	}

	function Collapse_Begin(force) {
		// if forced, auto-complete expansion
		if (force) {
			Collapse_Complete();
		}

			// otherwise, set the animation
		else {
			_state = 'collapsing';
			ClearTimer(_timer);
			_timer = window.setTimeout(Update, _interval);
		}
	}

	function Collapse_Complete() {
		_state = 'collapsed';
		_height = CollapsedHeight;

		ClearTimer(_timer);

		var nav_group = DCCCD_Utils.GetElement(BuildNavGroupID(_selected));
		if (!DCCCD_Utils.IsNull(nav_group)) {
			SetHeight(nav_group, CollapsedHeight);

			ClearSelected();
		}
	}

	function Update() {
		var nav_group = DCCCD_Utils.GetElement(BuildNavGroupID(_selected));

		if (!DCCCD_Utils.IsNull(nav_group)) {
			var loop = true;

			if (_state == 'expanding') {
				_height += _incriment;

				if (_height >= ExpandedHeight) {
					loop = false;
					Expand_Complete();
				}
			}

			else if (_state == 'collapsing') {
				_height -= _incriment;

				if (_height <= CollapsedHeight) {
					loop = false;
					Collapse_Complete();
				}
			}

			SetHeight(nav_group, _height);
			if (loop) {
				SetHeight(nav_group, _height);
				_timer = window.setTimeout(Update, _interval);
			}
		}
	}

	// return public methods and properties
	return {
		SetSelectedStyle: function (style) {
			SelectedStyle = style;
		},

		SetCollapsedHeight: function (height) {
			CollapsedHeight = height;
		},

		SetExpandedHeight: function (height) {
			ExpandedHeight = height;
		},

		SetNavContainer: function (name) {
			var nav_container = DCCCD_Utils.GetElement(name);
			if (!DCCCD_Utils.IsNull(nav_container)) {
				nav_container.onmouseover = function () { StopMouseOut(); };
				nav_container.onmouseout = function () { ResolveMouseOut(); };
			}
		},

		Register: function (name) {
			var nav_item = DCCCD_Utils.GetElement(BuildNavItemID(name));
			if (!DCCCD_Utils.IsNull(nav_item)) {
				nav_item.onmouseover = function () { ResolveMouseOver(name); };
				nav_item.style.cursor = 'pointer';
			}
		}
	};
}();

// Title: DCCCD_FixSP
// Description: Performs some clean-up on SharePoint objects that are difficult or impossible to access server-side
var DCCCD_FixSP = DCCCD_FixSP ? DCCCD_FixSP : function () {
	// return public methods and properties
	return {
		HideEmptyRegions: function () {
			// hide unused sections
			try {
				var sections_parent = $('.PageContainer:not(.InEditMode) .HideParentIfEmpty');
				sections_parent.each(function (index) {
					if (DCCCD_FixSP.IsEmptyRegion($(this)))
						$(this).parent().hide();
				});

				var sections_self = $('.PageContainer:not(.InEditMode) .HideSelfIfEmpty');
				sections_self.each(function (index) {
					if (DCCCD_FixSP.IsEmptyRegion($(this)))
						$(this).hide();
				});
			}
			catch (e) { }
		},

		IsEmptyRegion: function (region) {
			var clone = region.clone();
			clone.find('*').filter(function () { return $(this).css("display") == "none" }).remove();

			var img_cnt = (clone.find('img').length);
			var iframe_cnt = (clone.find('iframe').length);
			var reuse_cnt = (clone.find('span#__publishingReusableFragment').length);
			var text = clone.text().trim();
			var no_text = DCCCD_Utils.IsNull(text);

			return (img_cnt < 1 &&
				iframe_cnt < 1 &&
				reuse_cnt < 1 &&
				no_text)
		},

		HideEmptyLinkedRegions: function () {
			// hide unused sections
			try {
				for (var i = 1; i > 0; ++i) {		// start infinite loop
					var group = $('.LinkedGroup' + i);
					if (group.length == 0)
						break;						// break when we get zero results for the current group
					var is_empty = true;
					group.each(function (index) {
						if (!DCCCD_FixSP.IsEmptyRegion($(this)))
							is_empty = false;
					});

					if (is_empty)
						group.each(function (index) {
							$(this).css('display', 'none');
						});
				}
			}
			catch (e) { alert("Error encountered:\n" + e); }
		},

		SetImageTitles: function () {
			try {
				var images = $('img');
				images.each(function (index) {
					if (!$(this).attr('title'))
						if ($(this).attr('alt'))
							$(this).attr('title', $(this).attr('alt'));
				});
			}
			catch (e) { }
		},

		DetermineBranding: function () {
			try {
				var url = window.location.toString().toLowerCase();
				var NoBranding = url.indexOf('nobranding=1') > -1 || url.indexOf('nobranding=true') > -1;
				var PopOut = url.indexOf('popout=1') > -1 || url.indexOf('popout=true') > -1;
				
				if (NoBranding || PopOut) {
					if (NoBranding) {
						$('head').append(
							$('<link/>', { href: '/Style Library/DCCCD/Styles/NoBranding.css', rel: 'stylesheet' })
						);
					}
					
					$('.PageContent a[href]').not('[href^="tel:"]').each(function(index) {
						var target = $(this).attr('target');
						var href   = $(this).attr('href');
						
						// propogate settings to links on the page
						var new_target = target;
						var new_href   = href;
						var new_sep    = '?';
						
						if (href.indexOf('?') > -1)
							new_sep = '&';
												
						if (NoBranding && PopOut) {
							new_target = '_blank';
							new_href   = 'NoBranding=True&PopOut=True';
						}
						
						else if (NoBranding) {
							new_href = 'NoBranding=True';
						}
						
						else if (PopOut) {
							new_target = '_blank';
							new_href   = 'PopOut=True';
						}
						
						
						
						if (!DCCCD_Utils.IsNull(href) && (DCCCD_Utils.IsNull(target) || target != '_blank')) {
							$(this).attr('href', href + new_sep + new_href);
							$(this).attr('target', new_target);
						}

					});
				}
			}
			catch (e) { }
		},

		WrapPublishedLists: function () {
			try {
				if (DCCCD_Utils.IsPublishedSite() == true) {
					$('.MainContent ul, .MainContent ol').each(function (index) {
						$(this).wrap("<table><tr><td /></tr></table>");
					});
				}
			}
			catch (e) { }
		}
	};
}();


// Title: DCCCD_Pagination
// Description: Converts a many-item list of pages into an easier form to work with. Just
//              let it know which elements to flag as PaginationContainer and PaginationItem.
var DCCCD_Pagination = DCCCD_Pagination ? DCCCD_Pagination : function () {
	// private data members
	var ItemCount = 0;
	var SliceLength = 10;
	var IsPaginated = false;

	// private method members
	function SetVisibility() {
		// show all items
		$('.PaginationItem').show();

		// hide all except our slice
		$('.PaginationContainer').each(function () {
			$(this).find('.PaginationItem').slice(SliceLength).hide();
		});

		// show more/less links as appropriate
		if (SliceLength >= ItemCount)
			$('.PaginateShowMore').hide();
		else
			$('.PaginateShowMore').show();

		if (SliceLength <= 10)
			$('.PaginateShowLess').hide();
		else
			$('.PaginateShowLess').show();

		// set drop-down list
		$('.PaginateSelector').each(function () {
			if ($(this).find('option').filter('[value="' + SliceLength + '"]').length > 0)
				$(this).find('option')
					.prop('selected', false)
					.filter('[value="' + SliceLength + '"]')
					.prop('selected', true);
		});
	}

	function StepSlice(step_incriment) {
		SliceLength = parseInt(SliceLength) + parseInt(step_incriment);

		if (SliceLength % 10 != 0)
			SliceLength -= SliceLength % 10;
			
		if (SliceLength < 10)
			SliceLength = 10;

		if (SliceLength > ItemCount)
			SliceLength = ItemCount;
	}

	function GetInitialValues() {
		// set initial values of ItemCount and SliceLength
		$('.PaginationContainer').each(function () {
			ItemCount = $(this).find('.PaginationItem').length;
			//Modify Default Number Shown On PageLoad
			SliceLength = 10;
		});
	}

	function InjectElements() {
		// html to insert
		var kLessLink = '<a href="javascript: return false;" class="PaginateShowLess">...</a>';
		var kMoreLink = '<a href="javascript: return false;" class="PaginateShowMore">...</a>';
		var kPageSets = '';
		if (ItemCount > 10) {
			kPageSets += '<select class="PaginateSelector">';
			
			if (ItemCount > 10)
				kPageSets += '<option value="10">10</option>';

			if (ItemCount > 20)
				kPageSets += '<option value="20">20</option>';

			if (ItemCount > 30)
				kPageSets += '<option value="30">30</option>';

			if (ItemCount > 40)
				kPageSets += '<option value="40">40</option>';

			kPageSets += '<option value="' + ItemCount + '">' + ItemCount + '</option>';

			kPageSets += '</select>';
		}

		// wrap the existing html in less/more
		if (ItemCount > 10) {
			var ihtml = '';
			$('.PaginationContainer').each(function () {
				ihtml = $(this).html();
				$(this).html(kLessLink + ihtml + kMoreLink + kPageSets);
			});
		}
	}

	// public method members
	return {
		Paginate: function () {
			if (IsPaginated == false) {
				IsPaginated = true;
				try {
					GetInitialValues();

					if (ItemCount > 5) {
						InjectElements();

						SetVisibility();

						// Wire up Show More button
						$(".PaginateShowMore").click(function () {
							StepSlice(10);

							SetVisibility();
						});

						// Wire up Show Less button 
						$(".PaginateShowLess").click(function () {
							StepSlice(-10);

							SetVisibility();
						});

						// Wire up Page Selector button
						$(".PaginateSelector").change(function () {
							// get selected value
							SliceLength = $(this).find('option:selected').val();

							SetVisibility();
						});
					}
				}
				catch (e) { }
			}
		}
	};
}();


// Title: DCCCD_Animation
// Description: Some general animation scripts
var DCCCD_Slider = DCCCD_Slider ? DCCCD_Slider : function () {
	// private data members
	var kInterval = 5000;
	var kEasing = 400;
	var IsActive = false;
	var items;
	var index = 0;

	// private method members
	function CycleNext() {
		try {
			var next = index + 1;
			if (next >= items.length)
				next = 0;
			var cur = items.eq(index);
			var nex = items.eq(next);
			index = next;

			nex.fadeTo(0, 1);
			cur.fadeTo(kEasing, 0, function () { cur.css('z-index', 1); nex.css('z-index', 10); });
		}
		catch (ex) { }
	}

	// public method members
	return {
		Start: function () {
			if (IsActive == false) {
				IsActive = true;
				try {
					items = $('.PageSlider .SliderItem');
					if (items.length < 1) {
						$('.PageSlider').hide();
					}
					else {
						items.each(function (index) {
							if (index == 0)
								$(this).css('z-index', 10);
							else
								$(this).fadeTo(0, 0, function () { $(this).css('z-index', 1); });
						});
						setInterval(CycleNext, kInterval);
					}
				}
				catch (ex) {  }
			}
		}
	};
}();

// Author: Yousif Rashid
// Description: Mobile Menu Toggle
// Prequisites: JQuery 2.1.1
$(function () {

$( ".Mobile_Button" ).click(function() {
$(".Mobile_Menu").slideToggle();
});
});

// Author: Yousif Rashid
// Description: DCCCD Script Library
// Prequisites: JQuery 2.1.1
  // table to accordion
  
  $(function () {
      $("table.accord").each(function () {
          var trAcc = $(this).find("tr"),
              thRows = trAcc.length,
              thHead = [];

          trAcc.append('<i class="icon-accordion" style="color: #fff;">+</i>');
          trAcc.click(function () {
              if ($(this).hasClass("accordion-opened")) {
                  $(this).animate({
                      maxHeight: "40px"
                  }, 200).removeClass("accordion-opened").find(".icon-accordion").text("+");

              } else {
                  $(this).animate({
                      maxHeight: "1000px"
                  }, 400).addClass("accordion-opened").find(".icon-accordion").text("-");
              
              
              }
          });
      });
  });

// Select events to perform on-load
DCCCD_OnLoadEvents.AddEvent(DCCCD_FixSP.HideEmptyRegions);
DCCCD_OnLoadEvents.AddEvent(DCCCD_FixSP.SetImageTitles);
DCCCD_OnLoadEvents.AddEvent(DCCCD_FixSP.DetermineBranding);
//DCCCD_OnLoadEvents.AddEvent(DCCCD_FixSP.WrapPublishedLists); // temp disabled due to bug in IE 9
DCCCD_OnLoadEvents.AddEvent(DCCCD_FixSP.HideEmptyLinkedRegions);

// Execute scripts once page is loaded
$(document).ready(function () { 

DCCCD_OnLoadEvents.Execute();

//Hyperlink Absolutifier
//Removed Again - Ended up Changing to Relative URL but with direct path to specific default.aspx page for that site.
//$('a').each(function(){$(this).attr('href',this.href);});

 })