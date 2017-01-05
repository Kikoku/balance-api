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

userSchema.statics.findOrCreate = function(profile, cb) {
  let user = new this();
  this.findOne({
    dci: profile.dci
  }, function(err, result) {
    if(!result) {
      Object.keys(profile).map((key, i) => {
        user[key] = profile[key]
      })
      user.save(cb);
    } else {
      cb(err, result);
    }
  })
}

const User = mongoose.model('User', userSchema);

Bluebird.promisifyAll(User);
Bluebird.promisifyAll(User.prototype);

export default User;
