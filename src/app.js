const cors = require("cors");
const express = require("express");

const app = express();

const accessControl = function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PUT, PATCH");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

app.use(express.json());

app.use(cors());

app.use(accessControl);

app.get("/", function (_req, res) {
  return res.status(200).json({ message: "OK"});
});

module.exports = app;
