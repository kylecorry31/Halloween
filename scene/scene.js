var Scene = function() {
    this.song = new Audio(GAME_MASTER.song, new NetworkManager());
    this.field = new Field();
};

Scene.prototype._reactToSong = function() {
    if (this.song.analyser !== undefined) {
        this.song.analyser.getByteTimeDomainData(this.song.dataArray);
        var songBins = [];
        var inputChannelsPerBin = this.song.dataArray.length / GAME_MASTER.song_analysis.output_bins;
        for(var i = 0; i < GAME_MASTER.song_analysis.output_bins; i++){
            songBins.push(0.0);
            for(var channel = i * inputChannelsPerBin; channel < (i+1) * inputChannelsPerBin && channel < this.song.dataArray.length; channel++){
                songBins[i] += this.song.dataArray[i];
            }
            songBins[i] /= inputChannelsPerBin;
            songBins[i] /= 256.0;
        }

        for (var i = 0; i < this.field.entities.length; i++) {
            for (var j = 0; j < this.field.entities[i].length; j++) {
                var binIndex = Math.floor(Math.random() * songBins.length);
                // var v = this.song.dataArray[i + j] / 256.0;
                if (this.field.entities[i][j] != undefined)
                    this.field.entities[i][j].setSpecialActivation(songBins[binIndex]);
            }
        }
    }
};

Scene.prototype.draw = function(ctx) {
    this._reactToSong();
    this.field.draw(ctx);
};