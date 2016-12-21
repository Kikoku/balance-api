import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const organizationSchema = new Schema ({
  name: String,
  email: String,
  password: String
});

const Organization = mongoose.model('Organization', organizationSchema);

Bluebird.promisifyAll(Organization);
Bluebird.promisifyAll(Organization.prototype);

export default Organization;
