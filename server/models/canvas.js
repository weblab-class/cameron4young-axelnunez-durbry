const mongoose = require("mongoose");

const CanvasSchema = new mongoose.Schema({
    name: String,
    moderators: [String],
    pixels: [[String]],
    location: Object,
//     {
//       "type" : "Point",
//       "coordinates" : [ -73.9375, 40.8303 ]
//    }
    visitors: Number
  });
  
// compile model from schema
module.exports = mongoose.model("canvas", CanvasSchema);