'use strict';


const Memory = require('../../model/memory.js');

module.exports = function(done) {
  new Memory({
    title: 'Test Memory',
    date: '2017-05-24',
    location: '400 Broad St, Seattle, Wa 98109',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    songTitle: 'Lorem ipsum song',
    photo: 'Lorem.jpg',
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
};
