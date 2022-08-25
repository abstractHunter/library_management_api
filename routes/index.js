const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World");
    console.log(`PID : ${process.pid} : ${new Date()} - GET /`);
});

module.exports = router;