import { expect } from 'chai';
import supertest from 'supertest';

import app from '../../../app';
import {
  loadFixtures, deleteAllProducts, deleteAllCategories,
} from '../helpers';

const request = supertest(app);

describe('Products Controller', () => {
  beforeEach(done => {
    loadFixtures()
      .then(done)
      .catch(error => {
        done(new Error(error));
      });
  });

  afterEach(done => {
    deleteAllCategories()
      .then(() => {
        deleteAllProducts()
          .then(done)
          .catch(error => {
            done(new Error(error));
          });
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('returns a list of products', (done) => {
    request
      .get('/api/products')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body).to.be.instanceOf(Array).and.to.have.lengthOf(3);
        done();
      });
  });

  it('returns a list of products with associated categories', (done) => {
    request
      .get('/api/products')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body).to.be.instanceOf(Array).and.to.have.lengthOf(3);
        res.body.forEach(product => {
          expect(product).to.have.property('categories')
            .that.is.an('Array')
            .that.has.deep.property('[0]')
            .that.has.keys(['name', 'id']);
        });
        done();
      });
  });

  it('creates a new product', (done) => {
    request
      .post('/api/products')
      .send({
        name: 'tested product',
        description: 'tested product description',
      })
      .end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body).to.have.property('name', 'tested product');
        expect(res.body).to.have.property('description', 'tested product description');
        done();
      });
  });

  it('creates a new product with an associated category', (done) => {
    request
      .post('/api/products')
      .send({
        name: 'tested product',
        description: 'tested product description',
        category: 'test',
      })
      .end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body).to.have.property('name', 'tested product');
        expect(res.body).to.have.property('description', 'tested product description');
        expect(res.body).to.have.property('categories')
          .that.is.an('Array')
          .that.deep.equals([{ id: 123, name: 'test' }]);
        done();
      });
  });

  it('filters out products based on "any" search criteria', (done) => {
    request
      .get('/api/products?criteria=any&filterText=od')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body).to.be.instanceOf(Array)
          .and.to.have.lengthOf(2);

        const expectedNames = ['test product', 'spicy food'];
        const responseNames = res.body.reduce(
          (acc, prod) => [...acc, prod.name], []);
        expect(expectedNames.sort()).to.eql(responseNames.sort());
        done();
      });
  });

  it('filters out products based on "category" search criteria', (done) => {
    request
      .get('/api/products?criteria=category&filterText=phone')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body).to.be.instanceOf(Array)
          .and.to.have.lengthOf(0);
      });

    request
      .get('/api/products?criteria=category&filterText=electronics')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body).to.be.instanceOf(Array)
          .and.to.have.lengthOf(1);
        done();
      });
  });

  it('filters out products based on "product" search criteria', (done) => {
    request
      .get('/api/products?criteria=product&filterText=product')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body).to.be.instanceOf(Array)
          .and.to.have.lengthOf(1);

        expect(res.body[0].name).to.eql('test product');
        done();
      });
  });
});
