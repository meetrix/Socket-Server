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

//Room concept-------------
var Room = require('./room.js');
var allRooms = {}; //all the available rooms

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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

//socketio -------------------------------------------------------------------------------------------------
io.on('connection', function (socket) {
    console.log('new connection ...');

    //Connect to room -------------------------------------------------------
    socket.on('joinroom', function(user) {
        var username = user.username;
        var joinedRoom  = user.room;
        console.log(user);
        var room = allRooms[joinedRoom]; //retrieve the relevant room object
        if(room == null) { //if room has not been created
            if(allRooms.length == null)
                id = 0;
            else id = allRooms.length++;
            room = new Room(joinedRoom, id); //create a room object
            allRooms[joinedRoom] = room;
        }
        room.addPerson(username); //add the person to the room
        //console.log(room);
        socket.join(joinedRoom); //join the room
        io.sockets.in(joinedRoom).emit('userjoin', {msg:"One user joined: " + joinedRoom,
                                                    users: room.getUsersInRoom()});
    });

    //Onclick by user -----------------------------------------------------------
    socket.on('onclick', function (update) {
        //update = {X, Y, username, room}
        var X = update.setX;
        var Y = update.setY;
        console.log(update);
        //notify others in room----------------------------------
        io.sockets.in(update.room).emit('update-position', update);});

    //When a user leaves ---------------------------------------------------------------
    socket.on('leaveroom', function () {});
});

http.listen(3030, function(){
    console.log('listening on *:3030');
});

module.exports = app;
