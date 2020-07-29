require('../../config');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendTokenToEmail = async (req, res, next) => {
  const msg = {
    to: req.body.email,
    from: 'serzh108@gmail.com',
    subject: 'Confirm your registration on Node.js HW-06',
    text: 'Hi!!! and easy to do anywhere, even with Node.js(HW06)',
    html: `<a href="http://localhost:3000/auth/verify/${req.body.verificationToken}" terget="_blank">Click to confirm registration</a>`,
  };

  try {
    const result = await sgMail.send(msg);
  } catch (err) {
    err => console.log('err = ', err);
  }
};
