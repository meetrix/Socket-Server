# Socket-Server

## Requirements

1. Registering new user. (E-mail, User-name, Password)
2. Loging registered user. (User-name, Password)
3. Aloow to  join an existing room. (Room-name(unique), User-name)
4. Allow to create a room. (Room-name(unquie), User-name)
5. Notify other joined users when joining. (User-name)
6. Emit the cursor-click within the room. (Room-name, User-name, X-coordinate, Y-coordinate)
7. Notify others when leaving the room. (Room-name, User-name)

## Project Structure
.
+-- app.js
+-- bin
|   +-- www
+-- package.json
+-- public
|   +-- images
|   +-- javascripts
|   +-- stylesheets
|     +--style.css
+-- routes
|   +-- index.js
|   +-- users.js
+-- views
|   +-- error.pug
|   +-- index.pug
|   +-- layout.pug




