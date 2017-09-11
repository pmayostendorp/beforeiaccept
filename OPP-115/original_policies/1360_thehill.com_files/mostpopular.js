// $Id$
/*
 * Drupal Most Popular - Showcase the most popular content across your Drupal website and engage your audience.
 * Copyright © 2009-2012 New Signature
 * 
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * You can contact New Signature by electronic mail at labs@newsignature.com -or- by U.S. Postal Service at 1100 H St. NW, Suite 940, Washington, DC 20005.
 */
/**
 * @file Adds javascript actions to the most popular block.
 */
(function($) {
  Drupal.behaviors.mostpopular = {
    attach: function(context) {

      // Get the configuration options
      var options = $.extend(Drupal.behaviors.mostpopular.defaultOptions,
          Drupal.settings.mostpopular);
  
      // Attach to all the most popular blocks on the page
      var parents = $(options.blockSelector, context);
      parents.each(function() {
        var block = $(this);
        
        var serviceTabs = block.find(options.servicesSelector).filter('[data-sid]');
        var intervalTabs = block.find(options.intervalsSelector).filter('[data-iid]');
  
        // Keep track of the page we're currently looking at
        var selected = { 'sid' : null, 'iid' : null };
        
        // Get our current page from the cookies
        var bid = block.attr('data-bid');
        var cookie = $.cookie('mostpopular-' + bid);
        if (cookie) {
          var parts = cookie.split('/');
          selected.sid = parts[0];
          selected.iid = parts[1];
        }
  
        // Create a content container
        var content = block.find(options.contentSelector);
        var wrapper = content.wrap("<div />").parent()
        .css({
          position : 'relative'
        });
  
        // Create a throbber image
        if (options.showThrobber) {
          var throbber = $(Drupal.theme('MostPopularThrobber'))
          .css({
            position : 'absolute',
            zIndex : 100
          }).appendTo(wrapper).hide();
  
          // Redefine the show function for the throbber to center it
          throbber.centerAndShow = function() {
            var top = parseInt((wrapper.outerHeight({margin: true}) - throbber.height()) / 2);
            var left = parseInt((wrapper.outerWidth({margin: true}) - throbber.width()) / 2);
            throbber.css({
              top : top,
              left : left
            }).show();
          };
        }
  
        // -----------------------------------------------------
        // Bind all the links to services
        serviceTabs.each(function() {
          var tab = $(this).data('service', true);
          var sid = tab.attr('data-sid');
          
          var link = $('<a href="#"/>')
            .text(tab.text())
            .click(function() {
              selected.sid = sid;
              
              getSelected(tab);
              return false;
            });
          tab.html(link);
          tab.click(function() {
            return link.click();
          });
          
          // If this service is currently selected, load the content
          if (!selected.sid) {
            selected.sid = sid;
          }
          if (selected.sid == sid) {
            tab.addClass(options.selectedClass);
          }
        });
  
        // -----------------------------------------------------
        // Bind all the links to intervals
        intervalTabs.each(function() {
          var tab = $(this).data('interval', true);
          var iid = tab.attr('data-iid');
          
          var link = $('<a href="#"/>')
            .text(tab.text())
            .click(function() {
              selected.iid = iid;
              
              getSelected(tab);
              return false;
            });
          tab.html(link);
          tab.click(function() {
            link.click();
          });
          
          // If this interval is currently selected, load the content
          if (!selected.iid) {
            selected.iid = iid;
          }
          if (selected.iid == iid) {
            tab.click();
          }
        });
        
        function getSelected(tab) {
          if (selected.sid && selected.iid) {
            startReload();
            
            var path = selected.sid + '/' + selected.iid;
            
            // Save the cookie
            $.cookie('mostpopular-' + bid, path, { path: '/' });
            
            // Fetch the content via AJAX
            var url = options.url + '/' + bid + '/' + path;
            $.get(url, function(data) {
              onGet(tab, data);
            });
          }
        }
        
        /**
         * This function is called when there is new data from the AJAX call.
         * 
         * @param link
         *   The link object that clicked.
         * @param data
         *   The new HTML sent back from Drupal.
         */
        function onGet(tab, data) {
          finishReload(data);
  
          // Select the appropriate tabs
          if (tab.data('service')) {
            serviceTabs.removeClass(options.selectedClass);
          }
          else if (tab.data('interval')) {
            intervalTabs.removeClass(options.selectedClass);
          }
          tab.addClass(options.selectedClass);
          return false;
        }
  
        /**
         * Starts the process of reloading the most popular items, by hiding
         * the existing content and showing the throbber, if necessary.
         * 
         * The hideContent() method defined in the options will be called.
         */
        function startReload() {
          // Show the throbber and dim the content
          if (throbber) {
            throbber.centerAndShow();
          }
          options.hideContent(content);
        }
  
        /**
         * Finishes the process of reloading the most popular items, by showing
         * the new content and hiding the throbber, if necessary.
         * 
         * The showContent() method defined in the options will be called.
         * 
         * @param response
         *   A JSON response from Drupal.  It contains one key, 'data', whose
         *   value is an HTML string to render.
         */
        function finishReload(response) {
          // Replace the content, fade it back in and hide the throbber
          options.showContent(content, response);
          Drupal.behaviors.thehill_carousel.attach();
          if (throbber) {
            throbber.hide();
          }
        }
      });
    },
  
    /**
     * Defines the default options. Override these options in
     * Drupal.settings.mostpopular.
     */
    defaultOptions: {  
      'hideContent' : function(content) {
        content.fadeTo(200, 0.5);
      },
      'showContent' : function(content, html) {
        content.html(html).fadeTo(200, 1.0);
      },
      'showThrobber' : true,
      'blockSelector' : '.mostpopular-block',
      'servicesSelector' : 'ul.mostpopular--services li',
      'intervalsSelector' : 'ul.mostpopular--intervals li',
      'contentSelector' : 'div.mostpopular--content',
      'selectedClass' : 'selected',
      'url' : '/mostpopular/ajax'
    }
  };

  /**
   * Provides a default theme for the throbber that appears when content is
   * reloading.   You can override this in your own theme.
   * 
   * @return An HTML string to render the throbber.
   */
  Drupal.theme.prototype.MostPopularThrobber = function() {
    return '<div class="ahah-progress ahah-progress-throbber"><div class="throbber">&nbsp;</div></div>';
  };
  
})(jQuery);