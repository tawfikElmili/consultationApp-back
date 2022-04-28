const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/UserRoute');
const consultationRoutes = require('./routes/ConsultationRoute');
const medicationRoutes = require('./routes/MedicationRoute');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use('/api/users', userRoutes);
app.use('/api/consultation', consultationRoutes);
app.use('/api/medication', medicationRoutes);
app.options('*', cors());

mongoose.connect('mongodb://127.0.0.1:27017/consultationDb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },(err) => {
      if(err) console.log(err) 
      else console.log("mongoDb is connected to Database");
     }
   );

   app.listen(3000);