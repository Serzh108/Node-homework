exports.validateData = function validateData(shema) {
  return (req, res, next) => {
    const validationResult = shema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send({ message: 'missing required field' });
    }
    next();
  };
};
