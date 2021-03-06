const { userModel } = require('./auth.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authRouter } = require('./auth.router');

const soltQuantity = 6;
// ================================================
exports.registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return res.status(409).send('Email in use');
    }

    const passwordHash = await bcrypt.hash(password, soltQuantity);

    const newUser = await userModel.create({ email, passwordHash });
    return res.status(201).send({ user: { email, subscription: 'free' } });
  } catch (err) {
    next(err);
  }
};
// ================================================
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const currentUser = await userModel.findOne({ email });
    if (!currentUser) {
      return res.status(401).send({ message: 'Email is wrong' });
    }

    const compareResult = await bcrypt.compare(
      password,
      currentUser.passwordHash,
    );

    if (compareResult) {
      const token = jwt.sign({ id: currentUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      const updatedContact = await userModel.findByIdAndUpdate(
        currentUser._id,
        { $set: { token: token } },
        { new: true },
      );

      return res.status(200).send({
        token,
        user: {
          email: currentUser.email,
          subscription: currentUser.subscription,
        },
      });
    } else {
      return res.status(401).send({ message: 'Password is wrong' });
    }
  } catch (err) {
    next(err);
  }
};
// ================================================
exports.getLoggedUser = (req, res) => {
  return res
    .status(200)
    .send({ email: req.user.email, subscription: req.user.subscription });
};
// ================================================
exports.logoutUser = async (req, res, next) => {
  try {
    const updatedContact = await userModel.findByIdAndUpdate(
      req.user._id,
      { $set: { token: null } },
      { new: true },
    );
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
// ================================================
exports.changeUsersSubscriptoin = async (req, res, next) => {
  try {
    console.log('req.user: ', req.user);
    const changeSubscription = await userModel.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true },
    );
    if (!changeSubscription) {
      return res.status(404).send({ message: 'Contact not found' });
    }
    return res.status(200).send(changeSubscription);
  } catch (err) {
    next(err);
  }
};
// ================================================
