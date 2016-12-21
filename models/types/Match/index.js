import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const matchSchema = new Schema ({
  round: Number
});

const Match = mongoose.model('Match', matchSchema);

Bluebird.promisifyAll(Match);
Bluebird.promisifyAll(Match.prototype);

export default Match;
