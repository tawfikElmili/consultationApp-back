
const express = require('express');
const app = express();
app.listen(3000);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.options('*', cors());
const userRoutes = require('./routes/UserRoute');
const consultationRoutes = require('./routes/ConsultationRoute');
const medicationRoutes = require('./routes/MedicationRoute');

app.use('/api/users', userRoutes);
app.use('/api/consultation', consultationRoutes);
app.use('/api/medication', medicationRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/consultationDb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },(err) => {
      if(err) console.log(err) 
      else console.log("mongoDb is connected to Database");
     }
   );
