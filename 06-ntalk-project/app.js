var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var contatosRouter = require('./routes/contatos');
const session = require('express-session');
const methodOverride = require('method-override');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ resave: false, saveUninitialized: false, secret: 'keyboard cat' }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/contatos', contatosRouter);

module.exports = app;
