var Circles01Test = function (ctx, w, h) {
  this.w = w;
  this.h = h;
  this.ctx = ctx;
  this.SPACING = 6;
  this.BAR_WIDTH = 5;
  this.multiplier = 0.5;
  this.max = 0;
};

Circles01Test.prototype = {
  draw: function (data) {
    let ctx = this.ctx;
    for (var i = 0; i < data.length; ++i) {
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

// var Circle01 = function() {
//   this.alpha = 0;
//   this.x = 0;
//   this.y = 0;
// };
//
// Circle01.prototype = {
//
//   start : function(alpha) {
//     this.alpha = alpha;
//     this.x = Math.random();
//     this.x -= this.x % 0.1;
//     this.y = Math.random();
//     this.y -= this.y % 0.1;
//   },
//
//   draw : function(ctx) {
//     if (this.alpha > 0) {
//       ctx.fillStyle = "hsl( " + Math.round((i * 360) / data.length) + ", 100%, 50%)";
//       ctx.arc(x*this.w,y*this.h,magnitude,0,2*Math.PI);
//       ctx.fill();
//     }
//   }
//
// };

// Test TODO : frequence comme des cercles concentriques qui s'additionne et grandissent ensemble
