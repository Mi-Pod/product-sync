const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    item_category_code: {
      type: String,
    },
    item_category_description: {
      type: String,
    },
    blocked: {
      type: Boolean,
    },
    shopify_product_code: {
      type: String,
    },
    product_title: {
      type: String,
    },
    product_option_2_name: {
      type: String,
    },
    product_option_2_value: {
      type: String,
    },
    product_option_3_name: {
      type: String,
    },
    product_option_3_value: {
      type: String,
    },
    net_weight: {
      type: String,
    },
    unit_cost: {
      type: String,
    },
    send_item_to_B2B: {
      type: String,
    },
    send_item_to_B2C: {
      type: String,
    },
    send_item_to_VAP: {
      type: String,
    },
    B2B_product_id: {
      type: String,
    },
    B2C_product_id: {
      type: String,
    },
    VAP_product_id: {
      type: String,
    },
    available_inventory: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ItemCard = mongoose.model("items", ItemSchema);

module.exports = ItemCard;
