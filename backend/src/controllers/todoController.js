const Todo = require('../models/todoModel');

// Get all todos, most recent first
const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

// Create a new todo with priority
const createTodo = async (req, res, next) => {
  try {
    const { text, notes, dueDate, priority } = req.body;

    let dueDateValue = null;
    if (dueDate) {
      const parsed = new Date(dueDate);
      dueDateValue = isNaN(parsed.getTime()) ? null : parsed;
    }

    const todo = new Todo({
      text,
      notes: notes || '',
      dueDate: dueDateValue,
      priority: priority || 'Medium'
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

// Update an existing todo, supports priority update
const updateTodo = async (req, res, next) => {
  try {
    const { text, notes, completed, dueDate, priority } = req.body;
    const updates = {};
    if (text !== undefined) updates.text = text;
    if (completed !== undefined) updates.completed = completed;
    if (notes !== undefined) updates.notes = notes || '';
    if (dueDate !== undefined) {
      if (dueDate === null || dueDate === '') {
        updates.dueDate = null;
      } else {
        const parsed = new Date(dueDate);
        updates.dueDate = isNaN(parsed.getTime()) ? null : parsed;
      }
    }
    if (priority !== undefined) updates.priority = priority;

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

// Delete a todo by ID
const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
};
