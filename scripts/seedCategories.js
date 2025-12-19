require("dotenv").config();
const { connectDB } = require("../lib/db");
const Category = require("../models/Category");

const categories = [
  {
    name: "rings",
    description: "Beautiful rings for every occasion",
    isActive: true,
  },
  {
    name: "bracelets",
    description: "Elegant bracelets to adorn your wrist",
    isActive: true,
  },
  {
    name: "necklaces",
    description: "Stunning necklaces to complete your look",
    isActive: true,
  },
  {
    name: "earrings",
    description: "Charming earrings to enhance your beauty",
    isActive: true,
  },
];

async function seedCategories() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    for (const categoryData of categories) {
      const existingCategory = await Category.findOne({ name: categoryData.name });
      
      if (existingCategory) {
        console.log(`Category "${categoryData.name}" already exists, skipping...`);
      } else {
        const category = await Category.create(categoryData);
        console.log(`Created category: ${category.name}`);
      }
    }

    console.log("Category seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exit(1);
  }
}

seedCategories();


