const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My Book API",
    description: "Description",
  },
  host: "localhost:8000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./routes/authorsRoutes.js",
  "./routes/booksRoutes.js",
  "./routes/userRoutes.js",
];
swaggerAutogen(outputFile, endpointsFiles, doc);
