/******************************************************************************

	used for storing users data structure

******************************************************************************/


[{
	id: '',
	name: 'Ryan',
	room: 'The office fans'
}]


//addUser(id, name, room)

//removeUser(id)


//getUser(id)


//getUserList(room) - find what users are in the room and return an array of rooms

class Users {

	constructor() {
		this.users = [];
	}

	addUser(id, name, room) {
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}

	removeUser (id) {
		var user = this.users.filter((user) => {
			return user.id === id;
		})[0];

		if( user ) {
			//filter out user 
			var users = this.users.filter( (user) => {
				return user.id !== id;
			});
			this.users = users;
		} 

		return user;
	}

	getUser (id) {
		var user = this.users.filter((user) => {
			return user.id === id;
		})[0];

		return user;
	}

	getUserList(room) {
		var users = this.users.filter( (user) => {
			return user.room === room
		});
		var namesArray = users.map( (user) => {
			return user.name;
		});

		return namesArray;
	}

}


module.exports = {Users};