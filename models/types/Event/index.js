import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const eventSchema = new Schema ({
  batchid: {
    type: String
  },
  coordinator: {
    type: String
  },
  eliminationType: {
    type: String
  },
  enddate: {
    type: String
  },
  eventguid: {
    type: String,
    unique: true
  },
  eventtypecode: {
    type: String
  },
  format: {
    type: String
  },
  iscasuallreportonly: {
    type: Boolean
  },
  isplayoff: {
    type: Boolean
  },
  isstarted: {
    type: Boolean
  },
  manualmatchround: {
    type: Number
  },
  notes: {
    type: String
  },
  numberofrounds: {
    type: Number
  },
  playoffstartround: {
    type: Number
  },
  postevententry: {
    type: Boolean
  },
  sanctionnumber: {
    type: String,
    unique: true
  },
  seats: {
    type: String
  },
  startdate: String,
  status: {
    type: Number
  },
  title: String
});

const Event = mongoose.model('Event', eventSchema);

Bluebird.promisifyAll(Event);
Bluebird.promisifyAll(Event.prototype);

export default Event;
