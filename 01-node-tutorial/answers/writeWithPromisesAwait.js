const { writeFile, readFile } = require("fs").promises;
const writer = async () => {
  try {
    const text = "Eat\nPray\nLove\n";
    await writeFile("temp.txt", text);
  } catch (err) {
    console.log("An error occurred in writer:", err);
  }
};

const reader = async () => {
  try {
    const data = await readFile("temp.txt", "utf-8");
    console.log(data);
  } catch (err) {
    console.log("An error occurred in reader:", err);
  }
};

const readWrite = async () => {
  await writer();
  await reader();
};

readWrite();
