var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

const cheerio = require('cheerio');
const $ = cheerio.load('<div class="card card-container" id="register-form"');


  router.get('/', function (req, res) {
      res.render('index', { user : req.user, title: 'EZRide' });
  });

  router.get('/register', function(req, res) {
      res.render('register', { title: 'EZRide'});
  });

  router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username, admin: false, name: req.body.name}), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', {info: "Sorry, that username already exists. Try again."});
        }
        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
  });

  router.get('/login', function(req, res) {
      res.render('login', { user : req.user, title: 'EZRide'});
  });

  router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
  });

  router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });


module.exports = router;
