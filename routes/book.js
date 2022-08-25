const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.send("got a GET request");
    console.log(`PID : ${process.pid} : ${new Date()} - GET /books`);
});

router.post("/", (req, res) => {
    res.send("got a POST request");
    console.log(`PID : ${process.pid} : ${new Date()} - POST /books`);
});

router.put("/", (req, res) => {
    res.send("got a PUT request");
    console.log(`PID : ${process.pid} : ${new Date()} - PUT /books`);
});

router.delete("/", (req, res) => {
    res.send("got a DELETE request");
    console.log(`PID : ${process.pid} : ${new Date()} - DELETE /books`);
});

module.exports = router;