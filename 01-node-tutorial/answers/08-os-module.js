const os = require("os");

// user information
console.log("User info:", os.userInfo());

// system uptime in seconds
console.log("Uptime:", os.uptime(), "seconds");

// total and free memory
console.log("Total memory:", os.totalmem());
console.log("Free memory:", os.freemem());

// system information
console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("Hostname:", os.hostname());
