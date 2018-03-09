'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const {PORT, CLIENT_ORIGIN} = require('./config');
// const {dbConnect} = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

const cats = [
  {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street.'
  },
  {
    imageURL:'https://i.imgur.com/KSFeIO1.jpg',
    imageDescription: 'Gray cat standing on her hind legs on the bed',
    name: 'Einstein',
    sex: 'Female',
    age: 3,
    breed: 'American Shorthair',
    story: 'Got too smart for her owner.'
  },
  {
    imageURL:'https://i.imgur.com/S16mvmE.jpg',
    imageDescription: 'Gray maine coon cat with fur shaped to make it look like a little lion',
    name: 'Simba',
    sex: 'Male',
    age: 4,
    breed: 'Maine Coon',
    story: 'Ran away after getting such a ridiculous hair cut.'
  }
];

const dogs = [
  {
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageURL: 'https://i.imgur.com/Fr9luGW.jpg',
    imageDescription: 'Beagle puppy with his head down has he fails to walk up stairs',
    name: 'Charlie Brown',
    sex: 'Male',
    age: 1,
    breed: 'Beagle',
    story: 'He does not know how to walk up stairs. His owner lived on the 8th floor.'
  },
  {
    imageURL: 'https://i.imgur.com/W7V6Q.jpg',
    imageDescription: 'A goldendoodle puppy sitting on a small bag of kibble in the front seat of a car.',
    name: 'Louise',
    sex: 'Female',
    age: 1,
    breed: 'Goldendoodle',
    story: 'Got lost on a road trip. Looking for a forever home.'
  }
];

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
