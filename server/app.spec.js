// const mongoose = require('mongoose');
const request = require('supertest');
const connectToDb = require('./database/connectToDb');
const app = require('./app');

describe('connects to database', () => {
  test('connectToDb function', () => {
    expect(typeof connectToDb).toBe('function');
  });
});

describe('get, create, update delete lists names', () => {
  beforeAll(async () => {
    await connectToDb();
  });
  test('/GET all the list names', (done) => {
    request(app)
      .get('/lists/all')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  test('/POST create a new todo list', (done) => {
    const listName = {
      name: 'groceries-test',
    };
    request(app)
      .post('/lists/create')
      .send(listName)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  test('/GET one list', (done) => {
    request(app)
      .get('/lists/groceries-test')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  test('/PUT update one list name', (done) => {
    const updatedListName = {
      name: 'shopping-test',
    };
    request(app)
      .put('/lists/groceries-test')
      .send(updatedListName)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  test('/DELETE delete one list name', (done) => {
    request(app)
      .delete('/lists/shopping-test')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('get, create, update, deletetasks', () => {
  beforeAll(async () => {
    const listForTest = {
      name: 'chores-test',
    };
    await request(app)
      .post('/lists/create')
      .send(listForTest);
  });
  afterAll(async () => {
    await request(app)
      .delete('/lists/chores-test');
  });
  test('/POST create a new task', (done) => {
    const task = {
      name: 'do laundry',
      listName: 'chores-test',
      done: false,
      type: 'main',
      related: '',
    };
    request(app)
      .post('/chores-test/create')
      .send(task)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  test('/GET all the tasks from one list', (done) => {
    request(app)
      .get('/chores-test/all')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  test('/GET one task', (done) => {
    request(app)
      .get('/chores-test/do laundry')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  test('/PUT update one list name', (done) => {
    const updatedTask = {
      name: 'iron clothes',
      listName: 'chores-test',
      done: false,
      type: 'main',
      related: '',
    };
    request(app)
      .put('/chores-test/do laundry')
      .send(updatedTask)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  test('/DELETE delete one list name', (done) => {
    request(app)
      .delete('/chores-test/iron clothes')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
