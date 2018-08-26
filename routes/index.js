var express = require('express');
var router = express.Router();
var model = require('./../models/user.model')();


/* GET home page */
router.get('/', function (req, res, next) {
    console.log(model);
    model.find(null, function (err, user) {
        if (err) {
            throw err;
        }
        res.render('index', { title: 'Railan Barbosa - Basic Form Application', heading: 'Basic Form Application', user: user});
    });
});

/* POST form */
router.post('/add', function (req, res, next) {
    model.create ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    }, function (err, data) {
        if (err) {
            res.send(500, err);
        } else {
            res.send({redirect: '/'});
        }
    });

})

/* GET remove id from database */
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
