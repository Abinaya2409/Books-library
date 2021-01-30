"use strict";

require("dotenv").config();

const Koa = require("koa");
const variables = require("./variables");
const koaBody = require("koa-body");
const router = require("./routes");

const app = new Koa();

// Bootstrap application router
app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

global.books = [];

// Start server
 const server = app.listen(variables.port, () => {
    console.log(
      `API server listening on ${variables.host}:${variables.port}, in ${variables.env}`
    );
  });


// Expose app
module.exports = server;
