'use strict';

const AWSMock = require('aws-sdk-mock');

module.exports = exports = {};
exports.uploadMock = {
  ETag: '"5eefd06b5b384cc52f35a0c49414ea31"',
  VersionId: '_F6K4BKgNMBKeTvrPEd27rl_4qPQl9Hy',
  Location: 'https://momentus-assets.s3.amazonaws.com/cd52be0bc15dd9500e87d9afcf35c19e.png',
  key: 'cd52be0bc15dd9500e87d9afcf35c19e.png',
  Key: 'cd52be0bc15dd9500e87d9afcf35c19e.png',
  Bucket: 'momentus-assets',
};

AWSMock.mock('S3', 'upload', function(params, callback) {
  if(params.ACL !== 'public-read')
    return callback(new Error('ACL must be set to public read'));
  if(params.Bucket !== process.env.AWS_BUCKET)
    return callback(new Error('Bucket must be momentus-assets'));
  if(!params.Key)
    return callback(new Error('requires key'));
  if(!params.Body)
    return callback(new Error('requires body'));
  callback(null, exports.uploadMock);
});

exports.deleteMock = {
  DeleteMarker: 'true',
  VersionId: 'lv9XPH0r.UfGZERuv3u7WwxkIzwPKP2d',
};

AWSMock.mock('S3', 'deleteObject', function(params, callback) {
  if(params.Bucket !== process.env.AWS_BUCKET)
    return callback(new Error('Bucket must be momentus-assets'));
  if(!params.Key)
    return callback(new Error('requires key'));
  callback(null, exports.deleteMock);
});
