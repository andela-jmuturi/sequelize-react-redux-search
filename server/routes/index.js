const productsController = require('../controllers').productsController;
const categoryController = require('../controllers').categoryController;
const requireFields = require('../middleware').requireFields;

module.exports = (app) => {
  const methodNotAllowed = (req, res) => res.status(405).send({
    message: 'Method Not Allowed.',
  });

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to our API!',
  }));

  // Product routes.
  app.post('/api/products', (req, res, next) =>
    requireFields(req, res, next, {
      requiredFields: ['name'],
    }), productsController.create);
  app.get('/api/products', productsController.list);
  app.all('/api/products', methodNotAllowed);

  // Category routes.
  app.post('/api/category', (req, res, next) =>
    requireFields(req, res, next, {
      requiredFields: ['name'],
    }), categoryController.create);
  app.get('/api/category', categoryController.list);
  app.all('/api/category', methodNotAllowed);
};
