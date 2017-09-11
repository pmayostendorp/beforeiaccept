
/**
 * Add custom behaviors to Drupal.ajax.prototype.commands
 */

(function($, Drupal)
{
    // Our function name is prototyped as part of the Drupal.ajax namespace, adding to the commands:
    Drupal.ajax.prototype.commands.insertImagePath = function(ajax, response, status)
    {
        // The values we passed in our Ajax callback function will be available inside the
        // response object.
        $(response.url_selector).val(response.imageurl);
        $(response.person_selector).val(response.person);
        $(response.organization_selector).val(response.organization);
        $(response.year_selector).val(response.year);
    };
}(jQuery, Drupal));