if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const app = express();

app.use(cors());
app.use(express.json());


//routes



//error catches
app.use(notFound);
app.use(errorHandler);
module.exports = app;
