const express = require('express');
const port = 8000;
const path = require('path');
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [
    {
        name : "name 1",
        phone : "1234567890"
    },
    {
        name : "name 2",
        phone : "2345678910"
    },
    {
        name : "name 3",
        phone : "34567789210"
    }
]

app.get('/', function(request, response){
    Contact.find({}, function(error, contacts){
        if(error){
            console.log('Error in fetching from Database');
            return;
        }
        return response.render('home', {title: 'Contact List', contact_list: contacts});
    });
});

app.post('/create-contact', function(request, response){
    Contact.create(request.body, function(error, newContact){
        if(error){
            console.log('Error while creating the Contact');
            return;
        }
        return response.redirect('back');
    });
});

app.get('/delete-contact/', function(request, response){
    let id = request.query.id;
    Contact.findByIdAndDelete(id, function(error){
        if(error){
            console.log('Error in deleting the object from databse');
            return;
        }
        return response.redirect('back');
    });
})
app.listen(port, function(error){
    if(error){
        console.log("Error while starting the server");
        return;
    }
    console.log("Server is Up and running on port", port);
})