var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var usersRouter = require('./routes/users');
const pg = require('pg');
const pool = new pg.Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'teravin_test',
    password: 'admin1234',
    port:'5432'
})

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter(pool));

module.exports = app;
