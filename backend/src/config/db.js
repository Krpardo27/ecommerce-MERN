import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    const url = `${connection.host}:${connection.port}`;
    console.log(`🟢 Mongo conectado a: ${url}`);
  } catch (error) {
    console.error("Error MongoDB:", error.message);
    process.exit(1);
  }
};
