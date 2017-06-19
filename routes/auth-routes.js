'use strict';

const debug = require('debug');
const basicAuth = require('../lib/basic-auth-middleware.js');
const authCtrl = require('../controller/auth-controller.js');

module.exports = function(router){
  router.post('/api/signup', (req, res) => {
    debug('#POST /api/signup');
// sample response for deployment
    res.send('hello world');
  });

  return router;
};
