const express = require('express');
const mongoose = require('mongoose');
const app = express();;
app.use(express.json());
app.listen(3000);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.options('*', cors());

const userRoutes = require('./routes/UserRoute');
app.use('/api/users', userRoutes);

const consultationRoutes = require('./routes/ConsultationRoute');
app.use('/api/consultation', consultationRoutes);

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tawfik_mili:t26116986@cluster0.m7zch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("consultation").collection("user");
  console.log(collection)
  // perform actions on the collection object
  client.close();
});

mongoose.connect(uri,()=>{
    console.log("connected to db")
})


// const username = "tawfik_mili";
//     const password = "t26116986";
//     const cluster = "cluster0.m7zch";
//     const dbname = "consultation";
    
//     mongoose.connect(
//       `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
//       {
//         useNewUrlParser: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true
//       }, () =>
//       console.log('connected to db')
//     );


// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

