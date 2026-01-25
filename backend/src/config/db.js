import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("🟢 Mongo conectado a DB:", mongoose.connection.name);
    });
  } catch (error) {
    console.error("Error MongoDB:", error.message);
    process.exit(1);
  }
};
