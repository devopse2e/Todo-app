import React from 'react';
import TodoList from './components/TodoList';
import './styles/App.css';

function App() {
  return (
    <div className="main-bg">
      <div className="todo-card">
        <header className="todo-header">
          <span className="todo-emoji" role="img" aria-label="Todo icon">📝</span>
          <h1>Todo App</h1>
          <p>Stay organized and productive</p>
        </header>
        <TodoList />
        <footer className="todo-footer">
          Built with React & Node.js
        </footer>
      </div>
    </div>
  );
}

export default App;
