require("dotenv").config();
const express = require("express");
const { conn } = require("./config");
const cors = require("cors");

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());

const start = async () => {
  try {
    await conn.authenticate();
    console.log(`Server started on port ${PORT}`);
  } catch (e) {
    console.log(e);
  }
};

start();
