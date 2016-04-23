(function(win, undefined) {
    var rows = 0;
    var cols = 0;
    $.fn.boomPic = function() {
        $(this).click(function(event) {
            var img = $(this)[0];
            BoomPic(img)
        });
    }

    function BoomPic(img) {
        $(".imgboom").remove();
        var container = document.getElementsByTagName("body")[0];
        var w = img.width;
        var h = img.height;
        var offsetLeft = elementLeft(img);
        var offsetTop = elementTop(img);
        img.style.visibility = "hidden";
        var divWidth = 0;
        var divHeight = 0;
        var max = gcd(w, h);
        var num = w / max;
        if (w == h) {
            rows = cols = divWidth = divHeight = w / 10;
        } else if (num < 10) {
            divWidth = divHeight = max / 2;
            rows = num * 2;
            cols = h / max * 2
        } else if (num > 100) {
            divWidth = divHeight = max * 20;
            rows = num / 20;
            cols = h / max / 20;
        } else {
            divWidth = divHeight = max;
            rows = num;
            cols = h / max;
        }
        for (var i = 1; i <= rows; i++) {
            for (var j = 1; j <= cols; j++) {
                // var scaleImg = parseFloat(Math.random() * 5);
                var divTemp = document.createElement("div");
                var imgOffsetX = divWidth - i * divWidth;
                var imgOffsetY = divHeight - j * divHeight;
                divTemp.className = "imgboom";
                divTemp.style.display = "inline-block";
                divTemp.style.position = "fixed";
                divTemp.style["border-radius"] = "50%";
                divTemp.style.width = divWidth + "px";
                divTemp.style.height = divHeight + "px";
                divTemp.style.background = imgOffsetX + "px " + imgOffsetY + "px url(" + img.src + ") no-repeat";
                divTemp.style.left = offsetLeft - imgOffsetX + "px";
                divTemp.style.top = offsetTop - imgOffsetY + "px";
                divTemp.style["background-size"] = w + "px " + h + "px";
                // divTemp.style["transform"] = "scale(" + scaleImg + ")";
                container.appendChild(divTemp);
            }
        }
        Boom();
    }

    function Boom() {
        var divs = $(".imgboom");
        for (var i = 0; i < divs.length; i++) {
            var time = parseInt(Math.random() * 3 + 2);
            var speed = parseFloat(Math.random() * 3000 + 2000);
            var leftLength = parseFloat(Math.random() * 500);
            var topLength = parseFloat(Math.random() * 500);
            var that = $(divs[i]);
            var left = parseFloat(that.css("left"));
            var top = parseFloat(that.css("top"));
            that.css("transition-duration", time + "s");
            that.css("left", left + leftLength + "px");
            that.css("top", top - topLength + "px");
            that.css("opacity", "0");
        }
    }
    /**
     * 求最大公约数
     */
    function gcd(a, b) {
        if (b == 0) {
            return a;
        }
        var r = a % b;
        return gcd(b, r);
    }

    function elementLeft(e) {
        var offset = e.offsetLeft;
        if (e.offsetParent != null) {
            offset += elementLeft(e.offsetParent)
        }
        return offset;
    }

    function elementTop(e) {
        var offset = e.offsetTop;
        if (e.offsetParent != null) {
            offset += elementTop(e.offsetParent)
        }
        return offset;
    }
})(window);