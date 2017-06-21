'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const http = require('chai-http');
const Promise = require('bluebird');
const mongoose = require('mongoose');

const tempUser = require('./lib/mock-user');
const User = require('../model/user');
const server = require('../server');

mongoose.Promise = Promise;
chai.use(http);

describe('USER ROUTES', function() {

  afterEach((done) => {
    User.remove({})
  .then(() => done())
  .catch(done);
  });

  describe.only('testing POST to api/user', function() {
    before(tempUser.bind(this));

    it.only('should return a 201 on user created', done => {
      chai.request(server)
      .post('/api/signup')
      .send({ username:`${this.tempUser.username}`, password:'123', email:`${this.tempUser.email}` })
      .end((err, res) => {
        if(err) console.error(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(201);
      });
      done();
    });

    it('should return a token when user created', done => {
      chai.request(server)
      .post('/api/user/signup')
      .send({ username:`test${this.tempUser.username}`, password:`${this.tempUser.password}`, role:`${this.tempUser.role}` })
      .end((err, res) => {
        if(err) console.error(err.message);
        expect(res).to.have.property('text')
          .that.is.a('string')
          .that.matches(/[A-Za-z0-9\-\._~\+\/]+=*/g);
        done();
      });
    });

    it('should return a 404 on bad route', done => {
      chai.request(server)
      .post('/api/user/foo')
      .send({ username:`test${this.tempUser.username}`, password:`${this.tempUser.password}` })
      .end((err, res) => {
        if(!err) console.error(err.message);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(404);
        done();
      });
    });

    it('should return a 400 with missing username', done => {
      chai.request(server)
      .post('/api/user/signup')
      .send({ password:`${this.tempUser.password}` })
      .set('Authorization', `Bearer ${this.tempToken}`)
      .end((err, res) => {
        if(!err) console.error(err.message);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(400);
        done();
      });
    });

    it('should return a 400 with missing Password', done => {
      chai.request(server)
      .post('/api/user/signup')
      .send({ username:`test${this.tempUser.username}` })
      .set('Authorization', `Bearer ${this.tempToken}`)
      .end((err, res) => {
        if(!err) console.error(err.status);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(400);
        done();
      });
    });
  });

  describe('testing GET from api/user/login', function() {
    before(tempUser.bind(this));

    it('should return a 200 on good request', done => {
      chai.request(server)
      .get('/api/user/login')
      .auth(`${this.tempUser.username}`, '123')
      .end((err, res) => {
        if(err) console.error(err.username);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(200);
        done();
      });
    });

    it('should also return a token when user logs in', done => {
      chai.request(server)
      .get('/api/user/login')
      .auth(`${this.tempUser.username}`, '123')
      .end((err, res) => {
        if(err) console.error(err.name);
        expect(res).to.have.property('text')
          .that.is.a('string')
          .that.matches(/[A-Za-z0-9\-\._~\+\/]+=*/g);
        done();
      });
    });

    it('should return a 404 on bad route', done => {
      chai.request(server)
      .get('/api/user/foo')
      .auth(`test${this.tempUser.username}`, '123')
      .end((err, res) => {
        if(err) console.error(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(404);
        done();
      });
    });

    it('should return a 401 with no auth header', done => {
      chai.request(server)
      .get('/api/user/login')
      .end((err, res) => {
        if(err) console.error(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(401);
        done();
      });
    });

    it('should return a 401 on bad password', done => {
      chai.request(server)
      .get('/api/user/login')
      .auth(`test${this.tempUser.username}`, 'BADPASS')
      .end((err, res) => {
        if(err) console.error(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(401);
        done();
      });
    });

    it('should return a 401 on missing password', done => {
      chai.request(server)
      .get('/api/user/login')
      .auth(`test${this.tempUser.username}`, '')
      .end((err, res) => {
        if(err) console.error(err.status);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(401);
        done();
      });
    });

    it('should return a 401 on invalid username in request', done => {
      chai.request(server)
      .get('/api/user/login')
      .auth('nonsense', '123')
      .end((err, res) => {
        if(err) console.error(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(401);
        done();
      });
    });

    it('should return a 401 on missing username in request', done => {
      chai.request(server)
      .get('/api/user/login')
      .auth(undefined, '123')
      .end((err, res) => {
        if(err) console.error(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(401);
        done();
      });
    });
  });

  describe('DELETE route', function() {
    before(tempUser.bind(this));

    it('should return a 204 succesful delete', done => {
      chai.request(server)
      .delete(`/api/user/delete/${this.tempUser._id}`)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .end((err, res) => {
        if(err) console.error(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(204);
        done();
      });
    });

    it('should return a 404 on bad route', done => {
      chai.request(server)
      .delete(`/api/user/foo/${this.tempUser._id}`)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .end((err, res) => {
        if(err) console.error(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(404);
        done();
      });
    });

    it('should return a 404 on missing id', done => {
      chai.request(server)
      .delete('/api/user/delete')
      .set('Authorization', `Bearer ${this.tempToken}`)
      .end((err, res) => {
        if(err) console.error(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(404);
        done();
      });
    });

    it('should return a 401 on bad token type', done => {
      chai.request(server)
      .delete(`/api/user/delete/${this.tempUser._id}`)
      .set('Authorization', `MAC ${this.tempToken}`)
      .end((err, res) => {
        if(err) console.error(err.name);
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(401);
        done();
      });
    });
  });
});
