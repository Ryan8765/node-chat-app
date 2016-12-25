var moment = require('moment');

/******************************************************************************

	Stores functions to generate messages

******************************************************************************/

//gen
var generateMessage =  (from, text) => {

	return {
		from,
		text,
		createdAt: moment().valueOf()
	};

};

var generateLocationMessage = (from, latitude, longitude) => {

	return {
		from,
		url: `https://www.google.com/maps?q=${latitude},${longitude}`,
		createdAt: moment().valueOf()
	};

};



module.exports = {generateMessage, generateLocationMessage};