const { mongoose } = require("../lib/db");

const ProductSchema = new mongoose.Schema(
  {
    // Display name (e.g. "Leafy Lux Ring")
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // Price stored as a number (PKR without formatting)
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    // Optional fields to better match your existing UI data
    slug: {
      type: String,
      trim: true,
      index: true,
    },
    image: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Avoid model overwrite issues in dev / hot reload
module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);