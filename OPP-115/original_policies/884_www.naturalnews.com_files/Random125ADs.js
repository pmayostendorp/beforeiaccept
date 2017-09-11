function reorder(id) {
var grp = $("#"+id).children();
var cnt = grp.length;

var temp, x;
for (var i = 0; i < cnt; i++) {
temp = grp[i];
x = Math.floor(Math.random() * cnt);
grp[i] = grp[x];
grp[x] = temp;
}
$(grp).remove();
$("#"+id).append($(grp));

document.getElementById(id).style.visibility = 'visible';

};