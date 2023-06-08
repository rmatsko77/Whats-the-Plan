import React from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import { MdSettingsBackupRestore } from 'react-icons/md'

function FinishedTodo(props) {
    return (
        <div className="todo finished-todo">
            <h3>{props.title}</h3>
            <div className="icons">
                <MdSettingsBackupRestore className="icon" onClick={() => props.markDone(props.id)} />
                <IoTrashOutline className="icon" onClick={() => props.deleteTodo(props.id)} />
            </div>
        </div>
    )
}

export default FinishedTodo