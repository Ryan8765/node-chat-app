var isRealString =  (str) => {

	//return true if it is a string and not empty speaces.
	return typeof str === 'string' && str.trim().length > 0;

};


module.exports = {isRealString};