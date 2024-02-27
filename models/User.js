const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:false
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact:{
    type:Number,
    required:false
  },
  
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
