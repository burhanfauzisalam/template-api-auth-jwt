const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const admin = require("./routes/adminRouter");

const mongoString = process.env.DATABASE_URL;
const PORT = process.env.PORT;

mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", admin);

app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
