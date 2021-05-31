const apiRouter = require('express').Router();
const Database = require('../services/database');

const database = new Database();

apiRouter.post('/register', async (req, res) => {
  const data = {
    username: 'kaan',
    password: 'password'
  };
  database.createUser(data);
  res.send('yey');
});

apiRouter.get('/', async (req, res) => {
  res.send('yey');
});

module.exports = apiRouter;
