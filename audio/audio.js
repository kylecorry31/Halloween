var Audio = function(file, networkManager) {
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  this.audio = new AudioContext();

  var context = this;

  this._playSound = function(buffer) {
    if (buffer === null)
      return;
    context.source = context.audio.createBufferSource();
    context.source.buffer = buffer;
    context.source.loop = true;
    context.analyser = context.audio.createAnalyser();
    context.analyser.fftSize = 2048;
    context.bufferLength = context.analyser.frequencyBinCount;
    context.dataArray = new Uint8Array(context.bufferLength);
    context.analyser.getByteTimeDomainData(context.dataArray);
    context.source.connect(context.analyser);
    context.analyser.connect(context.audio.destination);
    context.source.start(0);
  };

  networkManager.loadAudio(this.audio, file, this._playSound);

};
