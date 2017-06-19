'use strict';

const debug = require('debug')('momentus: memory-routes');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const memoryCtrl = require('../controller/memory-controller.js');

module.exports = function(router){
  router.post('/api/memory', bearerAuth, (req, res) => {
    debug('#POST /api/memory');

    memoryCtrl.createMemory(req)
    .then(memory => res.json(memory))
    .catch(err => res.status(err.status).send(err.name));

  });
  // router.post('/api/memory', bearerAuth, (req, res) => {
  //   debug('#POST /api/memory');
  //
  //
  // });
  // router.post('/api/memory', bearerAuth, (req, res) => {
  //   debug('#POST /api/memory');
  //
  //
  // });
  // router.post('/api/memory', bearerAuth, (req, res) => {
  //   debug('#POST /api/memory');
  //
  //
  // });
  // router.post('/api/memory', bearerAuth, (req, res) => {
  //   debug('#POST /api/memory');
  //
  //
  // });



  return router;
};
