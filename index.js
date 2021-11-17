const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 4000;
// using middleware
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

//setting up mongoose
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');
const routes = require("./routes/routes");

mongoose.Promise = global.Promise;


mongoose.connect(dbConfig.url, {
useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database.', err);
  process.exit();
});

// routing request towards route.js
app.use('/',routes);


app.listen(port, () => {
   console.log(`Node server is listening on port ${port}`);
});