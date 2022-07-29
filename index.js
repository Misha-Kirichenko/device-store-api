require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { conn } = require("./config");
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

app.use(express.static(path.resolve(__dirname, "img")));
app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, //10MB in bytes
    abortOnLimit: true,
  })
);
app.use("/api", router);
