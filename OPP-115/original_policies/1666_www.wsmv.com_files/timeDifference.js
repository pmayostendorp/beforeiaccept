//timeDiff(current time in milliseconds, item's time in milliseconds)
function timeDiff(Cms,Ims) {
var ms = Cms - Ims;
var sec = Math.floor(ms/1000)
ms = ms % 1000
t = ms + "MS"

var min = Math.floor(sec/60)
sec = sec % 60
t = sec + "S" + t

var hr = Math.floor(min/60)
min = min % 60
t = min + "M" + t

var day = Math.floor(hr/24)
hr = hr % 24
t = hr + "H" + t
t = day + "D" + t

return t
}