const { MongoClient } = require("mongodb");
const Db = process.env.MONGO_URI;
const client = new MongoClient(Db);

let _db;


module.exports = {
  connectToMongoDB: async function () {
    try {
      await client.connect();
      _db = client.db("employees");  
      console.log("Successfully connected to MongoDB.");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error; 
    }
  },


  getDb: function () {
    if (!_db) {
      throw new Error("Database not initialized. Call connectToMongoDB first.");
    }

    return _db;
  },

  closeMongoDB: async function () {
    try {

      await client.close();
      console.log("MongoDB connection closed.");
      
    } catch (error) {
      console.error("Error closing MongoDB connection:", error);
    }
  }
};
