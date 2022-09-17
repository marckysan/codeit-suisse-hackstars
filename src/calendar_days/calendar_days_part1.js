const { dateFromDay } = require("../utils/utils.js");

exports.calendar_days_part1 = (numbers) => {
  const input = numbers[0];
  const inputItems = input.split(",");
  const year = inputItems[0];

  let output = ""
  let monthlyMap = new Map();
  let days = ['m', 't', 'w', 't', 'f', 's', 's'];

  for (let i = 1; i < inputItems.length; i++) {
    if (inputItems[i] <= 0 || inputItems[i] > 365) {
      continue;
    }

    let date = dateFromDay(year, inputItems[i]);
    let month = date.getMonth();
    let day = date.getDay();

    if (monthlyMap.has(month)) {
      monthlyMap.set(month, monthlyMap.get(month).add(day));
    } else {
      monthlyMap.set(month, new Set([day]));
    }
  }

  for (let i = 0; i < 12; i++) {
    let monthOutput = "       ,";
    let value = monthlyMap.get(i) || new Set();

    // days of the week
    for (let i = 0; i < 7; i++) {
      if (value.has(i)) {
        monthOutput = monthOutput.split('');
        let dayNumeric = i - 1;
        if (dayNumeric == -1) {
          dayNumeric = 6;
        }
        monthOutput[dayNumeric] = days[dayNumeric];
        monthOutput = monthOutput.join('');
      }
    };

    // special cases
    if (value.has(0) && value.has(1) && value.has(2) && value.has(3) && value.has(4) && value.has(5) && value.has(6)) {
      monthOutput = "alldays,";
    } else if (value.has(1) && value.has(2) && value.has(3) && value.has(4) && value.has(5) && !value.has(0) && !value.has(6)) {
      monthOutput = "weekday,";
    } else if (value.has(0) && value.has(6) && !value.has(1) && !value.has(2) && !value.has(3) && !value.has(4) && !value.has(5)) {
      monthOutput = "weekend,";
    }

    output += monthOutput;
  }

  return output;
};
