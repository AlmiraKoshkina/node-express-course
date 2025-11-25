const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

emitter.on("sum", (a, b) => {
  console.log(`Sum: ${a} + ${b} = ${a + b}`);
});

emitter.on("knock", (who) => {
  console.log(`${who} is knocking...`);
  emitter.emit("greet", who);
});

let counter = 0;
emitter.on("timer", () => {
  counter++;
  console.log(`Timer event #${counter}`);
  if (counter === 3) {
    console.log("Timer stopped");
    clearInterval(interval);
  }
});

emitter.emit("greet", "Alice");
emitter.emit("sum", 5, 10);
emitter.emit("knock", "Neo");

const interval = setInterval(() => {
  emitter.emit("timer");
}, 2000);
