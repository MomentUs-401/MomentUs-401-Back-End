'use strict';

require('./lib/mock-env.js');
let mockAWS = require('./lib/mock-aws.js');

const expect = require('chai').expect;
const s3UploadPromise = require('./lib/mock-s3-upload-prom.js');

describe('Testing the s3 Upload Functionality', function() {
  describe('Testing with valid input', function() {
    it('should return a response', done => {
      let params = {
        Bucket: process.env.AWS_BUCKET,
        Key: 'test key',
        Body: 'test body',
        ACL: 'public-read',
      };
      
      s3UploadPromise(params)
      .then(data => {
        let uploadMock = mockAWS.uploadMock;
        expect(data.ETag).to.equal(uploadMock.ETag);
        expect(data.Location).to.equal(uploadMock.Location);
        expect(data.Key).to.equal(uploadMock.Key);
        done();
      })
      .catch(done);
    });
  });
  
  describe('Testing with ACL missing', function() {
    it('should throw an error', done => {
      let params = {
        Bucket: process.env.AWS_BUCKET,
        Key: 'test key',
        Body: 'test body',
      };
      
      s3UploadPromise(params)
      .then(done)
      .catch(err => {
        expect(err.message).to.equal('ACL must be public read');
      });
      
      done();
    });
  });
  
  describe('Testing with key missing', function() {
    it('should throw an error', done => {
      let params = {
        Bucket: process.env.AWS_BUCKET,
        Body: 'test body',
        ACL: 'public-read',
      };
      
      s3UploadPromise(params)
      .then(done)
      .catch(err => {
        expect(err.message).to.equal('Requires Key');
      });
      
      done();
    });
  });
  
  describe('Testing with body missing', function() {
    it('should throw an error', done => {
      let params = {
        Bucket: process.env.AWS_BUCKET,
        Key: 'test key',
        ACL: 'public-read',
      };
      
      s3UploadPromise(params)
      .then(done)
      .catch(err => {
        expect(err.message).to.equal('Requires Body');
      });
      
      done();
    });
  });
});