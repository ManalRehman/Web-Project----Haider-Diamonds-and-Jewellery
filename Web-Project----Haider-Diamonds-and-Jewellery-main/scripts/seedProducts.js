require("dotenv").config();
const path = require("path");
const { connectDB } = require("../lib/db");
const Product = require("../models/Product");

// Load product data from the Next.js pages (hard-coded arrays)
// We import them directly from the compiled TS/TSX using Node's require with ts-node not needed
// because Next/TS is compiled at build time; here we re-define the data instead,
// so the seeding script stays simple and decoupled from the app runtime.

const rings = [
  {
    slug: "Leafy-Lux-Ring",
    title: "Leafy Lux Ring",
    price: "PKR 599,000",
    image: "/ring1.jpg",
    category: "rings",
  },
  {
    slug: "Floral-Embrace-Ring",
    title: "Floral Embrace Ring",
    price: "PKR 499,000",
    image: "/ring2.jpg",
    category: "rings",
  },
  {
    slug: "The-Rose-Knot-Ring",
    title: "The Rose Knot Ring",
    price: "PKR 579,000",
    image: "/ring3.jpg",
    category: "rings",
  },
  {
    slug: "The-Modern-Sparkle-Ring",
    title: "The Modern Sparkle Ring",
    price: "PKR 579,000",
    image: "/ring4.jpg",
    category: "rings",
  },
  {
    slug: "The-Petal-Heart-Ring",
    title: "The Petal Heart Ring",
    price: "PKR 649,000",
    image: "/ring5.jpg",
    category: "rings",
  },
  {
    slug: "The-Timeless-Row-Ring",
    title: "The Timeless Row Ring",
    price: "PKR 699,000",
    image: "/ring6.jpg",
    category: "rings",
  },
];

const necklaces = [
  {
    slug: "diamond-tennis-necklace",
    title: "Diamond Tennis Necklace",
    price: "PKR 599,000",
    image: "/necklace1.jpg",
    category: "necklaces",
  },
  {
    slug: "solitaire-pendant-necklace",
    title: "Solitaire Pendant Necklace",
    price: "PKR 359,000",
    image: "/necklace2.jpg",
    category: "necklaces",
  },
  {
    slug: "pear-halo-necklace",
    title: "Pear Halo Necklace",
    price: "PKR 549,000",
    image: "/necklace3.jpg",
    category: "necklaces",
  },
  {
    slug: "emerald-diamond-necklace",
    title: "Emerald Diamond Necklace",
    price: "PKR 799,000",
    image: "/necklace4.jpg",
    category: "necklaces",
  },
  {
    slug: "sapphire-drop-necklace",
    title: "Sapphire Drop Necklace",
    price: "PKR 429,000",
    image: "/necklace5.jpg",
    category: "necklaces",
  },
  {
    slug: "classic-pearl-necklace",
    title: "Classic Pearl Necklace",
    price: "PKR 299,000",
    image: "/necklace6.6.jpg",
    category: "necklaces",
  },
];

const earrings = [
  {
    slug: "classic-diamond-studs",
    title: "Classic Diamond Studs",
    price: "PKR 279,000",
    image: "/sparkling-diamond-stud-earrings-on-luxury-jewelry-.jpg",
    category: "earrings",
  },
  {
    slug: "The-Dazzling-Drop-Earrings",
    title: "The Dazzling Drop Earrings",
    price: "PKR 349,000",
    image: "/earring1.jpeg",
    category: "earrings",
  },
  {
    slug: "Emerald-Isle-Hoops",
    title: "Emerald Isle Hoops",
    price: "PKR 419,000",
    image: "/earring2.jpeg",
    category: "earrings",
  },
  {
    slug: "pearl-drop-earrings",
    title: "Pearl Drop Earrings",
    price: "PKR 389,000",
    image: "/earring3.jpeg",
    category: "earrings",
  },
  {
    slug: "Ruby-Blush-Mini-Hoops",
    title: "Ruby Blush Mini Hoops",
    price: "PKR 299,000",
    image: "/earring4.2.jpeg",
    category: "earrings",
  },
  {
    slug: "Whisper-Leaf-Hoops",
    title: "Whisper Leaf Hoops",
    price: "PKR 459,000",
    image: "/earring5.jpeg",
    category: "earrings",
  },
];

const bracelets = [
  {
    slug: "diamond-tennis-bracelet",
    title: "Diamond Tennis Bracelet",
    price: "PKR 599,000",
    image: "/bracelet1.jpg",
    category: "bracelets",
  },
  {
    slug: "bangle-bracelet",
    title: "Bangle Bracelet",
    price: "PKR 549,000",
    image: "/bracelet2.jpg",
    category: "bracelets",
  },
  {
    slug: "chain-link-bracelet",
    title: "Chain Link Bracelet",
    price: "PKR 299,000",
    image: "/bracelet3.jpg",
    category: "bracelets",
  },
  {
    slug: "cuff-bracelet",
    title: "Cuff Bracelet",
    price: "PKR 399,000",
    image: "/bracelet4.jpg",
    category: "bracelets",
  },
  {
    slug: "charm-bracelet",
    title: "Charm Bracelet",
    price: "PKR 279,000",
    image: "/bracelet5.jpg",
    category: "bracelets",
  },
  {
    slug: "pearl-bracelet",
    title: "Pearl Bracelet",
    price: "PKR 329,000",
    image: "/bracelet6.jpg",
    category: "bracelets",
  },
];

async function seed() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    const allProducts = [...rings, ...necklaces, ...earrings, ...bracelets];

    // Optional: clear existing products first
    await Product.deleteMany({});
    console.log("Cleared existing products");

    const docs = await Product.insertMany(
      allProducts.map((p) => ({
        name: p.title,
        price: Number(p.price.replace(/[^\d]/g, "")), // keep digits only
        slug: p.slug,
        image: p.image,
        category: p.category,
      }))
    );

    console.log(`Inserted ${docs.length} products.`);
  } catch (err) {
    console.error("Error seeding products:", err);
  } finally {
    process.exit(0);
  }
}

seed();


