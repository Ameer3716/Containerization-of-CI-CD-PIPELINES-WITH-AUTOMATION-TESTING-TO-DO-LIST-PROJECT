const { addTodo, getTodos, deleteTodo, updateTodo } = require('../src/mockDB');
const { allure } = require('jest-allure');
describe('Mock DB Operations', () => {
  let todos; // Declare todos here so that we can reset it correctly before each test

  beforeEach(() => {
    // Reset the todos array before each test
    todos = []; // Clear the array
  });

  it('should add a new todo', () => {
    const task = 'Test Task';
    const newTask = addTodo(task);

    expect(newTask).toHaveProperty('id');
    expect(newTask).toHaveProperty('task', task);
    expect(newTask.completed).toBe(false);
    expect(getTodos()).toContainEqual(newTask);
  });
  it('should delete a todo', () => {
    const task1 = addTodo('Task to delete');
    const taskId = task1.id;

    deleteTodo(taskId);

    const todosList = getTodos();
    expect(todosList).not.toContainEqual(task1); // Expect the todo to be removed
  });

  it('should update a todo', () => {
    const task1 = addTodo('Task to update');
    const taskId = task1.id;

    const updatedTask = updateTodo(taskId, { completed: true });

    expect(updatedTask.completed).toBe(true); // Expect the updated task to have completed: true
    expect(getTodos().find(todo => todo.id === taskId).completed).toBe(true); // Ensure the task is updated in the todos array
  });
});
