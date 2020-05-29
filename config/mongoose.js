//require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/contact_list_db');

//aquire the connection (to check is it is running)
const db = mongoose.connection;

//Error
db.on('error', function(){
    console.log('Error while connecting to mongoose');
});

//Up and Running, then print message
db.once('open',function(){
    console.log('Database is Up and Running');
});