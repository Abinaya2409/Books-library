'use strict';

exports.createBook = async ctx => {
    try {
        console.log(ctx.request.body)
        const { book } = ctx.request.body;
        if (!book) {
            throw ({
                statusCode: 400,
                data: null,
                message: `Book is not defined`
            })
        }
        const bookIndex = global.books.indexOf(book);
        if (bookIndex !== -1) {
            throw ({
                statusCode: 409,
                data: null,
                message: `Book already exists`
            })
        }
        global.books.push(book);
        ctx.status = 201;
        ctx.body = {
            message: "Book added successfully"
        };
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
    }
}

exports.updateBook = async ctx => {
    try {
        const { originalBook, newBook } = ctx.request.body;
        if (!originalBook || !newBook) {
            throw ({
                statusCode: 400,
                data: null,
                message: `Missing book name`
            })
        }
        const originalBookIndex = global.books.indexOf(originalBook);
        const newBookIndex = global.books.indexOf(newBook);
        if (newBookIndex !== -1) {
            throw ({
                statusCode: 409,
                data: null,
                message: `Book already exists`
            })
        }
        if (originalBookIndex === -1) {
            throw ({
                statusCode: 404,
                data: null,
                message: `Original Book to update is not found`
            })
        }

        global.books[originalBookIndex] = newBook;
        ctx.body = {
            message: "Book updated successfully"
        }
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
    }
}

exports.deleteBook = async ctx => {
    try {
        const book = ctx.params.bookName;
        console.log(book)
        if (!book) {
            throw ({
                statusCode: 400,
                data: null,
                message: `Book is not defined`
            })
        }
        const bookIndex = global.books.indexOf(book);
        if (bookIndex === -1)
            throw ({
                statusCode: 404,
                data: null,
                message: `Book not found`
            })
        global.books.splice(bookIndex, 1);
        ctx.body = {
            message: "Book deleted successfully"
        }
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
    }
}

// In progress

function getBookList(list, index, callback) {
    if (list.length === index)
        return callback("No books");
    books += list[index] + '-'
    setTimeout(getBookList,list, index + 1, callback, 0);
}

exports.getBooks = async ctx => {
    getBookList(global.books, 0, (books) => {
        ctx.body = books;
    })
}