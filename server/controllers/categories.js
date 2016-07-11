const Category = require('../models').Category;
const resolveErrors = require('../utils').resolveErrors;

function create(req, res) {
  return Category
    .create({
      name: req.body.name,
    })
    .then(category => res.status(201).send(category))
    .catch(error => resolveErrors(res, error));
}

function list(req, res) {
  return Category
    .all()
    .then(categories => res.status(200).send(categories))
    .catch(error => resolveErrors(res, error));
}

module.exports = {
  create,
  list,
};
