var PumpkinPatch = function() {
    this.song = new Audio(GAME_MASTER.song, new NetworkManager());
    this.field = new Field();
};

PumpkinPatch.prototype._reactToSong = function() {
    if (this.song.analyser !== undefined) {
        this.song.analyser.getByteTimeDomainData(this.song.dataArray);
        for (var i = 0; i < this.field.entities.length; i++) {
            for (var j = 0; j < this.field.entities[i].length; j++) {
                var v = this.song.dataArray[i + j] / 256.0;
                if (this.field.entities[i][j] != undefined)
                    this.field.entities[i][j].setSpecialActivation(v);
            }
        }
    }
};

PumpkinPatch.prototype.draw = function(ctx) {
    this._reactToSong();
    this.field.draw(ctx);
};