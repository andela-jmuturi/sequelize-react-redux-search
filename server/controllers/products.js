const Product = require('../models').Product;
const Category = require('../models').Category;

const createProduct = (data) => Product
  .create(data)
  .then(product => product)
  .catch(error => {
    throw error;
  });

const productByIdWithCategories = (productId) => Product
  .findById(productId, {
    include: [{
      model: Category,
      as: 'categories',
      attributes: ['id', 'name'],
      through: {
        attributes: [],
      },
    }],
  })
  .then(product => product)
  .catch(error => {
    throw error;
  });

function create(req, res) {
  if (req.body.category) {
    return Category
      .findOne({ name: req.body.category })
      .then(category => {
        if (!category) {
          return res.status(404).send({
            message: 'Provided category does not exist',
          });
        }
        return createProduct({
          name: req.body.name,
          description: req.body.description,
        })
        .then(product => product
          .addCategory(category)
          .then(() =>
            productByIdWithCategories(product.id)
              .then(prod => res.status(201).send(prod))
          )
          .catch(error => res.status(400).send(error))
        )
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }

  return createProduct({
    name: req.body.name,
    description: req.body.description,
  })
  .then(product => res.status(201).send(product))
  .catch(error => res.status(400).send(error));
}

function list(req, res) {
  const filterText = req.query.filterText;
  const createQuery = (key) => ({
    [key]: {
      $iLike: `%${filterText}%`,
    },
  });

  return Product
    .findAll({
      where: {
        $or: [
          createQuery('name'),
          createQuery('description'),
        ],
      },
    })
    .then(products => res.status(200).send(products))
    .catch(error => res.status(400).send(error));
}

module.exports = {
  create,
  list,
};
