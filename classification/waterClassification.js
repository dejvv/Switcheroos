require("dotenv").config({ path: ".env" });
fs = require("fs");
const Jimp = require("jimp");
const {
  BBox,
  CRS_EPSG4326,
  MimeTypes,
  ApiType,
  WmsLayer,
} = require("@sentinel-hub/sentinelhub-js");

const { getToken } = require("./auth");

function runWaterClassification() {
  authToken = getToken();
  getImage();
}

/** Fetches the image from sentinel hub with predefined layer. */
async function getImage() {
  const layer = new WmsLayer({
    baseUrl: `https://services.sentinel-hub.com/ogc/wms/${process.env.LAYER_BASE_URL}`,
    layerId: process.env.LAYER_WATER_ID,
  });

  const [, , yButtom, xButtom, yTop, xTop] = process.argv;

  const bbox = new BBox(CRS_EPSG4326, yButtom, xButtom, yTop, xTop);
  const getMapParams = {
    bbox: bbox,
    fromTime: new Date(Date.UTC(2020, 01, 10)),
    toTime: new Date(Date.UTC(2020, 10, 10)),
    width: 1081,
    height: 1081,
    format: MimeTypes.PNG,
  };

  const imageBlob = await layer.getMap(getMapParams, ApiType.WMS, {
    authToken,
  });

  fs.writeFileSync("./water_raw.png", imageBlob, { encoding: null });

  clearImage();
}

/** Process the image, remove noise. */
function clearImage() {
  const [, , , , , , outputFileName] = process.argv;
  const safeOutputFileName = outputFileName
    ? outputFileName
    : "water_output.png";

  Jimp.read("water_raw.png").then((image) =>
    image
      .blur(15)
      .color([{ apply: "darken", params: [20] }])
      .contrast(1)
      .write(safeOutputFileName)
  );
}

module.exports = { runWaterClassification };
