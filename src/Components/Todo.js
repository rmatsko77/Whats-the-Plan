import React from 'react'
import { IoCheckboxOutline, IoTrashOutline } from 'react-icons/io5'
import { TbCalendarStats } from "react-icons/tb"

function Todo(props) {

    const id = props.id
    let notes = 'No notes added...'
    const dueDate = props.dueDate;
    const dueTime = props.dueTime;
    const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
    let dueMonth = ''
    let dueDay = ''
    let dueDateFormatted = ''
    let dueTimeFormatted = ''

    if (dueTime) {
        const hour = dueTime.slice(0, 2)
        const min = dueTime.slice(3)
        const numHour = Number(hour)
        let displayHour = numHour
        let amOrPm = 'AM'

        if (numHour === 0) {
            displayHour = 12
        }
        if (numHour > 12) {
            displayHour = numHour % 12
            amOrPm = 'PM'
        }
        if (numHour === 12) {
            amOrPm = 'PM'
        }


        dueTimeFormatted = `at ${displayHour}:${min} ${amOrPm}`


    }

    if (props.notes) {
        notes = props.notes
    }


    if (dueDate) {
        if (dueDate[5] === '0') {
            dueMonth = months[dueDate.slice(6, 7) - 1]
        }
        else {
            dueMonth = months[dueDate.slice(5, 7) - 1]
        }

        if (dueDate[8] === '0') {
            dueDay = dueDate.slice(9)
        }
        else {
            dueDay = dueDate.slice(8)
        }
        dueDateFormatted = `${dueMonth} ${dueDay}`
    }

    const toggleActive = () => {
        props.setActive(id)
    }

    const markDone = (e) => {
        props.markDone(id)
        e.stopPropagation()

        if (props.isActive) {
            props.setActive(id)
        }
    }

    const deleteTodo = (e) => {
        props.deleteTodo(id)
        e.stopPropagation()
    }

    const checkActive = () => {
        if (props.isActive) {
            return 'active'
        }
        if (!props.isActive) {
            return 'inactive'
        }
    }

    const className = `todo unfinished-todo ${checkActive()}`

    return (
        <div className={className} id={id} onClick={toggleActive}>
            <div className='top'>
                <div className="icons">
                    <IoCheckboxOutline id='check-icon' className="icon" onClick={markDone} />
                    <IoTrashOutline className="icon" onClick={deleteTodo} />
                </div>
                <p>{dueDate ? <TbCalendarStats className="due-icon" /> : ''}  {dueDateFormatted} {dueTimeFormatted}</p>
                <h3 id='title'>{props.title}</h3>
            </div>
            <div className='notes'>
                <p>{notes}</p>
            </div>
        </div>
    )
}

export default Todo