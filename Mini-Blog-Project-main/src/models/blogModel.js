const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    authorId: {
      type: ObjectId,
      ref: "Author",
      required: true,
    },
    tags: ["String"],
    category: {
      type: String,
      required: true,
    },
    subcategory: ["String"],
    
    isPublished: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
