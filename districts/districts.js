var mongoose = require('mongoose');
var DistrictSchema = new mongoose.Schema({
  district_name: String,
  district_id: Number
}, { versionKey: false });
mongoose.model('districts', DistrictSchema);

module.exports = mongoose.model('districts');