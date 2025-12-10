const express = require("express");
const app = express();

app.use(express.static("./public"));

const { products } = require("./data");

// TEST ENDPOINT
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

// ALL PRODUCTS
app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

// PRODUCT BY ID, with 404 JSON
app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);

  if (!product) {
    // 404 and required JSON message
    return res.status(404).json({ message: "That product was not found." });
  }

  res.json(product);
});

// QUERY ENDPOINT: /api/v1/query?search=al&limit=5&maxPrice=20
app.get("/api/v1/query", (req, res) => {
  const { search, limit, maxPrice } = req.query;

  // начинаем с копии всех продуктов
  let result = [...products];

  // 1) search: имя начинается с search (без учёта регистра)
  if (search) {
    const s = search.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().startsWith(s));
  }

  // 2) maxPrice: только товары, цена <= maxPrice (если есть price в data.js)
  if (maxPrice) {
    const max = parseFloat(maxPrice);
    if (!Number.isNaN(max)) {
      result = result.filter((p) => p.price <= max);
    }
  }

  // 3) limit: обрезаем массив до нужной длины
  if (limit) {
    const l = parseInt(limit);
    if (!Number.isNaN(l)) {
      result = result.slice(0, l);
    }
  }

  res.json(result);
});

// NOT FOUND
app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
