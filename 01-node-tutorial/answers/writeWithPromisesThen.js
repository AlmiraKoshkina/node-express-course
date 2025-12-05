const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "temp.txt");

fs.writeFile(filePath, "Line 1\n", "utf8")
  .then(() => {
    console.log("Wrote line 1");
    return fs.appendFile(filePath, "Line 2\n", "utf8");
  })
  .then(() => {
    console.log("Wrote line 2");
    return fs.appendFile(filePath, "Line 3\n", "utf8");
  })
  .then(() => {
    console.log("Wrote line 3");
    return fs.readFile(filePath, "utf8");
  })
  .then((data) => {
    console.log("File contents:");
    console.log(data);
  })
  .catch((error) => {
    console.log("An error occurred: ", error);
  });
