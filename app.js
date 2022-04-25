const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/UserRoute');
app.use('/api/users', userRoutes);

const consultationRoutes = require('./routes/ConsultationRoute');
app.use('/api/consultation', consultationRoutes);
app.use(express.json());
app.listen(3000);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
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
