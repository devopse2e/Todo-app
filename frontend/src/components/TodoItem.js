// frontend/src/components/TodoItem.js

import React, { useState, useRef, useEffect } from 'react';
import '../styles/TodoItem.css';

const formatDateTime = (date) => {
  if (!date) return '';
  try {
    return new Date(date).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return '';
  }
};

function TodoItem({ todo, toggleTodo, editTodo, updateNotes, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [notesEditing, setNotesEditing] = useState(false);
  const [notesText, setNotesText] = useState(todo.notes || '');
  const [notesError, setNotesError] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // New: for timer and double click lockout
  const clickTimer = useRef(null);

  const nameInputRef = useRef(null);
  const notesInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) nameInputRef.current?.focus();
    if (notesEditing) notesInputRef.current?.focus();
  }, [isEditing, notesEditing]);

  const handleEdit = () => setIsEditing(true);

  const handleNameChange = (e) => setEditText(e.target.value);

  const saveName = async () => {
    if (editText.trim() && editText !== todo.text) await editTodo(todo._id, editText.trim());
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleNameKey = (e) => {
    if (e.key === 'Enter') saveName();
    if (e.key === 'Escape') setIsEditing(false);
  };

  const handleNotesClick = () => setNotesEditing(true);

  const handleNotesChange = (e) => {
    const val = e.target.value;
    setNotesText(val);
    setNotesError(val.length > 400 ? 'Notes cannot exceed 400 characters.' : '');
  };

  const saveNotes = async () => {
    if (notesText.length > 400) return;
    if (notesText.trim() !== (todo.notes || '')) await updateNotes(todo._id, notesText.trim());
    setNotesEditing(false);
    setNotesText(notesText.trim() || '');
  };

  const handleNotesKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveNotes();
    }
    if (e.key === 'Escape') {
      setNotesEditing(false);
      setNotesText(todo.notes || '');
    }
  };

  // Only handle single click: open popup if not confirmed as part of a double click
  const handleTitleClick = (e) => {
    // Clear any previous timer
    if (clickTimer.current) clearTimeout(clickTimer.current);
    // Wait 250ms to see if a double click is coming
    clickTimer.current = setTimeout(() => {
      setIsPopupOpen(true);
      clickTimer.current = null;
    }, 250);
  };

  // If a double click happens, cancel the popup open
  const handleTitleDoubleClick = (e) => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
    }
    // Do nothing else (no edit, no popup)
  };

  const closePopup = () => setIsPopupOpen(false);

  const badgeColors = {
    High: '#e04646',
    Medium: '#e09d00',
    Low: '#21b573',
  };

  const isDueSoon = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <>
      <div className={`todo-item-card ${todo.completed ? 'completed' : ''} ${isDueSoon ? 'overdue' : ''}`}>
        <div className="todo-toggle-wrap">
          <input
            type="checkbox"
            className="todo-toggle"
            checked={todo.completed}
            onChange={() => toggleTodo(todo._id)}
          />
          <span className="todo-toggle-custom" />
        </div>
        <div className="todo-main-col">
          <div className="todo-title-row">
            {isEditing ? (
              <input
                ref={nameInputRef}
                className="todo-inline-input"
                value={editText}
                onChange={handleNameChange}
                onKeyDown={handleNameKey}
                onBlur={saveName}
              />
            ) : (
              <span
                className="todo-item-title"
                onClick={handleTitleClick}
                onDoubleClick={handleTitleDoubleClick}
                style={{ cursor: 'pointer' }}
              >
                {todo.text}
              </span>
            )}
          </div>
          <div className="todo-notes-row">
            {notesEditing ? (
              <>
                <textarea
                  ref={notesInputRef}
                  className="todo-notes-input"
                  value={notesText}
                  onChange={handleNotesChange}
                  onKeyDown={handleNotesKey}
                  onBlur={saveNotes}
                  rows={3}
                />
                {notesError && <span className="notes-error">{notesError}</span>}
              </>
            ) : (
              <span
                className={`todo-notes-field ${!todo.notes ? 'placeholder' : ''}`}
                onClick={handleNotesClick}
              >
                {todo.notes || 'Add notes...'}
              </span>
            )}
          </div>
        </div>
        <div className="todo-right-col">
          <div className="right-status-row">
            <div className={`priority-pill priority-${todo.priority?.toLowerCase() || 'none'}`} style={{ background: badgeColors[todo.priority] }}>
              <span className="priority-text">{todo.priority || 'None'}</span>
            </div>
            <div className="todo-icons">
              <button className="todo-icon-btn" onClick={handleEdit}>✎</button>
              <button className="todo-icon-btn" onClick={() => deleteTodo(todo._id)}>🗑</button>
            </div>
          </div>
          <div className="todo-dates-fixed">
            <p className="todo-date-small">Added: <span className="date-val">{formatDateTime(todo.createdAt)}</span></p>
            {todo.dueDate && (
              <p className={`todo-date-small ${isDueSoon ? 'overdue' : ''}`}>
                Due: <span className="date-val">{formatDateTime(todo.dueDate)}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="todo-popup-overlay" onClick={closePopup}>
          <div className="todo-popup-card" onClick={(e) => e.stopPropagation()}>
            <span className="todo-popup-close" onClick={closePopup}>×</span>
            <h2 className="todo-popup-name">{todo.text}</h2>
            <div className="todo-popup-notes">
              <p
                className={`todo-popup-notes-text ${!todo.notes ? 'placeholder' : ''}`}
                style={{ margin: 0 }}
              >
                {todo.notes || 'No notes available'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoItem;
