

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

socket.on('newLocationMessage', function(message) {
	var li = $('<li></li>');
	var a = $('<a target="_blank">My Current Location</a>');

	li.text(`${message.from}: `);
	a.attr('href', message.url);

	li.append(a);
	$('#messages').append(li);
});


/******************************************************************************

	Geolocation

******************************************************************************/

var locationButton = $('#send-location');

locationButton.on('click', function() {
	//if browser doesn't support geolocation alert user
	if( !navigator.geolocation ) {
		return alert('Geolocation not supported by your browser.');
	}



	navigator.geolocation.getCurrentPosition(function (position) {

		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function() {
		alert('unable to fetch location.');
	});
}); 

