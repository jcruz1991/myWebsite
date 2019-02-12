const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {
    check,
    validationResult
} = require('express-validator/check');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

// Add work folder
const work = require('./assets/work');

// Express App Init
const app = express();


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/work', (req, res) => {
    res.send(work);
})

app.post('/contact', [
        // name exists
        check('name').exists(),
        // email input must be an email
        check('email').isEmail(),
        // password must be at least 5 chars long
        check('message').isLength({
            min: 1
        })
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(422).json({
                errors: errors.array()
            });
        } else {
            console.log('success');
        }
    });

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
});