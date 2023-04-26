const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch((error) => {
    console.log('database connection failed. exiting now...');
    console.error(error);
    process.exit(1);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { authRouter } = require('./routes/authRouter');
const { taskRouter } = require('./routes/taskRouter');

app.use('/auth', authRouter);
app.use('/task', taskRouter);

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    app.listen(port);
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
};

start();

function errorHandler(err, req, res, next) {
  res.status(500).json(err.message);
}

// ERROR HANDLER
app.use(errorHandler);
