const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    isbn: String, // International Standard Book Number (unique)
    title: String,
    pages: Number, // Total page numbers
    published: Number, // Year of publication
    authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
      },
    ], // Zero, one or multiple authors,
    image: String, // URL of image
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
