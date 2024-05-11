const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

// const DB_URI = 'mongodb://localhost:27017/eden-garden-dashboard';
const DB_URI = "mongodb+srv://rashidalizellesolutions:Sniper+122@mycluster.v4cfzgl.mongodb.net/eden-garden-dashboard"

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect(DB_URI).then(() => {console.log("Connected")}).catch((e) => {console.log(e.message)});

const insuredRoute = require('./routes/insuredPersonsRoutes');
app.use('/api/v1', insuredRoute);


app.listen(5000, () => {console.log("app is listening at port 5000")});
