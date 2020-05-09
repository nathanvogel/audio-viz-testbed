// 225 (255?) seems to be the max value for dataBeat

var TestRect01 = function (ctx, w, h) {
  this.w = w;
  this.h = h;
  this.ctx = ctx;
  this.SPACING = 6;
  this.BAR_WIDTH = 5;
  this.multiplier = 0.5;
  this.max = 0;
  this.xCount = 4;
  this.yCount = 8;
  this.colors = [];
  for (let i = 0; i < this.xCount * this.yCount; i++) {
    this.colors.push(0);
  }
};

TestRect01.prototype = {
  draw: function (data) {
    let ctx = this.ctx;

    for (var i = 0; i < data.length; ++i) {
      var magnitude = data[i] * this.multiplier;
      if (magnitude != 0) {
        this.colors[i] = data[i];
      }
    }

    // for (let i = 0; i < data.length; i++) {
    //   this.ctx.fillStyle = "hsl( " + Math.round((this.colors[i] * 360) / 255) + ", 100%, 50%)";
    // this.ctx.fill
    // }

    for (let i = 0; i < data.length; ++i) {
      if (this.colors[i] > 0) {
        this.colors[i] -= 1;
        // Make sure no negative
        if (this.colors[i] < 0) {
          this.colors[i] = 0;
        }
      }
    }

    for (let i = 0; i < data.length; ++i) {
      var magnitude = data[i] * this.multiplier;
      if (magnitude != 0) {
        if (data[i] > this.max) {
          this.max = data[i];
          console.log("new max : " + this.max);
        }

        // console.log(data[i]);

        this.ctx.fillStyle =
          "hsl( " + Math.round((i * 360) / data.length) + ", 100%, 50%)";
        this.ctx.fillRect(i * this.SPACING, this.h, this.BAR_WIDTH, -magnitude);
        ctx.beginPath();
        let x = Math.random();
        x -= x % 0.1;
        let y = Math.random();
        y -= y % 0.1;
        ctx.arc(x * this.w, y * this.h, magnitude, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  },
};
