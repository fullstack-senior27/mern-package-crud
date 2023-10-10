const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Package = new Schema({
  name: {
    type: String
  },
  price: {
    type: Number
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  quantity: {
    type: Number
  },
  img: {
    path: String,
    filename: String,
    mimetype: String
  }  
});

module.exports = mongoose.model('Package', Package);