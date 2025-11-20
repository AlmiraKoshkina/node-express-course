const { writeFileSync, readFileSync } = require("fs");
const path = require("path");

// full path to the file inside the temporary directory
const filePath = path.join(__dirname, "temporary", "fileA.txt");

// write the first line (overwrite the file if it exists)
writeFileSync(filePath, "This is line 1\n");

// write the second line (append)
writeFileSync(filePath, "This is line 2\n", { flag: "a" });

// write the third line (append)
writeFileSync(filePath, "This is line 3\n", { flag: "a" });

// read the content back
const content = readFileSync(filePath, "utf8");

// print the result
console.log("File content:\n" + content);
