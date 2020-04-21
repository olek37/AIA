'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cart = exports.home = undefined;

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var home = exports.home = async function home() {
  var products = await (0, _db.getProducts)();
  var productsHTML = products.reduce(function (html, prod) {
    return html + ('\n    <div class=\'product\'>\n      <p>' + prod.name + '</p>\n      <button class=\'add\' data-product=\'' + prod.id + '\'>Add to cart</button>\n    </div>\n  ');
  }, '');
  return (0, _template2.default)('<div class=\'row\'>' + productsHTML + '</div><button class=\'to-cart\'><a href=\'/cart\'/>to cart &#10230;</a></button>');
};

var cart = exports.cart = async function cart(_cart) {
  var products = await (0, _db.getProductsByCart)(_cart);
  var productsHTML = products.reduce(function (html, prod) {
    return html + ('\n    <div class=\'product\'>\n      <p>' + prod.name + '</p>\n      <button class=\'remove\' data-product=\'' + prod.id + '\'>Remove</button>\n    </div>\n  ');
  }, '');
  return (0, _template2.default)('\n    <div class=\'row\'>\n      ' + productsHTML + '\n    </div>\n    ' + (_cart.length ? '<button class=\'buy\'>Buy now</button>' : '') + '\n    <button class=\'to-home\'>\n      <a href=\'/\'>&#10229; to home</a>\n    </button>\n  ');
};