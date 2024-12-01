const request = require('supertest');
const app = require('../src/index');  // Import the app

let server;
let baseURL;

beforeAll((done) => {
  // Use a dynamic port assigned by the OS
  server = app.listen(0, () => {
    const port = server.address().port;  // Retrieve the dynamically assigned port
    baseURL = `http://localhost:${port}`;
    console.log(`Test server running on port ${port}`);
    done();
  });
});

afterAll((done) => {
  server.close(done);  // Close the server after tests
});
const { allure } = require('jest-allure');
describe('To-do List API Tests', () => {
  it('should add a new task', async () => {
    const res = await request(baseURL)
      .post('/todos')
      .send({ task: 'Test Task' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Task added');
    expect(res.body.task).toHaveProperty('id');
    expect(res.body.task).toHaveProperty('task', 'Test Task');
  });

  it('should retrieve tasks', async () => {
    const res = await request(baseURL).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should handle missing task field', async () => {
    const res = await request(baseURL)
      .post('/todos')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Task field is required');
  });

  it('should delete a task', async () => {
    // First, add a task
    const addRes = await request(baseURL)
      .post('/todos')
      .send({ task: 'Task to be deleted' });
    const taskId = addRes.body.task.id;

    // Then, delete the task
    const res = await request(baseURL).delete(`/todos/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task deleted');
  });

  it('should mark a task as completed', async () => {
    // First, add a task
    const addRes = await request(baseURL)
      .post('/todos')
      .send({ task: 'Task to be completed' });
    const taskId = addRes.body.task.id;

    // Then, update the task
    const res = await request(baseURL)
      .patch(`/todos/${taskId}`)
      .send({ completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task updated');
    expect(res.body.task.completed).toBe(true);
  });
});
