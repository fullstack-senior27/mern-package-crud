const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Package = new Schema({
  package_name: {
    type: String
  },
  package_price: {
    type: Number
  },
  package_description: {
    type: String
  },
  package_category: {
    type: String
  },
  package_quantity: {
    type: Number
  }
});

module.exports = mongoose.model('Package', Package);