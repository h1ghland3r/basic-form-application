var mongoose = require('mongoose');
var db;

module.exports = function() {
    // init database
    if (!db) {
        db = mongoose.createConnection('mongodb://localhost/basic_form_application');
    }

    return db;
}