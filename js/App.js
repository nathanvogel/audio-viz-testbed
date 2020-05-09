"use strict";

Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};

var App = function () {
  console.log("app is running");
  this.canvas = document.getElementsByTagName("canvas")[0];
  this.w = window.innerWidth;
  this.h = window.innerHeight;
  this.canvas.width = this.w;
  this.canvas.height = this.h;
  this.ctx = this.canvas.getContext("2d");
  this.tool = null;
  this.isMic = true;
  this.demos = [];
  this.currentDemo = 0;
  this.multiplySound = 1.0;
  this.setup();
};

App.prototype = {
  setup: function () {
    this.demos = [
      { demo: new TestCircle02(this.ctx, this.w, this.h), bandCount: 128 },
      { demo: new TestCircle03(this.ctx, this.w, this.h), bandCount: 32 },
      { demo: new TestRect04(this.ctx, this.w, this.h), bandCount: 128 },
      { demo: new TestRect05(this.ctx, this.w, this.h), bandCount: 128 },
      { demo: new TestRect06(this.ctx, this.w, this.h), bandCount: 128 },
      { demo: new TestRect07(this.ctx, this.w, this.h), bandCount: 128 },
      { demo: new FlashingScreen01(this.ctx, this.w, this.h), bandCount: 128 },
    ];

    // DEMOS
    // this.barDemo = new BarsDemo(this.ctx, this.w, this.h);
    // this.circleDemo = new CircleBars(this.ctx, this.w, this.h);
    // this.circleDemo.rotation = true;
    // this.letterDemo = new LetterDemo(this.canvas, this.w, this.h);
    // this.rasterDemo = new RasterDemo(this.canvas, this.w, this.h);
    // this.beatDemo = new BeatDemo(this.ctx, this.w, this.h);
    // this.verletDemo = new VerletDemo(this.canvas, this.w, this.h);

    // this.testImage01 = new TestImage01(this.ctx, this.w, this.h); // 128
    // this.maquette = new Maquette(this.canvas, this.w, this.h);

    addEventListener("keydown", this.onKeyDown.bind(this));
    this.draw();
  },

  draw: function () {
    // clean canvas
    this.ctx.clearRect(0, 0, this.w, this.h); // ----> comment for paperjs
    if (this.tool) {
      this.tool.updateFrequency();
      this.tool.updateWave();
      this.tool.analyzeBeats();
      for (let i = 0; i < this.tool.dataBeat.length; i += 1) {
        this.tool.dataBeat[i] *= this.multiplySound;
      }
      this.demos[this.currentDemo].demo.draw(this.tool.dataBeat);
    }
    requestAnimationFrame(this.draw.bind(this));
  },

  setupMicAudioTool: function () {
    const d = this.demos[this.currentDemo];
    this.tool = new AudioTool("dummy-track-to-init-analyzernode");
    this.tool.setupBeatDetector(d.bandCount, 1.25);
    this.tool.update(null);
    this.isMic = true;
  },

  nextDemo: function () {
    this.currentDemo += 1;
    if (this.currentDemo >= this.demos.length) this.currentDemo = 0;
    this.setupDemo();
  },

  previousDemo: function () {
    this.currentDemo -= 1;
    if (this.currentDemo < 0) this.currentDemo = this.demos.length - 1;
    this.setupDemo();
  },

  setupDemo: function () {
    const d = this.demos[this.currentDemo];
    // console.log(d);
    // d.demo.setup();
    this.tool.setupBeatDetector(d.bandCount, 1.25);
  },

  onKeyDown: function (e) {
    // var track = "audio/bombay-short.m4a";

    // Start the audio tool on the first keydown
    if (this.tool == null) {
      this.setupMicAudioTool();
      return;
    }

    switch (e.keyCode) {
      case 32: // spacebar
        /*
        if (this.tool == null) {
          this.tool = new AudioTool(track);
          this.tool.toggle();
          this.tool.setupBeatDetector(128, 1.25);
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
        */
        break;
      case 65: // A
        this.tool.toggleBeatDetection();
        break;
      case 67: // C
        let audio = document.getElementsByTagName("audio")[0];
        audio.style.display =
          audio.style.display == "inline" ? "none" : "inline";
        break;
      case 70: // F
        this.previousDemo();
        break;
      case 71: // G
        this.nextDemo();
        break;
      case 74: // J
        this.multiplySound -= 0.1;
        console.log("Multiply sound: " + this.multiplySound);
        break;
      case 75: // K
        this.multiplySound += 0.1;
        console.log("Multiply sound: " + this.multiplySound);
        break;
      case 37: // ArrowLeft
        this.tool.adjustThreshold(-0.1);
        break;
      case 39: // ArrowRight
        this.tool.adjustThreshold(0.1);
        break;
    }
  },
};

window.addEventListener("DOMContentLoaded", function (e) {
  new App();
});
