var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Data = require('./datacollecter');

// CREATES A NEW USER
router.post('/', function (req, res) {
    Data.create({
        userid: req.body.userid,
        name: req.body.name,
        email: req.body.email,
        mobileno: req.body.mobileno,
        address: req.body.address,
        role: req.body.role,
        image: req.body.image,
        lat: req.body.lat,
        long: req.body.long
    },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send({
                Datacollector: {
                    info: [{
                        userid: user.userid,
                        name: user.name,
                        email: user.email,
                        mobileno: user.mobileno,
                        address: user.address,
                        role: user.role,
                        image: user.image,
                        lat: user.lat,
                        long: user.long,
                        _id: user._id
                    }],
                    message: "Data Collected Success...!",
                    servicestatus: "Success"
                }
            });
        });
});
router.get('/', function (req, res) {
    Data.find({}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the data.");
        res.status(200).send({
            Datacollector: {
                info: user,
                message: "Data fetched successfully...!",
                servicestatus: "Success"
            }
        });
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    Data.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the data.");
        if (!user) return res.status(404).send("No Record found.");
        res.status(200).send({
            Datacollector: {
                info: user,
                message: "Data fetched successfully...!",
                servicestatus: "Success"
            }
        });
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Data.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the data.");
        res.status(200).send({
            Datacollector: {
                message: "Record was deleted successfully...!",
                servicestatus: "Success"
            }
        });
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    Data.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the data.");
        res.status(200).send({
            Datacollector: {
                info: user,
                message: "Data updated successfully...!",
                servicestatus: "Success"
            }
        });
    });
});


module.exports = router;