var RasterDemo = function(canvas, w, h) {
  document.body.style.background = "black";
  this.w = w;
  this.h = h;
  paper.setup(canvas);
  this.raster = new paper.Raster("img/xavier3.jpg");
  this.raster.visible = false;
  this.raster.on('load', (function() {
                           this.raster.position.x = this.w / 2;
                           this.raster.position.y = this.h / 2;
                         }).bind(this));

  // draw Circles
  this.group = new paper.Group();
  var PHI = (1 + Math.sqrt(5)) / 2; // golden ratio
  var TAU = Math.PI * 2;
  var bigRad = 5;
  var ratio = 0.7;
  var radius_radio = 0.03;
  this.positions = [];
  for (var i = 0; i < 800; i++) {
    var path = new paper.Path.Circle({
      center : [
        Math.cos(i * PHI * TAU) * bigRad * ratio + this.w / 2,
        Math.sin(i * PHI * TAU) * bigRad * ratio + this.h / 2
      ],
      radius : 3 + (i * radius_radio),
      fillColor : 'black'
    });
    this.positions.push({
      "radius" : 2 + (i * radius_radio),
      "x" : Math.cos(i * PHI * TAU) * bigRad * ratio + this.w / 2,
      "y" : Math.sin(i * PHI * TAU) * bigRad * ratio + this.h / 2
    });
    bigRad++;
    this.group.addChild(path);
  }
};

RasterDemo.prototype = {
  draw : function(data) {
    var length = this.group.children.length;
    for (var i = 0; i < length; i++) {
      var piece = this.group.children[i];
      var color = this.raster.getAverageColor(piece);
      if (color) {
        piece.fillColor = color;
      }
      var v = (data[i] == 0) ? 1 : data[i];
      piece.bounds.width = this.positions[i].radius * 2 * v / 50;
      piece.bounds.height = this.positions[i].radius * 2 * v / 50;
      piece.position.x = this.positions[i].x - piece.bounds.width / 3;
      piece.position.y = this.positions[i].y - piece.bounds.height / 3;
    }
    paper.view.draw();
  }
};
