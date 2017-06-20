'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
const Memory = require('../model/memory');

module.exports = exports = {};

exports.createMemory = function(req) {

  req.body.userId = req.user._id;
  return new Memory(req.body).save()
  .then(memory => memory)
  .catch(err => Promise.reject(createError(err.status, err.message)));
};

exports.fetchMemory = function(req) {
  if(!req.user._id) return Promise.reject(createError(400, 'ID required'));

  return Memory.find({userId: req.user._id})
  .catch(err => Promise.reject(createError(err.status, err.message)));
};

exports.getMap = function(req) {
  if(!req.params.id) return Promise.reject(createError(400, 'ID required'));

  return Memory.findById(req.params.id)
  .catch(err => Promise.reject(createError(err.status, err.message)));
};

exports.updateMemory = function(req) {
  if(!req.params.id) return Promise.reject(createError(400, 'ID required'));
  console.log(req.params.id);
  return Memory.findOneAndUpdate({_id:req.params.id}, req.body, {new: true})
  .then(memory => memory)
  .catch(err => Promise.reject(createError(400, err.message)));
};

exports.deleteMemory = function(id) {
  if(!id) return Promise.reject(createError(400, 'ID required'));

  return Memory.findByIdAndRemove(id)
  .catch(err => Promise.reject(createError(err.status, err.message)));
};
