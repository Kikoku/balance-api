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
  },
  win: Number,
  loss: Number,
  draw: Number,
  elo: Number,
  change: Number
});

const EventToUser = mongoose.model('EventToUser', eventToUserSchema);

Bluebird.promisifyAll(EventToUser);
Bluebird.promisifyAll(EventToUser.prototype);

export default EventToUser;
