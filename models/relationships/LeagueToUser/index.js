import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const leagueToUserSchema = new Schema ({
  userId: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  leagueId: {
    type: Schema.ObjectId,
    ref: 'League'
  },
  win: Number,
  loss: Number,
  draw: Number,
  elo: Number,
  change: Number,
  attendance: Number
});

const LeagueToUser = mongoose.model('LeagueToUser', leagueToUserSchema);

Bluebird.promisifyAll(LeagueToUser);
Bluebird.promisifyAll(LeagueToUser.prototype);

export default LeagueToUser;
