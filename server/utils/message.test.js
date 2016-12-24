var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage',  () => {
	it('should generage correct message object',  () => {

		var from = 'jen';
		var text = 'Some message';
		var message = generateMessage(from, text);
		

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({
			from,
			text
		});

	});
});


describe('generateLocationMessage',  () => {

	it('should generate correct location object',  () => {
		var from = "Ryan";
		var lat = 1;
		var long = 1;
		var url = generateLocationMessage(from, lat, long);

		expect(url.createdAt).toBeA('number');

		expect( url ).toInclude({
			from
		});


		expect( url.url ).toBe(`https://www.google.com/maps?q=${lat},${long}`);

	});

});