var CircleBars = function(ctx, w, h) {
  this.ctx = ctx;
  this.w = w;
  this.h = h;
  this.radius = 1;
  this.angle = 0;
  this.rotation = false;
};

CircleBars.prototype = {

  draw : function(data) {
    this.ctx.save();
    this.ctx.translate(this.w / 2, this.h / 2);

    if (this.rotation)
      this.ctx.rotate(this.angle);

    // FIRST CIRCLE ------------------------------------------------------------
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 10;
    for (var i = 0; i < 360; i++) {
      // calculate points around a circle
      var x1 = 0 + Math.cos(i * Math.PI / 180) *
                       (this.radius + data[data.length - (i + 100)] * 4);
      var y1 = 0 + Math.sin(i * Math.PI / 180) *
                       (this.radius + data[data.length - (i + 100)] * 4);

      // calculate second point with the same orientation (angle)
      var x2 = 0 + Math.cos(i * Math.PI / 180) * (this.radius + 1200);
      var y2 = 0 + Math.sin(i * Math.PI / 180) * (this.radius + 1200);
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
      this.ctx.closePath();
    }
    // SECOND CIRCLE -----------------------------------------------------------
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 4;
    for (var i = 0; i < 360; i++) {
      // calculate points around a circle
      var x1 = 0 + Math.cos(i * Math.PI / 180) * (this.radius + 00);
      var y1 = 0 + Math.sin(i * Math.PI / 180) * (this.radius + 00);

      // calculate second point with the same orientation (angle)
      var x2 = 0 + Math.cos(i * Math.PI / 180) *
                       (this.radius + 1200 - data[i + 10] * 7);
      var y2 = 0 + Math.sin(i * Math.PI / 180) *
                       (this.radius + 1200 - data[i + 10] * 7);
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
      this.ctx.closePath();
    }
    // THIRD CIRCLE ------------------------------------------------------------
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    for (var i = 0; i < 360; i += 4) {
      // calculate points around a circle
      var x1 = 0 + Math.cos(i * Math.PI / 180) * (this.radius + 100);
      var y1 = 0 + Math.sin(i * Math.PI / 180) * (this.radius + 100);

      // calculate second point with the same orientation (angle)
      var x2 = 0 + Math.cos(i * Math.PI / 180) *
                       (this.radius + 140 - data[i + 10] * 0.8);
      var y2 = 0 + Math.sin(i * Math.PI / 180) *
                       (this.radius + 140 - data[i + 10] * 0.8);
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
      this.ctx.closePath();
    }
    this.ctx.restore();

    this.angle += data[500] / 2000; // 0.001;
  }
}
