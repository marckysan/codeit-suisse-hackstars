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

//
class GFG {
  V = 4;
  // implementation of Traveling Salesman Problem
  travllingSalesmanProblem(graph, s) {
    // store all vertex apart from source vertex
    var vertex = new Array();
    for (i; i < GFG.V; i++) {
      if (i != s) {
        (vertex.push(i) > 0);
      }
    }
    // store minimum weight Hamiltonian Cycle.
    var min_path = Number.MAX_VALUE;
    do {
      // store current Path weight(cost)
      var current_pathweight = 0;
      // compute current path weight
      var k = s;
      for (i; i < vertex.length; i++) {
        current_pathweight += graph[k][vertex[i]];
        k = vertex[i];
      }
      current_pathweight += graph[k][s];
      // update minimum
      min_path = Math.min(min_path, current_pathweight);
    } while (GFG.findNextPermutation(vertex));

    return min_path;
  }

  // Function to swap the data present in the left and right indices
  swap(data, left, right) {
    // Swap the data
    var temp = data[left];
    data[left] = data[right];
    data[right] = temp;
    // Return the updated array
    return data;
  }

  // Function to reverse the sub-array starting from left to the right, both inclusive
  reverse(data, left, right) {
    // Reverse the sub-array
    while (left < right) {
      var temp = data[left];
      data[left++] = data[right];
      data[right--] = temp;
    }
    return data;
  }
  // Function to find the next permutation of the given integer array
  findNextPermutation(data) {
    // If the given dataset is empty or contains only one element, next_permutation is not possible
    if (data.length <= 1) {
      return false;
    }
    var last = data.length - 2;
    // find the longest non-increasing suffix and find the pivot
    while (last >= 0) {
      if (data[last] < data[last + 1]) {
        break;
      }
      last--;
    }
    // If there is no increasing pair there is no higher order permutation
    if (last < 0) {
      return false;
    }
    var nextGreater = data.length - 1;
    // Find the rightmost successor to the pivot
    for (i; i > last; i--) {
      if (data[i] > data[last]) {
        nextGreater = i;
        break;
      }
    }
    // Swap the successor and the pivot
    data = GFG.swap(data, nextGreater, last);
    // Reverse the suffix
    data = GFG.reverse(data, last + 1, data.length - 1);

    return true;
  }

}