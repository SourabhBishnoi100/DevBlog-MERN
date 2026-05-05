import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      maxLength: [200, "Excerpt must be less than 200 characters"],
      trim: true,
    },
    coverImage: {
      type: String,
      default: "placeholder.image.com",
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },

    tags: [],
  },
  {
    timestamps: true,
  },
);

postSchema.index({ createdAt: -1 });

export default mongoose.model("Post", postSchema);
