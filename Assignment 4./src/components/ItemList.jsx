import React from 'react'

import Item from './Item'
import EditableItem from './EditableItem'

import { useForm } from '../CustomHooks'

const ItemList = ({ items, setItems }) => {
  const {inputs, handleInputChange} = useForm({sort: 'name'})
  
  const edit = (name) => () => {
    const item = items.find(item => item.name === name)
    setItems( [...items.filter(item => item.name !== name), {...item, editable: true}] )
  }
  
  const save = (name, data) => () => {
    const item = items.find(item => item.name === name)
    const nextId = items.reduce((item, acc) => item.id > acc ? item.id : acc, 0) + 1
    setItems( [...items.filter(item => item.name !== name), {...item, ...data, editable: false, id: nextId}] )
  }

  const remove = (name) => () => {
    setItems( [...items.filter(item => item.name !== name)] )
  }

  const add = () => setItems( [...items, {image: "", name: "", description: "", rating: 0, editable: true}] )

  return (
    <div className='item-list'>
      <div className='options'>
        <label htmlFor='search'>Search:</label>
        <input name='search' value={ inputs.search || '' } onChange={ handleInputChange } />

        <label htmlFor='sort'>Sort by:</label>
        <select name='sort' value={inputs.sort} onChange={ handleInputChange } >
          {
            ['name', 'description', 'rating'].map(key => (
              <option key={key} value={key}>{key}</option>
            ))
          }
        </select>
      </div>
      {
        items
          .sort((a, b) => a[inputs.sort] > b[inputs.sort] ? -1 : 1)
          .filter(item => !inputs.search || 
            `${item.name + item.description}`
              .toUpperCase()
              .indexOf(inputs.search.toUpperCase()) !== -1
            )
          .map(item => item.editable ? 
            <EditableItem key={item.name + item.id} data={item} save={save}/>
            :
            <Item key={item.name + item.id} data={item} edit={edit} remove={remove} />
          )
          
      }
      <div className='add'>
        <button onClick={add}>Add mountain</button>
      </div>
    </div>
  )
}

export default ItemList