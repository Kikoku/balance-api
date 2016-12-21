import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const eventToUserSchema = new Schema ({
  userId: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  eventId: {
    type: Schema.ObjectId,
    ref: 'Event'
  }
});

const EventToUser = mongoose.model('EventToUser', eventToUserSchema);

Bluebird.promisifyAll(EventToUser);
Bluebird.promisifyAll(EventToUser.prototype);

export default EventToUser;
