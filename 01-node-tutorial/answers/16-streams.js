const fs = require("fs");
const path = require("path");

const bigFilePath = path.join(__dirname, "../content/big.txt");

// Test different chunk sizes by changing this number
const highWaterMarkValue = 5000;

const stream = fs.createReadStream(bigFilePath, {
  encoding: "utf8",
  highWaterMark: highWaterMarkValue,
});

let counter = 0;

stream.on("data", (chunk) => {
  counter += 1;
  console.log(`--- chunk #${counter} ---`);
  console.log(chunk);
});

stream.on("end", () => {
  console.log("=== STREAM ENDED ===");
  console.log(`Total chunks received: ${counter}`);
});

stream.on("error", (err) => {
  console.log("STREAM ERROR:", err);
});
