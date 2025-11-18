const path = require("path");

// join path segments into a normalized path
const filePath = path.join("users", "iakov", "documents", "node-course");

console.log("Joined path:", filePath);

// example: get information about the current file path
console.log("Base name:", path.basename(__filename));
console.log("Directory name:", path.dirname(__filename));
console.log("Extension:", path.extname(__filename));
