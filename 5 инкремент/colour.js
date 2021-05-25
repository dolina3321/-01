console.log("Colour code v0.1: OK");

function Color() {
  var red = 255, green = 0, blue = 0, defaultHue = 0;

  this.rgb = function(input) {
    if (typeof input == 'string') {
      let match = input.match(/^(\d+), (\d+), (\d+)$/);

      if (match != null)
        input = {
          red: parseInt(match[1]),
          green: parseInt(match[2]),
          blue: parseInt(match[3])
        };
    }

    if (typeof input == 'object') {
      let isValid = (a) => typeof a == 'number' && a >= 0 && a <= 255,
          validObj = true;

      if (isValid(input.red)) {validObj = true; red = input.red;}
      if (isValid(input.green)) {validObj = true; green = input.green;}
      if (isValid(input.blue)) {validObj = true; blue = input.blue;}
      defaultHue = this.hsv().hue;
      if (validObj) return this;
    }

    return {
      red: red,
      green: green,
      blue: blue,
      toString: () => Math.round(red) + ', ' + Math.round(green) + ', ' + Math.round(blue)
    }
  }

// HSV color model (hue, saturation, value)
  this.hsv = function(input) {
    if (typeof input == 'string') {
      let match = input.match(/^(\d+)°, (\d+)%, (\d+)%$/);

      if (match != null)
        input = {
          hue: parseInt(match[1]),
          saturation: parseInt(match[2]),
          value: parseInt(match[3])
        };
    }

    if (typeof input == 'object') {

      var defaults = this.hsv(),
          valid = [['hue', 360], ['saturation', 100], ['value', 100]]
            .map(([prop, maxVal]) => {
              let validProp = typeof input[prop] == 'number' && input[prop] >= 0 && input[prop] <= maxVal;
              if (!validProp) input[prop] = defaults[prop];
              return validProp;
            })
            .reduce((a,b) => a || b);

      if (valid) {
        let s = input.saturation / 100,
            v = input.value / 100,
            h = input.hue / 60,
            c = v * s,
            x = c * (1 - Math.abs(h % 2 - 1)),
            a = [[c,x,0],[c,x,0],[x,c,0],[0,c,x],[0,x,c],[x,0,c],[c,0,x]],
            m = v - c,
            [red, green, blue] = a[Math.ceil(h)].map(v => 255 * (v + m));


        this.rgb({red: red, green: green, blue: blue});
        defaultHue = input.hue;
        return this;
      }
    }

    var rgb = this.rgb(),
        r = rgb.red / 255,
        g = rgb.green / 255,
        b = rgb.blue / 255,
        value = Math.max(r, g, b),
        c = value - Math.min(r, g, b);

    if (c == 0) var hue = defaultHue;
    else if (value == r) var hue = (g < b) ? 360 + 60 * (g - b) / c : 60 * (g - b) / c;
    else if (value == g) var hue = 60 * (2 + (b - r) / c);
    else var hue = 60 * (4 + (r - g) / c);

    var saturation = (value == 0) ? 0 : c / value * 100;

    return {
      hue: hue,
      saturation: saturation,
      value: value * 100,
      toString: () => Math.round(hue) + '°, ' + Math.round(saturation) + '%, ' + Math.round(value * 100) + '%'
    };
}


}