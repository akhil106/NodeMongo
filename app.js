var express = require('express');
var app = express();
var db = require('./db');
var cors = require('cors');

app.use(cors());

var SignupController = require('./signup/signupController');
app.use('/signup', SignupController);

var SigninController = require('./signin/signinController');
app.use('/signin', SigninController);

var DistrictsController = require('./districts/districtsController');
app.use('/districts', DistrictsController);

var RouteController = require('./routes/routeController');
app.use('/routes', RouteController);

var DatacollectorController = require('./datacollecter/datacollecterController');
app.use('/datacollector', DatacollectorController);

var PoleController = require('./pole/poleController');
app.use('/pole', PoleController);

var PoleimageController = require('./pole/poleimageController');
app.use('/poleimage', PoleimageController);

app.use('/', express.static(require('path').join(__dirname, 'public')));

var ProfileController = require('./userprofile/userprofileController');
app.use('/profile', ProfileController);

module.exports = app;