/**
 * Validate.js
 * Runs a series of tests, to display status of the configured package.
 * - Get OAuth Access Token
 * - Test BC v2 API
 * - Test BC Web Services API
 */

const Connection = require("./src/scripts/validate");
const BCv2 = require("./src/modules/BC.v2.module");
const BC = require("./src/modules/BC.v1.module");
const { getAccessToken } = require("./src/config/OAuth");


module.exports = { getAccessToken, Connection, BCv2, BC };
