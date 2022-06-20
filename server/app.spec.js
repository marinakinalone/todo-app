const mongoose = require('mongoose');
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
  afterAll(async () => {
    await mongoose.disconnect();
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
