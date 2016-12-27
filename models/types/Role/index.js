import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const roleSchema = new Schema ({
  name: String
});

const Role = mongoose.model('Role', roleSchema);

Bluebird.promisifyAll(Role);
Bluebird.promisifyAll(Role.prototype);

export default Role;
