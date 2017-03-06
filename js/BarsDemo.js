var BarsDemo = function(ctx, w, h) {
  this.w = w;
  this.h = h;
  this.ctx = ctx;
  this.SPACING = 6;
  this.BAR_WIDTH = 5;
  this.numBars = 22;//Math.round(this.w / this.SPACING);
  this.multiplier = 4;
};

BarsDemo.prototype = {

  draw : function(data) {
    for (var i = 0; i < this.numBars; ++i) {
      var magnitude = data[i] * this.multiplier;
      // if (data[i] != 0) {
        // console.log(data[i]);
      // }

      this.ctx.fillStyle =
          "hsl( " + Math.round((i * 360) / this.numBars) + ", 100%, 50%)";
      this.ctx.fillRect(i * this.SPACING, this.h, this.BAR_WIDTH, -magnitude);
    }
  }

};
