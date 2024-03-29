const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

// Add work folder
const work = require('./assets/work');
const {
    mail
} = require('./assets/nodemailer');

// Express App Init
const app = express();
app.use(express.json());
// enable compression on all responses
app.use(compression());
// support parsing of application/json type post data
app.use(bodyParser.json());
// enable all cors request
app.use(cors());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: true
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
        if (result.Error) {
            const nodemailerError = {
                'nodemailerError': 'Could not send message. Please try again.'
            }
        } else {
            console.log('RESULT: ', result);
            const success = {
                'success': 'Email has been sent'
            }
            res.send(success);
        }
    }
});

// app.listen(PORT, () => {
//     console.log(`Listening on PORT: ${PORT}`)
// });

app.listen(PORT, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});