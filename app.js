const express = require('express');
const app = express();
const baseRouter = require('./routes/base.js')

app.set('view engine', 'ejs')


// Routes
app.use(baseRouter)

app.listen(3000);