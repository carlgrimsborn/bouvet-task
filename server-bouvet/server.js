import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const server = express();

server.use(cors());

server.all("/*", function (req, res, next) {
  //security
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With",
    "Content-Type",
    "Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST", "GET");
  //go to next function
  next();
});

server.get("/", (req, res) => {
  fetch("https://lobs.se/rekrytering_flera.php")
    .then((res) => res.text())
    .then((data) => {
      if (data) {
        res.json({
          data: data,
        });
      } else {
        res.json({
          errors: "no data",
        });
      }
      console.log(data);
    });
});

server.listen(4000, () => {
  console.log("server is listening on port 4000");
});
