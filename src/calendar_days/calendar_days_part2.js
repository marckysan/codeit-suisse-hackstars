const { dayFromDate } = require("../utils/utils.js");

exports.calendar_days_part2 = (outputPart1) => {
    const newYear = 2001 + outputPart1.indexOf(' ');
    const inputItems = outputPart1.split(",");

    let outputList = [newYear];
    let days = ['m', 't', 'w', 't', 'f', 's', 's'];

    for (let i = 0; i < inputItems.length - 1; i++) {
        // get first day of month to use as starting date
        let firstDayOfMonth = new Date(newYear, i, 1);

        // add the ordinal dates for each case
        if (inputItems[i] === "alldays") {
            let dateToAdd = firstDayOfMonth;
            for (let i = 0; i < 7; i++) {
                outputList.push(dayFromDate(dateToAdd));
                dateToAdd.setDate(dateToAdd.getDate() + 1);
            }
        } else if (inputItems[i] === "weekday") {
            let dateToAdd = firstDayOfMonth;
            let count = 0;
            while (count < 5) {
                if (dateToAdd.getDay() !== 0 || dateToAdd.getDay() !== 6) {
                    count++;
                    outputList.push(dayFromDate(dateToAdd));
                }
                dateToAdd.setDate(dateToAdd.getDate() + 1);
            }
        } else if (inputItems[i] === "weekend") {
            let dateToAdd = firstDayOfMonth;
            let count = 0;
            while (count < 2) {
                if (dateToAdd.getDay() === 0 || dateToAdd.getDay() === 6) {
                    count++;
                    outputList.push(dayFromDate(dateToAdd));
                }
                dateToAdd.setDate(dateToAdd.getDate() + 1);
            }
        } else {
            let dateToAdd = firstDayOfMonth;
            let arr = [...inputItems[i]];

            // recalibrate to the first monday of month
            while (dateToAdd.getDay() !== 1) {
                dateToAdd.setDate(dateToAdd.getDate() + 1);
            }

            for (let i = 0; i < arr.length; i++) {
                if (arr[i] !== ' ') {
                    outputList.push(dayFromDate(dateToAdd));
                }
                dateToAdd.setDate(dateToAdd.getDate() + 1);
            }
        }
    }

    return outputList;
}
