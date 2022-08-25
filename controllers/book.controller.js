const Book = require("../models/Book.js");

async function createBook(book) {
    try {
        const newBook = await Book.create(book);
        return newBook;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getAllBooks() {
    try {
        const allBooks = await Book.find();
        return allBooks;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getBookById(id) {
    try {
        const book = await Book.findById(id);
        return book;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
};