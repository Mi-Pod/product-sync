const { getBC, patchBC, postBC, deleteBC } = require("../api/BC.api");
const { getAccessToken } = require("../config/OAuth");

// Endpoint Exploration
async function getEndpoints(api) {
  const endpoint = {
    api,
  };
  const endpoints = await getBC(endpoint);
  return endpoints.value;
}
async function listAllEndpoints() {
  const apis = [
    "Silverware/apiGroup/v1.0",
    "Silverware/SmartConnectQueries/v1.0",
    "v2.0",
  ];
  for (let api of apis) {
    console.log(`== API: ${api} ==`);
    const endpoints = await getEndpoints(api);
    for (let i = 0; i < endpoints.length; i++) {
      const { name, kind, url } = endpoints[i];
      console.log(`(${kind}) ${name}: ${url}`);
    }
  }
}

// Customers
async function getCustomers(params = { $top: 10 }, token = null) {
  const endpoint = {
    api: "v2.0",
    target: "customers",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
}
async function createCustomer(input, token = null) {
  const endpoint = {
    api: "v2.0",
    target: "customers",
  };
  try {
    const res = await postBC(endpoint, input, token);
    return { bc_customer: res.data, token };
  } catch (err) {
    return err;
  }
}
async function updateCustomer(customer_id, input, etag, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `customers(${customer_id})`,
  };
  try {
    const res = await patchBC(endpoint, etag, input, token);
    return res;
  } catch (error) {
    return error;
  }
}
async function updateCustomerCard(customer_no, input, token = null) {
  const endpoint = {
    api: "Silverware/apiGroup/v1.0",
    target: `customers(no='${customer_no}')`,
  };
  const customer = await getBC(endpoint, null, token);
  let etag = customer.data["@odata.etag"];

  try {
    const res = await putBC(endpoint, input, etag, token);
    return res.data;
  } catch (error) {
    return error;
  }
}
async function getCustomersWithFinancialDetail(
  params = { $top: 10 },
  token = null
) {
  const endpoint = {
    api: "v2.0",
    target: "customers?$expand=customerFinancialDetail",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
}
async function getCustomerByIdWithFinancialDetail(id, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `customers(${id})?$expand=customerFinancialDetail`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
}
async function getCustomerById(id, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `customers(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
}
async function deleteCustomerById(id, etag, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `customers(${id})`,
  };
  const res = await deleteBC(endpoint, etag, token);
  return res;
}
async function getCustomerMaps(params = { $top: 10 }, token = null) {
  const endpoint = {
    api: "Silverware/apiGroup/v1.0",
    target: "shopifyCustomerMaps",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
}
async function createCustomerMap(input, token = null) {
  const endpoint = {
    api: "Silverware/apiGroup/v1.0",
    target: "shopifyCustomerMaps",
  };
  const res = await postBC(endpoint, input, token);
  return res.data;
}
async function createDmsRecord(input, token = null) {
  const endpoint = {
    api: "Silverware/apiGroup/v1.0",
    target: "dmsCustomerOptions",
  };
  const res = await postBC(endpoint, input, token);
  return res.data;
}
async function createShipToAddress(input, token = null) {
  const endpoint = {
    api: "Silverware/apiGroup/v1.0",
    target: "shipToAddresses",
  };
  try {
    const res = await postBC(endpoint, input, token);
    return res.data;
  } catch (error) {
    return error;
  }
}
async function updateShipToAddress(customer_no, code, input, token = null) {
  const endpoint = {
    api: "Silverware/apiGroup/v1.0",
    target: `shipToAddresses(${customer_no},${code})`,
  };
  try {
    const res = await postBC(endpoint, input, token);
    return res.data;
  } catch (error) {
    return error;
  }
}

// Items
async function getItems(params = { $top: 10 }, token = null) {
  const endpoint = {
    api: "v2.0",
    target: "items",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
}
async function getItemCategories(params = { $top: 10 }, token = null) {
  const endpoint = {
    api: "v2.0",
    target: "itemCategories",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
}

// Sales Orders
async function getSalesOrders(params = { $top: 10 }, token = null) {
  const endpoint = {
    api: "v2.0",
    target: "salesOrders",
  };
  try {
    const res = await getBC(endpoint, params, token);
    return res.value;
  } catch (error) {
    return error;
  }
}
async function getSalesOrderById(id, token = null, params = { $top: 10 }) {
  const endpoint = {
    api: "v2.0",
    target: `salesOrders(${id})`,
  };
  try {
    const res = await getBC(endpoint, params, token);
    return res;
  } catch (error) {
    return error;
  }
}
async function getSalesHeaders(filter = {}, token = null) {
  const api = {
    api: "Silverware/apiGroup/v1.0",
    target: `salesHeaders`,
  };
  try {
    const res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
}
async function updateSalesOrderHeader(order_no, token = null, etag, input) {
  const api = {
    api: "Silverware/apiGroup/v1.0",
    target: `salesHeaders(documentType='Order',no='${order_no}')`,
  };
  try {
    const res = await patchBC(endpoint, input, etag, token);
    return res.data;
  } catch (error) {
    return error;
  }
}
async function createSalesOrder(input) {
  const token = await getAccessToken();
  const endpoint = {
    api: "v2.0",
    target: "salesOrders",
  };
  try {
    const res = await postBC(endpoint, input, token);
    return res.data;
  } catch (error) {
    return error;
  }
}
async function openOrder(order_no) {
  const token = await getAccessToken();
  const filter = {
    $filter: `no eq '${order_no}'`,
  };
  const sales_headers = await getSalesHeaders(filter, token);
  let etag = null;
  if (sales_headers.data && sales_headers.data.length > 0) {
    etag = sales_headers[0]["@odata.etag"];
  }
  const inputs = [
    {
      swcSVReleaseOrder: true,
    },
    {
      swcSVReleaseOrder: false,
    },
  ];
  for (let i = 0; i < inputs.length; i++) {
    await updateSalesOrderHeader(order_no, token, etag, inputs[i]);
    var delayInMilliseconds = 3000; //1 second

    setTimeout(function () {
      //your code to be executed after 1 second
    }, delayInMilliseconds);
  }
}
async function releaseOrder(order_no) {
  const token = await getAccessToken();
  const filter = {
    $filter: `no eq '${order_no}'`,
  };
  const sales_headers = await getSalesHeaders(filter, token);
  let etag = null;
  if (sales_headers.data && sales_headers.data.length > 0) {
    etag = sales_headers[0]["@odata.etag"];
  }
  const inputs = [
    {
      swcSVIGENCalced: true,
    },
    {
      swcSVReleaseOrder: true,
    },
  ];
  for (let i = 0; i < inputs.length; i++) {
    await updateSalesOrderHeader(order_no, token, etag, inputs[i]);
    var delayInMilliseconds = 3000; //1 second

    setTimeout(function () {
      //your code to be executed after 1 second
    }, delayInMilliseconds);
  }
}
async function getSalesLines(params = { $top: 10 }, token = null) {
  const endpoint = {
    api: "v2.0",
    target: "salesOrderLines",
  };
  try {
    const res = await getBC(endpoint, params, token);
    return res.value;
  } catch (error) {
    return error;
  }
}
async function getSalesLinesByOrderId(id, token = null, params = { $top: 10 }) {
  const endpoint = {
    api: "v2.0",
    target: `salesOrders(${id})/salesOrderLines`,
  };
  try {
    const res = await getBC(endpoint, params, token);
    return res.value;
  } catch (error) {
    return error;
  }
}
async function getSalesLineById(id, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `salesOrderLines(${id})`,
  };
  try {
    const res = await getBC(endpoint, {}, token);
    return res;
  } catch (error) {
    return error;
  }
}
async function updateSalesLine(line_id, input, etag, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `salesOrderLines(${line_id})`,
  };
  try {
    const res = await patchBC(endpoint, etag, input, token);
    return res.data;
  } catch (error) {
    return error;
  }
}
async function updateSalesOrderLine(order_no, line_no, input, token = null) {
  const endpoint = {
    api: "Silverware/apiGroup/v1.0",
    target: `salesLines(documentType='Order',documentNo='${order_no}',lineNo=${line_no})`,
  };
  const salesLine = await getBC(endpoint, null, token);
  let etag = salesLine.data["@odata.etag"];
  try {
    const res = await patchBC(endpoint, etag, input, token);
    return res;
  } catch (error) {
    return error;
  }
}

// Sales Invoices
async function getSalesInvoices(params = { $top: 10 }, token = null) {
  const endpoint = {
    api: "v2.0",
    target: "salesInvoices",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
}
async function getSalesInvoiceById(id, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `salesInvoices(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
}
async function getSalesInvoiceLinesById(
  id,
  token = null,
  params = { $top: 10 }
) {
  const endpoint = {
    api: "v2.0",
    target: `salesInvoices(${id})/salesInvoiceLines`,
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
}
async function getSalesInvoiceLineById(id, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `salesInvoiceLines(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
}

// Sales Quotes
async function getSalesQuotes(params = {}, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `salesQuotes`,
  };
  const res = await getBC(endpoint, params, token);

  return res.value;
}
async function getSalesQuoteById(id, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `salesQuotes(${id})`,
  };
  const res = await getBC(endpoint, params, token);

  return res;
}
async function createSalesQuote(input, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `salesQuotes`,
  };
  const res = await postBC(endpoint, input, token);

  return res;
}
async function updateSalesQuote(id, etag, input, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `salesQuotes(${id})`,
  };
  const res = await patchBC(endpoint, etag, input, token);

  return res;
}

// Sales Quote Lines
async function getSalesQuoteLinesBySalesQuoteId(id, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `salesQuotes(${id})/salesQuoteLines`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
}
async function getSalesQuoteLineById(id, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `salesQuoteLines(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
}
async function createSalesQuoteLine(input, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `salesQuoteLines`,
  };
  const res = await postBC(endpoint, input, token);
  return res;
}
async function updateSalesQuoteLine(id, etag, input, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `salesQuoteLines(${id})`,
  };
  const res = await patchBC(endpoint, etag, input, token);
  return res;
}

// Purchase Orders and Receipts
async function getPurchaseOrders(params = { $top: 10 }, token = null) {
  const endpoint = {
    api: "v2.0",
    target: "purchaseOrders",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
}
async function getPurchaseOrderById(id, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `purchaseOrders(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
}
async function getPurchaseOrderLinesById(
  id,
  token = null,
  params = { $top: 10 }
) {
  const endpoint = {
    api: "v2.0",
    target: `purchaseOrders(${id})/purchaseOrderLines`,
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
}

// Shipments
async function getSalesShipments(params = { $top: 10 }, token = null) {
  const endpoint = {
    api: "v2.0",
    target: "salesShipments",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
}
async function getSalesShipmentById(id, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `salesShipments(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
}
async function getSalesShipmentLines(params = { $top: 10 }, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `salesShipmentLines`,
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
}
async function getSalesShipmentLinesById(id, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `salesShipments(${id})/salesShipmentLines`,
  };
  const res = await getBC(endpoint, {}, token);
  return res.value;
}

// Vendors
async function getVendors(params = { $top: 10 }, token = null) {
  const endpoint = {
    api: "v2.0",
    target: "vendors",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
}
async function getVendorById(id, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `vendors(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
}

module.exports = {
  getEndpoints,
  listAllEndpoints,
  getCustomers,
  updateCustomer,
  updateCustomerCard,
  getCustomerById,
  deleteCustomerById,
  getCustomerMaps,
  createCustomerMap,
  createCustomer,
  createDmsRecord,
  getSalesOrders,
  getSalesHeaders,
  getSalesOrderById,
  createSalesOrder,
  openOrder,
  releaseOrder,
  getSalesLineById,
  getSalesLines,
  getSalesLinesByOrderId,
  updateSalesLine,
  updateSalesOrderLine,
  getItems,
  getItemCategories,
  getSalesInvoices,
  getSalesInvoiceById,
  getSalesInvoiceLinesById,
  getSalesInvoiceLineById,
  getCustomersWithFinancialDetail,
  getCustomerByIdWithFinancialDetail,
  getSalesShipments,
  getSalesShipmentById,
  getPurchaseOrders,
  getPurchaseOrderById,
  getPurchaseOrderLinesById,
  getSalesShipmentLines,
  getSalesShipmentLinesById,
  getVendors,
  getVendorById,
  createShipToAddress,
  updateShipToAddress,
  updateSalesOrderHeader,
  getSalesQuotes,
  getSalesQuoteById,
  createSalesQuote,
  updateSalesQuote,
  getSalesQuoteLinesBySalesQuoteId,
  getSalesQuoteLineById,
  createSalesQuoteLine,
  updateSalesQuoteLine,
};
