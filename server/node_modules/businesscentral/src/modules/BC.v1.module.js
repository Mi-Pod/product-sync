const { getBC, patchBC, postBC, deleteBC } = require("../api/BC.api");
const { getAccessToken } = require("../config/OAuth");

// Items: Item Cards
async function findItems(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `ItemCard`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}
async function getItemByNumber(item_no, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `ItemCard(no='${item_no}')`,
  };
  try {
    let res = await getBC(endpoint, {}, token);
    return res;
  } catch (error) {
    return error;
  }
}

// Items: Item Categories
async function findItemCategories(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `Item_Categories`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}

// Items: Item References
async function findItemReferenceEntries(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `ItemReferenceEntries`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}

// Items: Item Attributes
async function findItemAttributes(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `ItemAttributeMapping`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}

// Items: Sales Prices
async function findSalesPrices(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `Sales_Prices`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}

// Items: Quantity by Location
async function findQuantities(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `WHSQtyOnHand`,
  };

  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}

// Items: Assembly Bill-of-Materials (Assembly BOM)
async function findAssemblyBom(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `Assembly_BOM`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}
async function findBomParents(item_no, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `Assembly_BOM`,
  };
  const filter = {
    $filter: `No eq '${item_no}'`,
  };
  let record_set = new Set();

  try {
    let res = await getBC(endpoint, filter, token);
    for (let i = 0; i < res.value.length; i++) {
      record_set.add(res.value[i].Parent_Item_No);
    }

    return Array.from(record_set);
  } catch (error) {
    return error;
  }
}
async function findBomChildren(item_no, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `Assembly_BOM`,
  };
  const filter = {
    $filter: `Parent_Item_No eq '${item_no}'`,
  };

  let record_set = new Set();

  try {
    let res = await getBC(endpoint, filter, token);
    for (let i = 0; i < res.value.length; i++) {
      record_set.add(res.value[i].No);
    }
    return Array.from(record_set);
  } catch (error) {
    return error;
  }
}

// Customer Cards
async function findCustomerCards(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `CustomerCard`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}

// Customer: Shipping Addresses
async function findCustomerShipmentAddresses(
  filter = { $top: 10 },
  token = null
) {
  let endpoint = {
    api: "ODataV4",
    target: `CustShipmentAddresses`,
  };

  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}

// Customer: Contacts
async function findContacts(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `Contacts`,
  };

  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}

// Shopify: Products
async function findShopifyProducts(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `Shopify_Products`,
  };

  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}

// Shopify: Variants
async function findShopifyVariants(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `Shopify_Product_Variants_and_IV_Items`,
  };

  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}

async function createShopifyVariant(input, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `Shopify_Product_Variants_and_IV_Items`,
  };
  try {
    let res = await postBC(endpoint, input, token);
    return res;
  } catch (error) {
    return error;
  }
}

async function getShopifyVariant(item_no, price_group, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `Shopify_Product_Variants_and_IV_Items(Item_No='${item_no}',Price_Group='${price_group}')`,
  };
  try {
    let res = await getBC(endpoint, {}, token);
    return res;
  } catch (error) {
    return error;
  }
}

async function deleteShopifyVariant(
  item_no,
  price_group,
  etag = null,
  token = null
) {
  if (!token) {
    token = await getAccessToken();
  }
  let endpoint = {
    api: "ODataV4",
    target: `Shopify_Product_Variants_and_IV_Items(Item_No='${item_no}',Price_Group='${price_group}')`,
  };
  try {
    if (!etag) {
      let variant = await getBC(endpoint, {}, token);
      etag = variant["@odata.etag"];
    }
    let res = await deleteBC(endpoint, etag, token);
    return res;
  } catch (error) {
    return error;
  }
}

// Sales Orders
async function findSalesOrders(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `SalesOrder`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}
async function updateSalesOrder(order_no, input, token = null) {
  try {
    let filter = {
      $filter: `Document_Type eq 'Order' and No eq '${order_no}'`,
    };
    let orders = await getSalesOrders(filter);
    let etag = null;
    if (orders.length === 1) {
      etag = orders[0]["@odata.etag"];
    } else if (orders.length === 0) {
      console.log(`No Orders Found`);
      return false;
    }
    let endpoint = {
      api: "ODataV4",
      target: `SalesOrder(Document_Type='Order',No='${order_no}')`,
    };
    let res = await patchBC(endpoint, etag, input, token);
    return res;
  } catch (error) {
    return error;
  }
}
async function findSalesLines(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `SalesLines`,
  };

  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}

// Sales Shipments
async function findPostedSalesShipments(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `PostedSalesShipment`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}
async function findPostedSalesShipmentLines(
  filter = { $top: 10 },
  token = null
) {
  let endpoint = {
    api: "ODataV4",
    target: `PostedSalesShipmenLines`,
  };

  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}

// License Plates
async function findLicensePlates(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `LicensePlates`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}

// Sales Invoices
async function findPostedSalesInvoices(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `PostedSalesInvoice`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}
async function findPostedSalesInvoiceLines(
  filter = { $top: 10 },
  token = null
) {
  let endpoint = {
    api: "ODataV4",
    target: `PostedSalesInvoiceLines`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}

// Sales Document Queries - Order Sync
async function findQuerySalesLines(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `QuerySalesLines`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}
async function findSalesLineQuoteKeys(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `SalesLineQuoteKey`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}
async function findSalesHeaderQuery(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `SalesHeaderQuery`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}

// Zip Codes
async function findZipCodes(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `Zip_Codes`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}

// Avalara Transactions
async function findAvalaraTransactions(filter = { $top: 10 }, token = null) {
  let endpoint = {
    api: "ODataV4",
    target: `AvalaraTransactions`,
  };
  let record_set = new Set();

  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}

module.exports = {
  findItems,
  findQuantities,
  findSalesOrders,
  findSalesLines,
  updateSalesOrder,
  findLicensePlates,
  findItemCategories,
  findShopifyProducts,
  findShopifyVariants,
  createShopifyVariant,
  getShopifyVariant,
  deleteShopifyVariant,
  findItemReferenceEntries,
  findSalesPrices,
  findItemAttributes,
  findPostedSalesShipments,
  findPostedSalesShipmentLines,
  findCustomerCards,
  findPostedSalesInvoices,
  findPostedSalesInvoiceLines,
  findQuerySalesLines,
  findSalesLineQuoteKeys,
  findSalesHeaderQuery,
  findZipCodes,
  findAssemblyBom,
  findAvalaraTransactions,
  findCustomerShipmentAddresses,
  findContacts,
  findBomParents,
  findBomChildren,
  getItemByNumber,
};
