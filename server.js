'use strict';

var koa = require('koa');
var surface = require('surface');
var cors = require('koa-cors');
var bodyParser = require('koa-bodyparser');
var _ = require('underscore');
var db = require('./lib/helpers/db.js');
var app = koa();
var corsConfig = {
  origin: '*',
  methods: ['PUT', 'POST', 'GET', 'DELETE']
};
app.use(cors(corsConfig));
app.use(bodyParser());

surface(app);
app.listen(3000);

db.connect(function (err, connection) {
  if (err) {
    console.log('Could not connect to database', err);
    return process.exit();
  }
  console.log('Connected to database');
  connection.query('SHOW TABLES', function (err, results) {
    if (err) {
      console.log('Could not check tables', err);
    }
    if (!_.isArray(results) || !results.length) {
      db.initialize();
    }
  });
});

process.on('SIGINT', function () {
  console.log('Shutting down...');
  db.disconnect(process.exit);
});
