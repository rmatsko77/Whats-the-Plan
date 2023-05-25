import { useState } from "react";
import { IoCheckboxOutline, IoTrashOutline } from 'react-icons/io5'
import { MdSettingsBackupRestore } from 'react-icons/md'
import TodoForm from "./TodoForm";

function TodoList() {

    const [todos, setTodos] = useState([
        {
            text: 'Walk the dog',
            isDone: false,
            id: 77777
        },
        {
            text: 'Get food',
            isDone: true,
            id: 55555
        }
    ]);

    const addToDo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return
        }
        const newToDos = [
            ...todos,
            todo
        ]

        setTodos(newToDos)
    };

    const markDone = id => {
        let updatedTodos = todos.map(todo => {
            if(todo.id === id) {
                todo.isDone = !todo.isDone
            }
            return todo;
        });
        setTodos(updatedTodos)
    }

    const deleteTodo = id => {
        let updatedTodos = todos.filter(todo => todo.id !== id);

        setTodos(updatedTodos);
    }

    const unfinishedToDos = todos.filter(todo => !todo.isDone);
    const finishedToDos = todos.filter(todo => todo.isDone);

    const checkEmpty = (arr) => {
        if(!arr.length) {
            return 'empty'
        }
    }

    return (
        <div className="todo-list">
            <TodoForm onSubmit={addToDo}/>
            <div className="todos unfinished-todos"  id={checkEmpty(unfinishedToDos)}>
                <h2>Things To Do</h2>
                {unfinishedToDos.map(todo => {
                    return (
                        <div className="todo unfinished-todo">
                            <h3>{todo.text}</h3>
                            <div className="icons">
                                    <IoCheckboxOutline className="icon" onClick={() => markDone(todo.id)} />
                                    <IoTrashOutline className="icon" onClick={() => deleteTodo(todo.id)}/>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="todos finished-todos" id={checkEmpty(finishedToDos)}>
                {finishedToDos.map(todo => {
                    return (
                        <div className="todo finished-todo">
                            <h3>{todo.text}</h3>
                            <div className="icons">
                                    <MdSettingsBackupRestore className="icon" onClick={() => markDone(todo.id)} />
                                    <IoTrashOutline className="icon" onClick={() => deleteTodo(todo.id)}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TodoList