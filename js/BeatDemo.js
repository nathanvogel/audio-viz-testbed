var BeatDemo = function(ctx, w, h) {
  document.body.style.background = "black";
  this.ctx = ctx;
  this.w = w;
  this.h = h;
  // must be a multiple of 2
  this.level = 8;
  this.drawBEAT = true;
  this.max = 0;
  this.limit = 20;
  this.boom = false;
};

BeatDemo.prototype = {

  draw : function(data, dataWave) {
    var radius;
    for (var i = 0; i < this.level; i++) {
      radius = data[i] * 3;

      // draw BEAT
      if (radius >= this.max && this.drawBEAT) {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.w, this.h);
        this.drawBEAT = false;
        this.counter = 0;
        this.boom = true;
      }

      this.ctx.fillStyle = 'rgba(255,255,255,' + data[i] / 3000 + ')';
      this.ctx.beginPath();
      this.ctx.arc(this.w / 2, this.h / 2, radius, 0, Math.PI * 2, false);
      this.ctx.closePath();
      this.ctx.fill();

      if (radius > this.max) {
        this.max = radius;
      }
    }

    if (!this.drawBEAT) {
      this.counter++;
      if (this.counter >= this.limit) {
        this.drawBEAT = true;
        this.boom = false;
      }
    }

    // more Circles
    var circles = 64;
    var angle = 360 / circles;
    var min_radius = 5;
    var big_radius = 200;
    this.ctx.fillStyle = "white";
    for (var i = 0; i < 360; i += angle) {
      var v = (this.boom) ? 2 : dataWave[Math.round(i)] / 100;
      var x = Math.cos(i * Math.PI / 180) * (big_radius * v) + this.w / 2;
      var y = Math.sin(i * Math.PI / 180) * (big_radius * v) + this.h / 2;
      this.ctx.beginPath();
      this.ctx.arc(x, y, min_radius, 0, Math.PI * 2, false);
      this.ctx.closePath();
      this.ctx.fill();
    }
    this.ctx.beginPath();
    this.ctx.strokeStyle = "white";
    for (var i = 0; i < 360; i += angle) {
      var v = (this.boom) ? 2 : dataWave[Math.round(i)] / 100;
      var x = Math.cos(i * Math.PI / 180) * (big_radius * v) + this.w / 2;
      var y = Math.sin(i * Math.PI / 180) * (big_radius * v) + this.h / 2;
      if (i == 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.lineTo(Math.cos(0) * big_radius *
                            ((this.boom) ? 2 : dataWave[0] / 100) +
                        this.w / 2,
                    Math.sin(0) * big_radius * dataWave[0] / 100 + this.h / 2);
    this.ctx.stroke();
    this.ctx.closePath();

  }

}
