const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

// Add work folder
const work = require('./assets/work');
const { mail } = require('./assets/nodemailer');

// Express App Init
const app = express();
app.use(express.json());


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(expressValidator());


app.use(express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/work', (req, res) => {
    res.send(work);
})

app.post('/contact', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Invalid Email').isEmail();
    req.checkBody('message', 'Message is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        console.log(errors);
        const err = {
            'errors': errors
        };
        console.log(err);
        res.send(err);
    } else {
        const result = mail(name, email, message);
        console.log('RESULT: ', result);
        const success = {
            'success': 'email has been sent'
        }
        res.send(success);
    }
})

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
});