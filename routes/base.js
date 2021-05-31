const baseRouter = require('express').Router();

baseRouter.get('/', (req,res) => {
  res.render('index', {data: [
    'yey',
    'string',
    'template'
  ]})
})


module.exports = baseRouter