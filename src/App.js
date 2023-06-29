import './App.css';
import React from 'react';
import TodoList from './Components/TodoList'
import SignIn from './Components/SignIn';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div className='app'>
      <h1>What's the plan?</h1>
      <Router>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/homepage' element={<TodoList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
