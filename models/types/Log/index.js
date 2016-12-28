import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const logSchema = new Schema ({
  WERInfo: {
    type: String
  },
  date: {
    type: String
  },
  operation: {
    type: String
  }
});

const Log = mongoose.model('Log', logSchema);

Bluebird.promisifyAll(Log);
Bluebird.promisifyAll(Log.prototype);

export default Log;
