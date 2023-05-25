import React, { useState } from 'react'

function TodoForm(props) {

  const [input, setInput] = useState('')

  const handleChange = e => {
    setInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      isDone: false
    });

    setInput('')
  }

  return (
    <form className='todo-form' for='form-input' onSubmit={handleSubmit}>
      <input 
        type='text' 
        value={input} 
        className='form-input' 
        id='form-input' 
        onChange={handleChange} />
      <button type='submit' className='form-button' id='form-input'>Add</button>
    </form>
  )
}

export default TodoForm