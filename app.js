const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const bodyparser= require('body-parser');
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true});
const port = 80;

//DEFINING MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name:String,
    number:String,
    address:String,
    email:String,
    password1:String,
    password2:String

});
const Contact = mongoose.model('Contact',contactSchema);


//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));//Serving static Files
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set("view engine", 'pug');//set the template engin as pug
app.set('views', path.join(__dirname, 'views'));

//ENDPOINTS
app.get("/", (req, res) => {
    const params={ }
    res.status(200).render("home.pug",params);
});//for index.pug

app.get("/contact", (req, res) => {
    const params={ }
    res.status(200).render("contact.pug",params);
});//for contact.pug

app.post("/contact", (req, res) => {
    const myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("these items has been save to the data base");
    }).catch(()=>{
        res.status(400).send("item was not sent to the dataBase");
    });
    // res.status(200).render("contact.pug");
});//for saving contact data to the data base 

//START SERVER
app.listen(port,()=>{
    console.log(`application started on ${port}`);
});

