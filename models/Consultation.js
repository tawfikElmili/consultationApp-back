var mongoose = require('mongoose');

var ConsultationSchema = new mongoose.Schema({

    userId: {
        type: String,
    },

    observation: {
        type: String,
    },
    description: {
        type: String,
    },

});


var Consultation = mongoose.model('Consultation', ConsultationSchema);
module.exports = Consultation;
