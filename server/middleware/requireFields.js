const requireFields = (req, res, next, options) => {
  const requiredFields = options.requiredFields;
  const errors = [];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!req.body[field]) {
      errors.push({
        [field]: 'This field is required.',
      });
    }
  }
  if (errors.length) {
    return res.status(400).send(errors);
  }
  return next();
};

module.exports = requireFields;
