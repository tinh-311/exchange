const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here

  router.get('/exchange', function (req, res, next) {
    console.log('get exchange');
    db.query(
      'SELECT * FROM exchange',
      [owner, 10*(req.params.page || 0)],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/exchange/id/from', function (req, res, next) {
    console.log('get exchange from id');
    console.log('🚀 ~ req.body', req.params);
    db.query(
      'SELECT * FROM exchange WHERE exchange.from=?',
      ['USD'],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });
  
  router.post('/exchange', (req, res, next) => {
    console.log('post exchange');
    db.query(
      'INSERT INTO exchange VALUES (?,?,?,?)',
      [req.body.from, req.body.to, req.body.result, req.body.dateTime],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.put('/exchange/:id', function (req, res, next) {
    db.query(
      'UPDATE exchange SET exchange.to=?, exchange.result=?, exchange.dateTime=? WHERE exchange.from=?',
      [req.body.to, req.body.result, req.body.dateTime, req.body.from],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;
