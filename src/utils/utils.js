exports.sortTicks = (ticks) => {
  ticks.sort((a, b) => {
    const timestampA = a.split(",")[0];
    const tickerA = a.split(",")[1];
    const timestampB = b.split(",")[0];
    const tickerB = b.split(",")[1];
    if (timestampA === timestampB) {
      return tickerA < tickerB ? -1 : 1;
    } else {
      return timestampA < timestampB ? -1 : 1;
    }
  });
  return ticks;
};

exports.generateTickerMap = (sortedTicks) => {
  let tickerMap = {};
  sortedTicks.forEach((item) => {
    const itemTicker = item.split(",")[1];
    if (tickerMap[itemTicker] === undefined) {
      tickerMap[itemTicker] = {
        time: "00:00",
        cQuantity: 0,
        cNotional: 0.0,
      };
    }
  });
  return tickerMap;
};

// export default {
//   sortTicks,
//   generateTickerMap,
// };
