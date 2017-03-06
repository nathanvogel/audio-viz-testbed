var LetterDemo = function(canvas, w, h) {
  this.w = w;
  this.h = h;

  this.paperMouse = 200;
  paper.setup(canvas);
  var s = paper.project.importSVG(document.getElementById('svg'));
  s.visible = true; // Turn off the effect of display:none;
  this.letter = s.children.letter;
  this.letter.position = paper.view.center;
  this.letter.children[0].flatten(0.05); // add segments
  this.copy = this.letter.children[0].clone();
  this.copy.visible = false;
  this.letter.children[0].fullySelected = false;

  document.addEventListener("mousemove", this.onmousemove.bind(this));

};

LetterDemo.prototype = {

  draw : function(data) {
    for (var i = 0; i < this.letter.children[0].segments.length; i += 1) {
      var v = data[i] / 256.0; // 128
      this.letter.children[0].segments[i].point = [
        this.copy.segments[i].point.x + this.paperMouse * v,
        this.copy.segments[i].point.y + this.paperMouse * v,
      ];
    }
    this.letter.position = paper.view.center;
    paper.view.draw();
  },

  onmousemove : function(e) {
    this.paperMouse = e.pageX.map(0, window.innerWidth, 0, 200);
  }

};

Number.prototype.map = function(in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};
