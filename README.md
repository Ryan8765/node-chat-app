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

4. Expect & Mocha
	- npm install expect@1.20.2 mocha@3.0.2 --save-dev
	- Expect documentation
		https://github.com/mjackson/expect
	- Mocha Documentation
		http://mochajs.org/
5. Moment.js
	- docs - momentjs.com

_______________________________________________

API's used
_______________________________________________
	
1. Geolocation API


_______________________________________________

Plugins
_______________________________________________
	
1. jQuery
2. Mustache.js 
	- docs - https://github.com/janl/mustache.js/
3. deparam 
	- used for parsing params from the URL
	- documentation - links.mead.io/deparam
	- You can use this with $.deparam(window.location.search)
		- resulting is an object of name/value pairs in an object.



_______________________________________________

Usage socket.io
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

************client side**********
	
	//connecting a new computer to server.
	socket.on('connect',  function() {
		console.log('connected to server');

	});
	
	//event fired when disconnting from the server.
	socket.on('disconnect',  function() {
		console.log('Disconnected from server');
	});



	//this is a custom event we are creating "newEmail" - basicallly a listener.  It is waiting for events to be fired from the server.
	//listen for "newMessage" event from the server
	socket.on('newMessage', function(msg) {
		console.log( "received new message from Server ", msg );
	});



*******Fire a callback after response from the server*********

	//this is on the server side of things - when it receives a createMessage event, it fires a callback to the browser with the text 'This is from the server callback'
	socket.on('createMessage',  (msg, callback) => {
		console.log( "createMessage ", msg );
		//io.emit emits an event to every connection where "socket.on" emits it to a single connection.
		io.emit('newMessage', generateMessage(msg.from, msg.text));
		callback('This is from the server callback.');

	});


	//On the browser side of things - you can get the information from the callback and run your own code with that particular response.  In this case - it will print out the 'This is from the server'
		socket.emit('createMessage', {
		from: 'Frank',
		text: 'Hi'
	}, function(data) {
		console.log(data);

	});


****************joining rooms**********************
	//socket.join allows you to create separate "rooms", for people to talk in the same room.
	socket.join(params.room);
	//socket.leave - will allow you to leave a room
	socket.leave(params.room);

***************emitting to room***********************
	//emit to everyone in a particular room
	io.to(params.room).emit
	//send event to everyone in the room except for yourself
	socket.broadcast.to(params.room).emit

***************socket has id's**********************
	//each socket that is opened, has an id associated with it	


_______________________________________________

Usage mustache
_______________________________________________

HTML:
	<!-- this creates a mustache template -->
	<script id="message-template" type="text/template">
		<li class="message">
			<div class="message__title">
				<h4>{{from}}</h4>
				<span>{{createdAt}}</span>
			</div>
			<div class="message__body">
				<p>{{text}}</p>
			</div>
		</li>
	</script>
	<!-- this creates a mustache template -->

Javascript page:

	socket.on('newMessage', function(msg) {
		var formattedTime = moment(msg.createdAt).format('h:mm a');
		var template = $('#message-template').html();
		//render the template using mustache
		var html = Mustache.render(template, {
			text: msg.text,
			from: msg.from,
			createdAt: formattedTime
		});

		$('#messages').append(html);

	});