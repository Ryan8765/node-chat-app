const path     = require('path');
const http     = require('http');
const express  = require('express');
const socketIO = require('socket.io');



const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString}                             = require('./utils/validation');
const {Users}                                    = require('./utils/users');

//use publicPath to get to the public folder.  using "path" module allows you to get there without the file structure going into the server fold and then back out again.
const publicPath = path.join(__dirname, '../public');
//create an environment variable to define the port the server is running off of
const port = process.env.PORT || 3000;

//user express npm module for this application
var app = express();
//this is used to set up bi-communication for socket.io
var server = http.createServer( app );
//configure the server to use socket.io. This is how we communicate between the server and the client.
var io = socketIO( server );

var users = new Users();


//this gets express to set the path to where the html files will be served up from
app.use(express.static(publicPath));

io.on('connection',  (socket) => {
	console.log('New user connected!!!!!');


	//handles joining rooms - "join" is a custom event we create
	socket.on('join',  (params, callback) => {

		//check to make sure params are valid
		if( !isRealString(params.name) || !isRealString(params.room) ) {
			//by returning here - it won't fire any code below this if the data isn't valid.
			return callback('Name and room name are required');
		}

		//this is built into socket - allows users to join different areas
		socket.join(params.room);
		//make sure to remove the user from any other rooms
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));

		//emit message to new user when 
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));

		//broadcast message to everyone in the room but the new user who connected
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

		//if no errors, pass empty callback back.
		callback();
	});

	//create an event listener on the server, waiting for events that are emitted from the browser...
	socket.on('createMessage',  (msg, callback) => {
		console.log( "createMessage ", msg );
		//io.emit emits an event to every connection where "socket.on" emits it to a single connection.
		io.emit('newMessage', generateMessage(msg.from, msg.text));
		callback();
	});

	socket.on('createLocationMessage',  (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});




	//register to the cmd when the user disconnects
	socket.on('disconnect',  () => {
		console.log('should have removed user');
		var user = users.removeUser(socket.id);

		if(user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
		}
	});
});


//we are using server.listen because we are using socket.io
server.listen(3000,  () => {
	console.log(`Server is running on port ${port}`);
});