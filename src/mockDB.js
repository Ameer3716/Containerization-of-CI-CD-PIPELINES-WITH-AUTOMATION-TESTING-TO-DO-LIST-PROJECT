const todos = [];

const addTodo = (task) => {
  const newTask = { id: todos.length + 1, task, completed: false };
  todos.push(newTask);
  return newTask;
};

const getTodos = () => todos;

const deleteTodo = (id) => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
  }
};

const updateTodo = (id, updates) => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    Object.assign(todo, updates);
    return todo;
  }
  return null;
};

module.exports = {
  addTodo,
  getTodos,
  deleteTodo,
  updateTodo
};
