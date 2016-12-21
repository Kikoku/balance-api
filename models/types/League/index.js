import mongoose, { Schema } from 'mongoose';
import Bluebird from 'bluebird';

const leagueSchema = new Schema ({
  title: String,
  startdate: String,
  enddate: String
});

const League = mongoose.model('League', leagueSchema);

Bluebird.promisifyAll(League);
Bluebird.promisifyAll(League.prototype);

export default League;
