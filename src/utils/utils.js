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

// travelling_suisse_robot
// currDirection: 1 = North, 2 = East, 3 = South, 4 = West
exports.path = (start, end, currDirection) => {
  let startRow = start[0];
  let startCol = start[1];
  let endRow = end[0];
  let endCol = end[1];

  let path = "";

  function setDirection(goal) {
    // set north
    if (goal == 1) {
      if (currDirection === 2) {
        path += "L";
      } else if (currDirection === 3) {
        path += "RR";
      } else if (currDirection === 4) {
        path += "R";
      }
      currDirection = 1;
    }
    // set east
    if (goal == 2) {
      if (currDirection === 1) {
        path += "R";
      } else if (currDirection === 3) {
        path += "L";
      } else if (currDirection === 4) {
        path += "RR";
      }
      currDirection = 2;
    }
    // set south
    if (goal == 3) {

      if (currDirection === 1) {
        path += "RR";
      } else if (currDirection === 2) {
        path += "R";
      } else if (currDirection === 4) {
        path += "L";
      }
      currDirection = 3;
    }
    // set west
    if (goal == 4) {
      if (currDirection === 1) {
        path += "L";
      } else if (currDirection === 2) {
        path += "RR";
      } else if (currDirection === 3) {
        path += "R";
      }
      currDirection = 4;
    }
  }

  // need to move up
  if (startRow > endRow) {
    setDirection(1);
    while (startRow !== endRow) {
      startRow--;
      path += "S";
    }
  }
  // need to move down
  if (startRow < endRow) {
    setDirection(3);
    while (startRow !== endRow) {
      startRow++;
      path += "S";
    }
  }
  // need to move left
  if (startCol > endCol) {
    setDirection(4);
    while (startCol !== endCol) {
      startCol--;
      path += "S";
    }
  }
  // need to move right
  if (startCol < endCol) {
    setDirection(2);
    while (startCol !== endCol) {
      startCol++;
      path += "S";
    }
  }

  return [currDirection, path += "P"];
};