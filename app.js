const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/UserRoute');
const consultationRoutes = require('./routes/ConsultationRoute');
const medicationRoutes = require('./routes/MedicationRoute');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/consultation', consultationRoutes);
app.use('/api/medication', medicationRoutes);

app.listen(3000);
app.use(cors());

app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.options('*', cors());

const username = "tawfik_mili";
const password = "t26116986";
const cluster = "cluster0.m7zch";
const dbname = "consultation";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }, () =>
  console.log('connected to db')
);
