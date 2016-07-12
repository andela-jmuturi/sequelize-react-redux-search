import path from 'path';
import sequelizeFixtures from 'sequelize-fixtures';
import models from '../../../server/models';

export const loadFixtures = () => sequelizeFixtures
  .loadFile(path.join(__dirname, 'fixtures.json'), models, {
    log: () => {}, // disable logging in when reading fixtures.
  })
  .then(() => Promise.resolve())
  .catch(error => Promise.reject(error));

export const deleteAllCategories = () =>
  models.Category
    .destroy({
      truncate: true,
      cascade: true,
      force: true,
    })
    .then(() => Promise.resolve())
    .catch(error => Promise.reject(error));

export const deleteAllProducts = () =>
  new Promise((resolve, reject) => models.Product
    .destroy({
      truncate: true,
      cascade: true,
      force: true,
    })
    .then(() => resolve())
    .catch(error => reject(error)));
