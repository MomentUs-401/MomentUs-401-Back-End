'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memorySchema = Schema({
  title: {type: String, required: true, maxlength: 100},
  date: {type: Date, required: true},
  location: {
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    name: {type: String, required: true},
  },
  description: {type: String, required: true, maxlength: 1000},
  songTitle: {type: String, maxlength: 100},
  photo: {
    imageURI: {type: String, default:'https://s3-us-west-2.amazonaws.com/lab-18/00d7421a7240fec66f1b33598c358c12.png'},
    ObjectId: {type: String, default:'6b2dc6dc5f31a5db65211c95bfd2b761.png'},
  },
  friends: {type: String, maxlength: 200},
  dateCreated: {type: Date, default: Date.now, required: true},
  userId: {type: Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model('memory', memorySchema);
