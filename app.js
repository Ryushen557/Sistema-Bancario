var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usuarioRouter = require('./routes/usuarios');
const cuentaRouter = require('./routes/cuentas');
var cooperativaRouter = require('./routes/cooperativas');

var app = express();
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () =>
  console.log(`El servidor está corriendo en el puerto ${app.get('port')}`)
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/usuarios', usuarioRouter);
app.use('/cuentas', cuentaRouter);
app.use('/cooperativas', cooperativaRouter);

module.exports = app;
