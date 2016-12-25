var moment = require('moment');




//new moment object for current point in time
var date = moment();

console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm a'));