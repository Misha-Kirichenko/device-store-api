require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { conn } = require("./config");
const models = require("./models");

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());

const start = async () => {
  try {
    await conn.authenticate();
    await conn.sync();
    console.log(`Server started on port ${PORT}`);
  } catch (e) {
    console.log(e);
  }
};

start();
