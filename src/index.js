const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

require("dotenv/config");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

app.listen(3333);
