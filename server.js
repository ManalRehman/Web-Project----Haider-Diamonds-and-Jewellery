require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connectDB } = require("./lib/db");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Order = require("./models/Order");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

// Ensure uploads directory exists for media/file uploads
// Store inside Next.js public folder so images are directly accessible by the frontend
const UPLOADS_DIR = path.join(__dirname, "public", "uploads");
function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}
ensureUploadsDir();

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});
const upload = multer({ storage });

// CORS configuration
app.use(
  cors({
    origin: "*", // Allow all origins (you can restrict this in production)
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Static serving for uploaded media
app.use("/public", express.static(UPLOADS_DIR));

// Database connection middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    res.status(500).json({ message: "Database connection error" });
  }
});

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  if (Object.keys(req.body || {}).length > 0) {
    console.log("Request body:", JSON.stringify(req.body, null, 2));
  }
  next();
});

function buildIdOrSlugFilter(param) {
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(param);
  return isObjectId ? { _id: param } : { slug: param };
}

// ============= AUTH HELPERS =============
function signToken(user) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// ============= AUTH ROUTES =============
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "password must be at least 6 characters" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "An account with this email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
    });

    const token = signToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Failed to sign up", error: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user);

    res.json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Failed to log in", error: err.message });
  }
});

// ============= SEARCH =============
app.get("/api/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "query param is required" });
    }
    const regex = new RegExp(query, "i");
    const [products, categories] = await Promise.all([
      Product.find({
        $or: [{ title: regex }, { slug: regex }, { category: regex }],
      }).sort({ createdAt: -1 }),
      Category.find({ name: regex }),
    ]);
    res.json({ products, categories });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Failed to search" });
  }
});

// ============= MEDIA ROUTES (file upload / list / delete) =============
app.post("/api/media/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const urlPath = `/public/${req.file.filename}`;
  res.status(201).json({
    message: "File uploaded",
    filename: req.file.filename,
    url: urlPath,
  });
});

app.get("/api/media", async (req, res) => {
  try {
    ensureUploadsDir();
    const files = fs.readdirSync(UPLOADS_DIR);
    res.json(files.map((f) => ({ filename: f, url: `/public/${f}` })));
  } catch (err) {
    console.error("List media error:", err);
    res.status(500).json({ message: "Failed to list media" });
  }
});

app.delete("/api/media/:filename", async (req, res) => {
  try {
    const target = path.join(UPLOADS_DIR, req.params.filename);
    if (fs.existsSync(target)) {
      fs.unlinkSync(target);
      return res.json({ message: "File deleted" });
    }
    res.status(404).json({ message: "File not found" });
  } catch (err) {
    console.error("Delete media error:", err);
    res.status(500).json({ message: "Failed to delete file" });
  }
});

// ============= PRODUCTS =============
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

app.get("/api/products/:slug", async (req, res) => {
  try {
    const filter = buildIdOrSlugFilter(req.params.slug);
    const product = await Product.findOne(filter);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid product slug" });
  }
});

// Product creation with optional image upload (multipart/form-data)
app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    // Product model uses 'title' not 'name', but accept both for compatibility
    const { title, name, price, slug, image, category } = req.body;
    const productTitle = title || name;
    const imagePath = req.file ? `/public/${req.file.filename}` : image;

    if (!productTitle || !price) {
      return res.status(400).json({
        message: "title (or name) and price are required",
      });
    }
    const numericPrice =
      typeof price === "number"
        ? price
        : Number(String(price).replace(/[^\d]/g, ""));
    if (Number.isNaN(numericPrice)) {
      return res.status(400).json({ message: "price must be a valid number" });
    }
    const product = await Product.create({
      title: productTitle,
      price: numericPrice,
      slug,
      image: imagePath,
      category,
    });
    res.status(201).json(product);
  } catch (err) {
    console.error("Product creation error:", err);
    res.status(500).json({
      message: "Failed to create product",
      error: err.message,
    });
  }
});

