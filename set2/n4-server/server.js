// Name: Samantha Ondoy
// Section: IV-BSIT-A
// Activity: N4 - Basic HTTP Server
// Date: 11-21-2026

const http = require("http");

const PORT = 8000;

const ABOUT_TEXT =
  "Hi! I am Samantha Ondoy, a 4th-year BSIT student in section IV-BSIT-A. " +
  "I built this page with Node.js and its built-in http module for ELEC 3.";

function page(title, body) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 640px; margin: 40px auto; line-height: 1.6; }
    nav a { margin-right: 12px; }
  </style>
</head>
<body>
  <nav><a href="/">Home</a><a href="/about">About</a><a href="/contact">Contact</a></nav>
  ${body}
</body>
</html>`;
}

function sendHtml(res, statusCode, title, body) {
  res.writeHead(statusCode, { "Content-Type": "text/html; charset=utf-8" });
  res.end(page(title, body));
}

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];

  if (url === "/") {
    sendHtml(res, 200, "Home", `
  <h1>Welcome!</h1>
  <p><strong>Name:</strong> Samantha Ondoy</p>
  <p><strong>Section:</strong> IV-BSIT-A</p>
  <p>ELEC 3 - Node.js | N4 Basic HTTP Server</p>`);
  } else if (url === "/about") {
    sendHtml(res, 200, "About", `
  <h1>About Me</h1>
  <p>${ABOUT_TEXT}</p>`);
  } else if (url === "/contact") {
    sendHtml(res, 200, "Contact", `
  <h1>Contact</h1>
  <p>For questions about this project, please reach me through our class group or the official school channels.</p>
  <p>(Add your own contact details here if you want to.)</p>`);
  } else {
    sendHtml(res, 404, "404 Not Found", `
  <h1>404</h1>
  <p>Page not found</p>
  <p>The address <code>${url.replace(/[<>&"]/g, "")}</code> does not exist.</p>`);
  }
});

server.listen(PORT, () => {
  console.log(`Server by Samantha Ondoy (IV-BSIT-A) is running at http://localhost:${PORT}`);
  console.log("Press Ctrl + C to stop the server.");
});
