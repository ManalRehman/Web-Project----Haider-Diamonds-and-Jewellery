const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// In‑memory example data (replace with real DB later if you want)
let products = [
  { id: 1, name: "Diamond Ring", price: 1000 },
  { id: 2, name: "Gold Necklace", price: 1500 },
];

// Middleware
app.use(cors());
app.use(express.json());

// GET – list all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// GET – single product by id
app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// POST – create a new product
app.post("/api/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || typeof price !== "number") {
    return res
      .status(400)
      .json({ message: "name (string) and price (number) are required" });
  }

  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    price,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT – update an existing product
app.put("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, price } = req.body;

  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (name !== undefined) products[index].name = name;
  if (price !== undefined) products[index].price = price;

  res.json(products[index]);
});

// DELETE – remove a product
app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deleted = products.splice(index, 1)[0];
  res.json({ message: "Product deleted", product: deleted });
});

app.listen(PORT, () => {
  console.log(`Express API running on http://localhost:${PORT}`);
});


