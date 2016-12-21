import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const leagueToOrgSchema = new Schema ({
  orgId: {
    type: Schema.ObjectId,
    ref: 'Organization'
  },
  leagueId: {
    type: Schema.ObjectId,
    ref: 'League'
  }
});

const LeagueToOrg = mongoose.model('LeagueToOrg', leagueToOrgSchema);

Bluebird.promisifyAll(LeagueToOrg);
Bluebird.promisifyAll(LeagueToOrg.prototype);

export default LeagueToOrg;
