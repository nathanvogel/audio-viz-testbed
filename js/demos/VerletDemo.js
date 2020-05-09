var VerletDemo = function(canvas, w, h) {
  document.body.style.background = "black";
  this.canvas = canvas;
  this.w = w;
  this.h = h;
  this.data;
  // setup verlet
  // simulation
  this.sim = new VerletJS(this.w, this.w, canvas);
  this.sim.friction = 1;
  this.sim.highlightColor = "#fff";
  // entities
  this.min = Math.min(this.w, this.h) * 0.5;
  this.segments = 20;
  this.cloth = this.sim.cloth(new Vec2(this.w / 2, this.h / 2), this.min,
                              this.min, this.segments, 6, 0.9);

  // SET CLOTH fonction
  // remove particles
  this.cloth.drawParticles = this.onDrawParticles.bind(this);

  // store all points
  this.originalpositions = [];
  for (y = 1; y < this.segments; ++y) {
    for (x = 1; x < this.segments; ++x) {
      var i1 = (y - 1) * this.segments + x - 1;
      var i2 = (y) * this.segments + x;
      this.originalpositions.push(this.cloth.particles[i1].pos.y);
    }
  }

  this.boom = false;
  this.drawBEAT = true;
  this.c = 0;
  this.limit = 20;
  this.max = 0;

};

VerletDemo.prototype = {
  draw : function(data) {

    for (var i = 0; i < this.segments; i++) {

      if (data[i] >= this.max && this.drawBEAT) {
        this.drawBEAT = false;
        this.c = 0;
        this.boom = true;
      }

      if (data[i] > this.max) {
        this.max = data[i];
      }
    }

    if (!this.drawBEAT) {
      this.c++;
      if (this.c >= this.limit) {
        this.drawBEAT = true;
        this.boom = false;
      }
    }

    var counter = 0;
    for (y = 1; y < this.segments; ++y) {
      for (x = 1; x < this.segments; ++x) {
        var i1 = (y - 1) * this.segments + x - 1;
        var i2 = (y) * this.segments + x;
        if (y == this.segments - 1 && this.boom) {
          this.cloth.particles[i1].pos.y =
              this.originalpositions[counter] - data[counter] / 1000;
          ;
        }
        counter++;
      }
    }
    this.boom = false;

    this.sim.frame(16);
    this.sim.draw();
  },

  onDrawParticles : function(ctx, composite) {

  },

  lerp : function(a, b, p) { return (b - a) * p + a; },

};
