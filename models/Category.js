const { mongoose } = require("../lib/db");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      enum: ["rings", "bracelets", "necklaces", "earrings"],
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Avoid model overwrite issues in dev / hot reload
module.exports =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);


