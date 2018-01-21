var express = require('express');
var router = express.Router();
var mysql = require('../../dao/mysqlServer');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('./admin/admin');

});

router.post('/signin', function(req, res) {
    var sql = 'select * from user';
    mysql.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(sql, function(err, rows, fields) {
            if (err) throw err;

            var p = new Promise(function(resolve, reject) {
                rows.forEach(function(elm, index) {
                    if (elm.user_name === req.body.username && elm.user_pwd === req.body.password) resolve();
                });
                reject();
            });
            p.then(function() {
                res.send({
                    'status': 200,
                    'msg': 'ok',
                    'sisson': 1
                });
            }).catch(function() {
                res.send({
                    'status': 200,
                    'msg': 'no',
                    'sisson': 0
                });
            });

            connection.release();
        });
    });
});

module.exports = router;