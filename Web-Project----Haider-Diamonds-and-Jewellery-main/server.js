require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./lib/db");
const Product = require("./models/Product");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure DB connection for all requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    res.status(500).json({ message: "Database connection error" });
  }
});

// Small helper: treat param as Mongo _id when valid, otherwise as slug
function buildIdOrSlugFilter(param) {
  // Very simple ObjectId check: 24 hex characters
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(param);
  return isObjectId ? { _id: param } : { slug: param };
}

// GET – list all products (optionally filter by category or slug)
app.get("/api/products", async (req, res) => {
  try {
    const { category, slug } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (slug) filter.slug = slug;

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// GET – single product by id or slug
app.get("/api/products/:id", async (req, res) => {
  try {
    const filter = buildIdOrSlugFilter(req.params.id);
    const product = await Product.findOne(filter);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid product identifier" });
  }
});

// POST – create a new product
app.post("/api/products", async (req, res) => {
  try {
    const { name, price, slug, image, category } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        message: "name and price are required",
      });
    }

    // Allow price to be sent as formatted PKR string or raw number
    const numericPrice =
      typeof price === "number"
        ? price
        : Number(String(price).replace(/[^\d]/g, ""));

    if (Number.isNaN(numericPrice)) {
      return res.status(400).json({ message: "price must be a valid number" });
    }

    const product = await Product.create({
      name,
      price: numericPrice,
      slug,
      image,
      category,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create product" });
  }
});

// PUT – update an existing product (by id or slug)
app.put("/api/products/:id", async (req, res) => {
  try {
    const { name, price, slug, image, category } = req.body;

    const update = {};
    if (name !== undefined) update.name = name;
    if (price !== undefined) {
      const numericPrice =
        typeof price === "number"
          ? price
          : Number(String(price).replace(/[^\d]/g, ""));
      if (Number.isNaN(numericPrice)) {
        return res
          .status(400)
          .json({ message: "price must be a valid number" });
      }
      update.price = numericPrice;
    }
    if (slug !== undefined) update.slug = slug;
    if (image !== undefined) update.image = image;
    if (category !== undefined) update.category = category;

    const filter = buildIdOrSlugFilter(req.params.id);
    const product = await Product.findOneAndUpdate(filter, update, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid data or product identifier" });
  }
});

// DELETE – remove a product (by id or slug)
app.delete("/api/products/:id", async (req, res) => {
  try {
    const filter = buildIdOrSlugFilter(req.params.id);
    const product = await Product.findOneAndDelete(filter);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted", product });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid product identifier" });
  }
});

app.listen(PORT, () => {
  console.log(`Express API running on http://localhost:${PORT}`);
});

