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
    const book = req.body;
    const isAlphanum = /^[a-zA-Z0-9_\-\s]+$/; // allow only alphanumeric and hyphen, dash or space
    const isDate = /\d{4}-\d{2}-\d{2}/; // allow only date format YYYY-MM-DD

    if (!book.title || !book.author || !book.pubDate) {
        return res.status(400).json({
            message: "Title, Author and PubDate are required"
        });
    }
    if (!isAlphanum.test(book.title)) {
        return res.status(400).json({
            message: "Title must be alphanumeric and hyphen, dash or space separated"
        });
    }
    if (!isDate.test(book.pubDate)) {
        return res.status(400).json({
            message: "PubDate must be in YYYY-MM-DD format"
        });
    }

    // console.log(book);

    bookController.createBook(book)
        .then(book => {
            res.status(201).json(book);
        }).catch(err => {
            res.status(500).json(err);
        }).finally(() => {
            console.log(`PID : ${process.pid} : ${new Date()} - POST /books`);
        });
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