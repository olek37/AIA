const bookRow = (id) => `
  <div data-id="${id}" class="row">
    <div class="col-4">
      <input>
    </div>
    <div class="col-4">
      <input>
    </div>
    <div class="col-2 save">
      <p data-id="${id}" class="button">Save</p>
    </div>
    <div class="col-2 edit hidden">
      <p data-id="${id}" class="button">Edit</p>
    </div>
    <div class="col-2 remove">
      <p data-id="${id}" class="button">Remove</p>
    </div>
  </div>
`

let i = 0;
const addBookRow = () => document.getElementById("data").insertAdjacentHTML('beforeend', bookRow(i++))

const removeBookRow = (btn) => {
  const bookRow = document.querySelector(`.row[data-id="${btn.getAttribute("data-id")}"]`)
  bookRow.parentNode.removeChild(bookRow)
}

const saveBookRow = (btn) => {
  const bookRow = btn.parentNode.parentNode
  bookRow.querySelector('.save').classList.add('hidden')
  bookRow.querySelector('.edit').classList.remove('hidden');
  [...bookRow.getElementsByTagName('input')].forEach(el => el.disabled = true)
}

const editBookRow = (btn) => {
  const bookRow = btn.parentNode.parentNode
  bookRow.querySelector('.edit').classList.add('hidden')
  bookRow.querySelector('.save').classList.remove('hidden');
  [...bookRow.getElementsByTagName('input')].forEach(el => el.disabled = false)
}

const addClickHandler = (selector, fun) => document.addEventListener('click', event => {
  if (!event.target.matches(selector)) return
  fun(event.target)
}, false)

addClickHandler('.new .button', addBookRow)
addClickHandler('.edit .button', editBookRow)
addClickHandler('.save .button', saveBookRow)
addClickHandler('.remove .button', removeBookRow)