// Product update with optional image upload
app.put("/api/products/:slug", upload.single("image"), async (req, res) => {
  try {
    // Product model uses 'title' not 'name', but accept both for compatibility
    const { title, name, price, slug, image, category } = req.body;
    const update = {};
    
    // Handle title/name - Product model uses 'title'
    if (title !== undefined) update.title = title;
    if (name !== undefined) update.title = name; // Map name to title
    
    if (price !== undefined) {
      const numericPrice =
        typeof price === "number"
          ? price
          : Number(String(price).replace(/[^\d]/g, ""));
      if (Number.isNaN(numericPrice)) {
        return res.status(400).json({ message: "price must be a valid number" });
      }
      update.price = numericPrice;
    }
    if (slug !== undefined) update.slug = slug;
    if (req.file) update.image = `/public/${req.file.filename}`;
    else if (image !== undefined) update.image = image;
    if (category !== undefined) update.category = category;

    const filter = buildIdOrSlugFilter(req.params.slug);
    const product = await Product.findOneAndUpdate(filter, update, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Product update error:", err);
    res.status(400).json({ 
      message: "Invalid data or product identifier",
      error: err.message 
    });
  }
});

app.delete("/api/products/:slug", async (req, res) => {
  try {
    const filter = buildIdOrSlugFilter(req.params.slug);
    const product = await Product.findOneAndDelete(filter);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Optional cleanup of uploaded image if stored locally
    const shouldCleanup = req.query.cleanup === "true";
    if (shouldCleanup && product.image && product.image.startsWith("/public/")) {
      const imgPath = path.join(UPLOADS_DIR, path.basename(product.image));
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }
    res.json({ message: "Product deleted", product, cleanedUp: shouldCleanup });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid product identifier" });
  }
});

// ============= CATEGORIES =============
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

app.get("/api/categories/:id", async (req, res) => {
  try {
    const filter = buildIdOrSlugFilter(req.params.id);
    const category = await Category.findOne(filter);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid category identifier" });
  }
});

app.post("/api/categories", async (req, res) => {
  try {
    const { name, description, image } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "name is required",
      });
    }
    
    // Validate enum value and provide helpful error
    const validNames = ["rings", "bracelets", "necklaces", "earrings"];
    if (!validNames.includes(name.toLowerCase())) {
      return res.status(400).json({
        message: `Invalid category name: "${name}". Valid category names are: ${validNames.join(", ")}`,
        validNames: validNames
      });
    }
    
    const category = await Category.create({
      name: name.toLowerCase(),
      description,
      image,
    });
    res.status(201).json(category);
  } catch (err) {
    console.error("Category creation error:", err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Category already exists" });
    }
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message).join(', ');
      return res.status(400).json({ 
        message: `Validation error: ${errors}`,
        validNames: ["rings", "bracelets", "necklaces", "earrings"]
      });
    }
    res.status(500).json({ 
      message: "Failed to create category",
      error: err.message 
    });
  }
});

app.put("/api/categories/:id", async (req, res) => {
  try {
    const { name, description, image, isActive } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (description !== undefined) update.description = description;
    if (image !== undefined) update.image = image;
    if (isActive !== undefined) update.isActive = isActive;

    const filter = buildIdOrSlugFilter(req.params.id);
    const category = await Category.findOneAndUpdate(filter, update, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    console.error("Category update error:", err);
    res.status(400).json({ 
      message: "Invalid data or category identifier",
      error: err.message 
    });
  }
});

app.delete("/api/categories/:id", async (req, res) => {
  try {
    const filter = buildIdOrSlugFilter(req.params.id);
    const category = await Category.findOneAndDelete(filter);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted", category });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid category identifier" });
  }
});

