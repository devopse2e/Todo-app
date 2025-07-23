const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  completed: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 400,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: false,
    default: null
  },
  // NEW: priority field added
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true,
    default: 'Medium'
  }
});

// Pre-hook to update updatedAt on each save
todoSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
