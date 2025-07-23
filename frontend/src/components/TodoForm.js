import React, { useState, useRef, useEffect } from 'react';
import '../styles/TodoForm.css';

function TodoForm({ addTodo, loading }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalAnim, setModalAnim] = useState(false);
  const [text, setText] = useState('');
  const [notes, setNotes] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [notesError, setNotesError] = useState('');
  const [formError, setFormError] = useState(''); 
  const textRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setModalAnim(true), 10);
      textRef.current?.focus();
    } else {
      setModalAnim(false);
    }
  }, [isOpen]);

  const handleNotesChange = (e) => {
    const val = e.target.value;
    if (val.length > 400) {
      setNotesError('Notes cannot exceed 400 characters.');
    } else {
      setNotesError('');
    }
    setNotes(val);
  };

  const resetForm = () => {
    setText('');
    setNotes('');
    setDueDate('');
    setDueTime('');
    setPriority('Medium');
    setNotesError('');
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!text.trim()) {
      setFormError('Todo name is required.');
      return;
    }
    if (notes.length > 400) return;

    let dueDateTime = null;
    if (dueDate) {
      try {
        dueDateTime = new Date(dueTime ? `${dueDate}T${dueTime}` : dueDate);
        if (isNaN(dueDateTime.getTime())) dueDateTime = null;
      } catch {
        dueDateTime = null;
      }
    }

    const newTodo = {
      text: text.trim(),
      notes: notes.trim(),
      priority: priority || 'Medium',
      dueDate: dueDateTime,
    };

    try {
      await addTodo(newTodo);
      resetForm();
      setModalAnim(false);
      setTimeout(() => setIsOpen(false), 350);
    } catch (err) {
      setFormError('Failed to add todo. Please try again.');
    }
  };

  const closeModal = () => {
    setModalAnim(false);
    setTimeout(() => setIsOpen(false), 350);
  };

  return (
    <>
      <button className="add-todo-btn" onClick={() => setIsOpen(true)}>
        + Add Todo
      </button>

      {isOpen && (
        <div className={`modal-overlay`} onClick={closeModal}>
          <div
            className={`modal-content animated-modal${modalAnim ? ' show' : ''}`}
            onClick={(e) => e.stopPropagation()}
            role="dialog" // Added for test query
          >
            <h2 className="modal-title">Add New Todo</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <label htmlFor="todo-text" className="modal-label">
                Todo Name<span className="required">*</span>
              </label>
              <input
                id="todo-text"
                type="text"
                ref={textRef}
                value={text}
                maxLength={100}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter todo name"
                disabled={loading}
                required
                className="modal-input"
                autoComplete="off"
              />
              {formError && <div className="error-message">{formError}</div>} 

              <label htmlFor="todo-notes" className="modal-label">
                Notes (optional)
              </label>
              <textarea
                id="todo-notes"
                value={notes}
                onChange={handleNotesChange}
                placeholder="Enter notes (max 400 characters)"
                maxLength={400}
                rows={4}
                disabled={loading}
                className="modal-textarea"
              />
              <div className={`char-count${notes.length > 400 ? ' error' : ''}`}>{notes.length} / 400</div>
              {notesError && <div className="error-message">{notesError}</div>}

              <label htmlFor="priority" className="modal-label">Priority</label>
              <select
                id="priority" // Added id
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                disabled={loading}
                className="modal-select"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <label className="modal-label">Due Date</label>
              <div className="due-date-group">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  disabled={loading}
                  className="modal-input-due"
                  aria-label="Due date" // Added for test query
                />
                <input
                  type="time"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  disabled={loading}
                  className="modal-input-due"
                  aria-label="Due time" // Added for test query
                />
              </div>

              <div className="modal-actions">
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading || !text.trim() || notesError.length > 0}
                  data-testid="submit-button" // Added for test query
                >
                  {loading ? 'Adding...' : 'Add Todo'}
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => {
                    resetForm();
                    closeModal();
                  }}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoForm;
