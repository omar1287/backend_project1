const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
  name: {type : String ,  required: true } , 
  description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CartSchema);
