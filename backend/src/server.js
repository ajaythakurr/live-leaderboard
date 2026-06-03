import dotenv from "dotenv";
import app from "./app.js";
dotenv.config();

import connectDB from "./config/db.js";
import redis from "./config/redis.js";



const PORT = process.env.PORT || 5050;

const startServer = async () => {
  try {
    await connectDB(); // connect mongoDb
    await redis.ping(); // redis starts
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();