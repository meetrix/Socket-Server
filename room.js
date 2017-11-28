function Room(name, id) {
    this.name = name;//name of room
    this.id = id; //id within the room array
    this.patientsInRoom = [];
    this.status = "available";
    this.numUsers = 0;
}

Room.prototype.addPerson = function(person) {
    if (this.status === "available") {
        this.patientsInRoom.push(person);
        this.numUsers++;
        console.log('one added ' +person  +' ' + this.numUsers);
    }
};

Room.prototype.getPatientsInRoom = function()  {
    return this.patientsInRoom;
};

module.exports = Room;