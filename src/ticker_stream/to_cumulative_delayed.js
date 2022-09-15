const { sortTicks, generateTickerMap } = require("../utils/utils.js");

exports.to_cumulative_delayed = (ticks, quantity_block) => {
  // Sorting array
  const sortedTicks = sortTicks(ticks);
  const outputArray = [];
  const comma = ",";

  // Setting variables
  let outputString = "";
  let tickerMap = generateTickerMap(sortedTicks);

  for (let i = 0; i < sortedTicks.length; i++) {
    const item = sortedTicks[i];
    const tickDetails = item.split(",");
    const timeStamp = tickDetails[0];
    const tick = tickDetails[1];
    const quantity = parseInt(tickDetails[2]);
    const price = parseFloat(tickDetails[3]);

    // Reference the tick inside the tickerMap
    let tickerMapRef = tickerMap[tick];
    let newQuantity = 0;
    let newCNotional = 0.0;

    if (
      parseInt(tickerMapRef.cQuantity) + parseInt(quantity) <=
      quantity_block
    ) {
      // Handles the case of the sum of quantities being within the quantity block
      newQuantity = parseInt(tickerMapRef.cQuantity) + parseInt(quantity);
      newCNotional = tickerMapRef.cNotional + quantity * price;
    } else {
      // Handles the case of the sum of quantities exceeding the quantity block
      newQuantity = quantity_block;
      newCNotional =
        tickerMapRef.cNotional +
        (quantity_block - parseInt(tickerMapRef.cQuantity)) * price;
    }

    // Adds to the output if it meets the exact quantity block requirement
    if (newQuantity === quantity_block) {
      outputString =
        timeStamp +
        comma +
        tick +
        comma +
        newQuantity +
        comma +
        parseFloat(newCNotional).toFixed(1);
      outputArray.push(outputString);

      // Reset the tickermap reference to the specific ticker to prevent future double count or errors
      tickerMapRef = {
        time: "00:00",
        cQuantity: 0,
        cNotional: 0.0,
      };
      tickerMap[tick] = tickerMapRef;
    } else {
      tickerMapRef = {
        time: timeStamp,
        cQuantity: newQuantity,
        cNotional: newCNotional,
      };
      tickerMap[tick] = tickerMapRef;
    }
  }
  return outputArray;
};
