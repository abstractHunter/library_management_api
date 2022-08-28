const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller.js");


// ########################################################################################
// ###############################     GET /books     #####################################
// ########################################################################################
router.get("/all", async(req, res) => {
    const books = await bookController.getAllBooks()
    res.status(200).json(books);
    console.log(`PID : ${process.pid} : ${new Date()} - GET /books/all`);
});

router.get("/like/:title", async(req, res) => {
    const title = req.params.title;

    // validate title
    if (!isValidTitle(title)) {
        return res.status(400).json({
            message: "Invalid title"
        });
    }

    // find books by title
    const books = await bookController.getBooksByTitle(title);
    if (books.length === 0) {
        return res.status(404).json({
            message: "No books found"
        });
    }
    console.log(`PID : ${process.pid} : ${new Date()} - GET /books/like/${title}`);
    return res.status(200).json(books);
});

router.get("/byId/:id", async(req, res) => {
    const id = req.params.id;

    // validate id
    if (!isValidId(id)) {
        return res.status(400).json({
            message: "Invalid id"
        });
    }

    // get book by id
    const book = await bookController.getBookById(id);
    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }
    console.log(`PID : ${process.pid} : ${new Date()} - GET /books/byId/${id}`);
    return res.status(200).json(book);
});


// ########################################################################################
// ###############################     POST /books     ####################################
// ########################################################################################
router.post("/new", async(req, res) => {
    const book = req.body;

    // validate book
    try {
        validateBook(book);
    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }

    // check if book already exists
    oldBook = await bookController.getBooksByTitle(book.title);
    if (oldBook.length > 0) {
        return res.status(409).json({
            message: "Book already exists"
        });
    }

    // create book
    const newBook = await bookController.createBook(book);
    console.log(`PID : ${process.pid} : ${new Date()} - POST /books/new`);
    return res.status(201).json(newBook);
});


// ########################################################################################
// ###############################     PUT /books     #####################################
// ########################################################################################
router.put("/byId/:id", async(req, res) => {
    const id = req.params.id;
    const newBook = req.body;

    // validate id
    if (!isValidId(id)) {
        return res.status(400).json({
            message: "Invalid id"
        });
    }

    // validate book
    try {
        validateBook(newBook);
    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }

    // check if book exists
    const oldBook = await bookController.getBookById(id);
    if (!oldBook) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    // update updatedAt field
    newBook.updatedAt = new Date();

    // update book
    const updatedBook = await bookController.updateBookById(id, newBook);
    console.log(`PID : ${process.pid} : ${new Date()} - PUT /books/byId/${id}`);
    return res.status(200).json(updatedBook);
});


// ########################################################################################
// ###############################     DELETE /books     ##################################
// ########################################################################################
router.delete("/byId/:id", (req, res) => {
    const id = req.params.id;

    // validate id
    if (!isValidId(id)) {
        return res.status(400).json({
            message: "Invalid id"
        });
    }

    // check if book exists
    if (!bookController.getBookById(id)) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    // delete book
    bookController.deleteBookById(id);
    console.log(`PID : ${process.pid} : ${new Date()} - DELETE /books/byId/${id}`);
    return res.status(200).json({
        message: "Book deleted"
    });
});

/* router.delete("/like/:title", (req, res) => {
    const title = req.params.title;

    // validate title
    if (!isValidTitle(title)) {
        return res.status(400).json({
            message: "Invalid title"
        });
    }

    // delete books by title
    bookController.deleteBooksByTitle(title);
    console.log(`PID : ${process.pid} : ${new Date()} - DELETE /books/like/${title}`);
    return res.status(200).json({
        message: "Books deleted"
    });
}); */


const validateBook = (book) => {
    const isAlphanum = /^[a-zA-Z0-9_\-\s]+$/; // allow only alphanumeric and hyphen, dash or space
    const isDate = /\d{4}-\d{2}-\d{2}/; // allow only date format YYYY-MM-DD
    if (!book.title || !book.author || !book.pubDate) {
        throw new Error("Title, Author and PubDate are required");
    }
    if (!isValidTitle(book.title)) {
        throw new Error("Title must be alphanumeric and hyphen, dash or space separated");
    }
    if (!isDate.test(book.pubDate)) {
        throw new Error("PubDate must be in YYYY-MM-DD format");
    }
    return true;
}

const isValidId = (id) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return false;
    }
    return true;
}

const isValidTitle = (title) => {
    if (!title.match(/^[a-zA-Z0-9_\-\s]+$/)) {
        return false;
    }
    return true;
}

module.exports = router;