
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);




//Connect to the Database
const Sequelize = require('sequelize');
const sequelize = new Sequelize ({
    dialect: 'sqlite',
    storage: 'library.db'
});

(async () => {
  await sequelize.sync();
  try{
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (error){
    console.error ('Error connecting', error);
  }
}) ();

//routes go here


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  err.message = 'Page Not Found';
  res.render('page-not-found', {err})
});

// Global error handler
app.use((err, req, res, next) => {
  if (err.status === 404){
    res.render('page-not-found', { err });
  } else {
    err.message = err.message || 'You have encountered a server error';
    res.locals.error = err;
      // render the error page
    res.status(err.status || 500);
    res.render('page-not-found', {err})
  }
});




module.exports = app;
