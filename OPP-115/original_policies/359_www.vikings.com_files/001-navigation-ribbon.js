/**
 * @author Matthew.Marcus
 * @namespace nflcs.gbl.mod.GlobalNavigation.ribbonNav
 */
$nflcs.ns('nflcs.gbl.mod.GlobalNavigation', {

    /**
     * Builds the navigation ribbon
     *
     * @return Void
     */
	ribbonNav: {
		fragmentAds: new Array(),

        /**
         * Load the ads in the ribbon navigation.
         *
         * @param parent String the parent container/menu item eg "main-nav-news"
         * @param adCount Int the number of ads to display
         * @return Void
         */
		loadAds: function(parent, adCount){
            var paneContent = $nflcs('#ribbon-container div.fragment-container[parent="' + parent + '"]');

            $nflcs($nflcs.cleanSelector("nflcs\\:ad"), paneContent).each(function(){
                $(this).data("vendor","Simplified");
                //Now using "simplified" "vendor", code commented below used to store GPTadTag slots in an array
                //nflcs.gbl.mod.GlobalNavigation.ribbonNav.fragmentAds.push($nflcs.ad.makeAd(this));
                $nflcs.ad.makeAd(this);
            });

		},

        /**
         * Reloads the ads if user goes back to
         * the same menu item while still on
         * the same page thus avoiding multiple
         * ajax calls
         *
         * @param fragmentContainer String the stored/cached html for the ribbon navigation
         * @return Void
         */
		reloadAds: function(fragmentContainer){
			$nflcs($nflcs.cleanSelector("nflcs\\:ad"), fragmentContainer).each(function(index, value){
                //no longer utilizing the array, but instead the "simplified" "vendor"
                //$nflcs.ad.makeAd(value, nflcs.gbl.mod.GlobalNavigation.ribbonNav.fragmentAds[index]);
                $nflcs.ad.makeAd(this);
            });
		},

        /**
         * Opens the ribbon navigation  with settings
         * provided by a settings object
         *
         * @param settings Object display settings for the ribbon navigation (show effect, duration  etc)
         * @return Void
         */
		openRibbon: function(settings){
			var ribbonContainer = settings.ribbonContainer;
//			if($nflcs(ribbonContainer).data('in-transition') == false && $nflcs(ribbonContainer).data('container-open') == false){
				$nflcs(ribbonContainer).data('in-transition', true);
				$nflcs(ribbonContainer).slideDown({
					duration: settings.duration,
					easing: settings.effect,
					complete: function(){
						$nflcs(ribbonContainer).data('container-open', true);
						$nflcs(ribbonContainer).data('in-transition', false);
					}
				});
//			}
		},

        /**
         * Closes the navigation menu
         *
         * @param settings Object the settings used to control how to close the navigation menu (hide effect + duration etc)
         * @return Void
         */
		closeRibbon: function(settings){
			var fragContainers = settings.fragmentContainers;
			var ribbonContainer = settings.ribbonContainer;
//			if($nflcs(ribbonContainer).data('in-transition') == false && $nflcs(ribbonContainer).data('container-open') == true){
				$nflcs(ribbonContainer).data('in-transition', true);
				$nflcs(ribbonContainer).slideUp({
					duration: settings.duration, 
					easing: settings.effect, 
					complete: function(){
						$nflcs(ribbonContainer).data('container-open', false);
						$nflcs(ribbonContainer).data('in-transition', false);
						$nflcs(fragContainers).removeClass('show');
					}
				});
//			}
		},

        /**
         * Get the content for the ribbon navigation from the server
         *
         * @param fragmentContainer String which ribbon navigation we need to get
         * @return Void
         */
		getPanelContent: function(fragmentContainer){
			$nflcs.xDomainAjax({
				dataType  : 'html',
				url       : $nflcs(fragmentContainer).attr('rel'),
				type      : 'GET',
				success   : function(response, textStatus) {
					$nflcs(response).find('#sec-nav-flyout').next().remove();
					var	
						newAds = $nflcs(response).find('.ad-bottom, .ad-top, .ad-chrome, .ad-right, .ad-left, .ad-no-style');
					
					if($nflcs(newAds).length > 0){
						var scriptString = '<script type="text/javascript" language="javascript">$nflcs(document).ready(function(){nflcs.gbl.mod.GlobalNavigation.ribbonNav.loadAds("' + $nflcs(fragmentContainer).attr('parent') + '", ' + $nflcs(newAds).length + ');});</script>';
						
						response += scriptString;
					}
					$nflcs(fragmentContainer).html(response);
					var newSecNav = $nflcs(fragmentContainer).find('#sec-nav-flyout');
					nflcs.gbl.mod.SecondNav.flyoutSectionNav.bindEvents(newSecNav);
					$nflcs(fragmentContainer).data('cache-status', true);
					
				},
				error: function(d, status){
					//$nflcs(fragmentContainer).html('<div class="ajax-error"><span>There was an error fetching Navigation Content.</span></div>');
					//console.log(d);
					//console.log(status);
					$nflcs(fragmentContainer).data('cache-status', false);
				},
				complete: function(d, status){
				}
			});
		},

        /**
         * Bind needed navigation events
         *
         * @param settings Object
         * @return Void
         */
		bindEvents: function(settings){
			var menuRoots = settings.rootLinks;
			var mainNav = settings.nav;
			var ribbonContainer = settings.ribbonContainer;
			var fragContainers = settings.fragmentContainers;
			settings.currentSectionRoot = false;
			
			$nflcs(ribbonContainer).bind('openRibbon', {ribbonObj: this}, function(event){
				event.data.ribbonObj.openRibbon(settings);
			});
			$nflcs(ribbonContainer).bind('closeRibbon', {ribbonObj: this}, function(event){
				event.data.ribbonObj.closeRibbon(settings);
				$nflcs(settings.rootLinks).each(function(){
					$nflcs(this).data('anchor').removeClass('hover');
				});
			});
			$nflcs(fragContainers).bind('getPanelContent', {ribbonObj: this}, function(event){
				event.data.ribbonObj.getPanelContent(this);
			});
			$nflcs(fragContainers).bind('reloadAds', {ribbonObj: this}, function(event){
				event.data.ribbonObj.reloadAds(this);
			});
			//Separate Mouseover event for instantaneous hover class handling
			$nflcs(menuRoots).mouseover(function(){
				if(settings.currentSectionRoot != false){
					$nflcs(menuRoots).each(function(){
						$nflcs(this).data('anchor').removeClass('hover');
					});
				}
			});
			$nflcs(menuRoots).mouseout(function(){
				$nflcs(settings.currentSectionRoot).addClass('hover');
			});
			
			$nflcs(menuRoots).hoverIntent({
				interval:100,
				timeout:200,
				over: function(){
					var assocFrag = $nflcs(this).data('fragment-container');
					var rootNode = $nflcs(assocFrag).data('root-node');
					var rootLink = $nflcs(rootNode).data('anchor'); 
					if($nflcs(this).data('anchor').hasClass('no-ribbon')){
//						if($nflcs(ribbonContainer).data('container-open') == true)
							$nflcs(ribbonContainer).trigger('closeRibbon');
					}
					else{
						if(!$nflcs(assocFrag).data('cache-status'))
							$nflcs(assocFrag).trigger('getPanelContent');
						else
							$nflcs(assocFrag).trigger('reloadAds');
						
						settings.currentSectionRoot = $nflcs(this).data('anchor');
						$nflcs(settings.rootLinks).each(function(){
							$nflcs(this).data('anchor').removeClass('hover');
						});
						$nflcs(rootLink).addClass('hover');
						$nflcs(fragContainers).removeClass('show');
						$nflcs(assocFrag).addClass('show');
						
						$nflcs(ribbonContainer).trigger('openRibbon');
					}
				},
				out: function(){
					//Do Nothing when leaving root links
				}		
			});
			$nflcs(mainNav).hoverIntent({
				interval:100,
				timeout:200,
				over: function(){
					
				},
				out: function(){
					settings.currentSectionRoot = false;
					$nflcs(ribbonContainer).trigger('closeRibbon');
				}
			});
		},

        /**
         * Set up the ribbon navigation
         *
         * @param options Object the settings for the ribbon navigation (duration and type of animation)
         * @return Void
         */
		load: function(options){
			var settings = {
				effect: 'jswing',
				duration: 500
			};
			if(options){
				$nflcs.extend(settings, options);
			}

			settings.nav = $nflcs('#main-nav-ribbon');
			settings.rootLinks = $nflcs(settings.nav).find('a.root-node-link').parent();
			settings.ribbonContainer = $nflcs(settings.nav).find('#ribbon-container');
			settings.fragmentContainers = $nflcs(settings.ribbonContainer).find('.fragment-container');
			$nflcs(settings.fragmentContainers).data('cache-status', false);
			$nflcs(settings.ribbonContainer).data('container-open', false);
			$nflcs(settings.ribbonContainer).data('in-transition', false);
			
			$nflcs(settings.rootLinks).each(function(index, li){
				var fragContainer = $nflcs(settings.ribbonContainer).find('div.fragment-container[parent="' + $nflcs(this).attr('id') + '"]');
				$nflcs(li).data('fragment-container', fragContainer);
				$nflcs(li).data('anchor', $nflcs(this).find('a.root-node-link'));
				$nflcs(fragContainer).data('root-node', li);
			});

			this.bindEvents(settings);
			
			//initialize Sec-nav-flyout object
			
			var secNavOptions = {
				navType : 'fly-out'
			};
			nflcs.gbl.mod.SecondNav.init(secNavOptions);
		}
	}
});