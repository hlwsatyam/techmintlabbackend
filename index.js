const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect(
  "mongodb+srv://techmintlab:20172522@techmintlab.kokuxap.mongodb.net/techmintlab?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Define a schema for the data
const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  phone: String,
});

// Create a model based on the schema
const Data = mongoose.model("Data", dataSchema);
app.use(cors());
// Body parser middleware
app.use(bodyParser.json());

// POST endpoint to save data to MongoDB
app.post("/submitData", async (req, res) => {
  try {
    // Extract data from the request body
    const { name, email, message, phone } = req.body;

    // Create a new Data instance
    const newData = new Data({ name, email, message, phone });

    // Save the data to MongoDB
    await newData.save();

    res.status(200).json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
