'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
const Memory = require('../model/memory');

module.exports = exports = {};

exports.createMemory = function(req)  {
  if(!req.body.name) return Promise.reject(createError(400, 'Invalid name property'));
  if(!req.body.desc) return Promise.reject(createError(400, 'Invalid desc property'));

  req.body.userId = req.user._id;

  return new Memory(req.body).save()
  .then(memory => memory)
  .catch(err => Promise.reject(createError(400, err.message)));
};

exports.getMemory = function(req) {
  if(!req.params.id) return Promise.reject(createError(400, 'ID required'));

  return Memory.findById(req.params.id)
  .catch(err => console.error(err));
};

exports.getMap = function(req){
  if(!req.params.id) return Promise.reject(createError(400, 'ID required'));

  return Memory.findById(req.params.id)
  .catch(err => console.error(err));
};

exports.updateMemory = function(req) {
  if(!req.params.id) return Promise.reject(createError(400, 'ID required'));

  return Memory.findOneAndUpdate(req.params.id, req.body, {new: true});
};

exports.deleteMemory = function(req, res, id){
  if(!id) return Promise.reject(createError(400, 'ID required'));

  return Memory.findByIdAndRemove(id);
};
