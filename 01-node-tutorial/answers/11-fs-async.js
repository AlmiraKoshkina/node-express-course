const { writeFile } = require("fs");
const path = require("path");

console.log("at start");

const filePath = path.join(__dirname, "temporary", "fileB.txt");

writeFile(filePath, "This is line 1\n", (err) => {
  console.log("at point 1 (after writing line 1)");
  if (err) {
    console.log("Error when writing line 1:", err);
    return;
  }

  writeFile(filePath, "This is line 2\n", { flag: "a" }, (err) => {
    console.log("at point 2 (after writing line 2)");
    if (err) {
      console.log("Error when writing line 2:", err);
      return;
    }

    writeFile(filePath, "This is line 3\n", { flag: "a" }, (err) => {
      console.log("at point 3 (after writing line 3)");
      if (err) {
        console.log("Error when writing line 3:", err);
        return;
      }

      console.log("All lines written to fileB.txt");
    });
  });
});
