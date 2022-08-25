const express = require("express");
const router = express.Router();
const Book = require("../models/Book.js");
const bookController = require("../controllers/book.controller.js");


router.get("/", async(req, res) => {
    const books = await bookController.getAllBooks()
    res.status(200).json(books);
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