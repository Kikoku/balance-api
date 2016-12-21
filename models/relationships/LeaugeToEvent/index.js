import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const leagueToEventSchema = new Schema ({
  eventId: {
    type: Schema.ObjectId,
    ref: 'Event'
  },
  leagueId: {
    type: Schema.ObjectId,
    ref: 'League'
  }
});

const LeagueToEvent = mongoose.model('LeagueToEvent', leagueToEventSchema);

Bluebird.promisifyAll(LeagueToEvent);
Bluebird.promisifyAll(LeagueToEvent.prototype);

export default LeagueToEvent;
