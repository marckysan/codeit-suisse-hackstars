const e = require("express");
const { shortestPath } = require("../utils/utils.js");

exports.travelling_suisse_robot = (input) => {
    let inputItems = [...input];

    let graph = [];
    let row = [];
    let map = new Map();

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

    // fill Map
    for (let row = 0; row < graph.length; row++) {
        for (let col = 0; col < graph[row].length; col++) {
            let element = graph[row][col];

            if (element !== "\\" && element !== "n" && element !== " ") {
                if (!map.has(element)) {
                    map.set(element, [row, col])
                } else {
                    map.set(element + row + col, [row, col]) // duplicate characters
                }
            }
        }
    }

    // find path

    console.log(map)
}