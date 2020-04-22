import React, { useState } from 'react'
import './App.css'
import data from './items.json'

import ItemList from './components/ItemList'

const App = () => {
  const [items, setItems] = useState(data.map((item,idx) => ({ ...item, editable: false, id: idx })))
  return (
  <div className='container'>
    <h1>Mountains</h1>
    <ItemList items={items} setItems={setItems}/>
  </div>
  )
}

export default App