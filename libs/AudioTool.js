var AudioTool = function(mp3) {
  this.soundURL = mp3 || null;
  this.audioContext = null;
  this.audio = null;
  this.isPlaying = false;
  // MIC stuff
  this.stream = null;
  this.analyserNode = null;
  this.data = [];
  this.dataWave = [];
  this.size = 2048;
  this.counter = 0;
  this.setup();
};

AudioTool.prototype = {

  isAudioContextSupported : function() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if (window.AudioContext) {
      return true;
    } else {
      return false;
    }
  },

  setup : function() {
    if (this.isAudioContextSupported()) {
      this.audioContext = new AudioContext();
      // Setup audio stuff
      this.update(this.soundURL);
    } else {
      alert("this browser doesn't support the Web Audio API. Come on...");
    }
  },

  update : function(url) {
    if (url != null) {
      if (this.audio == null) {
        this.audio = new Audio();
        this.audio.controls = true;
        this.audio.load();
        this.audio.src = url;
        document.body.appendChild(this.audio);
      }
      this.mic = null;
      this.broadcast();
    } else {
      try {
        // monkeypatch getUserMedia
        navigator.getUserMedia = navigator.getUserMedia ||
                                 navigator.webkitGetUserMedia ||
                                 navigator.mozGetUserMedia;

        // ask for an audio input
        navigator.getUserMedia({
          "audio" : {
            "mandatory" : {
              "googEchoCancellation" : "false",
              "googAutoGainControl" : "false",
              "googNoiseSuppression" : "false",
              "googHighpassFilter" : "false"
            },
            "optional" : []
          },
        },
                               this.onStream.bind(this),
                               this.noStream.bind(this));
      } catch (e) {
        alert('getUserMedia threw exception :' + e);
      }
    }
  },

  broadcast : function() {
    if (this.source == null)
      this.source = this.audioContext.createMediaElementSource(this.audio);
    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = this.size;
    this.source.connect(this.analyserNode);
    this.analyserNode.connect(this.audioContext.destination);
    this.data = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.dataWave = new Uint8Array(this.analyserNode.frequencyBinCount);
  },

  onStream : function(stream) {
    this.stream = stream;
    this.mic = this.audioContext.createMediaStreamSource(stream);
    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = this.size;
    this.mic.connect(this.analyserNode);
    // two kind of analysis
    this.data = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.dataWave = new Uint8Array(this.analyserNode.frequencyBinCount);
  },

  noStream : function() { alert("problem with mic"); },

  toggle : function() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    };
    this.isPlaying = !this.isPlaying;
  },

  updateFrequency : function() {
    this.analyserNode.getByteFrequencyData(this.data);
  },

  updateWave : function() {
    this.analyserNode.getByteTimeDomainData(this.dataWave);
  },

  reset : function() {
    if (this.audio != null) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
  }
}
