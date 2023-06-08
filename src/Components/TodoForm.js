import React, { useState } from 'react'

function TodoForm(props) {

  const [input, setInput] = useState({
    title: '',
    notes: '',
    dueDate: '',
    dueTime: ''
  })

  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      title: input.title,
      notes: input.notes,
      dueDate: input.dueDate,
      dueTime: input.dueTime,
      isDone: false
    });

    setInput({
      title: '',
      notes: '',
      dueDate: '',
      dueTime: ''
    })
  }

  const openForm = () => {
    document.getElementsByClassName('todo-form')[0].style.display = 'block';
    document.getElementsByClassName('open-button')[0].style.display = 'none';
  }

  const closeForm = () => {
    document.getElementsByClassName('todo-form')[0].style.display = 'none';
    document.getElementsByClassName('open-button')[0].style.display = 'block';
  }

  return (
    <div className='form-container'>
      <button className='open-button' onClick={openForm}>Add to the Plan</button>
      <form className='todo-form' onSubmit={handleSubmit}>
        <button className='close-button' onClick={closeForm}>X</button>
        <label className='text-label' for='form-input'>Title</label>
        <input
          type='text'
          value={input.title}
          className='form-title'
          id='form-input'
          name='title'
          onChange={handleChange} /><br></br>
        <div className='notes'>
          <label for='notes'>Notes</label>
          <textarea
            className='form-notes'
            id='notes'
            name='notes'
            rows='4'
            cols='40'
            value={input.notes}
            onChange={handleChange} >
          </textarea>
        </div>
        <div className='form-due'>
          <label for='due'>Due:</label>
          <input
            type='date'
            className='due-date'
            id='due'
            name='dueDate'
            value={input.dueDate}
            onChange={handleChange} />
          <input
            type='time'
            className='due-time'
            id='due'
            name='dueTime'
            value={input.dueTime}
            onChange={handleChange} />
        </div>
        <button type='submit' className='form-button' id='form-input'>Add</button>
      </form>
    </div>
  )
}

export default TodoForm