import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from './Todo';
import FinishedTodo from "./FinishedTodo.js";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc, setDoc, getDocs, collection, query, where, onSnapshot, updateDoc, QuerySnapshot } from "firebase/firestore";

function TodoList() {

    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                navigate('/')
            }
        })
    },)

    const addToDb = (toAdd) => {
        setDoc(doc(db, `/${auth.currentUser.email}`, `${toAdd.id}`), {
            todo: toAdd
        });
    }

    const deleteFromDb = (toDelete) => {
        deleteDoc(doc(db, `/${auth.currentUser.email}/${toDelete}`,));
    }

    useEffect(() => {
        const q = query(collection(db, `/${auth.currentUser.email}`));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArr = []
            querySnapshot.forEach((doc) => {
                todosArr.push({ ...doc.data(), id: doc.id })
            })
            setTodos(todosArr)
        })
        return () => unsubscribe
    }, [])

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate('/')
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const addToDo = async todo => {
        if (!todo.title || /^\s*$/.test(todo.title)) {
            return
        }

        addToDb(todo)
    };

    const markDone = async todo => {

        const todoRef = doc(db, `/${auth.currentUser.email}/${todo}`);
        const opp = todo.isDone
        console.log(todoRef)

        await updateDoc(todoRef, {
            'todo.isDone': true
        })

    }

    const markUndone = async todo => {

        const todoRef = doc(db, `/${auth.currentUser.email}/${todo}`);

        await updateDoc(todoRef, {
            'todo.isDone': false
        })

    }

    const deleteTodo = id => {
        deleteFromDb(id)

    }

    const setActive = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.todo.id === id) {
                todo.todo.isActive = !todo.todo.isActive
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    const unfinishedToDos = todos.filter(todos => !todos.todo.isDone);
    const finishedToDos = todos.filter(todos => todos.todo.isDone);

    const checkEmpty = (arr) => {
        if (!arr.length) {
            return 'empty'
        }
    }

    return (
        <div className="todo-list">
            <button className="sign-out" onClick={handleSignOut}>SignOut</button>
            <TodoForm onSubmit={addToDo} />
            <div className="todos unfinished-todos" id={checkEmpty(unfinishedToDos)}>
                {unfinishedToDos.map(todo => {
                    const title = todo.todo.title
                    const notes = todo.todo.notes
                    const dueDate = todo.todo.dueDate
                    const dueTime = todo.todo.dueTime
                    const isDone = todo.todo.isDone
                    const id = todo.todo.id
                    const isActive = todo.todo.isActive
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
                    const title = todo.todo.title
                    const isDone = todo.todo.isDone
                    const id = todo.todo.id
                    const notes = todo.todo.notes
                    const dueDate = todo.todo.dueDate
                    const dueTime = todo.todo.dueTime
                    return (
                        <FinishedTodo
                            markUndone={markUndone}
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