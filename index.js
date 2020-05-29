const express = require('express');
const port = 8000;
const path = require('path');

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
    return response.render('home', {
        title : "My Contact List",
        contact_list : contactList
    });
});

app.post('/create-contact', function(request, response){
    // response.redirect('back');
    console.log(request.body);
    contactList.push(request.body);
    return response.redirect('back');
});

app.get('/delete-contact/', function(request, response){
    console.log(request.query);
    let phone = request.query.phone;
    console.log(phone.phone);
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    console.log(contactIndex);
    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }
    return response.redirect('back');
})
app.listen(port, function(error){
    if(error){
        console.log("Error while starting the server");
        return;
    }
    console.log("Server is Up and running on port", port);
})