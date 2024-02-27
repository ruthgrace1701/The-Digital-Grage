const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://donkaruthgrace:Grace1701@cluster0.ymggrt1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToMongo;
