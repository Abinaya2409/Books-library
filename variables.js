"use strict";

const env = process.env.NODE_ENV || "dev";
const host = process.env.APP_HOST || "localhost" 
const port = process.env.APP_PORT || 8081

const variables = {
  env,
  host,
  port
};

module.exports = variables;


