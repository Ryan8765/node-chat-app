

//this is a method loaded because of IO.  This opens up a web socket.  This is how we communicate back and forth using this variable. 
var socket = io();


//controls scrolling for user
function scrollToBottom() {
	//selectors
	var messages          = $('#messages');
	var newMessage        = messages.children('li:last-child');
	//heights
	var clientHeight      = messages.prop('clientHeight');
	var scrollTop         = messages.prop('scrollTop');
	var scrollHeight      = messages.prop('scrollHeight');
	var newMessageHeight  = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}

}

socket.on('connect',  function() {
	console.log('connected to server');

	//joining a room - socket.io has this functionality built in.
	var params = $.deparam(window.location.search);

	socket.emit('join', params, function( err ) {
		if( err ) {
			alert(err);
			window.location.href = '/';
		} else {
			console.log( "No error" );
		}
	});
});

socket.on('disconnect',  function() {
	console.log('Disconnected from server');
});


socket.on('updateUserList', function(users) {
	var ol = $('<ol></ol>');
	users.forEach(function(user) {
		ol.append($('<li></li>').text(user));
	});

	$('#users').html(ol);
});


//this is a custom event we are creating "newEmail" - basicallly a listener.  It is waiting for events to be fired from the server.
//listen for "newMessage" event from the server
socket.on('newMessage', function(msg) {
	var formattedTime = moment(msg.createdAt).format('h:mm a');
	// var li = $('<li></li>');

	// li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
	// $('#messages').append(li);

	var template = $('#message-template').html();
	var html = Mustache.render(template, {
		text: msg.text,
		from: msg.from,
		createdAt: formattedTime
	});

	$('#messages').append(html);
	scrollToBottom();
});

var messageTextbox = $('[name=message]');

$('#message-form').on('submit', function(e){
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, function() {
		//clear the value in the form
		messageTextbox.val('');
	});
});


socket.on('newLocationMessage', function(message) {
	var url           = message.url;
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template      = $('#location-message-template').html();

	var html = Mustache.render(template, {
		url: url,
		from: message.from,
		createdAt: formattedTime
	});

	$('#messages').append(html);
	scrollToBottom();
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

	locationButton.attr('disabled', 'disabled').text('Sending location...');



	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text('Send Location');
		socket.emit('createLocationMessage', {

			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});

	}, function() {
		locationButton.removeAttr('disabled').text('Send Location');
		alert('unable to fetch location.');
		
	});
}); 

