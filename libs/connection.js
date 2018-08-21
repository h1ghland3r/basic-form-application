var mongoose = require('mongoose');
var db;

module.exports = function() {
    // init database
    if (!db) {
        db = mongoose.createConnection('mongodb://localhost/aubay_application');
    }

    return db;
}