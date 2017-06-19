'use strict';

const debug = require('debug')('momentus: memory-routes');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const memoryCtrl = require('../controller/memory-controller.js');

module.exports = function(router){
  router.post('/memory', bearerAuth, (req, res) => {
    debug('#POST /memory');

    memoryCtrl.createMemory(req)
    .then(memory => res.json(memory))
    .catch(err => res.status(err.status).send(err.name));

  });

  router.get('/memory/:userId', bearerAuth, (req, res) => {
    debug('#POST /memory');

    memoryCtrl.getMemory(req)
    .then(gallery => res.json(gallery))
    .catch(err => {
      res.status(err.status).send(err.message);
    });
  });

  router.get('/map', bearerAuth, (req, res) => {
    debug('#POST /memory');

    memoryCtrl.getMap(req)
    .then(gallery => res.json(gallery))
    .catch(err => {
      res.status(err.status).send(err.message);
    });
  });

  router.put('/memory/:id', bearerAuth, (req, res) => {
    debug('#POST /memory');

    memoryCtrl.updateMemory(req)
    .then(pic => res.json(pic))
    .catch(err => res.status(err.status).send(err.message));

  });

  router.delete('/memory:id', bearerAuth, (req, res) => {
    debug('#POST /memory');

    memoryCtrl.deleteMemory(req, res, req.params.id)
    .then(() => res.status(204).send())
    .catch(err => res.send(err));

  });

  return router;
};
