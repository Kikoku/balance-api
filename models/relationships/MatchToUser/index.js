import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const matchToUserSchema = new Schema ({
  person: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  opponent: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  matchId: {
    type: Schema.ObjectId,
    ref: 'Match'
  },
  win: Number,
  loss: Number,
  draw: Number,
  p1elo: Number,
  p1change: Number,
  p2elo: Number,
  p2change: Number,
  outcome: Number,
  winbydrop: Boolean
});

const MatchToUser = mongoose.model('MatchToUser', matchToUserSchema);

Bluebird.promisifyAll(MatchToUser);
Bluebird.promisifyAll(MatchToUser.prototype);

export default MatchToUser;
