const express = require("express");
const fs = require("fs");

const server = express();

const portServer = 4001;


server.set("view engine", "ejs")
server.set("views", "views")


server.get("/", (req, res) => {
    res.status(200);
    res.render("index")
});


server.get("/index", (req, res) => {
	res.status(200);
	res.render("index");
});


server.get("*", (req, res) => {
	res.status(404);
	res.render("error404");
});

server.listen(portServer, (req, res) => {
    console.log(`Server is running on port: ${portServer}`);
});