const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql");
const http = require("http");
const socketIo = require("socket.io");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "jiwooity1",
  database: "skinclouds",
});

connection.connect();

app.listen(8080, () => {
  console.log("listening on 8080");
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(express.json());
const cors = require("cors");
app.use(cors());

app.use(express.static(path.join(__dirname, "nodejs/build")));

app.get("/test", (req, res) => {
  connection.query("SELECT * FROM skinfile", (err, rows, fields) => {
    res.send(rows);
  });
});

io.on("connection", (socket) => {
  console.log("123");
  socket.on("message", (msg) => {
    io.emit("message", msg);
  });
});
