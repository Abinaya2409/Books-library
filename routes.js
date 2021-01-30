"use strict";

const Router = require("koa-router");

const {
    createBook,
    getBooks,
    deleteBook,
    updateBook
} = require("./controller/books");

const router = new Router();

router
    .post("/createBook", createBook)

    //In progress
    .get("/books", getBooks)

    .delete("/deleteBook/:bookName", deleteBook)
    .patch("/updateBook", updateBook)

module.exports = router;
