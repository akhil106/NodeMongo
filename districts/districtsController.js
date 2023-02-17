var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var districts = require('./districts');

router.get('/', function (req, res) {
    districts.find({}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the data.");
        res.status(200).send({
            getdistricts: {
                districtsinfo: user,
                message: "Data fetched successfully...!",
                servicestatus: "Success"
            }
        });
    });
});

// var multer = require('multer');
// var storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, './public/poleimages');
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + '-' + Date.now());
//     }
// });
// var upload = multer({ storage: storage }).array('pole', 10);
// router.post('/', function (req, res) {
//     upload(req, res, function (err) {
//         console.log(req.body);
//         console.log(req.file);
//         console.log(req.files);
//         console.log(req.pole);
//     });
// });


module.exports = router;