var colorUtilitiesMethod = {
    generateColors: function (maxIter) {
        var r, g, b;
        var colorArray = [];
        for (var i = 0; i < maxIter; i++) {
            r = Math.floor(Math.random() * 255).toString(16);
            g = Math.floor(Math.random() * 255).toString(16);
            b = Math.floor(Math.random() * 255).toString(16);
            color = "#" + r + g + b;
            // console.log('color at ' + i + "  " + color);
            colorArray[i] = color;
        }
    },
    getGrayScaleColorString: function (c) {
        return this.getColorString(c, c, c);
    },
    getColorString: function (r, g, b) {
        r = Math.floor(r).toString(16);
        g = Math.floor(g).toString(16);
        b = Math.floor(b).toString(16);
        return "#" + r + g + b;
    },
    HSVtoRGB: function (h, s, v) {
        var r, g, b, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s, v = h.v, h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }

        return '#' + Math.round(r * 255).toString(16) + Math.round(g * 255).toString(16) + Math.round(b * 255).toString(16);
    },
  
    generateRandomForSurpiseMe : function() {
        return {
            h1:Math.random(),
            s:Math.random(),
            v:Math.random() ,
            h2:Math.floor(Math.random() * 100%15),
        }
    }

}