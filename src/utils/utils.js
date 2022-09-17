// ticker_stream
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

// calendar_days
exports.dateFromDay = (year, day) => {
  var date = new Date(year, 0); // initialize a date in `year-01-01`
  return new Date(date.setDate(day)); // add the number of days
}

exports.dayFromDate = (date) => {
  return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}