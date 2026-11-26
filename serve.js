// Prosty serwer podglądu: node serve.js  →  http://localhost:4190
// Nieznane adresy zwracają stronę 404.html (jak na hostingu).
const http = require("http"), fs = require("fs"), path = require("path");
const root = __dirname, port = process.env.PORT || 4190;
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".jpg": "image/jpeg", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const f = path.join(root, path.normalize(p));
  if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(f, (err, data) => {
    if (err) {
      return fs.readFile(path.join(root, "404.html"), (e2, d2) => {
        res.writeHead(404, { "Content-Type": types[".html"] });
        res.end(e2 ? "404" : d2);
      });
    }
    res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" });
    res.end(data);
  });
}).listen(port, () => console.log(`Have a nice pizza: http://localhost:${port}`));
