const { getAccessToken } = require("../config/OAuth");
const https = require("https");
const { URL } = require("url");
require("dotenv").config();

function getCredentials(endpoint) {
  const environment = process.env.BC_ENVIRONMENT;
  const tenant = process.env.BC_TENANT;
  const company = process.env.BC_COMPANY;

  if (!tenant || !company || !environment) {
    throw new Error("Missing required environment variables.");
  }

  let url;
  if (endpoint.api === "ODataV4") {
    url = `https://api.businesscentral.dynamics.com/v2.0/${tenant}/${environment}/ODataV4`;
    if (endpoint.target) {
      url += `/Company('${company}')/${endpoint.target}`;
    }
  } else {
    url = `https://api.businesscentral.dynamics.com/v2.0/${tenant}/${environment}/api/${endpoint.api}`;
    if (endpoint.target) {
      url += `/companies(${company})/${endpoint.target}`;
    }
  }

  return { environment, tenant, company, url };
}

function buildUrlWithParams(baseUrl, queryParams = {}) {
  const url = new URL(baseUrl);
  for (const [key, value] of Object.entries(queryParams)) {
    url.searchParams.append(key, value);
  }
  return url;
}

function httpRequest({ method, url, headers, body }) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);

    const options = {
      method,
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      headers,
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve(data);
          }
        } else {
          reject(
            new Error(
              `HTTP ${res.statusCode}: ${res.statusMessage}\n${data}`
            )
          );
        }
      });
    });

    req.on("error", (err) => reject(err));

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

async function makeBCRequest(method, endpoint, data = {}, queryParams = {}, eTag = null, token = null) {
  try {
    const accessToken = await getAccessToken(token);
    const credentials = getCredentials(endpoint);
    const url = buildUrlWithParams(credentials.url, queryParams).toString();

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    if (eTag) headers["If-Match"] = eTag;

    const response = await httpRequest({
      method: method.toUpperCase(),
      url,
      headers,
      body: method !== "get" && method !== "delete" ? data : null,
    });

    return response;
  } catch (error) {
    console.error(
      `Error making Business Central API ${method.toUpperCase()} request:`,
      error.message
    );
    throw error;
  }
}

// Specific API Methods
async function getBC(endpoint, queryParams = {}, token = null) {
  return makeBCRequest("get", endpoint, {}, queryParams, null, token);
}

async function postBC(endpoint, data, token = null) {
  return makeBCRequest("post", endpoint, data, {}, null, token);
}

async function patchBC(endpoint, eTag, data, token = null) {
  return makeBCRequest("patch", endpoint, data, {}, eTag, token);
}

async function deleteBC(endpoint, eTag, token = null) {
  return makeBCRequest("delete", endpoint, {}, {}, eTag, token);
}

module.exports = {
  getBC,
  postBC,
  patchBC,
  deleteBC,
}; 