// ============= ORDERS =============
app.get("/api/orders", async (req, res) => {
  try {
    const { status, paymentStatus, customerEmail } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (customerEmail) filter["customer.email"] = customerEmail.toLowerCase();
    const orders = await Order.find(filter)
      .populate("items.product", "title image slug price")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

app.get("/api/orders/:id", async (req, res) => {
  try {
    const filter = buildIdOrSlugFilter(req.params.id);
    const order = await Order.findOne(filter).populate(
      "items.product",
      "title image slug price"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid order identifier" });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    console.log("Received order request body:", JSON.stringify(req.body, null, 2));
    
    const {
      customer,
      items,
      shipping = 0,
      notes,
      status = "pending",
      paymentStatus = "pending",
    } = req.body;

    // Validate customer object structure
    if (!customer) {
      return res.status(400).json({
        message: "Customer information is required",
      });
    }
    
    if (!customer.name || typeof customer.name !== 'string' || customer.name.trim() === '') {
      return res.status(400).json({
        message: "Customer name is required and must be a non-empty string",
      });
    }
    
    if (!customer.email || typeof customer.email !== 'string' || customer.email.trim() === '') {
      return res.status(400).json({
        message: "Customer email is required and must be a non-empty string",
      });
    }
    
    if (!customer.phone || typeof customer.phone !== 'string' || customer.phone.trim() === '') {
      return res.status(400).json({
        message: "Customer phone is required and must be a non-empty string",
      });
    }
    
    if (!customer.address || !customer.address.street || !customer.address.city) {
      return res.status(400).json({
        message: "Customer address with street and city is required",
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "At least one order item is required",
      });
    }

    let subtotal = 0;

    const orderItems = await Promise.all(
      items.map(async (item, index) => {
        try {
          const productId = item.product || item.productId;
          if (!productId) {
            throw new Error(`Item ${index}: Each item must have a 'product' or 'productId' field with the product ID or slug`);
          }
          
          console.log(`Looking up product: ${productId}`);
          
          // Try to find product by ID or slug
          const isObjectId = /^[0-9a-fA-F]{24}$/.test(String(productId));
          const product = isObjectId 
            ? await Product.findById(productId)
            : await Product.findOne({ slug: productId });
          
          console.log(`Product found:`, product ? { id: product._id, title: product.title } : 'NOT FOUND');
          
          if (!product) {
            throw new Error(`Item ${index}: Product not found: ${productId}. Please use a valid product ID or slug. Get product IDs from GET /api/products`);
          }

          // Product model uses 'title' field, not 'name'
          const productName = product.title || product.name;
          if (!productName) {
            throw new Error(`Item ${index}: Product ${productId} is missing a title/name field`);
          }

          const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;
          const price = product.price || 0;
          const trimmedProductName = String(productName).trim();
          const itemSubtotal = price * quantity;
          subtotal += itemSubtotal;
          
          // Ensure all required fields are present
          const orderItem = {
            product: product._id,
            productName: trimmedProductName,
            quantity: quantity,
            price: price,
            subtotal: itemSubtotal,
          };
          
          console.log(`Order item ${index} created:`, orderItem);
          
          // Validate the order item structure
          if (!orderItem.productName || !orderItem.product || !orderItem.quantity || orderItem.price === undefined) {
            throw new Error(`Item ${index}: Invalid order item structure: ${JSON.stringify(orderItem)}`);
          }
          
          return orderItem;
        } catch (itemError) {
          console.error(`Error processing item ${index}:`, itemError);
          throw itemError;
        }
      })
    );

    const total = subtotal + shipping;

    // Validate orderItems before creating order
    orderItems.forEach((item, index) => {
      if (!item.productName) {
        throw new Error(`Order item at index ${index} is missing productName. Item: ${JSON.stringify(item)}`);
      }
      if (!item.product) {
        throw new Error(`Order item at index ${index} is missing product ID`);
      }
    });

    // Generate orderNumber BEFORE creating the order
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderNumber = `ORD-${timestamp}-${random}`;

    // Ensure customer object is properly structured
    const customerData = {
      name: String(customer.name).trim(),
      email: String(customer.email).trim().toLowerCase(),
      phone: String(customer.phone).trim(),
      address: {
        street: String(customer.address.street).trim(),
        city: String(customer.address.city).trim(),
        postalCode: customer.address.postalCode ? String(customer.address.postalCode).trim() : undefined,
        country: customer.address.country ? String(customer.address.country).trim() : "Pakistan",
      },
    };

    console.log("Creating order with data:", {
      orderNumber,
      customer: customerData,
      itemsCount: orderItems.length,
      subtotal,
      total
    });

    // Use create() instead of new + save() for better validation
    const order = await Order.create({
      orderNumber,
      customer: customerData,
      items: orderItems,
      subtotal,
      shipping,
      total,
      status,
      paymentStatus,
      notes,
    });

    const populatedOrder = await Order.findById(order._id).populate(
      "items.product",
      "title image slug price"
    );

    res.status(201).json(populatedOrder);
  } catch (err) {
    console.error("Order creation error:", err);
    console.error("Error details:", {
      message: err.message,
      name: err.name,
      errors: err.errors,
      stack: err.stack
    });
    
    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message).join(', ');
      return res.status(400).json({ 
        message: `Validation error: ${errors}`,
        details: err.errors 
      });
    }
    
    res.status(500).json({ 
      message: err.message || "Failed to create order",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
});

app.put("/api/orders/:id", async (req, res) => {
  try {
    const { status, paymentStatus, notes, shipping } = req.body;
    const update = {};
    if (status !== undefined) update.status = status;
    if (paymentStatus !== undefined) update.paymentStatus = paymentStatus;
    if (notes !== undefined) update.notes = notes;
    if (shipping !== undefined) {
      update.shipping = shipping;
      const order = await Order.findById(req.params.id);
      if (order) {
        update.total = order.subtotal + shipping;
      }
    }
    const filter = buildIdOrSlugFilter(req.params.id);
    const order = await Order.findOneAndUpdate(filter, update, {
      new: true,
      runValidators: true,
    }).populate("items.product", "title image slug price");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid data or order identifier" });
  }
});

app.delete("/api/orders/:id", async (req, res) => {
  try {
    const filter = buildIdOrSlugFilter(req.params.id);
    const order = await Order.findOneAndDelete(filter);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted", order });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid order identifier" });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Express API running on http://localhost:${PORT}`);
});