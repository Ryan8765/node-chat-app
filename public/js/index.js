

//this is a method loaded because of IO.  This opens up a web socket.  This is how we communicate back and forth using this variable. 
var socket = io();

socket.on('connect',  function() {
	console.log('connected to server');

});

socket.on('disconnect',  function() {
	console.log('Disconnected from server');
});


//this is a custom event we are creating "newEmail" - basicallly a listener.  It is waiting for events to be fired from the server.
//listen for "newMessage" event from the server
socket.on('newMessage', function(msg) {
	console.log( "received new message from Server ", msg );
	var li = $('<li></li>');

	li.text(`${msg.from}: ${msg.text}`);
	$('#messages').append(li);
});



$('#message-form').on('submit', function(e){
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, function() {

	});
});


