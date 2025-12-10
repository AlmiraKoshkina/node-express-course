const express = require("express");
const app = express();

app.use(express.static("./public"));

const { products } = require("./data");

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);

  if (!product) {
    // 404 and required JSON message
    return res.status(404).json({ message: "That product was not found." });
  }

  res.json(product);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit, maxPrice } = req.query;

  let result = [...products];

  if (search) {
    const s = search.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().startsWith(s));
  }

  if (maxPrice) {
    const max = parseFloat(maxPrice);
    if (!Number.isNaN(max)) {
      result = result.filter((p) => p.price <= max);
    }
  }

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
