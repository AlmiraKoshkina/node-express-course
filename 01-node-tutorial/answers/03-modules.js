// import modules
const names = require("./04-names");
const greet = require("./05-utils");
const sayHi = require("./05-utils");
const data = require("./06-alternative-flavor");

// runs code when required
require("./07-mind-grenade");

// use imported values
console.log("Names module:", names);
console.log("Data module:", data);

greet("Susan");
greet(names.john);
greet(names.olga);
