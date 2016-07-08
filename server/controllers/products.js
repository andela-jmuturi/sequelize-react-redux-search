const Product = require('../models').Product;
const Category = require('../models').Category;

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
        return Product
          .create({
            name: req.body.name,
            description: req.body.description,
          })
          .then(product => product
            .addCategory(category)
            .then(() => Product
              .findById(product.id, {
                include: [{
                  model: Category,
                  attributes: ['id', 'name'],
                }],
              })
              .then(prod => res.status(201).send(prod))
            )
            .catch(error => res.status(400).send(error))
          )
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }

  return Product
    .create({
      name: req.body.name,
      description: req.body.description,
    })
    .then(product => res.status(201).send(product))
    .catch(error => res.status(400).send(error));
}

module.exports = {
  create,
};
