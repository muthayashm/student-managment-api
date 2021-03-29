//Importing Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//Getting ENV properties
const DB = process.env.DB_CONNECT;
const PORT = process.env.PORT;
const routes = require('./routes');

//Configuring Express App
const app = express();

//Configuring app body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Configuring Routes
routes(app);

//Connecting MongoDB
mongoose.connect(DB, {useNewUrlParser: true});

//Configuring app to listen on port
app.listen(PORT, () => {
  console.log('Server Up & Running on : ' + PORT);
});