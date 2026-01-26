require("dotenv").config();

const express = require("express");
const authRoutes = require("./routes/auth");
const helloRoutes = require("./routes/hello");
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use("/api/v1", helloRoutes);
app.use("/api/v1", authRoutes);

app.get("/", (req, res) => {
  res.send("Week 8 JWT app is running");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
