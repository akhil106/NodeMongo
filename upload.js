var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var multer = require('multer');
var Pole = require('./pole');
var Route = require('../routes/route');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/poleimages')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".png")
    }
})
var upload = multer({ storage: storage }).array('pole', 10);


// CREATES A NEW Pole
router.post('/', function (req, res) {
    var img_array = [];
    var route_info;
    var indiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    indiaTime = new Date(indiaTime);
    // console.log('India time: ' + indiaTime.toLocaleString())
    upload(req, res, function (err) {
        console.log(req);
        console.log(req.files);
        for (let index = 0; index < req.body.images.length; index++) {
            var url = "http://" + req.headers.host + "/" + req.body.images[index].path.replace('public\\', '/')
            img_array.push(url);
        }
        if (err) {
            return res.end("Error uploading file. Images limit upto 10");
        }
    });
    console.log(img_array);

    Route.findById(req.body.route_id, function (err, route) {
        if (err) return res.status(500).send("There was a problem finding the route.");
        route_info = route;
    });
    Pole.create({
        userid: req.body.userid,
        district_name: route_info.district_name,
        district_id: route_info.district_id,
        route_name: route_info.route_name,
        route_id: route_info.route_id,
        images: img_array,
        line_type: req.body.line_type,
        pole_type: req.body.pole_type,
        address: req.body.address,
        lattitude: req.body.lattitude,
        longitude: req.body.longitude,
        date: indiaTime.toLocaleString()
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

router.get('/', function (req, res) {
    var indiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    indiaTime = new Date(indiaTime);
    console.log('India time: ' + indiaTime.toLocaleString())
    res.status(200).send({ date: indiaTime.toLocaleString() });
});
module.exports = router;
var img = [{
    fieldname: 'pole',
    originalname: '2222.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: './public/poleimages',
    filename: 'pole-1556179837220',
    path: 'public\\poleimages\\pole-1556179837220',
    size: 12912
},
{
    fieldname: 'pole',
    originalname: 'icon.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: './public/poleimages',
    filename: 'pole-1556179837241',
    path: 'public\\poleimages\\pole-1556179837241',
    size: 423124
},
{
    fieldname: 'pole',
    originalname: 'robot-dev.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: './public/poleimages',
    filename: 'pole-1556179837437',
    path: 'public\\poleimages\\pole-1556179837437',
    size: 154903
},
{
    fieldname: 'pole',
    originalname: 'robot-prod.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: './public/poleimages',
    filename: 'pole-1556179837524',
    path: 'public\\poleimages\\pole-1556179837524',
    size: 12124
}]
