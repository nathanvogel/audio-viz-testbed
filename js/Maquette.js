var Maquette = function(canvas, w, h) {
  this.w = w;
  this.h = h;
  this.maxOpacity = 0.9;
  this.tiles = [];
  this.randomOrderIndexes = [];


  paper.setup(canvas);

  this.ctx = canvas.getContext("2d");
  this.ctx.globalCompositeOperation = "xor";

  var imgs = document.getElementsByTagName("img");
  this.background = imgs[0];

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
    for (let i = 0; i < this.tiles.length; i++) {

      this.tiles[i].r = Math.random() * 255;
      this.tiles[i].g = Math.random() * 255;
      this.tiles[i].b = Math.random() * 255;
      this.tiles[i].fillColor = "rgb(" + this.tiles[i].r + ", " + this.tiles[i].g + ", " + this.tiles[i].b + ")";

      this.randomOrderIndexes.push(i);
    }

      console.log("Tiles : " + this.tiles.length);
  };
  paper.project.importSVG('svg/IMG_0288.svg', svgLoaded.bind(this));


};


Maquette.prototype = {

  draw : function(dataBeat) {
    this.ctx.drawImage(this.background, 0, 0, 300, 500);

    this.randomOrderIndexes = shuffle(this.randomOrderIndexes);

    // Random color diff
    let maxDiff = 256;
    let r = Math.floor(Math.random() * maxDiff - maxDiff/4*0);
    let g = Math.floor(Math.random() * maxDiff - maxDiff/4*0);
    let b = Math.floor(Math.random() * maxDiff - maxDiff/4*0);

    for (let i = 0; i < this.tiles.length; ++i) {
      var magnitude = dataBeat[i];
      if (magnitude > 0) {
          let index = this.randomOrderIndexes[i];
          this.tileOnBeat(this.tiles[index], magnitude, r, g, b);

        // for (let j = 0; j < this.randomOrderIndexes.length; j++) {
        //   let index = this.randomOrderIndexes[j];
        //   if (this.tiles[i].opacity <= 0) {
        //     this.tileOnBeat(this.tiles[i], magnitude, r, g, b);
        //     // this.tiles[j].start(magnitude, 128 - Math.round((i * 360) / data.length), x, y, r, g, b);
        //     break;
        //   }
        // }
      }
    }

    for (let i = 0; i < this.tiles.length; i += 1) {
      this.tileUpdate(this.tiles[i]);
    }
      this.ctx.drawImage(this.background, 0, 0, 300, 500);
  },


  tileOnBeat: function(tile, magnitude, r, g, b) {
    if (false && tile.opacity < 0.1) {
      tile.r += r;
      tile.g += g;
      tile.b += b;
      tile.r = r.clamp(0,255);
      tile.g = g.clamp(0,255);
      tile.b = b.clamp(0,255);
      tile.fillColor = "rgb(" + tile.r + ", " + tile.g + ", " + tile.b + ")";
    }

    tile.opacity = Math.max(tile.opacity, magnitude / 255 * this.maxOpacity * 1.3);
    if (tile.opacity > this.maxOpacity) {
      tile.opacity = this.maxOpacity;
    }

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


// UTILS

Number.prototype.map = function(in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
