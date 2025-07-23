import { useState, useEffect } from 'react';
import { todoService } from '../services/api';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await todoService.getTodos();
        setTodos(data);
      } catch (err) {
        setError(err.message || 'Failed to load todos');
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (newTodo) => {
    try {
      setError(null);
      const createdTodo = await todoService.createTodo(newTodo);
      setTodos((prev) => [...prev, createdTodo]);
    } catch (err) {
      setError(err.message || 'Failed to add todo');
      throw err; // Re-throw for form handling
    }
  };

  const toggleTodo = async (id) => {
    try {
      setError(null);
      // Optimistic update: Immediately update local state for instant UI feedback
      setTodos((prev) => {
        return prev.map((t) => {
          if (t._id === id) {
            return { ...t, completed: !t.completed }; // Toggle locally
          }
          return t;
        });
      });

      // Then sync with backend
      const todo = todos.find((t) => t._id === id);
      if (!todo) return;
      const updates = { completed: !todo.completed };
      const updatedTodo = await todoService.updateTodo(id, updates);
      console.log('Backend toggle response:', updatedTodo); // Log for debugging

      // Replace with backend version (in case of additional changes)
      setTodos((prev) => prev.map((t) => (t._id === id ? updatedTodo : t)));
    } catch (err) {
      console.error('Toggle failed:', err);
      setError(err.message || 'Failed to toggle todo');
      // Rollback optimistic update on error
      setTodos((prev) => {
        return prev.map((t) => {
          if (t._id === id) {
            return { ...t, completed: !t.completed }; // Revert
          }
          return t;
        });
      });
    }
  };

  const editTodo = async (id, newText) => {
    try {
      setError(null);
      const updatedTodo = await todoService.updateTodo(id, { text: newText });
      setTodos((prev) => prev.map((t) => (t._id === id ? updatedTodo : t)));
    } catch (err) {
      setError(err.message || 'Failed to edit todo');
    }
  };

  const updateNotes = async (id, newNotes) => {
    try {
      setError(null);
      const updatedTodo = await todoService.updateTodo(id, { notes: newNotes });
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

  return { todos, loading, error, addTodo, toggleTodo, editTodo, updateNotes, deleteTodo };
};
