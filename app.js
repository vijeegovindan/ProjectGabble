const fs = require('fs');
const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const morgan = require("morgan");
const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const gabRoutes = require("./routes/gab");
const listRoutes = require("./routes/home");
const likesRoutes = require("./routes/likes");

const session = require('express-session');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache')
app.use('/static', express.static('static'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(morgan('dev'))

app.use(session({
  secret: 'ssssgabhhh!! sssgabhhhh!!',
  resave: false,
  saveUninitialized: false
}));

app.use(signupRoutes);
app.use(loginRoutes);
app.use(gabRoutes);
app.use(listRoutes);
app.use(likesRoutes);

app.listen(8000, function () {
    console.log('Express running on 8000')
});
