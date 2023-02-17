var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ limit: '50mb', extended: true }));
var Pole = require('./pole');
var Route = require('../routes/route');

// CREATES A NEW Pole
router.post('/', function (req, res) {
    Route.find({ _id: req.body.route_id }, function (err, route) {
        if (err) return res.status(500).send("There was a problem finding the route.");
        // route_info = route;
        console.log("44", route);
        var indiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        var today = new Date(indiaTime).toLocaleString();
        console.log("47", today, req.body);
        Pole.create({
            userid: req.body.userid,
            district_name: route[0].district_name,
            district_id: route[0].district_id,
            route_name: route[0].route_name,
            route_id: req.body.route_id,
            images: req.body.images,
            seq_no: req.body.seq_no,
            line_type: req.body.line_type,
            pole_type: req.body.pole_type,
            address: req.body.address,
            lattitude: req.body.lattitude,
            longitude: req.body.longitude,
            date: today
        },
            function (err, pole) {
                if (err) return res.status(500).send("There was a problem adding the pole information to the database.");
                res.status(200).send({
                    poleinfo: {
                        info: pole,
                        message: "Pole Data Collected Successfully...!",
                        servicestatus: "Success"
                    }
                });
            });
    });
});

router.get('/', function (req, res) {
    Pole.find({}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the data.");
        res.status(200).send({
            poleinfo: {
                info: pole,
                message: "Pole Data Fetched Successfully...!",
                servicestatus: "Success"
            }
        });
    });

});
module.exports = router;