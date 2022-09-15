const express = require("express");
const morganBody = require("morgan-body");
const { to_cumulative } = require("./src/ticker_stream/to_cumulative");
const {
  to_cumulative_delayed,
} = require("./src/ticker_stream/to_cumulative_delayed");
const PORT = process.env.PORT || 5000;

const app = express().use(express.json());
morganBody(app, { noColors: process.env.NODE_ENV === "production" });

app.post("/tickerStreamPart1", (req, res) => {
  const { stream } = req.body;
  const output = to_cumulative(stream);
  res.json(output);
});

app.post("/tickerStreamPart2", (req, res) => {
  const { stream, quantityBlock } = req.body;
  const output = to_cumulative_delayed(stream, quantityBlock);
  res.json(output);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
