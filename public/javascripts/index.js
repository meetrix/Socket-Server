var socket = io();
var room, username;
//submit username and room----------------------------------------------------------
document.getElementById('join').onclick = function() {setUser()};
function setUser() {
    room = document.getElementById('room').value;
    username = document.getElementById('username').value;
    console.log(username +" " +room);
    socket.emit('joinroom', {room: room, username: username});
}
//update a joined user-----------------------------------------------------------
socket.on('userjoin', function (obj) {
    console.log(obj);
});
//get coordinates on cursor clicks ----------------------------------------------------------------
function point_it(event){
    var X = event.pageX;
    var Y = event.pageY;
    //notify other users---------------------------------------------------
    socket.emit('onclick', {type: 'cursor-click',
                            X: X,
                            Y: Y,
                            username: username,
                            room: room});
}
//notify others in the room ------------------------------------------------------
socket.on('update-position', function (update) {
    console.log(update);
});