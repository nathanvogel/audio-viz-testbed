

AudioTool.prototype.setupBeatDetector = function() {
  this.history_maxsize = 50;
  this.e_history = [];
  this.local_total = [];
  this.bandcount = 22;
  this.threshold = 2.5;
  this.we_have_a_beat_at = [];
  this.es = [];
  this.ui_ratio = 1;
  console.log("Hey");
  for (let i = 0; i < this.bandcount; i++) {
    this.local_total[i] = 0;
  }

  this.bandwidthes = [8,14,20,26,32,36,38,40,42,44,46,48,50,52,54,56,58,60,66,72,78,80];


};


AudioTool.prototype.dequeueFromHistory = function() {

};


AudioTool.prototype.analyzeBeats = function() {
  if (e_history.length > this.history_maxsize) {
    this.dequeueFromHistory();
  }


		for(let i = 0; i < bandcount;i++) {  
			// add the corresponding samples
			for (int j = 0; j < bandwidthes[i]; j++) {
				es[i] += samples[samplesI];
				samplesI++;
			}
		}
};

// TODO somewhere : set we_have_a_beat_at to 0
