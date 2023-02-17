var mongoose = require('mongoose');
var RouteSchema = new mongoose.Schema({
    route_name: String,
    route_id: Number,
    district_name: String,
    district_id: Number
}, { versionKey: false });
mongoose.model('routes', RouteSchema);

module.exports = mongoose.model('routes');