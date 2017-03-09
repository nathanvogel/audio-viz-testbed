'use strict';


Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};



var App = function() {
  console.log("app is running");
  this.canvas = document.getElementsByTagName("canvas")[0];
  this.w = window.innerWidth;
  this.h = window.innerHeight;
  this.canvas.width = this.w;
  this.canvas.height = this.h;
  this.ctx = this.canvas.getContext("2d");
  this.tool = null;
  this.isMic = false;
  this.setup();
};


App.prototype = {

  setup : function() {
    addEventListener("keydown", this.onKeyDown.bind(this));

    // DEMOS
    // this.barDemo = new BarsDemo(this.ctx, this.w, this.h);
    // this.circleDemo = new CircleBars(this.ctx, this.w, this.h);
    // this.circleDemo.rotation = true;
    // this.letterDemo = new LetterDemo(this.canvas, this.w, this.h);
    // this.rasterDemo = new RasterDemo(this.canvas, this.w, this.h);
    // this.beatDemo = new BeatDemo(this.ctx, this.w, this.h);
    // this.verletDemo = new VerletDemo(this.canvas, this.w, this.h);

    // this.circles01Test = new Circles01Test(this.ctx, this.w, this.h);
    // this.testRect01 = new TestRect01(this.ctx, this.w, this.h);
    // this.testCircle02 = new TestCircle02(this.ctx, this.w, this.h); // 128
    // this.testCircle03 = new TestCircle03(this.ctx, this.w, this.h); // 32
    // this.testRect04 = new TestRect04(this.ctx, this.w, this.h); // 128
    // this.testRect05 = new TestRect05(this.ctx, this.w, this.h); // 128
    // this.testRect06 = new TestRect06(this.ctx, this.w, this.h); // 128
    // this.testRect07 = new TestRect07(this.ctx, this.w, this.h); // 128
    // this.testImage01 = new TestImage01(this.ctx, this.w, this.h); // 128


    this.maquette = new Maquette(this.canvas, this.w, this.h);

    this.draw();
  },

  draw : function() {
    // clean canvas
    // this.ctx.clearRect(0, 0, this.w, this.h); // ----> paperjs doesn't need
    // draw stuff
    if (this.tool) {
      this.tool.updateFrequency();
      this.tool.updateWave();
      this.tool.analyzeBeats();

      // this.barDemo.draw(this.tool.dataBeat);
      // this.circleDemo.draw(this.tool.data);
      // this.letterDemo.draw(this.tool.dataWave);
      // this.rasterDemo.draw(this.tool.dataBeat);
      // this.beatDemo.draw(this.tool.data, this.tool.dataWave);
      // this.verletDemo.draw(this.tool.data);

      // this.circles01Test.draw(this.tool.dataBeat);
      // this.testRect01.draw(this.tool.dataBeat);
      // this.testCircle02.draw(this.tool.dataBeat);
      // this.testCircle03.draw(this.tool.dataBeat);
      // this.testRect04.draw(this.tool.dataBeat);
      // this.testRect05.draw(this.tool.dataBeat);
      // this.testRect06.draw(this.tool.dataBeat);
      // this.testRect07.draw(this.tool.dataBeat);
      // this.testImage01.draw(this.tool.dataBeat);

      this.maquette.draw(this.tool.dataBeat);
    }
    // refresh
    requestAnimationFrame(this.draw.bind(this));
  },

  onKeyDown : function(e) {
    var track = "audio/insomnia.mp3";
    switch (e.keyCode) {
      case 32: // spacebar
      if (this.tool == null) {
        this.tool = new AudioTool(track);
        this.tool.toggle();
        this.tool.setupBeatDetector(32, 1.15);
        // this.tool.toggleBeatDetection();
      } else {
        this.tool.reset();
        if (this.isMic) {
          this.tool.update(track);
          this.tool.toggle();
          this.isMic = false;
        } else {
          this.tool.update(null);
          this.isMic = true;
        }
      }
      break;
      case 65: // A
      this.tool.toggleBeatDetection();
      break;
      case 37: // ArrowLeft
      this.tool.adjustThreshold(-0.1);
      break;
      case 39: // ArrowRight
      this.tool.adjustThreshold(0.1);
      break;
    }
  }

};

window.addEventListener("DOMContentLoaded", function(e) { new App(); });
