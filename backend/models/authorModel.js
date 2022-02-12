const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const authorSchema = mongoose.Schema(
  {
    id: { type: String, default: uuidv4() },
    firstName: String,
    lastName: String,
    dob: Date, // date of birth
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ], // Zero, one or multiple books,
    image: String, // URL of image
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Author", authorSchema);
