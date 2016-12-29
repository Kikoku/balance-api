import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const matchSchema = new Schema ({
  round: Number,
  PlayFormat: String,
  date: String,
  teamformat: Boolean
});

const Match = mongoose.model('Match', matchSchema);

Bluebird.promisifyAll(Match);
Bluebird.promisifyAll(Match.prototype);

export default Match;
