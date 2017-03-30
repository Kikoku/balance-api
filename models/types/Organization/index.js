import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';
import bcrypt from 'bcrypt';

const organizationSchema = new Schema ({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  roles: [{
    type: Schema.ObjectId,
    ref: 'Role'
  }]
});

organizationSchema.pre('save', function(next) {
  let org = this;
  if(!org.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(5, (err, salt) => {
    if(err) {
      return next(err);
    }
    bcrypt.hash(org.password, salt, (err, hash) => {
      if(err) {
        return next(err);
      }
      org.password = hash;
      next();
    })
  })
});

organizationSchema.methods = {
  comparePassword(pw, cb) {

    if (!pw) {
      return cb({
        msg: 'No Password Supplied'
      });
    }

    bcrypt.compare(pw, this.password, function(err, isMatch) {
      if(err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  },
  toJSON() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  }
}

const Organization = mongoose.model('Organization', organizationSchema);

Bluebird.promisifyAll(Organization);
Bluebird.promisifyAll(Organization.prototype);

export default Organization;
