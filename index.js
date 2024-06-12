const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://techmintlab:20172522@techmintlab.kokuxap.mongodb.net/techmintlab?retryWrites=true&w=majority"
    );
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with a failure
  }
}

connectDB();

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
    res.status(203).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
