const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:false
  },
  price:{
    type:String,
  },
  rating:{
    type:String
  },
  address:{
    type:String
  },
  image:{
    type:String
  }
});

const ItemModel = mongoose.model('Item', ItemSchema);

module.exports = ItemModel;
