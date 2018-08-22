var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var model = require('./../models/user.model')();

var jsonParser = bodyParser.json()

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(model);
    model.find(null, function (err, user) {
        if (err) {
            throw err;
        }
        res.render('index', { title: 'Railan Barbosa - Basic Form Application', heading: 'Sign up', user: user});
    });
});

router.post('/add', jsonParser, function (req, res, next) {
    model.create ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    }, function (err, user) {
        if (err) {
            throw err;
        } else {
            res.redirect('/');
        }
    });

})

router.get('/remove/:id', function (req, res, next) {
    var id = req.params.id;
    model.remove({
        _id: id
    }, function (err, user) {
        if (err) {
            throw err;
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
