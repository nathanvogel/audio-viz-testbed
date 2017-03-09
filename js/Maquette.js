var Maquette = function(canvas, w, h) {
  this.w = w;
  this.h = h;

  paper.setup(canvas);

  function svgLoaded(item, svg) {

    console.log(item.bounds);
    console.log('loaded');
    item.position = paper.view.center;
    item.scaling = Math.max(
      paper.view.bounds.width/item.bounds.width,
      paper.view.bounds.height/item.bounds.height);
    item.visible = true;
    item.fullySelected = true;
    item.fillColor = 'blue';
    item.opacity = 0.4;
    for (let tile in item.children) {
      tile.tileOnBeat = tileOnBeat.bind(tile);
      tile.tileUpdate = tileUpdate.bind(tile);
      tile.tileOnBeat(100, 100, 100, 100);
    }
    this.tiles = item.children;
  };
  paper.project.importSVG('svg/IMG_0288.svg', svgLoaded);


};

function tileOnBeat(magnitude, r, g, b) {
  console.log("ok");
  this.alpha = magnitude / 255 * 1.3;
  if (this.alpha > 1) {
    this.alpha = 1;
  }
  this.r += r;
  this.g += g;
  this.b += b;
  this.r = r.clamp(0,255);
  this.g = g.clamp(0,255);
  this.b = b.clamp(0,255);
  this.fillColor = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";

}

function tileUpdate() {
    if (this.alpha > 0) {
      this.alpha -= 0.03;
    }
}

Maquette.prototype = {

  draw : function(data) {

    for (let i = 0; i < this.tiles.length; i += 1) {
      this.tiles[i].tileUpdate();
    }
  }

};

Number.prototype.map = function(in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};
