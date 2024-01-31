const mongoose = require("mongoose");

const CanvasSchema = new mongoose.Schema({
    name: String,
    pixels: [[String]],
    location: {
      type: { type: String, default: 'Point' },
      coordinates: [Number]
    },
    visitors: Number
  });
  
// compile model from schema
module.exports = mongoose.model("canvas", CanvasSchema);