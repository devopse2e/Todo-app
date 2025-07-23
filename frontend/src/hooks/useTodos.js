import { useState, useEffect } from 'react';
import { todoService } from '../services/api';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message || 'Failed to load todos');
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  // --- You MUST ensure addTodo, editTodo, updateNotes never send bad "dueDate" values

  const addTodo = async (todoInputObj) => {
    try {
      setError(null);
      const payload = { ...todoInputObj };
      // Clean up potentially empty string or invalid dueDate
      if (!payload.dueDate || (typeof payload.dueDate === 'string' && payload.dueDate.trim() === '')) {
        payload.dueDate = null;
      }
      const newTodo = await todoService.createTodo(payload);
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      setError(err.message || 'Failed to add todo');
    }
  };

  const toggleTodo = async (id) => {
    try {
      setError(null);
      const todo = todos.find((t) => t._id === id);
      if (!todo) return;
      const updates = { completed: !todo.completed };
      const updatedTodo = await todoService.updateTodo(id, updates);
      setTodos((prev) => prev.map((t) => (t._id === id ? updatedTodo : t)));
    } catch (err) {
      setError(err.message || 'Failed to toggle todo');
    }
  };

  const editTodo = async (id, newText) => {
    try {
      setError(null);
      const todo = todos.find((t) => t._id === id);
      if (!todo) return;
      const updates = { text: newText };
      const updatedTodo = await todoService.updateTodo(id, updates);
      setTodos((prev) => prev.map((t) => (t._id === id ? updatedTodo : t)));
    } catch (err) {
      setError(err.message || 'Failed to edit todo');
    }
  };

  const updateNotes = async (id, newNotes) => {
    try {
      setError(null);
      const todo = todos.find((t) => t._id === id);
      if (!todo) return;
      const updates = { notes: newNotes };
      const updatedTodo = await todoService.updateTodo(id, updates);
      setTodos((prev) => prev.map((t) => (t._id === id ? updatedTodo : t)));
    } catch (err) {
      setError(err.message || 'Failed to update notes');
    }
  };

  const deleteTodo = async (id) => {
    try {
      setError(null);
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete todo');
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return { todos, loading, error, addTodo, toggleTodo, editTodo, updateNotes, deleteTodo, refetchTodos: loadTodos };
};
