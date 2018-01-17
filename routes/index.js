var express = require('express');
var router = express.Router();
var mysql = require('../dao/mysqlServer');

/* GET home page. */
router.get('/', function(req, res, next) {
    mysql.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('select * from user', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
            connection.release();
        });
    });


});

module.exports = router;