//Stock Market Portfolio App By Isaac

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');


const PORT = process.env.PORT || 5000;

// Set Handlebar MiddleWare
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "This is other stuff!";

//Set Handlebar routes
app.get('/', function (req, res) {
    res.render('home', {
        stuff: otherstuff
    });
});

// Set static folders
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server listening on Port:' + PORT));

