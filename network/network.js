var NetworkManager = function() {
  this.loadAudio = function(audioContext, file, callback) {
    var bufferLoader = new BufferLoader(
      audioContext, [file],
      callback);
    bufferLoader.load();
  };
};
