/**
 * Main JavaScript file (MooTools 1.2 compatible)
 *
 * @package     Tooltips
 * @version     0.3.3
 *
 * @author      Peter van Westen <peter@nonumber.nl>
 * @link        http://www.nonumber.nl
 * @copyright   Copyright © 2011 NoNumber! All Rights Reserved
 * @license     http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

function tooltips_init( tip ) {
	tip.setStyle('display','block');
	if ( typeof( tip.fade_in ) == 'undefined' ) {
		tip.fade_in = new Fx.Tween( tip, { property : 'opacity', 'duration' : tooltips_fade_in_speed } );
	}
	if ( typeof( tip.fade_out ) == 'undefined' ) {
		tip.fade_out = new Fx.Tween( tip, { property : 'opacity', 'duration' : tooltips_fade_out_speed } );
	}
	tip.fade_in.cancel();
	tip.fade_out.cancel();
}
function tooltips_show( tip ) {
	if(		( tip.getElement('img') && tip.getElement('img').getStyle('width').toInt() > tooltips_max_width )
		||	( tip.getElement('table') && tip.getElement('table').getStyle('width').toInt() > tooltips_max_width )
	) {
		tip.getElement('div.tip').setStyle('max-width','none');
	} else {
		tip.getElement('div.tip').setStyle('max-width',tooltips_max_width);
	}
	tooltips_init( tip );
	tip.fade_in.start(1);
}
function tooltips_hide( tip ) {
	tooltips_init( tip );
	tip.fade_out.start(0);
}