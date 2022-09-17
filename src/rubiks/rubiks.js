const rotateClockwise = (face, north, south, east, west, state) => {
  console.log("INSIDE CLOCKWISE", face);
  if (face === "U") {
    console.log("INSIDE CLOCKWISE KEY U");
    const temp = JSON.parse(JSON.stringify(state));
    state[north][0] = temp[west][0];
    state[east][0] = temp[north][0];
    state[south][0] = temp[east][0];
    state[west][0] = temp[south][0];
  } else if (face === "D") {
    const temp = JSON.parse(JSON.stringify(state));
    state[west][2] = temp[north][2];
    state[north][2] = temp[east][2];
    state[east][2] = temp[south][2];
    state[south][2] = temp[west][2];
  } else if (face === "F" || face === "R" || face === "L" || face === "B") {
    const temp = JSON.parse(JSON.stringify(state));
    for (let j = 0; j < 3; j++) {
      state[west][j][2] = temp[south][0][j];
      state[north][2][j] = temp[west][j][2];
      state[east][j][0] = temp[north][2][j];
      state[south][0][j] = temp[east][j][0];
    }
  }

  console.log("AFTER PROCESS INSIDE CLOCKWISE", state);
  return state;
};

const rotateAntiClockwise = (face, north, south, east, west, state) => {
  console.log("INSIDE ANTI CLOCKWISE", face);
  if (face === "U") {
    const temp = JSON.parse(JSON.stringify(state));
    state[north][0] = temp[east][0];
    state[east][0] = temp[south][0];
    state[south][0] = temp[west][0];
    state[west][0] = temp[north][0];
  } else if (face === "D") {
    const temp = JSON.parse(JSON.stringify(state));
    state[north][2] = temp[west][2];
    state[east][2] = temp[north][2];
    state[south][2] = temp[east][2];
    state[west][2] = temp[south][2];
  } else if (face === "F" || face === "R" || face === "L" || face === "B") {
    const temp = JSON.parse(JSON.stringify(state));
    for (let j = 0; j < 3; j++) {
      state[west][j][2] = temp[north][2][j];
      state[south][0][j] = temp[west][j][2];
      state[east][j][0] = temp[south][0][j];
      state[north][2][j] = temp[east][j][0];
    }
  }
  console.log("AFTER PROCESS INSIDE ANTI CLOCKWISE", state);
  return state;
};

/**
 * Main Idea
 * 1. The operation face and the direct opposite face will not shift
 * 2. Everything else will have it's sets of 3 shift by 1 position
 * either up or down depending on whether it is clockwise or anticlockwise
 */
exports.rubiks = (ops, state) => {
  let output = state;
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] !== "i" && i < ops.length) {
      let north;
      let south;
      let east;
      let west;
      if (ops[i] === "U") {
        north = "b";
        south = "f";
        east = "r";
        west = "l";
      } else if (ops[i] === "L") {
        north = "u";
        south = "d";
        east = "f";
        west = "b";
      } else if (ops[i] === "F") {
        north = "u";
        south = "d";
        east = "r";
        west = "l";
      } else if (ops[i] === "R") {
        north = "u";
        south = "d";
        east = "b";
        west = "f";
      } else if (ops[i] === "B") {
        north = "u";
        south = "d";
        east = "l";
        west = "r";
      } else {
        north = "f";
        south = "b";
        east = "l";
        west = "r";
      }

      if (ops[i + 1] === "i") {
        output = rotateAntiClockwise(ops[i], north, south, east, west, output);
      } else {
        output = rotateClockwise(ops[i], north, south, east, west, output);
      }
    }
  }
  return output;
};
