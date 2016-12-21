import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const matchToEventSchema = new Schema ({
  matchId: {
    type: Schema.ObjectId,
    ref: 'Match'
  },
  eventId: {
    type: Schema.ObjectId,
    ref: 'Event'
  }
});

const MatchToEvent = mongoose.model('MatchToEvent', matchToEventSchema);

Bluebird.promisifyAll(MatchToEvent);
Bluebird.promisifyAll(MatchToEvent.prototype);

export default MatchToEvent;
