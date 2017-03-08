var TestRect04 = function(ctx, w, h) {
  this.w = w;
  this.h = h;
  this.ctx = ctx;
  this.SPACING = 6;
  this.BAR_WIDTH = 5;
  this.circles = [];
  this.xCount = 10;
  this.yCount = 10;

  for (let i = 0; i < 100; i++) {
    this.circles.push(new Rect04(i, w, h));
  }
};

TestRect04.prototype = {

  draw : function(data) {
    let ctx = this.ctx;

    // Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.w, this.h);

    for (let i = 0; i < data.length; ++i) {
      var magnitude = data[i];
      if (magnitude != 0) {

        this.ctx.fillStyle = "hsl( " + Math.round((i * 360) / data.length) + ", 100%, 50%)";
        this.ctx.fillRect(i * this.SPACING, this.h, this.BAR_WIDTH, -magnitude * 0.5);

        for (let j = 0; j < this.circles.length; j++) {
          if (this.circles[j].alpha <= 0) {
            let colW = this.w / this.xCount;
            let x = Math.floor(i / this.xCount) * colW + colW/2;
            let rowH = this.h / this.yCount;
            let y = this.h - ((i % this.yCount) * rowH + rowH/2);

            this.circles[j].start(magnitude, 128 - Math.round((i * 360) / data.length), x, y);
            break;
          }
        }
      }
    }
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].draw(this.ctx);
    }
  }

};


var Rect04 = function(hue, w, h) {
  this.alpha = 0;
  this.x = 0;
  this.y = 0;
  this.w = w;
  this.h = h;
  this.hue = hue;
  this.sizeX = this.w/10;
  this.sizeY = this.h/10;
};

Rect04.prototype = {

  start : function(magnitude, hue, x, y) {
    this.alpha = magnitude / 255 * 1.3;
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


    this.sizeX = this.w/10;
    this.sizeY = this.h/10;
    // this.sizeX = (this.sizeX + this.w/10)/2;
    // this.sizeY = (this.sizeY + this.h/10)/2;
  },

  draw : function(ctx) {
    if (this.alpha > 0) {
      // ctx.beginPath();
      ctx.fillStyle = "hsla( " + this.hue + ", 100%, 100%," + this.alpha + ")";
      // ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
      // ctx.fill();
      // ctx.beginPath();
      // ctx.arc(this.w - this.x, this.y, this.size, 0, 2*Math.PI);
      // ctx.fill();
      ctx.fillRect(this.x - this.sizeX/2, this.y - this.sizeY/2, this.sizeX, this.sizeY);
      ctx.fillRect(this.w - (this.x + this.sizeX/2), this.y - this.sizeY/2, this.sizeX, this.sizeY);

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
  }

};


// Test TODO : frequence comme des cercles concentriques qui s'additionne et grandissent ensemble
