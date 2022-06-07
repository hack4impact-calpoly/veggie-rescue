const { response } = require("express");
const express = require("express"); // 1. includes Express
const app = express(); // 2. initializes Express
const mongoose = require("mongoose"); // Initializing Mongoose for DB
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDatabase = require("./config/db");
var cors = require('cors');

require("dotenv").config(); // dotenv package to protect secrets

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(errorHandler);

const port = process.env.PORT || 3001;
connectDatabase();
// mongoose.connect(connection_url)
// .then(() => console.log(`Success`))
// .catch((error) => console.error(`Could not connect due to ${error}`))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
  next();
});

app.use("/api/drivers", require("./routes/driverRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/location", require("./routes/locationRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api", require("./routes/logRoutes"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Veggie Rescue API" });
});
app.use(errorHandler);

if (process.argv.includes("dev")) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
}
module.exports = app;
