console.log("Express Tutorial");

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// LOGGER MIDDLEWARE
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

// AUTH MIDDLEWARE
const auth = (req, res, next) => {
  const { name } = req.cookies;

  if (name) {
    req.user = name;
    return next();
  }

  return res.status(401).json({ message: "unauthorized" });
};

// CALL LOGGER FOR ALL PATHS
app.use(logger);

// STATIC FILES
app.use(express.static("./public")); // or "./methods-public"

// BODY + COOKIES PARSING
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// ROUTERS
const peopleRouter = require("./routes/people");
app.use("/api/v1/people", peopleRouter);

// OPTIONAL AUTH ROUTES

// LOGON
app.post("/logon", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "name is required" });
  }

  res.cookie("name", name);
  return res.status(201).json({ message: `hello ${name}` });
});

// LOGOFF
app.delete("/logoff", (req, res) => {
  res.clearCookie("name");
  return res.status(200).json({ message: "logged off" });
});

// TEST
app.get("/test", auth, (req, res) => {
  return res.status(200).json({ message: `welcome ${req.user}` });
});

// NOT FOUND
app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

// LISTEN
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
