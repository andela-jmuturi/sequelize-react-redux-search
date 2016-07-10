const Category = require('../models').Category;

function create(req, res) {
  return Category
    .create({
      name: req.body.name,
    })
    .then(category => res.status(201).send(category))
    .catch(error => res.status(400).send(error));
}

function list(req, res) {
  return Category
    .all()
    .then(categories => res.status(200).send(categories))
    .catch(error => res.status(400).send(error));
}
module.exports = {
  create,
  list,
};
