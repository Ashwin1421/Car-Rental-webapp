var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/car_rental_cars');
var collection = db.get('cars');
var currentUser;
router.get('/', function(req, res) {
    collection.find({}, function(err, Cars){
        if (err) throw err;
        res.json(Cars);
    });
});

router.get('/:id', function(req, res) {
    collection.findOne({ _id: req.params.id }, function(err, Car){
        if (err) throw err;

        res.json(Car);
    });
});

router.put('/:id', function(req, res){
    console.log(currentUser);
    var tn = req.body.image.split('.jpg')[0]+'_tn.jpg';
    collection.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        image: req.body.image,
        thumbnail: tn,
        type:req.body.type,
        Features: req.body.Features,
        passengers: req.body.passengers
        
        
    }, function(err, Car){
        if (err) throw err;

        res.json(Car);
    });
});

router.delete('/:id', function(req, res){
    collection.remove({ _id: req.params.id }, function(err, Car){
        if (err) throw err;

        res.json(Car);
    });
});

router.post('/', function(req, res){
    console.log(req.body.image);
    var tn = req.body.image.split('.jpg')[0]+'_tn.jpg';
    console.log(tn);
    collection.insert({
        title: req.body.title,
        image: req.body.image,
        thumbnail: tn,
        type:req.body.type,
        Features: req.body.Features,
        passengers: req.body.passengers
        

    }, function(err, Car){
        if (err) throw err;

        res.json(Car);
    });
});

module.exports = router;