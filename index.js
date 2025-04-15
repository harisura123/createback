const express = require("express");

const { userDetails } = require("./Routes/user.routes");
const { connection } = require("./db");
const { auth } = require("./middleware/Auth.middleware");
const cors = require('cors');
require("dotenv").config

const app = express();
const port = process.env.PORT ;

app.use(express.json()); 
app.use(cors())

app.use("/user", userDetails);

app.get("/", async (req, res) => {
  try {
    res.status(200).json({ msg: "I am in home route" });
  } catch (error) {
    res.status(500).json({ msg: "Error in home route" });
  }
});


// Auth ----> Middleware
app.use(auth)

// Notes Routes ---> Private routes

app.listen(port, async () => {
  try {
    await connection;
    console.log(`connectd to mongo db`);
  } catch (error) {
    console.log("Error in connecting mongoDb");
  }
  console.log(`Backend is running on port ${port}`);
});