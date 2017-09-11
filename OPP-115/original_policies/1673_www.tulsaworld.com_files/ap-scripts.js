//This is horrible, I know. But, what we're doing here is
//determining the height of items 2+ and making the left
//column match that height.

$(window).load(function(){
    $(".ap-json").each(function() {
        var target = $(this).find(".item:eq(0)");
        var subs = $(this).find(".item:not(:eq(0))");
        var ht = 0;
        subs.each(function() {
            ht += Number($(this).height() + 11);
        });
        if (target.height() < ht) {
            target.height(ht);
        }
    });
});