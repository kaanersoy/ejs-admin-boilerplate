const baseRouter = require('express').Router();
const Database = require('../services/database');

baseRouter.get('/', (req, res) => {
  res.render('index', {});
});

baseRouter.get('/about', (req, res) => {
  res.render('about', {});
});

module.exports = baseRouter;
