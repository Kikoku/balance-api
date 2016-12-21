import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const eventToOrgSchema = new Schema ({
  orgId: {
    type: Schema.ObjectId,
    ref: 'Organization'
  },
  eventId: {
    type: Schema.ObjectId,
    ref: 'Event'
  }
});

const EventToOrg = mongoose.model('EventToOrg', eventToOrgSchema);

Bluebird.promisifyAll(EventToOrg);
Bluebird.promisifyAll(EventToOrg.prototype);

export default EventToOrg;
