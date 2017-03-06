

AudioTool.prototype.setupBeatDetector = function() {
  this.history_maxsize = 50;
  this.local_total = [];
  this.bandcount = 22;
  this.threshold = 2.5;
  this.we_have_a_beat_at = [];
  this.es = [];
  console.log("Hey");
};
