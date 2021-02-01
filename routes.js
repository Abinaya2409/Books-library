"use strict";

const Router = require("koa-router");

const {
    createBook,
    getBooks,
    deleteBook,
    updateBook,
    simulate
} = require("./controller/books");

const router = new Router();

router
    .post("/createBook", createBook)
    .get("/books", getBooks)
    .delete("/deleteBook/:bookName", deleteBook)
    .patch("/updateBook", updateBook)
    .put("/simulate", simulate)

module.exports = router;
