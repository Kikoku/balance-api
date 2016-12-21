import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const userToLeagueSchema = new Schema ({
  userId: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  leagueId: {
    type: Schema.ObjectId,
    ref: 'League'
  },
  win: Number,
  loss: Number
  draw: Number,
  elo: Number,
  change: Number,
  attendance: Number
});

const UserToLeague = mongoose.model('UserToLeague', userToLeagueSchema);

Bluebird.promisifyAll(UserToLeague);
Bluebird.promisifyAll(UserToLeague.prototype);

export default UserToLeague;
