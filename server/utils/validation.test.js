const expect = require('expect');

const {isRealString} = require('./validation');



describe( 'isRealString Function',  () => {


	it('Should reject non string values',  () => {
		var nonStringValue = 45;
		expect( isRealString(nonStringValue) ).toBe(false);
	});

	it( 'Should reject strings with only spaces',  () => {
		var stringWithSpaces = "       ";
		expect( isRealString(stringWithSpaces) ).toBe(false);
	});

	it('Should allow string with non-space characters',  () => {
		var realString = "  This is some real string  ";
		expect( isRealString(realString) ).toBe(true);
	});


});



