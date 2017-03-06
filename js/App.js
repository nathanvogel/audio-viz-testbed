'use strict';



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
    this.barDemo = new BarsDemo(this.ctx, this.w, this.h);
    // this.circleDemo = new CircleBars(this.ctx, this.w, this.h);
    // this.circleDemo.rotation = true;
    // this.letterDemo = new LetterDemo(this.canvas, this.w, this.h);
    // this.rasterDemo = new RasterDemo(this.canvas, this.w, this.h);
    // this.beatDemo = new BeatDemo(this.ctx, this.w, this.h);
    // this.verletDemo = new VerletDemo(this.canvas, this.w, this.h);

    this.draw();
  },

  draw : function() {
    // clean canvas
    this.ctx.clearRect(0, 0, this.w, this.h); // ----> paperjs doesn't need
    // draw stuff
    if (this.tool) {
      this.tool.updateFrequency();
      this.tool.updateWave();
      this.tool.analyzeBeats();

      this.barDemo.draw(this.tool.dataBeat);
      // this.circleDemo.draw(this.tool.data);
      // this.letterDemo.draw(this.tool.dataWave);
      // this.rasterDemo.draw(this.tool.data);
      // this.beatDemo.draw(this.tool.data, this.tool.dataWave);
      // this.verletDemo.draw(this.tool.data);
    }
    // refresh
    requestAnimationFrame(this.draw.bind(this));
  },

  onKeyDown : function(e) {
    var track = "audio/amandine.mp3";
    switch (e.keyCode) {
      case 32: // spacebar
      if (this.tool == null) {
        this.tool = new AudioTool(track);
        this.tool.toggle();
        this.tool.setupBeatDetector();
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
      case 65:
      this.tool.toggleBeatDetection();
      break;
    }
  }

};

window.addEventListener("DOMContentLoaded", function(e) { new App(); });
