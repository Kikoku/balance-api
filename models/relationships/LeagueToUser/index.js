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

leagueToUserSchema.statics.findOrCreate = function(profile, cb) {
  let leagueToUser = new this();
  this.findOne({
    userId: profile.userId,
    leagueId: profile.leagueId
  }, function(err, result) {
    if(!result) {
      Object.keys(profile).map((key, i) => {
        leagueToUser[key] = profile[key]
      })
      leagueToUser.save(cb);
    } else {
      cb(err, result);
    }
  })
}

const LeagueToUser = mongoose.model('LeagueToUser', leagueToUserSchema);

Bluebird.promisifyAll(LeagueToUser);
Bluebird.promisifyAll(LeagueToUser.prototype);

export default LeagueToUser;
