const { sortTicks } = require("../utils/utils.js");

exports.to_cumulative = (ticks) => {
  // Sort the tickers alphabetically
  sortedTicks = sortTicks(ticks);
  const comma = ",";
  let outputString = "";
  let currentTick = "";
  let currentTime = "";

  // Replace the ticker price with the cumulative value and build the string
  for (let i = 0; i < ticks.length; i++) {
    const item = sortedTicks[i];
    const tickDetails = item.split(",");
    const timeStamp = tickDetails[0];
    const tick = tickDetails[1];
    const quantity = tickDetails[2];
    const price = tickDetails[3];
    const cNotional = quantity * price;

    if (timeStamp !== currentTime) {
      outputString +=
        timeStamp + comma + tick + comma + quantity + comma + cNotional;
      if (i < sortedTicks.length - 1) {
        outputString += comma;
      }
    } else {
      outputString += tick + comma + quantity + comma + cNotional;
      if (i < sortedTicks.length - 1) {
        outputString += comma;
      }
    }
    currentTick = tick;
    currentTime = timeStamp;
  }

  return [outputString];
};
