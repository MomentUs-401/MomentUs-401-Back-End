'use strict';

require('./lib/mock-env.js');
require('./lib/mock-aws.js');

const chai = require('chai');
const expect = require('chai').expect;
const http = require('chai-http');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const Memory = require('../model/memory.js');
const User = require('../model/user.js');

const tempMemory = require('./lib/mock-memory.js');
const server = require('../server');

mongoose.Promise = Promise;
chai.use(http);

describe('MEMORY ROUTES', function() {
  afterEach((done) => {
    Promise.all([
      Memory.remove({}),
      User.remove({}),
    ])
      .then(() => done())
      .catch(done);
  });

  describe('testing POST to api/memory', function() {
    before(tempMemory.bind(this));

    it('should return a 201 on Memory created', done => {
      console.log('LOGMYMEM', this.tempMemory);
      chai.request(server)
        .post('/api/memory')
        .send({
          title: `${this.tempMemory.title}`,
          date: `${this.tempMemory.date}`,
          location: {
            lat: `${this.tempMemory.location.lat}`,
            lng: `${this.tempMemory.location.lng}`,
          },
          description: `${this.tempMemory.description}`,
          songTitle: `${this.tempMemory.songTitle}`,
          photo: {
            imageURI: `${this.tempMemory.photo.imageURI}`,
            ObjectId: `${this.tempMemory.photo.ObjectId}`,
          },
          dateCreated: `${this.tempMemory.dateCreated}`,
          userId: `${this.tempMemory.userId}`,
          friends: `${this.tempMemory.friends}`,
        })
        .set('Authorization', `Bearer ${this.tempToken}`)
        .end((err, res) => {
          if(err) console.error('test1', err.message);
          console.log('res', res.status);
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(201);
          done();
        });
    });

    it('should return a 404 on bad route', done => {
      chai.request(server)
        .post('/api/foo')
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
        .set('Authorization', `Bearer ${this.tempToken}`)
        .end((err, res) => {
          if(err) console.error('test2', err.name);
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(404);
          done();
        });
    });

    it('should return a 400 with missing title', done => {
      chai.request(server)
        .post('/api/memory')
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
        .set('Authorization', `Bearer ${this.tempToken}`)
        .end((err, res) => {
          if(err) console.error(err.name);
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(400);
          done();
        });
    });

    it('should return a 400 with missing date', done => {
      chai.request(server)
        .post('/api/memory')
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
        .set('Authorization', `Bearer ${this.tempToken}`)
        .end((err, res) => {
          if(err) console.error(err.name);
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(400);
          done();
        });
    });

    it('should return a 400 with missing location', done => {
      chai.request(server)
        .post('/api/memory')
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
        .set('Authorization', `Bearer ${this.tempToken}`)
        .end((err, res) => {
          if(err) console.error(err.name);
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(400);
          done();
        });
    });

    it('should return a 400 with missing description', done => {
      chai.request(server)
        .post('/api/memory')
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
        .set('Authorization', `Bearer ${this.tempToken}`)
        .end((err, res) => {
          if(err) console.error(err.name);
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(400);
          done();
        });
    });

    it('should return a 400 with missing dateCreated', done => {
      chai.request(server)
        .post('/api/memory')
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
        .set('Authorization', `Bearer ${this.tempToken}`)
        .end((err, res) => {
          if(err) console.error(err.name);
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(400);
          done();
        });
    });

    it('should return a 401 with missing userId', done => {
      chai.request(server)
        .post('/api/memory')
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
          if(err) console.error(err.name);
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(401);
          done();
        });
    });
  });

  describe('testing GET from api/memory', function() {
    before(tempMemory.bind(this));

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

    it('should return a 404 if the memory id does not exist', done => {
      chai.request(server)
        .get('/api/memory/abc123')
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) console.error(err.name);
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(404);
          done();
        });
    });

    it('should return a 401 without a token', done => {
      chai.request(server)
        .get('/api/memory')
        .end((err, res) => {
          if(err) console.error(err.name);
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(401);
          done();
        });
    });
  });

  describe('testing GET from api/map', function() {
    before(tempMemory.bind(this));
    
    it('should return a 200 on good request', done => {
      chai.request(server)
        .get('/api/map')
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) console.error(err.name);
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(200);
          done();
        });
    });
    
    it('should return a 404 on a bad route', done => {
      chai.request(server)
        .get('/api/map/null')
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) console.error(err.name);
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(404);
          done();
        });
    });
    
    it('should return a 401 without a token', done => {
      chai.request(server)
        .get('/api/map')
        .end((err, res) => {
          if(err) console.error(err.name);
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(401);
          done();
        });
    });
  });

  describe('testing PUT from api/memory', function() {
    before(tempMemory.bind(this));

    it('should return a 200 on good request', done => {
      chai.request(server)
        .put(`/api/memory/${this.tempMemory._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .send({
          title: 'New title',
        })
        .end((err, res) => {
          if(err) console.error(err.name);
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(200);
          expect(res.body.title).to.equal('New title');
          done();
        });
    });

    it('should return a 401 without a token', done => {
      chai.request(server)
        .put(`/api/memory/${this.tempMemory._id}`)
        .send({
          title: 'New title',
        })
        .end((err, res) => {
          if(err) console.error(err.name);
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(401);
          done();
        });
    });

    it('should return a 404 without the memory Id', done => {
      chai.request(server)
        .put('/api/memory')
        .set({Authorization: `Bearer ${this.tempToken}`})
        .send({
          title: 'New title',
        })
        .end((err, res) => {
          if(err) console.error(err.name);
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(404);
          done();
        });
    });
  });

  describe('testing DELETE from api/memory', function() {
    before(tempMemory.bind(this));

    it('should return a 204 on proper delete request', done => {
      chai.request(server)
        .delete(`/api/memory/${this.tempMemory._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(204);
          done();
        });
    });
    
    it('should return a 404 if the id is not passed in', done => {
      chai.request(server)
        .delete('/api/memory/')
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(404);
          done();
        });
    });
  });
});
