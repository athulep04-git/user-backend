require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db");

const route = require("./router/route");

const server = express();

server.use(cors());
server.use(express.json());
server.use(route);
server.use('/uploads',express.static('./uploads'))
const PORT = process.env.PORT || 3000;

server.get("/", (req, res) => {
  res.send("welcome to crud server");
});

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
