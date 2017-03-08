var TestCircle02 = function(ctx, w, h) {
  this.w = w;
  this.h = h;
  this.ctx = ctx;
  this.SPACING = 6;
  this.BAR_WIDTH = 5;
  this.circles = [];
  this.xCount = 10;
  this.yCount = 10;

  for (let i = 0; i < 100; i++) {
    this.circles.push(new Circle01(i, w, h));
  }
};

TestCircle02.prototype = {

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
            let x = (i / this.xCount) * colW + colW/2;
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


var Circle01 = function(hue, w, h) {
  this.alpha = 0;
  this.x = 0;
  this.y = 0;
  this.w = w;
  this.h = h;
  this.hue = hue;
};

Circle01.prototype = {

  start : function(magnitude, hue, x, y) {
    this.alpha = magnitude / 255;
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
  },

  draw : function(ctx) {
    if (this.alpha > 0) {
      ctx.beginPath();
      ctx.fillStyle = "hsla( " + this.hue + ", 100%, 50%," + this.alpha + ")";
      ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.w - this.x, this.y, this.size, 0, 2*Math.PI);
      ctx.fill();
      this.alpha -= 0.03;
      this.size -= 0.8;
    }
  }

};


// Test TODO : frequence comme des cercles concentriques qui s'additionne et grandissent ensemble
