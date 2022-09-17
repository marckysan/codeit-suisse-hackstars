const express = require("express");
const morganBody = require("morgan-body");
const PORT = process.env.PORT || 5000;

const app = express().use(express.json());
morganBody(app, { noColors: process.env.NODE_ENV === "production" });

// function imports
const { to_cumulative } = require("./src/ticker_stream/to_cumulative");
const { to_cumulative_delayed } = require("./src/ticker_stream/to_cumulative_delayed");
const { calendar_days_part1 } = require("./src/calendar_days/calendar_days_part1");
const { calendar_days_part2 } = require("./src/calendar_days/calendar_days_part2");
const { cryptocollapz } = require("./src/cryptocollapz/cryptocollapz");

app.get("/test/get", (req, res) => {
  res.send("Get Endpoint is working");
});

app.post("/test/post", (req, res) => {
  res.send("Post Endpoint is working");
});

// ticker_stream 
app.post("/tickerStreamPart1", (req, res) => {
  const { stream } = req.body;
  const output = to_cumulative(stream);
  const wrappedOutput = {
    output: output,
  };
  res.json(wrappedOutput);
});

app.post("/tickerStreamPart2", (req, res) => {
  const { stream, quantityBlock } = req.body;
  const output = to_cumulative_delayed(stream, quantityBlock);
  const wrappedOutput = {
    output: output,
  };
  res.json(wrappedOutput);
});

// cryptocollapz
app.post("/cryptocollapz", (req, res) => {
  const { input } = req.body;
  const output = cryptocollapz(input);
  const wrappedOutput = {
    output: output,

// calendar_days
app.post("/calendarDays", (req, res) => {
  const { numbers } = req.body;
  const outputPart1 = calendar_days_part1(numbers);
  const outputPart2 = calendar_days_part2(outputPart1);
  const wrappedOutput = {
    part1: outputPart1,
    part2: outputPart2
  };
  res.json(wrappedOutput);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));