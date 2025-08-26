import mongoose, { models } from "mongoose";

export interface IShortUrl extends mongoose.Document {
  fullUrl: string;
  shortUrl: string;
  clicks: number;
  user: mongoose.Schema.Types.ObjectId;
}

const ShortUrlSchema = new mongoose.Schema<IShortUrl>({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const ShortUrl =
  models?.ShortUrl || mongoose.model<IShortUrl>("ShortUrl", ShortUrlSchema);

export default ShortUrl;
