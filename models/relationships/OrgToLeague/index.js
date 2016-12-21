import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const orgToLeagueSchema = new Schema ({
  orgId: {
    type: Schema.ObjectId,
    ref: 'Organization'
  },
  leagueId: {
    type: Schema.ObjectId,
    ref: 'League'
  }
});

const OrgToLeague = mongoose.model('OrgToLeague', orgToLeagueSchema);

Bluebird.promisifyAll(OrgToLeague);
Bluebird.promisifyAll(OrgToLeague.prototype);

export default OrgToLeague;
