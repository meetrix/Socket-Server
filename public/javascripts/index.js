var room, username;
var socket = io();
//submit username and room----------------------------------------------------------
function setUser(Username, Room) {
    room = Room;
    username = Username;
    console.log(username +" " +room);
    socket.emit('joinroom', {room: Room, username: Username});
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
    socket.emit('onclick', {X: X,
                            Y: Y,
                            username: username,
                            room: room});
}
/*//get coordinates of mouse moves===============================================================================================================
document.onmousemove = function(e){
    var x = e.pageX;
    var y = e.pageY;
    console.log("X is "+x+" and Y is "+y);
    socket.emit('onclick', {X: x,
        Y: y,
        username: username,
        room: room});
};*/
//notify others in the room ------------------------------------------------------
socket.on('update-position', function (update) {
    console.log(update);
});