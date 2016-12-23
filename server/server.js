const path = require('path');
const express = require('express');

//use publicPath to get to the public folder.  using "path" module allows you to get there without the file structure going into the server fold and then back out again.
const publicPath = path.join(__dirname, '../public');
//create an environment variable to define the port the server is running off of
const port = process.env.PORT || 3000;


var app = express();


//this gets express to set the path to where the html files will be served up from
app.use(express.static(publicPath));

app.listen(3000,  () => {
	console.log(`Server is running on port ${port}`);
});