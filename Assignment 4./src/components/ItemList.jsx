import React from 'react'

import Item from './Item'
import EditableItem from './EditableItem'

const ItemList = ({ items, setItems }) => {

  const edit = (name) => () => {
    const item = items.find(item => item.name === name)
    setItems( [...items.filter(item => item.name !== name), {...item, editable: true}] )
  }
  
  const save = (name, data) => () => {
    const item = items.find(item => item.name === name)
    setItems( [...items.filter(item => item.name !== name), {...item, ...data, editable: false}] )
  }

  const remove = (name) => () => {
    setItems( [...items.filter(item => item.name !== name)] )
  }

  const add = () => setItems( [...items, {image: "", name: "", description: "", rating: 0, editable: true}] )

  return (
    <div className='item-list'>
      {
        items
          .sort((a,b) => a.name > b.name)
          .map((item, idx) => item.editable ? 
            <EditableItem key={idx} data={item} save={save}/>
            :
            <Item key={idx} data={item} edit={edit} remove={remove} />
          )
      }
      <div className='add'>
        <button onClick={add}>Add mountain</button>
      </div>
    </div>
  )
}

export default ItemList