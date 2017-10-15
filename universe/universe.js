var Universe = function(space, song) {
  this.space = space;
  this.song = song;
};

Universe.prototype._twinkleStars = function() {
  if (this.song.analyser !== undefined) {
    this.song.analyser.getByteTimeDomainData(this.song.dataArray);
    for (var i = 0; i < this.space.stars.length; i++) {
      var v = this.song.dataArray[i] / 128.0;
      this.space.stars[i].setBrightness(Math.round(((v - 0.9) / 0.15) * 255));
    }
  }
};

Universe.prototype.draw = function(ctx) {
  this._twinkleStars();
  this.space.draw(ctx);
};
