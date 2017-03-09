var Maquette = function(canvas, w, h) {
  this.w = w;
  this.h = h;
  this.maxOpacity = 0.9;
  this.tiles = [];

  paper.setup(canvas);

  function svgLoaded(item, svg) {
    // Center the SVG over the background image
    item.position = paper.view.center;
    item.scaling = Math.max(
      paper.view.bounds.width/item.bounds.width,
      paper.view.bounds.height/item.bounds.height
    );
    item.visible = true;
    // item.fullySelected = true;
    // item.fillColor = 'blue';
    // item.opacity = 0.4;
    this.tiles = item.children;
  };
  paper.project.importSVG('svg/IMG_0288.svg', svgLoaded.bind(this));


};


Maquette.prototype = {

  draw : function(dataBeat) {

    // Random color diff
    let maxDiff = 256;
    let r = Math.floor(Math.random() * maxDiff - maxDiff/4*0);
    let g = Math.floor(Math.random() * maxDiff - maxDiff/4*0);
    let b = Math.floor(Math.random() * maxDiff - maxDiff/4*0);

    for (let i = 0; i < dataBeat.length; ++i) {
      var magnitude = dataBeat[i];
      if (magnitude != 0) {

        for (let j = 0; j < this.tiles.length; j++) {
          if (this.tiles[j].opacity <= 0) {
            this.tileOnBeat(this.tiles[j], magnitude, r, g, b);
            // this.tiles[j].start(magnitude, 128 - Math.round((i * 360) / data.length), x, y, r, g, b);
            break;
          }
        }
      }
    }

    for (let i = 0; i < this.tiles.length; i += 1) {
      this.tileUpdate(this.tiles[i]);
    }
  },


  tileOnBeat: function(tile, magnitude, r, g, b) {
    tile.opacity = magnitude / 255 * this.maxOpacity * 1.3;
    if (tile.opacity > this.maxOpacity) {
      tile.opacity = this.maxOpacity;
    }
    tile.r += r;
    tile.g += g;
    tile.b += b;
    tile.r = r.clamp(0,255);
    tile.g = g.clamp(0,255);
    tile.b = b.clamp(0,255);
    tile.fillColor = "rgb(" + tile.r + ", " + tile.g + ", " + tile.b + ")";

  },

  tileUpdate: function(tile) {
    if (tile.opacity > 0) {
      tile.opacity -= 0.03;
    }
    if (tile.opacity <= 0.01) {
      tile.opacity = 0;
    }
  }

};

Number.prototype.map = function(in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};
