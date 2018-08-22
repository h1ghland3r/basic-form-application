module.exports = function() {
    var db = require('./../libs/connection')();
    var Schema = require('mongoose').Schema;

    var user = new Schema ({
        name : {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    });

    return db.model('user', user);
}