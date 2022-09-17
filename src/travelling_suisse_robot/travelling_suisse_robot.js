const e = require("express");
const { path } = require("../utils/utils.js");

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
    let output = "";
    let currDirection = 1; // start facing north
    output += path(map.get("X"), map.get("C"), currDirection)[1] // go to C
    currDirection = path(map.get("X"), map.get("C"), currDirection)[0]

    output += path(map.get("C"), map.get("O"), currDirection)[1] // go to O
    currDirection = path(map.get("C"), map.get("O"), currDirection)[0]

    output += path(map.get("O"), map.get("D"), currDirection)[1] // go to D
    currDirection = path(map.get("O"), map.get("D"), currDirection)[0]

    let prevNode = "";
    let currNode = "";
    let currPath = "";
    let newDirection = "";

    // go to E
    for (const [key, value] of map.entries()) {
        if (key.includes("E")) {
            let pathString = path(map.get("D"), map.get(key), currDirection)[1];
            if (pathString.length < currPath.length || currPath == "") {
                currNode = key;
                currPath = pathString
                newDirection = path(map.get("D"), map.get(key), currDirection)[0];
            }
        }
    }
    currDirection = newDirection;
    prevNode = currNode;
    output += currPath;
    currPath = "";

    // go to I
    for (const [key, value] of map.entries()) {
        if (key.includes("I")) {
            let pathString = path(map.get(prevNode), map.get(key), currDirection)[1];
            if (pathString.length < currPath.length || currPath == "") {
                currNode = key;
                currPath = pathString
                newDirection = path(map.get(prevNode), map.get(key), currDirection)[0];
            }
        }
    }
    currDirection = newDirection;
    prevNode = currNode;
    output += currPath;
    currPath = "";

    output += path(map.get(prevNode), map.get("T"), currDirection)[1] // go to T
    currDirection = path(map.get(prevNode), map.get("T"), currDirection)[0]

    // go to S
    for (const [key, value] of map.entries()) {
        if (key.includes("S")) {
            let pathString = path(map.get("T"), map.get(key), currDirection)[1];
            if (pathString.length < currPath.length || currPath == "") {
                currNode = key;
                currPath = pathString
                newDirection = path(map.get("T"), map.get(key), currDirection)[0];
            }
        }
    }
    currDirection = newDirection;
    prevNode = currNode;
    output += currPath;
    currPath = "";

    // go to U
    for (const [key, value] of map.entries()) {
        if (key.includes("U")) {
            let pathString = path(map.get(prevNode), map.get(key), currDirection)[1];
            if (pathString.length < currPath.length || currPath == "") {
                currNode = key;
                currPath = pathString
                newDirection = path(map.get(prevNode), map.get(key), currDirection)[0];
            }
        }
    }
    currDirection = newDirection;
    prevNode = currNode;
    output += currPath;
    currPath = "";

    // go to I
    for (const [key, value] of map.entries()) {
        if (key.includes("I")) {
            let pathString = path(map.get(prevNode), map.get(key), currDirection)[1];
            if (pathString.length < currPath.length || currPath == "") {
                currNode = key;
                currPath = pathString
                newDirection = path(map.get(prevNode), map.get(key), currDirection)[0];
            }
        }
    }
    currDirection = newDirection;
    prevNode = currNode;
    output += currPath;
    currPath = "";

    // go to S
    for (const [key, value] of map.entries()) {
        if (key.includes("S")) {
            let pathString = path(map.get(prevNode), map.get(key), currDirection)[1];
            if (pathString.length < currPath.length || currPath == "") {
                currNode = key;
                currPath = pathString
                newDirection = path(map.get(prevNode), map.get(key), currDirection)[0];
            }
        }
    }
    currDirection = newDirection;
    prevNode = currNode;
    output += currPath;
    currPath = "";

    // go to S
    for (const [key, value] of map.entries()) {
        if (key.includes("S")) {
            let pathString = path(map.get(prevNode), map.get(key), currDirection)[1];
            if (pathString.length < currPath.length || currPath == "") {
                currNode = key;
                currPath = pathString
                newDirection = path(map.get(prevNode), map.get(key), currDirection)[0];
            }
        }
    }
    currDirection = newDirection;
    prevNode = currNode;
    output += currPath;
    currPath = "";

    // go to E
    for (const [key, value] of map.entries()) {
        if (key.includes("E")) {
            let pathString = path(map.get(prevNode), map.get(key), currDirection)[1];
            if (pathString.length < currPath.length || currPath == "") {
                currNode = key;
                currPath = pathString
                newDirection = path(map.get(prevNode), map.get(key), currDirection)[0];
            }
        }
    }
    currDirection = newDirection;
    prevNode = currNode;
    output += currPath;
    currPath = "";

    return output;
}