const express = require('express');
const app = express();
const baseRouter = require('./routes/base.js');
const apiRouter = require('./routes/api.js');
const adminRouter = require('./routes/admin.js');
const session = require('express-session');
const jsonParser = require('body-parser').json;
const encodedParser = require('body-parser').urlencoded;
const ejsLayouts = require('express-ejs-layouts');

// Configs
require('dotenv').config();
app.set('view engine', 'ejs');
// parse request body variabels.
app.use(jsonParser());
//  parse multi-data/fom
app.use(encodedParser({ extended: true }));
// Set Sessions

const sessionExpireHour = 10;
const sessionExpires = 1000 * 60 * 60 * sessionExpireHour;
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: sessionExpires, secure: false },
    resave: false,
    saveUninitialized: true
  })
);
// Set the layout file
app.use(ejsLayouts);

// serve dist files
app.use('/dist/', express.static(__dirname + '/public/dist/'));

// Routes
app.use('/', baseRouter);
app.use('/api', apiRouter);
app.use('/admin', adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log('App is running on -> http://localhost:' + PORT)
);
