import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const eventToLogSchema = new Schema ({
  logId: {
    type: Schema.ObjectId,
    ref: 'Log'
  },
  eventId: {
    type: Schema.ObjectId,
    ref: 'Event'
  }
});

const EventToLog = mongoose.model('EventToLog', eventToLogSchema);

Bluebird.promisifyAll(EventToLog);
Bluebird.promisifyAll(EventToLog.prototype);

export default EventToLog;
