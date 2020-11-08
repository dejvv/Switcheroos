require("dotenv").config({ path: ".env" });
const { requestAuthToken } = require("@sentinel-hub/sentinelhub-js");

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

/** Gets auth token. */
async function getToken() {
  return await requestAuthToken(clientId, clientSecret);
}

module.exports = { getToken };
