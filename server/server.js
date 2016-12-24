const path     = require('path');
const http     = require('http');
const express  = require('express');
const socketIO = require('socket.io');

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


//this gets express to set the path to where the html files will be served up from
app.use(express.static(publicPath));

io.on('connection',  (socket) => {
	console.log('New user connected!!!!!');

	//emit message to new user when 
	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat app',
		createdAt: new Date().getTime()

	});

	//broadcast message to everyone but the new user who connected
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined the chat',
		createdAt: new Date().getTime()
	});



	//we can emit an event using the "emit" function (this goes to a single connection, whereas "io.emit" goes to everyone.  second argument is for the data.  This fires the "newEmail" event from the server to the client where the client is waiting to receive it. 
	// socket.emit('newMessage', {
	// 	from: "Ryan",
	// 	text: "Some BS text",
	// 	createdAt: "12:53"
	// });


	//create an event listener on the server, waiting for events that are emitted from the browser...
	socket.on('createMessage',  (msg) => {
		console.log( "createMessage ", msg );
		//io.emit emits an event to every connection where "socket.on" emits it to a single connection.
		io.emit('newMessage', {
			from: msg.from,
			text: msg.text,
			createdAt: new Date().getTime()
		});

		//broadcast - this will send an event to everyone BUT yourself.  So in a chat room if you enter, you don't need to see the fact that you entered the chat room. 
		// socket.broadcast.emit('newMessage', {
		// 		from: msg.from,
		// 		text: msg.text,
		// 		createdAt: new Date().getTime()
		// 	});

	});




	//register to the cmd when the user disconnects
	socket.on('disconnect',  () => {
		console.log( "Client disconnected" );
	});
});


//we are using server.listen because we are using socket.io
server.listen(3000,  () => {
	console.log(`Server is running on port ${port}`);
});