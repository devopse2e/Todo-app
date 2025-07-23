import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import LoadingSpinner from './LoadingSpinner';
import '../styles/TodoList.css';

function TodoList() {
  const { todos, loading, error, addTodo, toggleTodo, editTodo, updateNotes, deleteTodo } = useTodos();
  const [isActiveCollapsed, setIsActiveCollapsed] = useState(false);
  const [isCompletedCollapsed, setIsCompletedCollapsed] = useState(false);

  // No priority grouping, just render all todos sorted by priority then createdAt
  const priorityRank = { High: 1, Medium: 2, Low: 3 };
  const sortedTodos = [...todos].sort((a, b) => {
    const aRank = priorityRank[a.priority] || 2;
    const bRank = priorityRank[b.priority] || 2;
    if (aRank !== bRank) return aRank - bRank;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const activeTodos = sortedTodos.filter(todo => !todo.completed);
  const completedTodos = sortedTodos.filter(todo => todo.completed);

  if (loading && todos.length === 0) return <LoadingSpinner />;

  return (
    <div className="todo-list-main">
      <TodoForm addTodo={addTodo} loading={loading} />
      {error && <div className="todo-error">{error}</div>}
      <div className="todo-section">
        <div
          className="todo-section-header"
          onClick={() => setIsActiveCollapsed(!isActiveCollapsed)}
        >
          <span>Active ({activeTodos.length})</span>
          <span className={`chevron ${isActiveCollapsed ? 'down' : 'up'}`}>
            {isActiveCollapsed ? '▼' : '▲'}
          </span>
        </div>
        {!isActiveCollapsed && (
          <div className="todo-section-body">
            {activeTodos.map(todo => (
              <TodoItem
                key={todo._id}
                todo={todo}
                toggleTodo={toggleTodo}
                editTodo={editTodo}
                updateNotes={updateNotes}
                deleteTodo={deleteTodo}
              />
            ))}
          </div>
        )}
      </div>
      <div className="todo-section">
        <div
          className="todo-section-header"
          onClick={() => setIsCompletedCollapsed(!isCompletedCollapsed)}
        >
          <span>Completed ({completedTodos.length})</span>
          <span className={`chevron ${isCompletedCollapsed ? 'down' : 'up'}`}>
            {isCompletedCollapsed ? '▼' : '▲'}
          </span>
        </div>
        {!isCompletedCollapsed && (
          <div className="todo-section-body">
            {completedTodos.map(todo => (
              <TodoItem
                key={todo._id}
                todo={todo}
                toggleTodo={toggleTodo}
                editTodo={editTodo}
                updateNotes={updateNotes}
                deleteTodo={deleteTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default TodoList;
