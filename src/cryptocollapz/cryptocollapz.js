maximum = (x) => {
  while (x % 4 !== 0) {
    if (x % 2 == 0) {
      x /= 2;
    } else {
      x = x * 3 + 1;
    }
  }
  return x;
};

exports.cryptocollapz = (input) => {
  output = input;
  //   output = [];
  //   for (let j = 0; j < input.length; j++) {
  //     x = input[j];
  //     outputInternal = [];
  //     for (let i = 0; i < x.length; i++) {
  //       let num = parseInt(x[i]);
  //       let v = maximum(num);
  //       // output.push(i);
  //       outputInternal.push(v);
  //     }
  //     output.push(outputInternal);
  //   }
  return output;
};
