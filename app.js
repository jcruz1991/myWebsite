const express = require('express');
const path = require('path');

const app = express();


const PORT = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
});