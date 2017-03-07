'use strict';


/**
 * USAGE :
 *
 * After creating AudioTool :
 *      this.tool.setupBeatDetector(subbandCount, initialThreshold);
 *       where subbandCount is a power of 2 ideally,
 *       and initialThreshold a value around 1-3
 *
 * Every frame :
 *      this.tool.analyzeBeats();
 *        this.tool.dataBeat will then be available as an array of length subbandCount
 *        each band will contain 0
 *        or the last average sample value for the band if a peak was detected.
 *
 */


 /**
  * CONTROL SNIPPET for onKeyDown :

  case 65: // A
    this.tool.toggleBeatDetection();
    break;
  case 37: // ArrowLeft
    this.tool.adjustThreshold(-0.1);
    break;
  case 39: // ArrowRight
    this.tool.adjustThreshold(0.1);
    break;
*/



AudioTool.prototype.setupBeatDetector = function(subbandCount, initialThreshold) {
  this.bandcount = subbandCount;
  this.threshold = initialThreshold;
  this.history_maxsize = 10;
  this.sampleSize = 2048;
  this.e_history = [];
  this.local_total = [];
  this.dataBeat = [];
  this.es = [];
  this.doFilterBeats = true;

  for (let i = 0; i < this.bandcount; i++) {
    this.local_total[i] = 0;
  }
  for (let i = 0; i < this.bandcount; i++) {
    this.dataBeat.push(0);
  }

  this.bandwidthes = [];
  let amount = this.sampleSize / this.bandcount;

  for (let i = 0; i < this.bandcount; i++) {
    this.bandwidthes.push(amount);
  }

  // TODO : séparation ~exponentielle pour mieux séparer les basses.
  // this.bandwidthes = [8,14,20,26,32,36,38,40,42,44,46,48,50,52,54,56,58,60,66,72,78,80];
  // console.log(this.bandwidthes);

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

AudioTool.prototype.adjustThreshold = function(adjustement) {
  this.threshold += adjustement
  console.log("Set threshold to : " + this.threshold);
};


AudioTool.prototype.analyzeBeats = function() {

  let samplesI = 0;
  // Energy of subband
  let es = [];
  for(let i = 0; i < this.bandcount; i++) {
    // add the corresponding samples
    // TODO : 1024 to 2048
    let aggregated = 0;
    for (let j = 0; j < this.bandwidthes[i]; j++) {
      aggregated += this.data[samplesI];
      samplesI++;
    }
    // finalize the computation of the band energy
    // by dividing by the number of elements added
    es.push(aggregated/this.bandwidthes[i]);
    // es.push(aggregated);
  }

  // finalize the computation of the band energy
  // by dividing by the number of elements added
  // for (let i = 0; i < this.bandcount; i++) {
  //   // es[i] *= (this.bandwidthes[i]/this.sampleSize);
  //   es[i] /= (this.bandwidthes[i]);
  // }

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
