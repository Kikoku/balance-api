import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const eventToMatchSchema = new Schema ({
  matchId: {
    type: Schema.ObjectId,
    ref: 'Match'
  },
  eventId: {
    type: Schema.ObjectId,
    ref: 'Event'
  }
});

const EventToMatch = mongoose.model('EventToMatch', eventToMatchSchema);

Bluebird.promisifyAll(EventToMatch);
Bluebird.promisifyAll(EventToMatch.prototype);

export default EventToMatch;
