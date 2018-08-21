module.exports = function() {
    var db = require('./../libs/connection')();
    var Schema = require('mongoose').Schema;

    var user = new Schema ({
        name : {type: String, required: true, max: 50},
        email: {type: String, required: true},
        password: {type: String, required: true},
        phone: {type: String, required: false}
    });

    return db.model('user', user);
}