const apiBaseUrl = 'http://localhost:3150/todos';
const taskInput = document.getElementById('taskInput');
const todoList = document.getElementById('todoList');
const todoForm = document.getElementById('todoForm');

// Fetch and display all tasks
async function fetchTasks() {
  const res = await fetch(apiBaseUrl);
  const tasks = await res.json();

  todoList.innerHTML = '';
  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.textContent = task.task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(task.id);

    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
  });
}

// Add a new task
async function addTask(event) {
  event.preventDefault();
  const task = taskInput.value;

  await fetch(apiBaseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task }),
  });

  taskInput.value = '';
  fetchTasks();
}

// Delete a task
async function deleteTask(id) {
  await fetch(`${apiBaseUrl}/${id}`, { method: 'DELETE' });
  fetchTasks();
}

// Event listeners
todoForm.addEventListener('submit', addTask);
window.addEventListener('load', fetchTasks);
