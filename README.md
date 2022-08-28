# LIBRARY MANAGEMENT API

A library management API built with [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), and [Mongoose](https://mongoosejs.com/).

<br><br><hr>

## ENDPOINTS 

### GET  /books  
- /all => Returns all books in the library.
- /byId/:id => Returns a book with the given id.
- /like/:title => Returns all books which contain the given title.

### POST  /books  
- /new => Creates a new book.

### PUT  /books  
- /byId/:id => Updates a book with the given id.

### DELETE  /books  
- /byId/:id => Deletes a book with the given id.  

<br><br><hr>

## RUN THE API  
- clone the repository with `git clone git@github.com:milkiyd/library_management_api.git`
- run `npm install` or `yarn install` in the root directory
- run `npm start` or `yarn start` in the root directory
- make sure you have a running mongodb instance