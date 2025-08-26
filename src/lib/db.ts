import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

console.log(MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error("Please define mongodb uri in env");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

export const connectDb = async (): Promise<Connection | null> => {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const options = { bufferCommands: false, maxPoolSize: 10 };

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((m: typeof mongoose) => m.connection);
  }

  try {
    cached.connection = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw new Error("Connection Failed.");
  }

  return cached.connection;
};
