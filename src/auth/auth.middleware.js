const jwt = require('jsonwebtoken');
const { userModel } = require('./auth.model');

exports.authorization = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).send('Not authorized');
    }

    const user = await userModel.findById(payload.id);
    if (!user) {
      return res.status(401).send('Not authorized');
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
