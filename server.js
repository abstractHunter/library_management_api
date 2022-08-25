// imports
require("dotenv").config();
const express = require("express");
const cluster = require("cluster");
const os = require("os");

const indexRouter = require("./routes/index");
const bookRouter = require("./routes/book");

// constants
const app = express();
const nbCPUs = os.cpus().length;
const config = {
    port: process.env.PORT,
}

// routes
app.use("/", indexRouter);
app.use("/books", bookRouter);


if (cluster.isMaster) {
    for (let i = 0; i < nbCPUs; i++) {
        cluster.fork();
    }

    // if a worker dies, create a new one
    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    app.listen(config.port, () => {
        console.log(`Server ${process.pid} running on port ${config.port}`);
    });
}