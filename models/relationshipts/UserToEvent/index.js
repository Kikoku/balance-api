import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const userToEventSchema = new Schema ({
  userId: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  eventId: {
    type: Schema.ObjectId,
    ref: 'Event'
  }
});

const UserToEvent = mongoose.model('UserToEvent', userToEventSchema);

Bluebird.promisifyAll(UserToEvent);
Bluebird.promisifyAll(UserToEvent.prototype);

export default UserToEvent;
