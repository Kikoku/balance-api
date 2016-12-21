import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const userToMatchSchema = new Schema ({
  userId: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  matchId: {
    type: Schema.ObjectId,
    ref: 'Match'
  },
  win: Number,
  loss: Number
  draw: Number,
  elo: Number,
  change: Number
});

const UserToMatch = mongoose.model('UserToMatch', userToMatchSchema);

Bluebird.promisifyAll(UserToMatch);
Bluebird.promisifyAll(UserToMatch.prototype);

export default UserToMatch;
