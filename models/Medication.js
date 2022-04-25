var mongoose = require('mongoose');

var medicationSchema = new mongoose.Schema({

    consultationId: {
        type: String,
    },
    
    designation: {
        type: String,
    },
    repetition: {
        type: String,
    },

});


var medication = mongoose.model('Medication', medicationSchema);
module.exports = medication;
