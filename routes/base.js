const baseRouter = require('express').Router();
const Database = require('../services/database');

// Renders views/index.ejs with empty data!
baseRouter.get('/', (req, res) => {
  res.render('index', {});
});

// Renders views/about.ejs with empty data!
baseRouter.get('/about', (req, res) => {
  res.render('about', {});
});

module.exports = baseRouter;
