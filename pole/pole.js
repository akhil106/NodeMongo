var mongoose = require('mongoose');
var PoleSchema = new mongoose.Schema({
    user_id: String,
    district_name: String,
    district_id: Number,
    route_name: String,
    route_id: String,
    images: Array,
    seq_no: Number,
    line_type: String,
    pole_type: String,
    address: String,
    lattitude: Number,
    longitude: Number,
    date: Date

}, { versionKey: false });
mongoose.model('pole', PoleSchema);

module.exports = mongoose.model('pole');