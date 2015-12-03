// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 8080;

var passport = require('passport');
var flash    = require('connect-flash');

// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration



// set up our express application
//app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);


app.get('/search', function(req, res) {
    if(typeof req.user === 'undefined'){
        res.render('search',{user: null, result: null});
    }
    else{
        res.render('search', {user: req.user, result:null});
    }
});

//define response to path '/lease' GET
app.get('/lease', function(req, res){
    db.readAll(function(err, rows){
        if(typeof req.user === 'undefined'){
		  res.render('lease',{user: null, result: rows});
        }
        else{
            res.render('lease', {user: req.user, result:rows});
        }
    });
});

app.get('/recommend', function(req, res){
    if(typeof req.user === 'undefined'){
        res.render('recommend',{user: null, result: null});
    }
    else{
        res.render('recommend', {user: req.user, result:null});
    }
});

app.post('/recommend/result', function(req, res){
    db.readAll(function(err, rows){
        if(typeof req.user === 'undefined'){
            res.render('recommend',{user: null, result: rows});
        }
        else{
            res.render('recommend', {user: req.user, result:rows});
        }
    });
});

app.get('/error', function(req, res){
    res.send('Failed');
})

//define response to path '/updateAndDelete' GET
app.get('/updateAndDelete', function(req, res){
    db.readAll(function(err, rows){
        res.render('updateAndDelete',{ result: rows}); 
    });
});

var path = require('path');
var searchRoute = require('./routes/search');
var leaseRoute = require('./routes/lease');
var updateAndDelete = require('./routes/updateAndDelete');
var db = require('./db/db');
//set result route
app.set('view options', { layout: false });
//static resource path
var staticPath = path.join(__dirname, 'public');
app.use('/search', searchRoute);
app.use('/lease', leaseRoute);
app.use('/updateAndDelete', updateAndDelete);
app.use(express.static(staticPath));
