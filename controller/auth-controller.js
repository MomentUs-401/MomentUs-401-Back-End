'use strict';

const debug = require('debug')('momentus: authCtrl');
const User = require('../model/user.js');

module.exports = exports = {};

exports.createUser = function(reqBody, tempPass){
  debug('#authCtrl createUser');

  let newUser = new User(reqBody);
  return newUser.generatePasswordHash(tempPass)
  .then(user => user.save())
  .then(user => user.generateToken())
  .catch(err => Promise.reject(err));

};

exports.fetchUser = function(reqAuth){
  debug('#authCtrl fetchUser');

  return User.findOne({username: reqAuth.username})
  .then(user => user.comparePasswordHash(reqAuth.password))
  .then(user => user.generateToken())
  .catch(err => Promise.reject(err));
};
