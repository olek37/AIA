'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buy = exports.getProductsByCart = exports.getProducts = exports.init = undefined;

var _mongodb = require('mongodb');

var url = "mongodb://localhost:27017/mydb";

var init = exports.init = async function init() {
  var client = await _mongodb.MongoClient.connect(url);
  var db = client.db('AIA');
  if ((await db.collections()).length > 0) {
    await db.collection('products').drop();
  }
  await db.createCollection('products');
  await db.collection('products').insertMany([{ "id": 1, "name": "White T-Shirt" }, { "id": 2, "name": "Black Pants" }, { "id": 3, "name": "Green Jacket" }]);
};

var getProducts = exports.getProducts = async function getProducts() {
  var client = await _mongodb.MongoClient.connect(url);
  var db = client.db('AIA');
  var cursor = db.collection('products').find();
  return cursor.toArray();
};

var getProductsByCart = exports.getProductsByCart = async function getProductsByCart(idArr) {
  var client = await _mongodb.MongoClient.connect(url);
  var db = client.db('AIA');
  var cursor = db.collection('products').find({ id: { $in: idArr } });
  return cursor.toArray();
};

var buy = exports.buy = async function buy(idArr) {
  var client = await _mongodb.MongoClient.connect(url);
  var db = client.db('AIA');
  db.collection('products').deleteMany({ id: { $in: idArr } });
};