const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: [{
        type: String,
        required: true
    }],
    genre: String,
    summary: String,
    pubDate: Date,
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;