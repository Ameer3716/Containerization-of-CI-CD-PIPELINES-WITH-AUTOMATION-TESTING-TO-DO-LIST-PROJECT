const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));
// In-memory storage for todos
let todos = [];

// Root route
app.get('/', (req, res) => {
  res.status(200).send('To-Do List API is running!');
});

// Add a task
app.post('/todos', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task field is required' });
  }
  const newTask = { id: todos.length + 1, task, completed: false };
  todos.push(newTask);
  res.status(201).json({ message: 'Task added', task: newTask });
});

// Get all tasks
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

// Delete a task
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = todos.findIndex(task => task.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  todos.splice(taskIndex, 1);
  res.status(200).json({ message: 'Task deleted' });
});

// Update a task (mark as completed)
app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const task = todos.find(task => task.id === parseInt(id));
  if (task) {
    task.completed = completed;
    res.status(200).json({ message: 'Task updated', task });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Start server if running standalone
if (require.main === module) {
  app.listen(3150, () => {
    console.log('Server running on port 3000');
  });
}

module.exports = app;
