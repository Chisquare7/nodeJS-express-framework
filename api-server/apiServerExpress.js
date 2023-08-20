const express = require("express");
const inventoryRoute = require("./routes/inventory");

const server = express();

const portServer = 5001;

server.use("/inventory", inventoryRoute);

server.listen(portServer, () => {
    console.log(`Server is running on port: ${portServer}`);
})