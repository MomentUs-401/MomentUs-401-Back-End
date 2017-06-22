'use strict';

const debug = require('debug')('momentus: memoryCtrl');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const del = require('del');
const createError = require('http-errors');
const Promise = require('bluebird');
const dataDir = `${__dirname}/../data`;

const Memory = require('../model/memory');

AWS.config.setPromisesDependency(require('bluebird'));

const s3 = new AWS.S3();

function s3UploadProm(params){
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) return reject(createError(err.status, err.name));
      return resolve(data);
    });
  });
}

function s3DeleteProm(params){
  return new Promise((resolve, reject) => {
    console.log('s3 delete params', params);
    s3.deleteObject(params, (err, data) => {
      if (err) return reject(createError(err.status, err.name));
      return resolve(data);
    });
  });
}

module.exports = exports = {};

exports.createMemory = function(req) {
  debug('#memoryCtrl creatememory');

  if(!req.user) return Promise.reject(createError(400, 'ID required'));

  req.body.userId = req.user._id;

  if (req.file) {
    let ext = path.extname(req.file.originalname);
    let params = {
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET,
      Key: `${req.file.filename}${ext}`,
      Body: fs.createReadStream(req.file.path),
    };
    return s3UploadProm(params)
      .then(s3Data => {
        del([`${dataDir}/*`]);
        req.body.photo = {
          imageURI: s3Data.Location,
          ObjectId: s3Data.Key,
        };
        return new Memory(req.body).save();
      })
    // .then(memory => memory)
      .catch(err => Promise.reject(createError(err.status, err.message)));
    //end of file upload? change memory model/schema? 2 paths?
  } else {

    return new Memory(req.body).save()
      .then(memory => memory)
      .catch(err => Promise.reject(createError(err.status, err.message)));
  }
};

exports.fetchMemory = function(req) {
  if(!req.user._id) return Promise.reject(createError(400, 'ID required'));

  return Memory.find({userId: req.user._id})
    .catch(err => Promise.reject(createError(err.status, err.message)));
};

exports.getMap = function(req) {
  if(!req.params.id) return Promise.reject(createError(400, 'ID required'));

  return Memory.findById(req.params.id)
    .catch(err => Promise.reject(createError(err.status, err.message)));
};

exports.updateMemory = function(req) {
  if(!req.params.id) return Promise.reject(createError(400, 'ID required'));

  if(req.file) {
    return Memory.find({_id: req.params.id, userId: req.user._id})
      .then(memory => {
        if(memory[0].photo) {
          let params = {
            Bucket: process.env.AWS_BUCKET,
            Key: memory[0].photo.ObjectId,
          };
          return s3DeleteProm(params);
        }
      })
      .then(() => {
        let ext = path.extname(req.file.originalname);
        let params = {
          ACL: 'public-read',
          Bucket: process.env.AWS_BUCKET,
          Key: `${req.file.filename}${ext}`,
          Body: fs.createReadStream(req.file.path),
        };
        return s3UploadProm(params)
          .then(s3Data => {
            del([`${dataDir}/*`]);
            req.body.photo = {
              imageURI: s3Data.Location,
              ObjectId: s3Data.Key,
            };
            return Memory.findOneAndUpdate({_id:req.params.id}, req.body, {new: true});
          })
          .catch(err => Promise.reject(createError(err.status, err.message)));
      })
      .catch(err => Promise.reject(createError(err.status, err.message)));
  } else {
    return Memory.findOneAndUpdate({_id:req.params.id}, req.body, {new: true})
      .then(memory => memory)
      .catch(err => Promise.reject(createError(err.status, err.message)));
  }
};

exports.deleteMemory = function(id) {
  if(!id) return Promise.reject(createError(400, 'ID required'));
  return Memory.findById(id)
    .then(memory => {
      console.log('memory', memory);
      if(memory.photo) {
        let params = {
          Bucket: process.env.AWS_BUCKET,
          Key: memory.photo.ObjectId,
        };
        console.log('PARAMS', params);
        console.log('PARAMS MEMORY', memory);
        s3DeleteProm(params);
      }
      console.log('DOES THIS WORK', memory);
      return memory;
    })
    .then( memory => {
      console.log('then middle***********************');
      console.log('memory', memory);
      return Memory.findOneAndRemove({_id: id});
      console.log('DELETE', memory);
    }
    )
    .catch( err => {
      console.log('err middle***********************');
      console.log(err);
      return Promise.reject(createError(err.status, err.message));
    });
};
