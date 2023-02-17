var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ limit: '50mb', extended: true }));
var multer = require('multer');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/poleimages')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".png")
    }
})
var upload = multer({ storage: storage });

// CREATES A NEW Pole
router.post('/', upload.single('file'), function (req, res) {
    const file = req.file;
    if (!file) return res.status(500).send("There was a problem finding the data.");
    var url = "http://" + req.headers.host + "/" + file.path.replace('public\\', '/')
    res.status(200).send({ imgurl: url });
});

module.exports = router;