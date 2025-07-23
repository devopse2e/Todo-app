const Joi = require('joi');

const todoSchema = Joi.object({
  text: Joi.string().trim().min(1).max(100).required(),
  notes: Joi.string().max(400).allow('').optional(),
  completed: Joi.boolean().optional(),
  dueDate: Joi.date().allow(null).optional(),
  priority: Joi.string().valid('High', 'Medium', 'Low').default('Medium').required()
});

const todoUpdateSchema = Joi.object({
  text: Joi.string().trim().min(1).max(100).optional(),
  notes: Joi.string().max(400).allow('').optional(),
  completed: Joi.boolean().optional(),
  dueDate: Joi.date().allow(null).optional(),
  priority: Joi.string().valid('High', 'Medium', 'Low').optional()
}).min(1); // At least one field is required for update

const validateTodo = (req, res, next) => {
  const { error } = todoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: 'Validation failed', details: error.details[0].message });
  }
  next();
};

const validateTodoUpdate = (req, res, next) => {
  const { error } = todoUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: 'Validation failed', details: error.details[0].message });
  }
  next();
};

module.exports = {
  validateTodo,
  validateTodoUpdate
};
