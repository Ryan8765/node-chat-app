_______________________________________________

Modules Used in Project
_______________________________________________

1. Path 
	- documentation - https://nodejs.org/api/path.html
	- Using this to set up connecting the server to the html files by using the path.join method.  This allows us to get access to the public folder from the server.js file without the URI going into the server and then back out of the server file. 

2. Express
	- documenation - http://expressjs.com/

3. Socket IO
	- makes it easy to set up a server that allows communication from front end to back end via the server.
	- You get access to a route that accepts incoming connections and we got access to a javascript library. localhost:3000/socket.io/socket.io.js




_______________________________________________

Usage
_______________________________________________

******Server Side********
		//io.emit emits an event to every connection where "socket.on" emits it to a single connection.
		io.emit('newMessage', {
			from: msg.from,
			text: msg.text,
			createdAt: new Date().getTime()
		});


		broadcast - this will send an event to everyone BUT yourself.  So in a chat room if you enter, you don't need to see the fact that you entered the chat room. 
		socket.broadcast.emit('newMessage', {
				from: msg.from,
				text: msg.text,
				createdAt: new Date().getTime()
			});


		//we can emit an event using the "emit" function (this goes to a single connection, whereas "io.emit" goes to everyone.  second argument is for the data.  This fires the "newEmail" event from the server to the client where the client is waiting to receive it. 
		socket.emit('newMessage', {
			from: "Ryan",
			text: "Some BS text",
			createdAt: "12:53"
		});
