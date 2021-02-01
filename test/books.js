"use strict";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const should = require("should");

chai.use(chaiHttp);

describe("Book APIs", () => {

    describe("Create a book", () => {
        it("it should create a new book", (done) => {
            let data = {
                book: "Rich Dad Poor Dad - new",
            };
            chai
                .request(server)
                .post("/createBook")
                .send(data)
                .end((err, res) => {
                    if (err) done(err)
                    should(res.status).be.exactly(201);
                    done();
                });
        });

        it("It should show error message and status code 400", (done) => {
            let data = {
                //book: "Rich Dad Poor Dad",
            };
            chai
                .request(server)
                .post("/createBook")
                .send(data)
                .end((err, res) => {
                    if (err) done(err)
                    should(res.status).be.exactly(400);
                    done();
                });
        });

        it("Should show conflict if same book name is passed", (done) => {
            let data = {
                book: "Rich Dad Poor Dad",
            };
            chai
                .request(server)
                .post("/createBook")
                .send(data)
                .end((err, res) => {
                    if (err) done(err)
                    should(res.status).be.exactly(409);
                    done();
                });
        });
    });

    describe("Update a book", () => {
        it("it should update an existing book", (done) => {
            let data = {
                originalBook: "Rich Dad Poor Dad",
                newBook: "Rich Dad Poor Dad",
            };
            chai
                .request(server)
                .patch("/updateBook")
                .send(data)
                .end((err, res) => {
                    if (err) done(err);
                    should(res.status).be.exactly(200);
                    should(res.message).be.exactly("Book updated successfully");
                    done();
                });
        });

        it("it should show error message if book name is missing", (done) => {
            let data = {
                original_book: "Rich Dad Poor Dad"
            };
            chai
                .request(server)
                .patch("/updateBook")
                .send(data)
                .end((err, res) => {
                    should(res.status).be.exactly(400);
                    done();
                });
        });

        it("it should show error message stating book already exists", (done) => {
            let data = {
                originalBook: "Rich Dad - Poor Dad",
                newBook: "Rich Dad Poor Dad"
            };
            chai
                .request(server)
                .patch("/updateBook")
                .send(data)
                .end((err, res) => {
                    should(res.status).be.exactly(409);
                    done();
                });
        });
    });

    describe("Delete Book", () => {
        it("it should delete an existing book", (done) => {

            const book = "Rich Dad Poor Dad";
            chai
                .request(server)
                .delete(`/deleteBook/${book}`)
                .end((err, res) => {
                    if (err) done(err)
                    should(res.status).be.exactly(200);
                    done();
                });
        });
    });

    describe("Simulate Books", () => {
        it("Book Simulator", (done) => {

            chai
                .request(server)
                .put('/simulate')
                .end((err, res) => {
                    if (err) done(err);
                    should(res.status).be.exactly(200);
                    done();
                });
        });
    });

    // get all books
    describe("Fetch all books", () => {
        it("it should fetch all the books", (done) => {
            chai
                .request(server)
                .get("/books")
                .end((err, res) => {
                    if (err) done(err);
                    should(res.status).be.exactly(200);
                    done();
                });
        });
    });
});
