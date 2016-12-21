import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const orgToEventSchema = new Schema ({
  orgId: {
    type: Schema.ObjectId,
    ref: 'Organization'
  },
  eventId: {
    type: Schema.ObjectId,
    ref: 'Event'
  }
});

const OrgToEvent = mongoose.model('OrgToEvent', orgToEventSchema);

Bluebird.promisifyAll(OrgToEvent);
Bluebird.promisifyAll(OrgToEvent.prototype);

export default OrgToEvent;
