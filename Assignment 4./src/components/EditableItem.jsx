import React from 'react'
import { useForm } from '../CustomHooks'

const EditableItem = ({data, save}) => {
  const {inputs, handleInputChange } = useForm()
  return (
  <div className='editable'>
    <div class='input-group'>
      <label for="image">Image source</label>
      <input name="image" type="text" value={inputs.image || data.image } onChange={handleInputChange} />
    </div>
    <div class='input-group'>
      <label for="name">Mountain name</label>
      <input name="name" type="text" value={inputs.name || data.name } onChange={handleInputChange} />
    </div>
    <div class='input-group'>
      <label for="description">Mountain description</label>
      <input name="description" type="text" value={inputs.description || data.description} onChange={handleInputChange} />
    </div>
    <div class='input-group'>
      <label for="rating">Mountain rating</label>
      <input name="rating" type="text" value={inputs.rating || data.rating} onChange={handleInputChange} />
    </div>
    <button onClick={save(data.name, inputs)}>Save</button>
  </div>
)}

export default EditableItem