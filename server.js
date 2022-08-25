// imports
require("dotenv").config();
const express = require("express");
const cluster = require("cluster");
const os = require("os");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const bookRouter = require("./routes/book");


// constants
const app = express();
const nbCPUs = os.cpus().length;
const config = {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
}


// connect to mongoDB
mongoose.connect(
    config.mongoURI,
    () => {
        console.log(`${process.pid} connected to mongoDB`);
    },
    err => {
        console.log(err);
    }
)

// parse json
app.use(express.json());


// routes
app.use("/", indexRouter);
app.use("/books", bookRouter);


// start server
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