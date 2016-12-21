import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const eventToLeagueSchema = new Schema ({
  eventId: {
    type: Schema.ObjectId,
    ref: 'Event'
  },
  leagueId: {
    type: Schema.ObjectId,
    ref: 'League'
  }
});

const EventToLeague = mongoose.model('EventToLeague', eventToLeagueSchema);

Bluebird.promisifyAll(EventToLeague);
Bluebird.promisifyAll(EventToLeague.prototype);

export default EventToLeague;
