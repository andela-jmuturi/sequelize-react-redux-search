import { expect } from 'chai';

import app from '../../../app';
import supertest from 'supertest';
import { loadFixtures, deleteAllCategories } from '../helpers';

const request = supertest(app);

describe('Categories Controller', () => {
  beforeEach((done) => {
    loadFixtures().then(() => {
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  afterEach(done => {
    deleteAllCategories()
      .then(() => {
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('returns a list of categories', (done) => {
    request
      .get('/api/category')
      .end((err, response) => {
        expect(response.status).to.eql(200);
        expect(response.body).to.be.instanceOf(Array);

        const expected = ['test', 'electronics', 'food']; // from fixtures.
        const got = response.body.reduce((acc, cat) => [...acc, cat.name], []);

        expect(expected.sort()).to.eql(got.sort());
        done();
      });
  });

  it('creates a new category', (done) => {
    request
      .post('/api/category')
      .send({ name: 'cat1' })
      .end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body).to.have.property('name', 'cat1');
        done();
      });
  });

  it('fails to create duplicate categories', (done) => {
    request
      .post('/api/category')
      .send({ name: 'test' })
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.message).to.eql('name must be unique');
        done();
      });
  });
});
