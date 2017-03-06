'use strict';



AudioTool.prototype.setupBeatDetector = function() {
  this.history_maxsize = 30;
  this.e_history = [];
  this.local_total = [];
  this.bandcount = 22;
  this.threshold = 1.1;
  this.dataBeat = [];
  this.es = [];
  this.ui_ratio = 1;
  this.doFilterBeats = true;
  for (let i = 0; i < this.bandcount; i++) {
    this.local_total[i] = 0;
  }
  this.sampleSize = 1024;
  for (let i = 0; i < this.bandcount; i++) {
    this.dataBeat.push(1);
  }

  this.bandwidthes = [8,14,20,26,32,36,38,40,42,44,46,48,50,52,54,56,58,60,66,72,78,80];


};


AudioTool.prototype.dequeueFromHistory = function() {
  // Remove the oldest present value from the history queue
  var old_es = this.e_history.shift();

  // Adjust the local total accordingly for each band
  for (let i = 0; i < this.bandcount; i++) {
    this.local_total[i] -= old_es[i]
  }
};


AudioTool.prototype.toggleBeatDetection = function() {
  this.doFilterBeats = !this.doFilterBeats;
  console.log("Turning beat detection " + (this.doFilterBeats ? "on" : "off"));
};


AudioTool.prototype.analyzeBeats = function() {

  let samplesI = 0;
  let es = [];
  for(let i = 0; i < this.bandcount; i++) {
    // add the corresponding samples
    // TODO : 1024 to 2048
    let aggregated = 0;
    for (let j = 0; j < this.bandwidthes[i]; j++) {
      aggregated += this.data[samplesI];
      samplesI++;
    }
    es.push(aggregated);
  }

  // finalize the computation of the band energy
  // by dividing by the number of elements added
  for (let i = 0; i < this.bandcount; i++) {
    es[i] *= (this.bandwidthes[i]/1024);
  }
  for (let i = 0; i < this.bandcount; i++) {
    this.local_total[i] += es[i]
  }
  this.e_history.push(es);

  if (this.e_history.length > this.history_maxsize) {
    this.dequeueFromHistory();
  }

  // Actually filters beat
  for (let i = 0; i < this.bandcount; i++) {
    if (es[i] > (this.threshold * this.local_total[i] / this.e_history.length) || !this.doFilterBeats ) {
      this.dataBeat[i] = es[i];
    }
    else {
      this.dataBeat[i] = 0;
    }
  }
};
