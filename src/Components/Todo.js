import React from 'react'
import { IoCheckboxOutline, IoTrashOutline } from 'react-icons/io5'

function Todo(props) {

    const dueDate = props.dueDate;

    return (
        <div className="todo unfinished-todo">
            <h3>{props.title}</h3>
            <p>Due:{dueDate}{props.dueTime}</p>
            <div className="icons">
                <IoCheckboxOutline className="icon" onClick={() => props.markDone(props.id)} />
                <IoTrashOutline className="icon" onClick={() => props.deleteTodo(props.id)} />
            </div>
        </div>
    )
}

export default Todo