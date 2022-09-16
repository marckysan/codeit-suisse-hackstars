const { sortTicks, generateTickerMap } = require("../utils/utils.js");

// exports.to_cumulative = (ticks) => {
//   // Sort the tickers alphabetically
//   sortedTicks = sortTicks(ticks);
//   const comma = ",";
//   let outputString = "";
//   let currentTick = "";
//   let currentTime = "";

//   // Replace the ticker price with the cumulative value and build the string
//   for (let i = 0; i < ticks.length; i++) {
//     const item = sortedTicks[i];
//     const tickDetails = item.split(",");
//     const timeStamp = tickDetails[0];
//     const tick = tickDetails[1];
//     const quantity = tickDetails[2];
//     const price = tickDetails[3];
//     const cNotional = quantity * price;

//     if (timeStamp !== currentTime) {
//       outputString +=
//         timeStamp + comma + tick + comma + quantity + comma + cNotional;
//       if (i < sortedTicks.length - 1) {
//         outputString += comma;
//       }
//     } else {
//       outputString += tick + comma + quantity + comma + cNotional;
//       if (i < sortedTicks.length - 1) {
//         outputString += comma;
//       }
//     }
//     currentTick = tick;
//     currentTime = timeStamp;
//   }

//   return [outputString];
// };

exports.to_cumulative = (ticks) => {
  // Sort the tickers alphabetically
  const sortedTicks = sortTicks(ticks);
  const comma = ",";

  // Setting variables
  let outputString = "";
  let currentTime = "";
  let tickerMap = generateTickerMap(sortedTicks);

  // Iterate through tickers and update tickerMap
  for (let i = 0; i < sortedTicks.length; i++) {
    const item = sortedTicks[i];
    const tickDetails = item.split(",");
    const timeStamp = tickDetails[0];
    const tick = tickDetails[1];
    const quantity = parseInt(tickDetails[2]);
    const price = parseFloat(tickDetails[3]);
    const cNotional = quantity * price;

    // Reference the tick inside the tickerMap
    let tickerMapRef = tickerMap[tick];
    let newQuantity = tickerMapRef.cQuantity;
    let newCNotional = tickerMapRef.cNotional;

    // Handle when timestamp changes
    if (timeStamp !== currentTime) {
      currentTime = timeStamp;
      outputString += currentTime;

      // Reset ticker map
      tickerMap = generateTickerMap(sortedTicks);

      let updateTickerRef = {
        time: timeStamp,
        cQuantity: quantity,
        cNotional: cNotional,
      };
      tickerMap[tick] = updateTickerRef;

      //   for (const [key] of Object.entries(tickerMap)) {
      //     outputString +=
      //       timeStamp +
      //       comma +
      //       key +
      //       comma +
      //       tickerMap[key].cQuantity +
      //       comma +
      //       tickerMap[key].cNotional;

      //     if (i < sortedTicks.length - 1) {
      //       outputString += comma;
      //     }
      //     let tickerMapRefNew = {
      //       time: timeStamp,
      //       cQuantity: 0,
      //       cNotional: 0.0,
      //     };

      //     tickerMap[key] = tickerMapRefNew;
      //   }
      //   let newTimeStampTickerRef = {
      //     time: timeStamp,
      //     cQuantity: newQuantity,
      //     cNotional: newCNotional,
      //   };
      //   tickerMap[tick] = newTimeStampTickerRef;
    } else {
      // Update the ticker ref
      let updateTickerRef = {
        time: timeStamp,
        cQuantity: newQuantity + quantity,
        cNotional: newCNotional + cNotional,
      };
      tickerMap[tick] = updateTickerRef;
    }

    // Add to output string if the timestamp is about to change, and if it is the last index
    if (
      i === sortedTicks.length - 1 ||
      (i < sortedTicks.length - 1 &&
        sortedTicks[i + 1].split(",")[0] !== timeStamp)
    ) {
      // Iterate and print, ignoring tickers that did not have an entry in the timestamp
      for (const [key] of Object.entries(tickerMap)) {
        if (
          tickerMap[key].cQuantity !== 0 &&
          tickerMap[key].cNotional !== 0.0
        ) {
          outputString +=
            comma +
            key +
            comma +
            tickerMap[key].cQuantity +
            comma +
            tickerMap[key].cNotional;
        }
      }
      if (i < sortedTicks.length - 1) {
        outputString += comma;
      }
    }
  }

  return [outputString];
};
