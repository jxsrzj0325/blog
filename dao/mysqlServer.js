var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('./config.json');

var pool = mysql.createPool(config.mysql);

router.use(bodyParser.json({ limit: "2000kb" }));

router.use(bodyParser.urlencoded({
    parameterLimit: 1000,
    limit: '50mb',
    extended: false
}));

module.exports = pool;