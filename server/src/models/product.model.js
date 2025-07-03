const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;
