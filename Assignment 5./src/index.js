import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import { home, cart } from './views'
import { init, buy } from './db'

const port = 3000

init()
const app = express()

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())
app.use(session({ secret: "clothesapp" }))
app.use(express.static('public'))

app.get('/', async (req, res) => res.send(await home()))

app.get('/cart', async (req, res) => res.send(await cart(req.session.cart || [])))

app.post('/', async (req, res) => {
  const prod = parseInt(req.body.product)
  req.session.cart =  req.session.cart ? [...req.session.cart, prod] : [prod]
  res.send()
})

app.post('/cart', async (req, res) => {
  await buy(req.session.cart || [])
  req.session.cart = []
  res.send()
})

app.delete('/cart', async (req, res) => {
  console.log('1')
  const prod = parseInt(req.body.product)
  req.session.cart = req.session.cart.filter(p => p != prod)
  res.send()
})

app.listen(port, () => console.log(`ClothesApp listetning at http://localhost:${port}`))