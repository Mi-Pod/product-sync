// utils/importExport.util.js
exports.importData = async (Model, records = []) => {
  if (!Array.isArray(records)) throw new Error("Data must be an array.");
  return await Model.insertMany(records, { ordered: false });
};

exports.exportData = async (Model) => {
  return await Model.find().lean();
};
