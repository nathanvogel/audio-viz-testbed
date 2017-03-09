
const testCircle03_bandcount = 32;

var TestCircle03 = function(ctx, w, h) {
  this.w = w;
  this.h = h;
  this.ctx = ctx;
  this.SPACING = 6;
  this.BAR_WIDTH = 5;
  this.circles = [];

  for (let i = 0; i < testCircle03_bandcount; i++) {
    this.circles.push(new Circle03(i, w, h));
  }
};

TestCircle03.prototype = {

  draw : function(data) {
    let ctx = this.ctx;

    // Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.w, this.h);

    let totalMagnitude = 0;
    for (let i = data.length - 1; i >= 0; --i) {
      let magnitude = data[i];
      if (magnitude != 0) {

        // this.ctx.fillStyle = "hsl( " + Math.round((i * 360) / data.length) + ", 100%, 50%)";
        // this.ctx.fillRect(i * this.SPACING, this.h, this.BAR_WIDTH, -magnitude * 0.5);

        // for (let j = 0; j < this.circles.length; j++) {
          this.circles[i].start(magnitude, totalMagnitude);
        // }
      }
      this.circles[i].start(magnitude, totalMagnitude);
      totalMagnitude += this.circles[i].currentMagnitude;
    }
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].draw(this.ctx);
    }
  }

};


var Circle03 = function(index, w, h) {
  this.alpha = 0;
  this.x = w/2;
  this.y = h/2;
  this.w = w;
  this.h = h;
  this.size = 0;
  this.index = index;
  this.hue = 255 - index / testCircle03_bandcount * 2 * 360;
  this.currentMagnitude = 0;
  this.totalMagnitude = 0;
};

Circle03.prototype = {

  start : function(magnitude, totalMagnitude) {
    if (this.currentMagnitude < magnitude) {
      this.currentMagnitude = magnitude;
    }
    this.totalMagnitude = totalMagnitude;
  },

  draw : function(ctx) {

    let size = (this.currentMagnitude + this.totalMagnitude) / 5;
    if (this.currentMagnitude > 0) {
      ctx.beginPath();
      ctx.fillStyle = "hsl( " + this.hue + ", 100%, 50%)";
      ctx.arc(this.x, this.y, size, 0, 2*Math.PI);
      ctx.fill();
      // this.size -= 0.8;
    }
    this.currentMagnitude -= (testCircle03_bandcount-this.index + 8)/(testCircle03_bandcount/3);
    if (this.currentMagnitude < 0) {
      this.currentMagnitude = 0;
    }
  }

};


// Test TODO : frequence comme des cercles concentriques qui s'additionne et grandissent ensemble
