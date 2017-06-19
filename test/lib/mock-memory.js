'use strict';


const Memory = require('../../models/memory.js');

module.exports = function(done) {
  new Memory({
    title: 'Test Memory',
    location: '400 Broad St, Seattle, Wa 98109',
    date: '2017-05-24',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    songTitle: 'Lorem ipsum song',
    photo: 'Lorem.jpg',
    friends: 'Lorem, Ipsum, Dolor, Sit, Amet',
    userId: '5dg7asdf6730f71191dfasdf',
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
