exports.travelling_suisse_robot = (input) => {
    let inputItems = [...input];

    let graph = [];
    let row = [];

    // fill graph
    for (let i = 0; i < inputItems.length; i++) {
        if (inputItems[i] === "\\") {
            i++;
            graph.push(row);
            row = [];
            continue;
        }
        row.push(inputItems[i]);
    }
}