const mongoose = require("mongoose");

const authorSchema = mongoose.Schema(
  {
    id: String,
    firstName: String,
    lastName: String,
    dob: Date, // date of birth
    books: { type: Array, default: [], ref: "Author" }, // Zero, one or multiple books,
    image: String, // URL of image
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Author", authorSchema);
