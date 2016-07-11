const Product = require('../models').Product;
const Category = require('../models').Category;
const resolveErrors = require('../utils').resolveErrors;

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
      .findOne({
        where: {
          name: req.body.category,
        },
      })
      .then(category => {
        if (!category) {
          return resolveErrors(res, null, 404, {
            category: 'Provided category does not exist',
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
          .catch(error => resolveErrors(res, error))
        )
        .catch(error => resolveErrors(res, error));
      })
      .catch(error => resolveErrors(res, error));
  }

  return createProduct({
    name: req.body.name,
    description: req.body.description,
  })
  .then(product => res.status(201).send(product))
  .catch(error => resolveErrors(res, error));
}

const prepareQuery = ({ filterText = '', criteria = 'any' }) => {
  const createQuery = (key) => ({
    [key]: {
      $iLike: `%${filterText}%`,
    },
  });

  const includeQuery = [{
    model: Category,
    as: 'categories',
    attributes: ['id', 'name'],
    through: {
      attributes: [],
    },
  }];

  let query;
  if (criteria) {
    if (criteria === 'any') {
      query = {
        where: {
          $or: [
            createQuery('name'),
            createQuery('description'),
            createQuery('$categories.name$'),
          ],
        },
        include: includeQuery,
      };
    } else if (criteria === 'product') {
      query = {
        where: {
          $or: [
            createQuery('name'),
            createQuery('description'),
          ],
        },
        include: includeQuery,
      };
    } else if (criteria === 'category') {
      query = {
        where: {
          $or: [
            createQuery('$categories.name$'),
          ],
        },
        include: includeQuery,
      };
    }
  }

  return query;
};

function list(req, res) {
  return Product
    .findAll(prepareQuery(req.query))
    .then(products => res.status(200).send(products))
    .catch(error => resolveErrors(res, error));
}

module.exports = {
  create,
  list,
};
