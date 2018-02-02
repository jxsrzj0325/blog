var express = require('express');
var router = express.Router();
var mysql = require('../../dao/mysqlServer');

router.get('/', function(req, res, next) {
    var sql = `SELECT * FROM USER WHERE(USER_ID=${req.query.id})`;
    mysql.getConnection(function(err, connection) {
        if (err) console.log(err);
        connection.query(sql, function(err, result, fields) {
            if (err) console.log(err);
            connection.release();
            return res.send(result);
        });
    });
});
module.exports = router;