const ItemModel = require("../models/item.model");

exports.createItem = async (data) => await ItemModel.create(data);

exports.getItemById = async (id) => await ItemModel.findById(id);

exports.updateItem = async (id, data) => await ItemModel.findByIdAndUpdate(id, data, { new: true });

exports.deleteItem = async (id) => await ItemModel.findByIdAndDelete(id);

exports.getPaginatedItems = async (query = {}, page = 1, limit = 25) => {
  const skip = (page - 1) * limit;
  const items = await ItemModel.find(query).skip(skip).limit(limit);
  const total = await ItemModel.countDocuments(query);
  return { items, total, page, pageSize: limit };
};
