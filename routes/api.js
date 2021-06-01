const apiRouter = require('express').Router();
const Database = require('../services/database');

const database = new Database();

apiRouter.post('/register', async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  };
  const newUser = await database.createUser(user);
  res.send(newUser).status(402);
});

apiRouter.get('/', async (req, res) => {
  res.send('yey');
});

module.exports = apiRouter;
