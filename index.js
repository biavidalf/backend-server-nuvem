const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./api/routes');
 
app.use(cors());
app.use(
    express.urlencoded({
        extended: false,
    }),
);

app.use(bodyParser.json());
app.use(express.json());
app.use('', router);

const PORT = process.env.PORT || 3333;

const DB_USER = 'vidal-databaseNumber1';
const DB_PASSWORD = process.env.pass_database1;

mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ip1c0xp.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Conectado');
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  })
