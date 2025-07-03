require('dotenv').config();
const https = require('https');

let cachedToken = null;
let tokenExpiry = null;

/**
 * Retrieve Credentials from local environment variables, and throw errors if any are undefined.
 * @returns {oauth_client, oauth_secret, tenant} - Credentials used to obtain OAuth Access Token
 */
function retreiveOAuthCredentials() {
  const oauth_client = process.env.OAUTH_CLIENT;
  if (!oauth_client) {
    throw new Error("No value set for OAuth Client Variable: OAUTH_CLIENT");
  }
  const oauth_secret = process.env.OAUTH_SECRET;
  if (!oauth_secret) {
    throw new Error("No value set for OAuth Secret Variable: OAUTH_SECRET");
  }
  const tenant = process.env.BC_TENANT;
  if (!tenant) {
    throw new Error("No value set for Tenant Variable: BC_TENANT");
  }
  return { oauth_client, oauth_secret, tenant };
}

/**
 * Primary method of token generation. Uses environment variables to establish a connection.
 * @returns {Promise<string|null>} - Access Token
 */
async function OAuth() {
  if (cachedToken && tokenExpiry && new Date() < tokenExpiry) {
    return cachedToken;
  }

  let credentials = false;
  try {
    credentials = retreiveOAuthCredentials();
  } catch (err) {
    console.error(err);
    return null;
  }

  const { oauth_client, oauth_secret, tenant } = credentials;

  const tokenEndpoint = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`;

  const requestBody = new URLSearchParams({
    client_id: oauth_client,
    client_secret: oauth_secret,
    scope: "https://api.businesscentral.dynamics.com/.default",
    grant_type: "client_credentials",
  }).toString();

  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(tokenEndpoint, options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const parsedData = JSON.parse(data);

          if (res.statusCode >= 200 && res.statusCode < 300) {
            const accessToken = parsedData.access_token;
            const expiresIn = parsedData.expires_in;

            cachedToken = accessToken;
            tokenExpiry = new Date(new Date().getTime() + expiresIn * 1000);
            resolve(accessToken);
          } else {
            console.error("Error retrieving Microsoft OAuth token:", parsedData.error_description || parsedData.error);
            resolve(null);
          }
        } catch (err) {
          console.error("Error parsing token response:", err);
          resolve(null);
        }
      });
    });

    req.on("error", (err) => {
      console.error("Error during token request:", err);
      resolve(null);
    });

    req.write(requestBody);
    req.end();
  });
}

/**
 * Retrieve an OAuth access token, using the provided token if available.
 * @param {string|null} providedToken - Optional access token to use.
 * @returns {Promise<string>} - The OAuth access token.
 */
async function getAccessToken(providedToken) {
  if (providedToken) return providedToken;

  const accessToken = await OAuth();
  if (!accessToken) {
    throw new Error("No access token available");
  }
  return accessToken;
}

module.exports = { getAccessToken };
