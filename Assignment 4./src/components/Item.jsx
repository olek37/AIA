import React from 'react'

const Item = ({data, edit, remove}) => (
<div className='item'>
  <img alt="" src={data.image}/>
  <div className='box'>
    <h3>{data.name}</h3>
    <p>{data.description}</p>
    <button onClick={edit(data.name)}>Edit</button>
    <button onClick={remove(data.name)}>Remove</button>
  </div>
  <h4>{data.rating}/5</h4>
</div>
)

export default Item