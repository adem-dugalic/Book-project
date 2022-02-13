const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const connectDB = require("./config/db");

const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/books", require("./routes/booksRoutes"));
app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/authors", require("./routes/authorsRoutes"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
