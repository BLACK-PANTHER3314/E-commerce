const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8000;
const { main } = require("./config/connectDb");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoute");
//middleware
app.use(express.json());
app.use(morgan("dev"));

//connectDb
main;

//routes
app.use("/api/v1/auth", authRoutes); // registration, login route

//universal api calls
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
