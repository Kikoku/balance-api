import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const userSchema = new Schema ({
  first: String,
  middle: String,
  last: String,
  dci: {
    type: String,
    unique: true
  },
  country: String,
});

const User = mongoose.model('User', userSchema);

Bluebird.promisifyAll(User);
Bluebird.promisifyAll(User.prototype);

export default User;
