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
//const profileRoutes = require('./routes/ProfileRoute');

app.use('/api/users', userRoutes);
//app.use('/api/users', profileRoutes);


const username = "tawfik_mili";
const password = "t26116986";
const cluster = "Cluster0";
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

