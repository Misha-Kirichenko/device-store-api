require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { conn } = require("./config");
const models = require("./models");
const router = require("./routes");

const { PORT } = process.env;
const app = express();

const start = async () => {
  try {
    await conn.authenticate();
    await conn.sync();
    app.listen(PORT);
    console.log(`Server started on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
};

start();

app.use(cors());
app.use(express.json());
app.use("/api", router);
