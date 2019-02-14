const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

// Add work folder
const work = require('./assets/work');

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

// app.post('/contact', [
//         // name exists
//         check('name').not().isEmpty(),
//         // email input must be an email
//         check('email').isEmail().normalizeEmail(),
//         // password must be at least 5 chars long
//         check('message').isLength({
//             min: 1
//         })
//     ],
//     (req, res) => {
//         const name  = req.body.name
//         const email = req.body.email
//         const message   = req.body.message;

//         console.log(name, email, message);

//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             console.log(errors.array());
//             return res.status(422).json({
//                 errors: errors.array()
//             });
//         } else {
//             res.send('success');
//         }
//     });

app.post('/contact', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    console.log(name, email, message);

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
        const success = {
            'success': 'email has been sent'
        }
        res.send(success);
    }
})

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
});