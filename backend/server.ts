const { response } = require("express");
const express = require("express"); // 1. includes Express
const app = express(); // 2. initializes Express
const mongoose = require("mongoose"); // Initializing Mongoose for DB
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDatabase = require("./config/db");

require("dotenv").config(); // dotenv package to protect secrets

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);

const port = process.env.PORT || 3001;
connectDatabase();
//mongoose.connect(connection_url)
//.then(() => console.log(`Success`))
//.catch((error) => console.error(`Could not connect due to ${error}`))

app.use("/api/drivers", require("./routes/driverRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
<<<<<<< HEAD
app.use("/api/location", require("./routes/locationRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
=======
>>>>>>> 2efdb9dbe6148fdf02dd204972f05e68653f18cc
app.use("/api", require("./routes/logRoutes"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Veggie Rescue API" });
});
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`)); // 3. runs Express
