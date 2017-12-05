var socket = io();
var room, username;
//submit username and room----------------------------------------------------------
document.getElementById('join').onclick = function() {setUser()};
function setUser() {
    //location.href = "https://meet.jit.si/1234";
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

    /*var width = window.innerWidth;
    var height = window.innerHeight;*/
    var width = screen.availWidth;
    var height = screen.availHeight;
    //notify other users---------------------------------------------------
    socket.emit('onclick', {X: X, Y: Y, width:width, height:height, username: username, room: room});
}
//notify others in the room ------------------------------------------------------
socket.on('update-position', function (update) {
    console.log(update);
});