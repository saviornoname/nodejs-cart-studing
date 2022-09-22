const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="messadge"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");

    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const messadge = parseBody.split("=")[1];
      fs.writeFile("messadge.txt", messadge, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");

        return res.end();
      });
    });
  }
  // console.log(req.url, req.method, req.headers)
  res.setHeader("Content-type", "text/html");

  res.write("<html>");
  res.write("<head><title>Enter Message</title></head>");
  res.write("<body><p>OK</p></body>");
  res.write("</html>");

  return res.end();
};

module.exports = requestHandler;
