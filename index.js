const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;
const cvRoutes = require("./routes/cvRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const corsOptions = {
  origin: "https://voluble-cobbler-80d492.netlify.app",
  optionsSuccessStatus: 200,
};
require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://Guy123:2753816d@cluster1.cfymjgr.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.log("Failed to connect to the Database", error);
  });
app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
app.use("/cv", cvRoutes);
app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Test");
});

app.listen(3000, () => {
  console.log(`Sever is listening on port ${port}`);
});
