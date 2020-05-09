var TestImage01 = function (ctx, w, h) {
  this.w = w;
  this.h = h;
  this.ctx = ctx;
  this.SPACING = 6;
  this.BAR_WIDTH = 5;
  this.circles = [];
  this.xCount = 10;
  this.yCount = 10;
  this.images = [];
  this.background = null;
  this.overlayAlpha = 0;

  // for (let i = 0; i < 100; i++) {
  //   this.circles.push(new Image01(i, w, h));
  // }

  window.onload = function () {
    var imgs = document.getElementsByTagName("img");
    this.background = imgs[0];
    for (let i = 1; i < imgs.length; i++) {
      this.images.push(new Image01(imgs[i]));
    }
  }.bind(this);
};

TestImage01.prototype = {
  draw: function (data) {
    let ctx = this.ctx;
    this.ctx.globalCompositeOperation = "source-over";

    // Background
    ctx.globalAlpha = 1;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.drawImage(this.background, 0, 0, 300, 500);

    for (let i = 0; i < data.length; ++i) {
      var magnitude = data[i];
      if (magnitude != 0) {
        this.ctx.fillStyle =
          "hsl( " + Math.round((i * 360) / data.length) + ", 100%, 50%)";
        this.ctx.fillRect(
          i * this.SPACING,
          this.h,
          this.BAR_WIDTH,
          -magnitude * 0.5
        );

        // for (let j = 0; j < this.images.length; j++) {
        if (i < 3 && this.images[0].alpha <= 0) {
          this.images[0].start(magnitude);
          break;
        }
        // }
      }
    }
    for (let i = 0; i < this.images.length; i++) {
      this.images[i].draw(this.ctx);
    }

    if (data[1] > 0) {
      this.overlayAlpha = (data[1] / 255) * 1.3;
      if (this.overlayAlpha > 1) {
        this.overlayAlpha = 1;
      }
    }

    if (this.overlayAlpha > 0) {
      this.ctx.globalCompositeOperation = "multiply";
      this.ctx.fillStyle = "rgba(255, 0, 0, " + this.overlayAlpha + ")";
      // this.ctx.fillRect(0, 0, this.w, this.h);

      this.overlayAlpha -= 0.06;
    }
  },
};

var Image01 = function (img, w, h) {
  this.alpha = 0;
  this.x = 0;
  this.y = 0;
  this.w = w;
  this.h = h;
  this.img = img;
};

Image01.prototype = {
  start: function (magnitude) {
    this.alpha = (magnitude / 255) * 1.3;
    if (this.alpha > 1) {
      this.alpha = 1;
    }
    this.size = magnitude / 2;

    this.sizeX = this.w / 10;
    this.sizeY = this.h / 10;
    // this.sizeX = (this.sizeX + this.w/10)/2;
    // this.sizeY = (this.sizeY + this.h/10)/2;
  },

  draw: function (ctx) {
    if (this.alpha > 0) {
      ctx.globalAlpha = this.alpha > 0 ? 1 : 0;
      ctx.drawImage(this.img, 0, 0, 300, 500);

      this.alpha -= 0.095;
      this.sizeX -= 0.8;
      this.sizeY -= 0.8;

      // if (this.sizeX < 0) {
      //   this.sizeX = 0;
      // }
      // if (this.sizeY < 0) {
      //   this.sizeY = 0;
      // }
    }
  },
};
