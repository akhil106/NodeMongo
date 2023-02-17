var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  userid: String,
  name: String,
  email: String,
  mobileno: Number,
  address: String,
  role: String,
  image: String,
  lat: Number,
  long: Number
}, { versionKey: false });
mongoose.model('DataCollector', UserSchema);

module.exports = mongoose.model('DataCollector');