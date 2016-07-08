const productsController = require('../controllers').productsController;
const categoryController = require('../controllers').categoryController;

module.exports = (app) => {
  const methodNotAllowed = (req, res) => res.status(405).send({
    message: 'Method Not Allowed.',
  });

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to our API!',
  }));

  // Product routes.
  app.post('/api/products', productsController.create);
  app.all('/api/products', methodNotAllowed);

  // Category routes.
  app.post('/api/category', categoryController.create);
  app.all('/api/category', methodNotAllowed);
};
