'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memorySchema = Schema({
  title: {type: String, required: true, maxlength: 100},
  date: {type: Date, required: true},
  location: {type: String, required: true},
  description: {type: String, required: true, maxlength: 1000},
  songTitle: {type: String, maxlength: 100},
  photo: {type: String},
  friends: {type: String, maxlength: 200},
  dateCreated: {type: Date, default: Date.now, required: true},
  userId: {type: Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model('memory', memorySchema);
