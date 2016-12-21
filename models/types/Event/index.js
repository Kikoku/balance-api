import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const eventSchema = new Schema ({
  eventguid: {
    type: String,
    unique: true
  },
  sanctionnumber: {
    type: String,
    unique: true
  },
  title: String,
  startdate: String
});

const Event = mongoose.model('Event', eventSchema);

Bluebird.promisifyAll(Event);
Bluebird.promisifyAll(Event.prototype);

export default Event;
