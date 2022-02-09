const express = require("express");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 8000;

const app = express();

app.use("/api/books", require("./routes/booksRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
