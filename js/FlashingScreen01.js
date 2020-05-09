var FlashingScreen01 = function (ctx, w, h) {
  this.w = w;
  this.h = h;
  this.ctx = ctx;
  this.SPACING = 6;
  this.BAR_WIDTH = 5;
  this.circles = [];
  this.xCount = 6;
  this.yCount = 6;

  for (let i = 0; i < 100; i++) {
    this.circles.push(new FlashingRect01(i, w, h, this.xCount, this.yCount));
  }
};

FlashingScreen01.prototype = {
  draw: function (data) {
    let ctx = this.ctx;

    // Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.w, this.h);

    // Random color diff
    let maxDiff = 256;
    let r = Math.floor(Math.random() * maxDiff - (maxDiff / 4) * 0);
    let g = Math.floor(Math.random() * maxDiff - (maxDiff / 4) * 0);
    let b = Math.floor(Math.random() * maxDiff - (maxDiff / 4) * 0);

    for (let i = 0; i < data.length; ++i) {
      var magnitude = data[i];
      if (magnitude != 0) {
        // this.ctx.fillStyle = "hsl( " + Math.round((i * 360) / data.length) + ", 100%, 50%)";
        // this.ctx.fillRect(i * this.SPACING, this.h, this.BAR_WIDTH, -magnitude * 0.5);

        for (let j = 0; j < this.circles.length; j++) {
          if (this.circles[j].alpha <= 0) {
            let colW = this.w / this.xCount;
            let x = Math.floor(i / this.xCount) * colW + colW / 2;
            let rowH = this.h / this.yCount;
            let y = this.h - ((i % this.yCount) * rowH + rowH / 2);

            this.circles[j].start(
              magnitude,
              128 - Math.round((i * 360) / data.length),
              x,
              y,
              r,
              g,
              b
            );
            break;
          }
        }
      }
    }
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].draw(this.ctx);
    }
  },
};

var FlashingRect01 = function (hue, w, h, xCount, yCount) {
  this.alpha = 0;
  this.x = 0;
  this.y = 0;
  this.w = w;
  this.h = h;
  this.r = 250;
  this.g = 250;
  this.b = 250;
  this.hue = hue;
  this.xCount = xCount;
  this.yCount = yCount;
  this.sizeX = this.w / this.xCount;
  this.sizeY = this.h / this.yCount;
};

FlashingRect01.prototype = {
  start: function (magnitude, hue, x, y, r, g, b) {
    this.alpha = (magnitude / 255) * 1.3;
    if (this.alpha > 1) {
      this.alpha = 1;
    }
    this.size = magnitude / 2;
    this.hue = hue;
    this.x = Math.random();
    this.x -= this.x % 0.1;
    this.y = Math.random();
    this.y -= this.y % 0.1;

    this.x = x;
    this.y = y;

    this.r += r;
    this.g += g;
    this.b += b;
    this.r = r.clamp(0, 255);
    this.g = g.clamp(0, 255);
    this.b = b.clamp(0, 255);

    this.sizeX = this.w / this.xCount;
    this.sizeY = this.h / this.yCount;
    // this.sizeX = (this.sizeX + this.w/this.xCount)/2;
    // this.sizeY = (this.sizeY + this.h/this.yCount)/2;
  },

  draw: function (ctx) {
    if (this.alpha > 0) {
      ctx.fillStyle =
        "rgba(" +
        this.r +
        ", " +
        this.g +
        ", " +
        this.b +
        ", " +
        this.alpha +
        ")";

      ctx.fillRect(
        this.x - this.sizeX / 2,
        this.y - this.sizeY / 2,
        this.sizeX,
        this.sizeY
      );
      ctx.fillRect(
        this.w - (this.x + this.sizeX / 2),
        this.y - this.sizeY / 2,
        this.sizeX,
        this.sizeY
      );

      this.alpha -= 0.03;
      this.sizeX -= 0.8;
      this.sizeY -= 0.8;
      // if (this.sizeX < 0) {
      //   this.sizeX = 0;
      // }
      // if (this.sizeY < 0) {
      //   this.sizeY = 0;
      // }
    }
  },
};
