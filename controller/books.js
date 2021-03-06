'use strict';

const util = require('util')

exports.createBook = async ctx => {
    try {
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

const waitForCallback = () => {
    return new Promise((resolve, reject) => {
        getBookList(global.books, 0, (titles) => {
            resolve(titles)
        })
    });
};

function getBookList(list, index, callback, titles = '') {
    if (list.length === index)
        return callback(titles);
    setImmediate(getBookList, list, index + 1, callback, titles += list[index] + '-');
}

exports.getBooks = async (ctx) => {
    ctx.body = await waitForCallback();
}


function saveItemOnDatabase(name, expectedOutput) {
    return new Promise((resolve, reject) => {
        const interval = parseInt(Math.random() * 100 + name.length);
        setTimeout(() => {
            expectedOutput[name] = interval;
            resolve([name, interval])
        }, interval)
    })
}
const saveBooks = async () => {
    const expectedOutput = {};
    return new Promise((resolve, reject) => {
        const booksAccumulator = [];
        const loop = async (index, callback) => {
            if (index === global.books.length) {
                await Promise.all(booksAccumulator).then(result => { callback() })
            } else {
                booksAccumulator.push(saveItemOnDatabase(global.books[index], expectedOutput))
                loop(index + 1, callback);
            }
        };
        loop(0, () => {
            resolve(expectedOutput);
        })
    })
}

exports.simulate = async (ctx) => {
    ctx.body = await saveBooks();
}