var mongoose = require('mongoose');

var medicationSchema = new mongoose.Schema({

    consultationId: {
        type: String,
    },
    
    designation: {
        type: String,
    },
    note: {
        type: String,
    },

});


var medication = mongoose.model('Medications', medicationSchema);
module.exports = medication;
