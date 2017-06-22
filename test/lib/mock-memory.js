'use strict';

const debug = require('debug')('momentus:mock-memory.js');
const tempUser = require('./mock-user.js');
const Memory = require('../../model/memory.js');

module.exports = function(done) {
  debug('create mock memory');
  tempUser.call(this, err => {
    if (err)
      return done(err);
    new Memory({
      title: 'Test Memory',
      date: '2017-05-24',
      location: {
        lat: 1,
        lng: 1,
        name: 'Seattle, WA',
      },
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      songTitle: 'Lorem ipsum song',
      photo: {
        imageURI: 'https://lab-18.s3.amazonaws.com/14d59438798bfc18b7c268e9228c1384.png',
        ObjectId: '14d59438798bfc18b7c268e9228c1384.png',
      },
      friends: 'Lorem, Ipsum, Dolor, Sit, Amet',
      dateCreated: '2017-06-16',
      userId: this.tempUser._id.toString(),
    })

      .save()
      .then(memory => {
        this.tempMemory = memory;
        done();
      })
      .catch(done);
  });
};
