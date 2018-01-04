var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var index = require('./routes/index');
var users = require('./routes/users');
var upload = require('./routes/upload');
var Room = require('./room.js');
var cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var socket;

//socketio -------------------------------------------------------------------------------------------------
io.on('connection', function (socket) {
    console.log('new connection ...');
    socket =socket
    //Connect to room-------------------------------------------------------
    socket.on('joinroom', function(user) {
        var username = user;
        console.log(user);
        console.log(user.room);
        console.log(user.username);

    });




});

app.set('socket',socket);
app.set('io',io);

app.use('/', index);
app.use('/users', users);
app.use('/upload',upload);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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






http.listen(3030, function(){
    console.log('listening on *:3030');
});

module.exports = app;
