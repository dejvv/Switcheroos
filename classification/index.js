const { runWaterClassification } = require("./waterClassification");
const { runVegatationClassification } = require("./vegetationClassification");

function run() {
  const {
    CLIENT_ID,
    CLIENT_SECRET,
    LAYER_BASE_URL,
    LAYER_ID,
    LAYER_WATER_ID,
  } = process.env;

  if (
    !CLIENT_ID ||
    !CLIENT_SECRET ||
    !LAYER_BASE_URL ||
    !LAYER_ID ||
    !LAYER_WATER_ID
  ) {
    return console.log("Env constants missing!");
  }

  runWaterClassification();
  runVegatationClassification();
}
run();
