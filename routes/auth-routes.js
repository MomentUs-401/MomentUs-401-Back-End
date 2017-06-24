'use strict';

const debug = require('debug');
const basicAuth = require('../lib/basic-auth-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const authCtrl = require('../controller/auth-controller.js');

module.exports = function(router){
  router.post('/signup', (req, res) => {
    debug('#POST /api/signup');

    let tempPass = req.body.password;
    req.body.password = null;
    delete req.body.password;

    authCtrl.createUser(req.body, tempPass)
      .then(token => res.status(201).json(token))
      .catch(err => res.status(err.status).send(err.message));
  });

  router.get('/login', basicAuth, (req, res) => {
    debug('#GET /api/login');

    authCtrl.fetchUser(req.auth)
      .then(token => res.status(200).json(token))
      .catch(err => res.status(err.status).send(err.message));
  });

  router.delete('/account/:id', bearerAuth, (req, res) => {
    debug('#DELETE /account');

    authCtrl.deleteUser(req.params.id)
      .then( () => res.status(204).send())
      .catch(err => res.status(err.status).send('Bad delete request'));
  });

  return router;
};
