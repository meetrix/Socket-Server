function Room(name, id) {
    this.name = name;//name of room
    this.id = id; //id within the room array
    this.patientsInRoom = [];
    this.status = "available";
    this.numUsers = 0;
}

//add a user to the room
Room.prototype.addPerson = function(person) {
    if (this.status === "available") {
        this.patientsInRoom.push(person);
        this.numUsers++;
        console.log('Added ' +person  +' ' + this.numUsers);
    }
};

//return available users
Room.prototype.getUsersInRoom = function()  {
    return this.patientsInRoom;
};

module.exports = Room;