const http = require("http");
const { StringDecoder } = require("string_decoder");

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";

  req.on("data", (data) => {
    body += decode.write(data);
  });

  req.on("end", () => {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};

    bodyArray.forEach((part) => {
      if (!part) return;
      const partArray = part.split("=");
      const key = partArray[0];
      const value = partArray[1];
      if (key) {
        resultHash[key] = value;
      }
    });

    callback(resultHash);
  });
};

// variables to store what comes back from the form
let item = "Pick a color below.";
let userColor = "#ffffff"; // default background color

// HTML with string interpolation
const form = () => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Color picker</title>
    </head>
    <body style="background-color: ${userColor}; font-family: sans-serif;">
      <h1>Simple color picker</h1>
      <p>${item}</p>
      <form method="POST">
        <label for="color">Choose a color:</label>
        <input
          type="color"
          id="color"
          name="color"
          value="${userColor}"
        />
        <button type="submit">Submit</button>
      </form>
    </body>
  </html>
  `;
};
// test comment
const server = http.createServer((req, res) => {
  console.log("req.method is", req.method);
  console.log("req.url is", req.url);

  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is", body);

      if (body.color) {
        userColor = body.color;
        item = `You chose color: ${userColor}`;
      } else {
        item = "No color was chosen.";
      }

      res.writeHead(303, { Location: "/" });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.on("request", (req) => {
  console.log("event received: ", req.method, req.url);
});

server.listen(3000);
console.log("The server is listening on port 3000.");
