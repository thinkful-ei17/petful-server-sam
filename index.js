'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const {PORT, CLIENT_ORIGIN} = require('./config');
// const {dbConnect} = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

const peek = require('./queue');
const cats = require('./catQueue');
const dogs = require('./dogQueue');

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.get('/api/cat', (req, res) => res.json(cats[0]));

app.get('/api/dog', (req, res) => res.json(dogs[0]));

app.delete('/api/cat', (req, res) => {
  cats.shift();
  return res.status(204).send();
});

app.delete('/api/dog', (req, res) => {
  dogs.shift();
  return res.status(204).send();
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  // dbConnect();
  runServer();
}

module.exports = {app};
