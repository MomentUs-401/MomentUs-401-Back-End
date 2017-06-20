'use strict';

require('./lib/mock-env.js');
require('./lib/mock-aws.js');

const chai = require('chai');
const expect = require('chai').expect;
const http = require('chai-http');
const Promise = require('bluebird');
const mongoose = require('mongoose');


const tempMemory = require('./lib/mock-memory.js');
const server = require('../server');

mongoose.Promise = Promise;
chai.use(http);

describe('MEMORY ROUTES', function() {
  afterEach((done) => {
    Memory.remove({})
  .then(() => done())
  .catch(done);
  });

  describe('testing POST to api/memory', function() {
    before(done => {
      tempMemory.bind(this);
      done();
    });

    it('should return a 201 on Memory created', done => {
      chai.request(server)
      .post('/api/memory')
      .send({
        title: `${this.tempMemory.title}`,
        date: `${this.tempMemory.date}`,
        location: `${this.tempMemory.date}`,
        description: `${this.tempMemory.description}`,
        songTitle: `${this.tempMemory.songTitle}`,
        photo: `${this.tempMemory.photo}`,
        dateCreated: `${this.tempMemory.dateCreated}`,
        userId: `${this.tempMemory.userId}`,
      })
      .end((err, res) => {
        if(err) console.error(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(201);
        done();
      });
    });

    it('should return a 404 on bad route', done => {
      chai.request(server)
      .post('api/foo')
      .send({
        title: `${this.tempMemory.title}`,
        date: `${this.tempMemory.date}`,
        location: `${this.tempMemory.date}`,
        description: `${this.tempMemory.description}`,
        songTitle: `${this.tempMemory.songTitle}`,
        photo: `${this.tempMemory.photo}`,
        dateCreated: `${this.tempMemory.dateCreated}`,
        userId: `${this.tempMemory.userId}`,
      })
      .end((err, res) => {
        if(err) console.err(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(404);
        done();
      });
    });

    it('should return a 400 with missing title', done => {
      chai.request(server)
      .post('api/memory')
      .send({
        title: undefined,
        date: `${this.tempMemory.date}`,
        location: `${this.tempMemory.date}`,
        description: `${this.tempMemory.description}`,
        songTitle: `${this.tempMemory.songTitle}`,
        photo: `${this.tempMemory.photo}`,
        dateCreated: `${this.tempMemory.dateCreated}`,
        userId: `${this.tempMemory.userId}`,
      })
      .end((err, res) => {
        if(err) console.err(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(400);
        done();
      });
    });

    it('should return a 400 with missing date', done => {
      chai.request(server)
      .post('api/memory')
      .send({
        title: `${this.tempMemory.title}`,
        date: undefined,
        location: `${this.tempMemory.date}`,
        description: `${this.tempMemory.description}`,
        songTitle: `${this.tempMemory.songTitle}`,
        photo: `${this.tempMemory.photo}`,
        dateCreated: `${this.tempMemory.dateCreated}`,
        userId: `${this.tempMemory.userId}`,
      })
      .end((err, res) => {
        if(err) console.err(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(400);
        done();
      });
    });

    it('should return a 400 with missing location', done => {
      chai.request(server)
      .post('api/memory')
      .send({
        title: `${this.tempMemory.title}`,
        date: `${this.tempMemory.date}`,
        location: undefined,
        description: `${this.tempMemory.description}`,
        songTitle: `${this.tempMemory.songTitle}`,
        photo: `${this.tempMemory.photo}`,
        dateCreated: `${this.tempMemory.dateCreated}`,
        userId: `${this.tempMemory.userId}`,
      })
      .end((err, res) => {
        if(err) console.err(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(400);
        done();
      });
    });

    it('should return a 400 with missing description', done => {
      chai.request(server)
      .post('api/memory')
      .send({
        title: `${this.tempMemory.title}`,
        date: `${this.tempMemory.date}`,
        location: `${this.tempMemory.location}`,
        description: undefined,
        songTitle: `${this.tempMemory.songTitle}`,
        photo: `${this.tempMemory.photo}`,
        dateCreated: `${this.tempMemory.dateCreated}`,
        userId: `${this.tempMemory.userId}`,
      })
      .end((err, res) => {
        if(err) console.err(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(400);
        done();
      });
    });

    it('should return a 400 with missing dateCreated', done => {
      chai.request(server)
      .post('api/memory')
      .send({
        title: `${this.tempMemory.title}`,
        date: `${this.tempMemory.date}`,
        location: `${this.tempMemory.location}`,
        description: `${this.tempMemory.description}`,
        songTitle: `${this.tempMemory.songTitle}`,
        photo: `${this.tempMemory.photo}`,
        dateCreated: undefined,
        userId: `${this.tempMemory.userId}`,
      })
      .end((err, res) => {
        if(err) console.err(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(400);
        done();
      });
    });

    it('should return a 400 with missing userId', done => {
      chai.request(server)
      .post('api/memory')
      .send({
        title:`${this.tempMemory.title}`,
        date: `${this.tempMemory.date}`,
        location:  `${this.tempMemory.location}`,
        description: `${this.tempMemory.description}`,
        songTitle: `${this.tempMemory.songTitle}`,
        photo: `${this.tempMemory.photo}`,
        dateCreated: `${this.tempMemory.dateCreated}`,
        userId: undefined,
      })
      .end((err, res) => {
        if(err) console.err(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(400);
        done();
      });
    });
  });

  describe('testing GET from api/memory', function() {
    before(done => {
      tempMemory.bind(this);
      done();
    });

    it('should return a 200 on good request', done => {
      chai.request(server)
      .get('/api/memory')
      .set({Authorization: `Bearer ${this.tempToken}`})
      .end((err, res) => {
        if(err) console.error(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(200);
        done();
      });
    });
  });
});
