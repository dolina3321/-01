$(function () {
  var $hue = $('#hue'),
      $pane = $('#pane'),
      $knob = $('#knob'),
      $colorFormats = $('.color-format'),
      color = new Color({red: 255, green: 0, blue: 0}),
      dragging = false;

$hue.on('input', getColorFromSelectors);
});

$colorFormats
    .blur(function() {
      updateColorIndicators();
      updateSelectorsFromColor();
    })
    .on('input', function() {
      var value = $(this).val(),
          out;

      if (color[$(this).attr('id')]($(this).val()) instanceof Color) {
        updateColorIndicators();
        updateSelectorsFromColor();
      }
    });