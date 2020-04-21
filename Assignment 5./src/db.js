import { MongoClient } from 'mongodb'

const url = "mongodb://localhost:27017/mydb"

export const init = async () => {
  const client = await MongoClient.connect(url)
  const db = client.db('AIA')
  if ((await db.collections()).length > 0) { 
    await db.collection('products').drop()
  }
  await db.createCollection('products')
  await db.collection('products').insertMany([
    {"id": 1, "name": "White T-Shirt"}, {"id": 2, "name": "Black Pants"}, {"id": 3, "name": "Green Jacket"}
  ])
}

export const getProducts = async () => {
  const client = await MongoClient.connect(url)
  const db = client.db('AIA')
  const cursor = db.collection('products').find()
  return cursor.toArray()
}

export const getProductsByCart = async (idArr) => {
  const client = await MongoClient.connect(url)
  const db = client.db('AIA')
  const cursor = db.collection('products').find({ id: {$in: idArr}})
  return cursor.toArray()
}

export const buy = async (idArr) => {
  const client = await MongoClient.connect(url)
  const db = client.db('AIA')
  db.collection('products').deleteMany({ id: {$in: idArr}})
}