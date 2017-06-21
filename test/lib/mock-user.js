'use strict';

const User = require('../../model/user.js');

module.exports = function(done) {

  new User({
    username : 'Test User' + Math.floor(Math.random() * (100 -1)) +1,
    dateJoined: '2016-12-31',
    email: 'testUser' + Math.floor(Math.random() * (100 -1)) +1 + '@gmail.com',
    role: 'user',
  }).generatePasswordHash('123')
    .then(user => user.save())
    .then(user => {
      this.tempUser = user;
      return user.generateToken();
    })
    .then(token => {
      this.tempToken = token;
      done();
    })
    .catch(done);
};
