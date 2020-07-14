const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: value => value.includes('@'),
  },
  phone: { type: String, required: true },
  subscription: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: true },
});

userSchema.plugin(mongoosePaginate);

exports.userModel = mongoose.model('Contact', userSchema);
