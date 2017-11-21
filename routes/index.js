var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();



  router.get('/', function (req, res) {
      res.render('index', { user : req.user });
  });

  router.get('/register', function(req, res) {
      res.render('register', { });
  });

  router.post('/register', function(req, res) {
    if (req.body.username === 'ashwin'){
      console.log("Hello");
    }
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', {info: "Sorry, that username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
  });

  router.get('/login', function(req, res) {
      res.render('login', { user : req.user });
  });

  router.post('/login', function(req,res) {
      passport.authenticate('local')(req, res, function(){
        res.redirect('/');
      });
  });

  router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });


module.exports = router;
