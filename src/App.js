import './App.css';
import React from 'react';
import TodoList from './Components/TodoList'

function App() {
  return (
    <div className='app'>
      <h1>What's the plan?</h1>
      <TodoList />
    </div>
  );
}

export default App;
