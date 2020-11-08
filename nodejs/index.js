require('dotenv').config({ path: '.env' });
fs = require('fs');
const Jimp = require("jimp");

const { BBox, CRS_EPSG4326, MimeTypes, ApiType, WmsLayer, requestAuthToken }  = require('@sentinel-hub/sentinelhub-js')

const clientId = process.env.CLIENT_ID
const clientSecret =  process.env.CLIENT_SECRET
var authToken

async function setToken(){
   authToken = await requestAuthToken(clientId, clientSecret);
}

const layer = new WmsLayer({
  baseUrl: `https://services.sentinel-hub.com/ogc/wms/${process.env.LAYER_BASE_URL}`,
  layerId: process.env.LAYER_ID,
});


const bbox = new BBox(CRS_EPSG4326,  14.395671, 45.978571,  14.627671, 46.140379);
const getMapParams = {
  bbox: bbox,
  fromTime: new Date(Date.UTC(2020, 01,10)),
  toTime: new Date(Date.UTC(2020, 10, 10)),
  width: 1081,
  height: 1081,
  format: MimeTypes.PNG,
};


async function getImage(){
  const imageBlob = await layer.getMap(getMapParams, ApiType.WMS, {authToken}).catch(err => console.log(err.message))

  fs.writeFileSync('./raw.png', imageBlob, { encoding: null });
  clearImage()
}

 function clearImage(){
  Jimp.read("raw.png").then((image) => image.blur(15)
  .color([{apply: 'darken', params: [20]}])
  .contrast(1)
  .write("output.png"))
}

setToken()
getImage()


