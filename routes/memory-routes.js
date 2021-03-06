'use strict';

const multer = require('multer');
const dataDir = `${__dirname}/../data`;
const upload = multer({dest: dataDir});

const debug = require('debug')('momentus: memory-routes');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const memoryCtrl = require('../controller/memory-controller.js');

module.exports = function(router){
  router.post('/memory', bearerAuth, upload.single('photo'), (req, res) => {
    debug('#POST /memory');

    memoryCtrl.createMemory(req)
      .then(memory => res.status(201).json(memory))
      .catch(err => res.status(err.status).send(err.name));

  });

  router.get('/memory', bearerAuth, (req, res) => {
    debug('#GET /memory');

    memoryCtrl.fetchMemory(req)
      .then(memory => res.json(memory))
      .catch(err => {
        /* istanbul ignore next */
        res.status(err.status).send(err.message);
      });
  });

  router.get('/map', bearerAuth, (req, res) => {
    debug('#GET /map');

    memoryCtrl.getMap(req)
      .then(memories => res.json(memories))
      .catch(err => {
        /* istanbul ignore next */
        res.status(err.status).send(err.message);
      });
  });

  router.put('/memory/:id', bearerAuth, upload.single('photo'), (req, res) => {
    debug('#PUT /memory/:id');

    memoryCtrl.updateMemory(req)
      .then(memory => res.json(memory))
      /* istanbul ignore next */
      .catch(err => res.status(err.status).send(err.message));

  });

  router.delete('/memory/:id', bearerAuth, (req, res) => {
    debug('#DELETE /memory/:id');

    memoryCtrl.deleteMemory(req.params.id)
      .then(() => res.sendStatus(204))
      /* istanbul ignore next */
      .catch(err => res.status(err.status).send(err.message));

  });

  return router;
};
