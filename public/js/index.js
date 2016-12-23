

//this is a method loaded because of IO.  This opens up a web socket.  This is how we communicate back and forth using this variable. 
var socket = io();

socket.on('connect',  function() {
	console.log('connected to server');


	//emit events from within socket.on connect so you don't emit the event before you are connected. this emits an event "createEmail" to the server, where there is a listener "createEmail" waiting to get the event
	socket.emit('createEmail', {
		to: "rmhaas2211@gmail.com",
		text: "This is ryan"
	});


});

socket.on('disconnect',  function() {
	console.log('Disconnected from server');
});


//this is a custom event we are creating "newEmail" - basicallly a listener.  It is waiting for events to be fired from the server.
socket.on('newEmail',  function (email) {
	console.log('New Email', email);
});