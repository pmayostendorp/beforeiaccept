$(document).ready(function() {
  $('input#search').focus(function() {
    if ($(this).hasClass('search-default')) {
      $(this).val('');
      $(this).removeClass('search-default');
    }
  });
  
  $('input#search').blur(function() {
    var val = $(this).val();
    if (val.length == 0) {
      $(this).addClass('search-default');
      $(this).val('Search');
    }
  });
});
