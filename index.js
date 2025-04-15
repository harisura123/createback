const express = require("express");
const { connection } = require("./db");
const cors = require('cors');
require("dotenv").config
const MongodbList = require('./models/MongodbList')
const app = express();
const port = process.env.PORT ;

app.use(express.json()); 
app.use(cors())
app.get("/", async (req, res) => {
  try {
    res.status(200).json({ msg: "I am in home route" });
  } catch (error) {
    res.status(500).json({ msg: "Error in home route" });
  }
});

app.post('/signup', (req, res) => {
    MongodbList.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

// Auth ----> Middleware
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
