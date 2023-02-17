var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var routes = require('./route');

router.get('/', function (req, res) {
    routes.find({}, function (err, route) {
        if (err) return res.status(500).send("There was a problem finding the data.");
        res.status(200).send({
            getroutes: {
                routesinfo: route,
                message: "Data fetched successfully...!",
                servicestatus: "Success"
            }
        });
    });
});

router.get('/:id', function (req, res) {
    routes.find({ district_id: req.params.id }, function (err, route) {
        if (err) return res.status(500).send("There was a problem finding the data.");
        if (!route) return res.status(404).send("No Record found.");
        res.status(200).send({
            getroutes: {
                routesinfo: route,
                message: "Data fetched successfully...!",
                servicestatus: "Success"
            }
        });
    });
});


module.exports = router;