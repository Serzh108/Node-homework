exports.validateData = function validateData(shema, reqParam = 'body') {
  return (req, res, next) => {
    console.log('req[reqParam] = ', req[reqParam]);
    const validationResult = shema.validate(req[reqParam]);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }
    next();
  };
};
