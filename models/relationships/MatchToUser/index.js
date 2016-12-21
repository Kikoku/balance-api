import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const matchToUserSchema = new Schema ({
  userId: {
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
  elo: Number,
  change: Number
});

const MatchToUser = mongoose.model('MatchToUser', matchToUserSchema);

Bluebird.promisifyAll(MatchToUser);
Bluebird.promisifyAll(MatchToUser.prototype);

export default MatchToUser;
