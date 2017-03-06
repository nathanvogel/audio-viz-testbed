var BarsDemo = function(ctx, w, h) {
  this.w = w;
  this.h = h;
  this.ctx = ctx;
  this.SPACING = 2;
  this.BAR_WIDTH = 1;
  this.numBars = Math.round(this.w / this.SPACING);
  this.multiplier = 4;
};

BarsDemo.prototype = {

  draw : function(data) {
    for (var i = 0; i < this.numBars; ++i) {
      var magnitude = data[i] * this.multiplier;
      this.ctx.fillStyle =
          "hsl( " + Math.round((i * 360) / this.numBars) + ", 100%, 50%)";
      this.ctx.fillRect(i * this.SPACING, this.h, this.BAR_WIDTH, -magnitude);
    }
  }

};
