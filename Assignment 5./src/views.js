import template from './template'
import { getProducts, getProductsByCart } from './db'


export const home = async () => {
  const products = await getProducts()
  const productsHTML = products.reduce((html, prod) => html + `
    <div class='product'>
      <p>${prod.name}</p>
      <button class='add' data-product='${prod.id}'>Add to cart</button>
    </div>
  `, '')
  return template(`<div class='row'>${productsHTML}</div><button class='to-cart'><a href='/cart'/>to cart &#10230;</a></button>`)
}

export const cart = async (cart) => {
  const products = await getProductsByCart(cart)
  const productsHTML = products.reduce((html, prod) => html + `
    <div class='product'>
      <p>${prod.name}</p>
      <button class='remove' data-product='${prod.id}'>Remove</button>
    </div>
  `, '')
  return template(`
    <div class='row'>
      ${productsHTML}
    </div>
    ${ cart.length ? `<button class='buy'>Buy now</button>` : ''}
    <button class='to-home'>
      <a href='/'>&#10229; to home</a>
    </button>
  `)
}