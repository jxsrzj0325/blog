var express = require('express');
var router = express.Router();
var mysql = require('../../dao/mysqlServer');

/* GET home page. */
router.get('/', function(req, res, next) {
    var session = req.session,
        username = session.username, //登陆用户名
        isLogined = !!username; //登陆状态
    res.render('./admin/admin', { 'isLogined': isLogined, 'username': username || '' });
});

router.post('/signin', function(req, res, next) {
    var sql = 'select * from user';
    mysql.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(sql, function(err, rows, fields) {
            if (err) throw err;
            new Promise(function(resolve, reject) {
                rows.forEach(function(elm, index) {
                    if (elm.user_name === req.body.username && elm.user_pwd === req.body.password) {
                        req.session.username = req.body.username;
                        resolve();
                    }
                });
                reject();
            }).then(function() {
                res.send({
                    'status': 200,
                    'msg': '登陆成功',
                    'session': 1
                });
            }).catch(function() {
                res.send({
                    'status': 200,
                    'msg': '用户名或密码错误',
                    'session': 0
                });
            });
            connection.release();
        });
    });
});

module.exports = router;