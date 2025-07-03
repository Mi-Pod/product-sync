const itemService = require("../services/item.service");
const { importData, exportData } = require("../utils/importExport.util");
const ItemModel = require("../models/item.model");
const { BC } = require("businesscentral");

exports.create = async (req, res) => {
  try {
    const item = await itemService.createItem(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await itemService.getItemById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await itemService.updateItem(req.params.id, req.body);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await itemService.deleteItem(req.params.id);
    if (!result) return res.status(404).json({ error: "Item not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.paginated = async (req, res) => {
  try {
    console.log("Getting items");
    const { page = 1, pageSize = 25, ...filters } = req.query;
    const result = await itemService.getPaginatedItems(
      filters,
      parseInt(page),
      parseInt(pageSize)
    );

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.importItems = async (req, res) => {
  try {
    const result = await importData(ItemModel, req.body);
    res.status(201).json({ inserted: result.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.exportItems = async (req, res) => {
  try {
    const data = await exportData(ItemModel);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.synchronizeItems = async (req, res) => {
  res.json("Request received to synchronize items.");

  (async () => {
    try {
      console.log("== Synchronizing Items from Business Central");
      let data_set = new Set();

      const top = 1000;
      let skip = 0;

      while (true) {
        let filter = req.filter ? req.filter : { $top: top, $skip: skip };

        const items = await BC.findItems(filter);

        skip += items.length;
        for (let i = 0; i < items.length; i++) {
          const {
            No,
            Description,
            SWC_SV_Collection_Item_No,
            SWC_SV_Collection_Description,
            SWC_SV_Shopify_Prod_Op2_Descr,
            SWC_SV_Shopify_Prod_Op2_Val,
            SWC_SV_Shopify_Prod_Op3_Descr,
            SWC_SV_Shopify_Prod_Op3_Val,
            Blocked,
            Type,
            Item_Category_Code,
            Item_Category_Description,
            Net_Weight,
            Unit_Cost,
            SWC_SV_Send_to_Shopify,
            SWC_SV_Send_to_Shopify2,
            SWC_SV_Send_to_Shopify3,
            SWC_SV_Collection_ID_B2B,
            SWC_SV_Collection_ID_B2C,
            SWC_SV_Collection_ID_VAPE,
          } = items[i];
          if (Type === "Inventory") {
            data_set.add({
              number: No,
              description: Description,
              item_category_code: Item_Category_Code,
              item_category_description: Item_Category_Description,
              blocked: Blocked,
              shopify_product_code: SWC_SV_Collection_Item_No,
              product_title: SWC_SV_Collection_Description,
              product_option_2_name: SWC_SV_Shopify_Prod_Op2_Descr,
              product_option_2_value: SWC_SV_Shopify_Prod_Op2_Val,
              product_option_3_name: SWC_SV_Shopify_Prod_Op3_Descr,
              product_option_3_value: SWC_SV_Shopify_Prod_Op3_Val,
              net_weight: Net_Weight,
              unit_cost: Unit_Cost,
              send_item_to_B2B: SWC_SV_Send_to_Shopify,
              send_item_to_B2C: SWC_SV_Send_to_Shopify2,
              send_item_to_VAP: SWC_SV_Send_to_Shopify3,
              B2B_product_id: SWC_SV_Collection_ID_B2B,
              B2C_product_id: SWC_SV_Collection_ID_B2C,
              VAP_product_id: SWC_SV_Collection_ID_VAPE,
            });
          }
        }
        if (items.length < top) {
          break;
        }
      }

      console.log("Total items synced:", data_set.size);
    } catch (error) {
      console.error(`Error synchronizing Items from Business Central:`, error);
    }
  })();
};
