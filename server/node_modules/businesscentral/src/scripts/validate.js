const { getAccessToken } = require("../config/OAuth");
const BC = require("../modules/BC.v1.module");
const BCv2 = require("../modules/BC.v2.module");

async function validate() {
  console.log(
    `== Initializing Validation for Business Central configuration ==`
  );

  let report = {
    OAuth: await testOAuth(),
    "BC Web Services": await testBCWebServices(),
    "BC V2 API": await testBCApi(),
    error: false,
  };

  if (
    report.OAuth !== "Connected succesfully" ||
    report["BC Web Services"] !== "Connected succesfully" ||
    report["BC V2 API"] !== "Connected succesfully"
  ) {
    report.error = true;
  }

  console.log(`\n=> Validation Report:`, report);
  if (report.error) {
    console.log(
      `business central package is not correctly configured, check environment variables.`
    );
  }
  return report;
}

async function testOAuth() {
  let result = "Not Connected";
  try {
    const token = await getAccessToken(null);
    if (!token) {
      console.error("- Issue generating token.");
      result = "Issue with Connection";
    } else {
      console.log(`- Token generated succesfully!`);
      result = "Connected succesfully";
    }
  } catch (error) {
    result = "Failed to Connect";
  }
  return result;
}
async function testBCApi() {
  let result = "Not Connected";
  try {
    const api = "v2.0";
    const response = await BCv2.getEndpoints(api);
    if (!response) {
      result = "Issue with Connection";
    } else {
      result = "Connected succesfully";
      console.log(`- BC V2 Endpoints:`, response.value.length);
    }
  } catch (error) {
    result = "Failed to Connect";
  }
  return result;
}
async function testBCWebServices() {
  let result = "Not Connected";
  try {
    const items = await BC.getItems();
    if (!items || items.length !== 10) {
      result = "Issue with Connection";
    } else {
      result = "Connected succesfully";
      console.log(`- Items retrieved:`, items.length);
    }
  } catch (error) {
    result = "Failed to Connect";
  }
  return result;
}

module.exports = {
  validate,
  testOAuth,
  testBCApi,
  testBCWebServices,
};
