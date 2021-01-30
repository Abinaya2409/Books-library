"use strict";

const env = process.env.NODE_ENV;
const host = process.env.APP_HOST;
const port = process.env.APP_PORT;

const variables = {
  env,
  host,
  port
};

module.exports = variables;


