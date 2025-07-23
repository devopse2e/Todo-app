const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { validateTodo, validateTodoUpdate } = require('../middleware/validation');

// GET /api/todos - Fetch all todos
router.get('/', todoController.getAllTodos);

// POST /api/todos - Create a new todo
router.post('/', validateTodo, todoController.createTodo);

// PUT /api/todos/:id - Update a todo
router.put('/:id', validateTodoUpdate, todoController.updateTodo);

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
