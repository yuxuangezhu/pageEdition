var express = require('express');
// var config = require('./config/config');
var app = express();
var request = require('request');
// var httpProxy = require('http-proxy');
var path = require('path');
var bodyParser = require('body-parser');
var headerBase = [{
        type: '*',
        value: ''
    }, {
        type: '/js/*',
        value: 'application/json;charset=utf-8'
    }, {
        type: '/css/*',
        value: 'text/css;charset=utf-8'
    }]
    //设置跨域限制
headerBase.forEach(function(v, i) {
    app.all(v.type, function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.2');
        if (v.value) {
            res.header("Content-Type", v.value);
        }
        next();
    });
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function(req, res) {
    res.send('Service has been started！');
})

var Router = express.Router();
var urlPath = express.Router();

// 接口路由
Router.post('/api/saveData', function(req, res) {

})
Router.get('/api/getText', function(req, res) {
    try {
        var number = req.query.number,
            url = 'http://www.kuaidi100.com/autonumber/autoComNum?text=' + number;
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
        })
    } catch(e) {}
})

// path路由
urlPath.get('*', function(req, res) {
  // console.log(req)
    try {
        var url = 'http://localhost:3000' + req.url;
        console.log(url)
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
        })
    } catch(e) {}
})
app.use('/js', Router);
app.use('/', urlPath);
console.log('Service has been started！');
module.exports = app;