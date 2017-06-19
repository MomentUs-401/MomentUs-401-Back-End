'use strict';

const User = require('../../models/user.js');

module.exports = function(done) {


  new User({
    username : 'Johnny Test',
    dateJoined: '1986-01-01',
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
