'use strict';

const expect = require('chai').expect;
const chai = require('chai');
const http = require('chai-http');
const server = require('../server');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const User = require('../model/user');
const tempUser = require('./lib/mock-user');

mongoose.Promise = Promise;
chai.use(http);

describe('Memory Routes', function() {
  let exampleMemory;
  let testUser = this.tempUser;
  let userToken;

  describe('POST method', function() {
    it('should post a user before we can post a memory', done => {
      chai.request(server)
      .post('/api/user/signup')
      .set('Content-type', 'application/json')
      .send({ email:`${this.tempUser.email}`, password:'123'})
      .end((err, res) => {
        if(err) console.error(err.name);
        testUser = this.tempUser;
      });

      expect(userToken).to.not.be.undefined;
      done();
    });
  });


});
