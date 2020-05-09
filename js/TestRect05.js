var TestRect05 = function (ctx, w, h) {
  this.w = w;
  this.h = h;
  this.ctx = ctx;
  this.SPACING = 6;
  this.BAR_WIDTH = 5;
  this.circles = [];
  this.xCount = 10;
  this.yCount = 10;

  for (let i = 0; i < 50; i++) {
    this.circles.push(new Rect05(i, w, h));
  }
};

TestRect05.prototype = {
  draw: function (data) {
    let ctx = this.ctx;

    // Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.w, this.h);

    // Random color :
    let maxDiff = 256;
    let r = Math.floor(Math.random() * maxDiff - (maxDiff / 4) * 0);
    let g = Math.floor(Math.random() * maxDiff - (maxDiff / 4) * 0);
    let b = Math.floor(Math.random() * maxDiff - (maxDiff / 4) * 0);

    for (let i = 0; i < data.length; ++i) {
      var magnitude = data[i];
      if (magnitude != 0) {
        this.ctx.fillStyle =
          "hsl( " + Math.round((i * 360) / data.length) + ", 100%, 50%)";
        this.ctx.fillRect(
          i * this.SPACING,
          this.h,
          this.BAR_WIDTH,
          -magnitude * 0.5
        );

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

var Rect05 = function (index, w, h) {
  this.alpha = 0;
  this.x = 0;
  this.y = 0;
  this.w = w;
  this.h = h;
  this.r = 250;
  this.g = 250;
  this.b = 250;
  this.hue = 0;
  this.sizeX = this.w / 10;
  this.sizeY = this.h / 10;
  this.index = index;
  this.text = "A";
};

Rect05.prototype = {
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

    this.sizeX = (this.w / 6) * (1 + this.index / testCircle03_bandcount);
    this.sizeY = (this.h / 6) * (1 + this.index / testCircle03_bandcount);

    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.text = possible.charAt(Math.floor(Math.random() * possible.length));

    // this.sizeX = (this.sizeX + this.w/10)/2;
    // this.sizeY = (this.sizeY + this.h/10)/2;
  },

  draw: function (ctx) {
    if (this.alpha > 0) {
      // ctx.fillStyle = "hsla( " + this.hue + ", 100%, 100%," + this.alpha + ")";

      ctx.fillStyle = "hsla( " + this.hue + ", 100%, 100%," + this.alpha + ")";
      // ctx.fillRect(this.x - this.sizeX/2, this.y - this.sizeY/2, this.sizeX, this.sizeY);
      // ctx.fillRect(this.w - (this.x + this.sizeX/2), this.y - this.sizeY/2, this.sizeX, this.sizeY);

      ctx.font = this.sizeY + "px sans-serif";
      ctx.fillText(this.text, this.x + this.sizeX / 2, this.y + this.sizeY / 2);
      ctx.fillText(
        this.text,
        this.w - this.x - this.sizeX / 2,
        this.y + this.sizeY / 2
      );

      this.alpha -= 0.033;
      this.sizeX -= 0.8;
      this.sizeY -= 0.8;

      // if (this.sizeX < -200) {
      //   this.sizeX = this.w/2;
      // }
      // if (this.sizeY < -200) {
      //   this.sizeY = this.h/10;
      // }
      if (this.index == 0) {
        // console.log(this.x);
      }
    }
  },
};
