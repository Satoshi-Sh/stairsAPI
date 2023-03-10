var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./mongoConnect')

const compression = require("compression")
const helmet = require("helmet")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
require('./passport')

connectDB()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression())
app.use(helmet())

// cors setting 
const corsOption = {
  origin:['https://satoshi-sh.github.io','http://localhost:3000'],
  credentials:true,
  optionSuccessStatus:200
}
app.use(cors(corsOption))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
