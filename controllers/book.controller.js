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

async function getBooksByAuthor(author) {
    try {
        const books = await Book.find({ $or: [{ "author.firstName": author }, { "author.lastName": author }] });
        return books;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getBookByTitle(title) {
    try {
        const book = await Book.findOne({ title });
        return book;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getBooksByTitle(title) {
    try {
        const books = await Book.find({ title: { $regex: '.*' + title + '.*' } });
        return books;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function updateBookById(id, book) {
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true });
        return updatedBook;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function deleteBookById(id) {
    try {
        const book = await Book.findByIdAndDelete(id);
        return book;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function deleteAllBooks() {
    try {
        const allBooks = await Book.deleteMany();
        return allBooks;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    getBooksByAuthor,
    getBookByTitle,
    getBooksByTitle,
    updateBookById,
    deleteAllBooks,
    deleteBookById
};