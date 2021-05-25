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
}