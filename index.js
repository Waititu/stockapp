//Stock Market Portfolio App By Isaac

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000;

// Use body parser middleware 
app.use(bodyParser.urlencoded({extended: false}));


// API Key pk_3b428a3c8fc94424bf46830e540b0f86
// Create Call API Function
function call_api(finishedAPI, ticker){

    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_3b428a3c8fc94424bf46830e540b0f86', {json: true}, (err, res, body) => {

    if (err)  {return console.log(err);}
    if(res.statusCode === 200){
         //console.log(body);
         finishedAPI(body);
        };
    });
}

// Set Handlebar MiddleWare
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "This is other stuff!";

//Set Handlebar index GET routes
app.get('/', function (req, res) {
    call_api(function(doneAPI){
        res.render('home', {
            stock: doneAPI
        });
    }, "fb");
});


//Set Handlebar index POST routes

app.post('/', function (req, res) {
    call_api(function(doneAPI){
        //posted_stuff = req.body.stock_ticker;
        res.render('home', {
            stock: doneAPI,
        });
    }, req.body.stock_ticker );
});


//Create about page route
app.get('/aboutme.html', function (req, res) {
    res.render('about');
});

// Set static folders
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server listening on Port:' + PORT));

