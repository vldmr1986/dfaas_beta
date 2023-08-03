const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');

const signupRouter = require('./routes/signup');
const spacesRouter = require('./routes/spacenames');
const countriesRouter = require('./routes/countries');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, '..', 'client','build')));
app.use(express.static(path.join(__dirname, '..','client','build')));

app.use('/api/signup', signupRouter);
app.use('/api/spaces', spacesRouter);
app.use('/api/countries', countriesRouter);

app.get('*', function(req, res){
    res.redirect('/');
});


module.exports = app;
