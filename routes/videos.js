var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/vidzy');
var currentUser;
router.get('/', function(req, res) {
    var collection = db.get('videos');

    collection.find({'user': req.user.username }, function(err, videos){
        if (err) throw err;
        currentUser = req.user.username;
        res.json(videos);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('videos');

    collection.findOne({ _id: req.params.id }, function(err, video){
        if (err) throw err;

      	res.json(video);
    });
});

router.put('/:id', function(req, res){
    var collection = db.get('videos');
    console.log(currentUser);
    var tn = req.body.image.split('.jpg')[0]+'_tn.jpg';
    collection.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        user : currentUser,
        image: req.body.image,
        thumbnail: tn,
        genre: req.body.genre,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

router.delete('/:id', function(req, res){
    var collection = db.get('videos');
    collection.remove({ _id: req.params.id }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

router.post('/', function(req, res){
    var collection = db.get('videos');
    console.log(req.body.image);
    var tn = req.body.image.split('.jpg')[0]+'_tn.jpg';
    console.log(tn);
    collection.insert({
        title: req.body.title,
        user: currentUser,
        image: req.body.image,
        thumbnail: tn,
        genre: req.body.genre,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

module.exports = router;