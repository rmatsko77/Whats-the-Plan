import { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from './Todo';
import FinishedTodo from "./FinishedTodo.js";

function TodoList() {

    const [todos, setTodos] = useState([
        {
            title: 'Walk the dog',
            isDone: false,
            id: 77777,
        },
        {
            title: 'Get food',
            isDone: true,
            id: 55555
        }
    ]);

    const addToDo = todo => {
        if (!todo.title || /^\s*$/.test(todo.title)) {
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
            if (todo.id === id) {
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

    const setActive = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isActive = !todo.isActive
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    const unfinishedToDos = todos.filter(todo => !todo.isDone);
    const finishedToDos = todos.filter(todo => todo.isDone);

    const checkEmpty = (arr) => {
        if (!arr.length) {
            return 'empty'
        }
    }

    return (
        <div className="todo-list">
            <TodoForm onSubmit={addToDo} />
            <div className="todos unfinished-todos" id={checkEmpty(unfinishedToDos)}>
                {unfinishedToDos.map(todo => {
                    const title = todo.title
                    const notes = todo.notes
                    const dueDate = todo.dueDate
                    const dueTime = todo.dueTime
                    const isDone = todo.isDone
                    const id = todo.id
                    const isActive = todo.isActive
                    return (
                        <Todo
                            markDone={markDone}
                            deleteTodo={deleteTodo}
                            setActive={setActive}
                            id={id}
                            isDone={isDone}
                            title={title}
                            notes={notes}
                            dueDate={dueDate}
                            dueTime={dueTime}
                            isActive={isActive}
                        />
                    )
                })}
            </div>
            <div className="todos finished-todos" id={checkEmpty(finishedToDos)}>
                {finishedToDos.map(todo => {
                    const title = todo.title
                    const isDone = todo.isDone
                    const id = todo.id
                    const notes = todo.notes
                    const dueDate = todo.dueDate
                    const dueTime = todo.dueTime
                    return (
                        <FinishedTodo
                            markDone={markDone}
                            deleteTodo={deleteTodo}
                            id={id}
                            isDone={isDone}
                            title={title}
                            notes={notes}
                            dueDate={dueDate}
                            dueTime={dueTime}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default TodoList