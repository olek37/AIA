'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _views = require('./views');

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var port = 3000;

(0, _db.init)();
var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _expressSession2.default)({ secret: "clothesapp" }));
app.use(_express2.default.static('public'));

app.get('/', async function (req, res) {
  return res.send((await (0, _views.home)()));
});

app.get('/cart', async function (req, res) {
  return res.send((await (0, _views.cart)(req.session.cart || [])));
});

app.post('/', async function (req, res) {
  var prod = parseInt(req.body.product);
  req.session.cart = req.session.cart ? [].concat(_toConsumableArray(req.session.cart), [prod]) : [prod];
  res.send();
});

app.post('/cart', async function (req, res) {
  await (0, _db.buy)(req.session.cart || []);
  req.session.cart = [];
  res.send();
});

app.delete('/cart', async function (req, res) {
  console.log('1');
  var prod = parseInt(req.body.product);
  req.session.cart = req.session.cart.filter(function (p) {
    return p != prod;
  });
  res.send();
});

app.listen(port, function () {
  return console.log('ClothesApp listetning at http://localhost:' + port);
});