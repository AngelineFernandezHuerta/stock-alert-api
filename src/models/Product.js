const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  cantidad: {
    type: Number,
    required: true,
    min: 0,
  },
  umbralMinimo: {
    type: Number,
    required: true,
    min: 0,
  },
  estadoAlerta: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Product', productSchema);
