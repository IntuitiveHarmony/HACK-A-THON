const express = require('express');

const app = express();

const emsController = require('./controllers/ems');

app.set('view engine', 'ejs');


app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/ems', emsController);

// Home Route
app.get('/', (req, res) => {
    res.render('home.ejs');
})

// Error Route
app.get('/*', (req, res) => {
    res.render('404.ejs');
})

// Port
app.listen(4000, () => {
    console.log("Listening on port 4000");
})