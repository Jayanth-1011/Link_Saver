import mongoose from "mongoose";
import User from "./user.model.js";
const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    favicon: {
      type: String,
    },
    discription: {
      type: String,
    },
    tags: {
      type: [String],
      enum: [
        "Ideas",
        "Personal",
        "To Explore",
        "Tech",
        "Design",
        "Career",
        "Health",
      ],
      default: ["Personal"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
