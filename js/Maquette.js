var Maquette = function (canvas, w, h) {
  this.w = w;
  this.h = h;
  this.maxOpacity = 0.9;
  this.allowColorChanges = true;
  this.lockThreshold = 195;
  this.lockSpeed = 0.01;
  this.fadeSpeed = 0.02;
  this.tiles = [];
  this.randomOrderIndexes = [];

  paper.setup(canvas);

  this.ctx = canvas.getContext("2d");

  var imgs = document.getElementsByTagName("img");
  this.background = imgs[0];
  // this.raster = new paper.Raster(this.background);
  // this.raster.position = paper.view.center;
  // this.raster.scaling = Math.max(
  //   paper.view.bounds.width/this.raster.bounds.width,
  //   paper.view.bounds.height/this.raster.bounds.height
  // );

  function svgLoaded(item, svg) {
    // Center the SVG over the background image
    item.position = paper.view.center;
    item.scaling = Math.max(
      paper.view.bounds.width / item.bounds.width,
      paper.view.bounds.height / item.bounds.height
    );
    item.visible = true;
    // item.fullySelected = true;
    // item.fillColor = 'blue';
    this.tiles = item.children;
    this.svgLayer = item;

    this.imgW = item.bounds.width;
    this.imgH = item.bounds.height;
    this.imgX = (paper.view.bounds.width - item.bounds.width) / 2;
    this.imgY = (paper.view.bounds.height - item.bounds.height) / 2;

    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].locked = false;
      this.tiles[i].intensity = 1;
      this.tiles[i].r = Math.random() * 255;
      this.tiles[i].g = Math.random() * 255;
      this.tiles[i].b = Math.random() * 255;
      this.tiles[i].fillColor =
        "rgb(" +
        this.tiles[i].r +
        ", " +
        this.tiles[i].g +
        ", " +
        this.tiles[i].b +
        ")";
      // this.tiles[i].blendMode = "multiply"; // normal, screen,
      this.tiles[i].fillColor = this.palette[
        Math.floor(Math.random() * this.palette.length)
      ];
      this.randomOrderIndexes.push(i);
    }
    this.randomOrderIndexes = shuffle(this.randomOrderIndexes);
    console.log("Tiles : " + this.tiles.length);
  }
  paper.project.importSVG("svg/IMG_0288.svg", svgLoaded.bind(this));

  // Red blue yellow
  this.palette = [
    "rgba(1, 186, 239, 1)",
    "rgba(8, 103, 136, 1)",
    "rgba(240, 200, 8, 1)",
    "rgba(255, 241, 208, 1)",
    "rgba(221, 28, 26, 1)",
  ];

  // Orange blue rose pale
  // this.palette = [
  //   "#fe9f97",
  //   "#0095a3",
  //   "#fbae17"
  // ];

  // Orange-blue (swiss)
  this.palette = ["#0098d8", "#0b3536", "#e5e7de", "#f54123"];

  // this.palette = [
  //   "#E01E1C",
  //   "#F59A27",
  //   "#FFC81D",
  //   "#BAD339"
  // ];

  // RF01 marche bien avec color blend
  // this.palette = [
  //   "#A5C6B1",
  //   "#F19152",
  //   "#E63E3E",
  //   "#2A3156",
  //   "#635B8C"
  // ];

  // Meat
  // this.palette = [
  //   "#1B0D17",
  //   "#FFE7DA",
  //   "#FFB6B7",
  //   "#FF95B0",
  //   "#FF2142"
  // ];

  // Purple
  // this.palette = [
  //   "#575CF3",
  //   "#9986ED",
  //   "#9C33FE",
  //   "#C791D4"
  // ];
};

Maquette.prototype = {
  draw: function (dataBeat) {
    // Draw the background image direclty on the context (heavy)
    // this.ctx.globalCompositeOperation = "destination-over";
    // this.ctx.drawImage(this.background, this.imgX, this.imgY, this.imgW, this.imgH);

    // Randomize correspondance between tiles and frequences each frame.
    // this.randomOrderIndexes = shuffle(this.randomOrderIndexes);

    // Lock all tiles on strong beats.
    let locked = false;
    for (let i = 0; i < dataBeat.length; i++) {
      if (dataBeat[i] > this.lockThreshold) {
        locked = true;
        break;
      }
    }

    // Random color difference generation
    let maxDiff = 256;
    let r = Math.floor(Math.random() * maxDiff - (maxDiff / 4) * 0);
    let g = Math.floor(Math.random() * maxDiff - (maxDiff / 4) * 0);
    let b = Math.floor(Math.random() * maxDiff - (maxDiff / 4) * 0);

    // Check for beats and starts the tiles.
    for (let i = 0; i < this.tiles.length; ++i) {
      var magnitude = dataBeat[i];
      if (magnitude > 0) {
        let index = this.randomOrderIndexes[i];
        this.tileOnBeat(this.tiles[index], magnitude, r, g, b, locked);

        // for (let j = 0; j < this.randomOrderIndexes.length; j++) {
        //   let index = this.randomOrderIndexes[j];
        //   if (this.tiles[i].intensity <= 0) {
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
  },

  // Called on a tile when there's a beat
  tileOnBeat: function (tile, magnitude, r, g, b, locked) {
    if (this.allowColorChanges && tile.opacity < 0.1) {
      tile.r += r;
      tile.g += g;
      tile.b += b;
      tile.r = r.clamp(0, 255);
      tile.g = g.clamp(0, 255);
      tile.b = b.clamp(0, 255);
      tile.fillColor = "rgb(" + tile.r + ", " + tile.g + ", " + tile.b + ")";
      tile.fillColor = this.palette[
        Math.floor(Math.random() * this.palette.length)
      ];
    }
    // if (!tile.locked) {
    tile.locked = locked;
    // }
    // tile.locked = !!(magnitude > this.lockThreshold);

    tile.intensity = Math.max(
      tile.intensity,
      (magnitude / 255) * this.maxOpacity * 1.3
    );
    if (tile.intensity > this.maxOpacity) {
      tile.intensity = this.maxOpacity;
    }

    this.tileUpdate(tile);
  },

  tileUpdate: function (tile) {
    if (tile.intensity > 0) {
      tile.intensity -= tile.locked ? this.lockSpeed : this.fadeSpeed;
    }
    if (tile.intensity <= 0.01) {
      tile.intensity = 0;
      tile.locked = false;
    }
    tile.opacity = tile.locked ? 1 : tile.intensity;
  },
};

// UTILS

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

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
