const resolveErrors = (res, err, status = 400, message = null) => {
  if (message) {
    return res.status(status).send(message);
  }
  const validationErrors = [
    'SequelizeValidationError',
    'SequelizeUniqueConstraintError',
  ];

  if (validationErrors.indexOf(err.name) !== -1) {
    const errors = err.errors
      .map(error => ({ message: error.message }))
      .reduce((obj, element) => {
        Object.keys(element).forEach(key => {
          obj[key] = element[key]; // eslint-disable-line no-param-reassign
        });
        return obj;
      }, {});

    return res.status(status).send(errors);
  }

  return res.status(status || 500).send(err);
};

module.exports = resolveErrors;
