import React from 'react'
import { useForm } from '../CustomHooks'

const EditableItem = ({data, save}) => {
  const {inputs, handleInputChange } = useForm()
  return (
  <div className='editable'>
    <div className='input-group'>
      <label htmlFor="image">Image source</label>
      <input name="image" type="text" value={inputs.image || data.image } onChange={handleInputChange} />
    </div>
    <div className='input-group'>
      <label htmlFor="name">Name</label>
      <input name="name" type="text" value={inputs.name || data.name } onChange={handleInputChange} />
    </div>
    <div className='input-group'>
      <label htmlFor="description">Description</label>
      <input name="description" type="text" value={inputs.description || data.description} onChange={handleInputChange} />
    </div>
    <div className='input-group'>
      <label htmlFor="rating">Rating (0-5)</label>
      <input name="rating" type="text" value={inputs.rating || data.rating} onChange={handleInputChange} />
    </div>
    <button onClick={save(data.name, inputs)}>Save</button>
  </div>
)}

export default EditableItem