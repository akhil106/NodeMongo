var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/Asman');
mongoose.connect('mongodb+srv://akhil:Bunty%40143@ecomshoper.f0oqbjj.mongodb.net/);

var dist = require('./districts/districts');
var districts = [
    { "district_name": "Anantapur", "district_id": 1 },
    { "district_name": "Chittoor", "district_id": 2 },
    { "district_name": "East Godavari", "district_id": 3 },
    { "district_name": "Guntur", "district_id": 4 },
    { "district_name": "Krishna", "district_id": 5 },
    { "district_name": "Kurnool", "district_id": 6 },
    { "district_name": "Nellore", "district_id": 7 },
    { "district_name": "Prakasam", "district_id": 8 },
    { "district_name": "Srikakulam", "district_id": 9 },
    { "district_name": "Visakhapatnam", "district_id": 10 },
    { "district_name": "Vizianagaram", "district_id": 11 },
    { "district_name": "West Godavari", "district_id": 12 },
    { "district_name": "YSR Kadapa", "district_id": 13 }
];
var route = require('./routes/route');

var routes = [
    {
        "route_name": "Route No 1",
        "route_id": 1,
        "district_name": "Guntur",
        "district_id": 4
    },
    {
        "route_name": "Route No 2",
        "route_id": 2,
        "district_name": "Guntur",
        "district_id": 4
    },
    {
        "route_name": "Route No 3",
        "route_id": 3,
        "district_name": "Guntur",
        "district_id": 4
    },
    {
        "route_name": "Route No 1",
        "route_id": 1,
        "district_name": "Anantapur",
        "district_id": 1
    },
    {
        "route_name": "Route No 2",
        "route_id": 2,
        "district_name": "Anantapur",
        "district_id": 1
    }
]

for (let index = 0; index < districts.length; index++) {
    dist.find({ district_name: districts[index].district_name }, function (err, user) {
        if (err) return res.status(500).send("There was a problem adding the data in districts.");
        if (user.length != 0) {
            // console.log("districts exits");
        } else {
            dist.collection.insertOne(districts[index], function (err, res) {
                // if (err) return res.status(500).send("There was a problem finding the data.");
                // console.log(res);
                // console.log("district added");
            })
        }
    });
}

for (let index = 0; index < routes.length; index++) {
    route.find({ district_name: routes[index].district_name }, function (err, user) {
        if (err) return res.status(500).send("There was a problem adding the data in routes.");
        if (user.length != 0) {
            // console.log("routes exits");
        } else {
            route.collection.insertOne(routes[index], function (err, res) {
                // if (err) return res.status(500).send("There was a problem finding the data.");
                // console.log(res);
                // console.log("district added");
            })
        }
    });
}

