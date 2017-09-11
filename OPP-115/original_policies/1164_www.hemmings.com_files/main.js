/* Lazy Load */
$.extend($.lazyLoadXT, {
  edgeY:  200,
  bgAttr:  'data-bg',
  srcAttr: 'data-src'
});

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

$(document).ready(function() { 
    /* Collapse Helper */
    $('.collapse').on('show.bs.collapse hide.bs.collapse', function(e) {
        e.preventDefault();
    });
    $('[data-toggle="collapse"]').on('click', function(e) {
        e.preventDefault();
        $($(this).data('target')).toggleClass('in');
    });
    
    /* Identify having JS */
    $('body').addClass('js');
    $('body.js noscript').remove();
    
    if ($(window).width() > 767) {
        /* Dropdown open with hover */
        $('.navbar-nav > li.dropdown').hover(function() {
            $(this).toggleClass('open'); // When mobile menu is open and we go back to desktop this will not fire.
            //console.log('should be working');
        });
        /* Dropdown no click */
        $('.navbar-nav > li.dropdown').click(function(e){
            e.stopPropagation();
        });
    }
    
    /* Show More Jobs */
    $('#smjobs').on('click', function(){
        $(this).hide();
        $('.recent-jobs tr.hidden').removeClass('hidden').show();
    });
    
    /* Attach resume */
    $('#resume').on('change', function(){
       var theFile =  $(this).val();
       theFile = theFile.replace("C:\\fakepath\\", "");
       $(this).parents('.input-button').find('.help-block').removeClass('hidden').html(theFile + ' attached.').css('display', 'block');
    });
    
    /* Filter on Careers */
    $('#formFilterEmployer').change(function(){
    	$('#formFilterLocation').prop('selectedIndex',0);
    	$('#formJobSelect').submit();
    });
    $('#formFilterLocation').change(function(){
    	$('#formFilterEmployer').prop('selectedIndex',0);
    	$('#formJobSelect').submit();
    });
});