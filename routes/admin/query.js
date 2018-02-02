var express = require('express');
var router = express.Router();
var mysql = require('../../dao/mysqlServer');
/**
 * 后台主菜单接口
 */
router.get('/', (req, res, next) => {
    var hash = req.query.hash;
    var time = req.query.time;
    var sql = '';
    console.log(hash, time);
    if (req.session.username === 'admin' && time) {
        mysql.getConnection((err, connection) => {
            if (err) console.log('connection err:' + err);
            switch (hash) {
                case 'users':
                    sql = 'select * from user';
                    break;
                case 'article':
                    sql = 'select * from article';
                    break;
                default:
                    sql = 'select * from user';
            }

            connection.query(sql, (err, result, fields) => {
                if (err) console.log(err);
                connection.release();
                return res.send(result);
            });
        });
    }

});

module.exports = router;