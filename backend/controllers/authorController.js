const asyncHandler = require("express-async-handler");
const Author = require("../models/authorModel");
const mongoose = require("mongoose");

// @desc Get all authors
// @route GET /api/authors
// @access public

const getAuthors = asyncHandler(async (req, res) => {
  const author = await Author.find().populate({
    path: "books",
    model: "Book",
  });
  res.status(200).json(author);
});

// @desc Get a author
// @route GET /api/authors/:id
// @access public

const getAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id).populate({
    path: "books",
    model: "Book",
  });
  if (!author) {
    res.status(400);
    throw new Error("Author not found");
  }
  res.status(200).json(author);
});

// @desc Get authors of a author
// @route GET /api/authors/:id/books
// @access public

const getAuthorBooks = asyncHandler(async (req, res) => {
  const authorBooks = await Author.findById(req.params.id).populate({
    path: "books",
    model: "Book",
  });
  if (!authorBooks) {
    res.status(400);
    throw new Error("Author does not exist");
  }
  res.status(200).json(authorBooks.books);
});

// @desc Set authors
// @route POST /api/authors
// @access private

const setAuthors = asyncHandler(async (req, res) => {
  if (!req.body.firstName) {
    res.status(400);
    throw new Error("Please add a name");
  }

  const books = req.body.books;
  let objectBooks = [];
  books &&
    books.map((i) => {
      objectBooks.push(mongoose.Types.ObjectId(i));
    });

  const date = new Date(req.body.dob);
  const author = await Author.create({
    // id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: date,
    image: req.body.image,
  });

  if (books) {
    const addedAuthorBooks = await Author.findByIdAndUpdate(author._id, {
      $push: { books: { $each: objectBooks } },
    });
  }

  console.log("nope");

  res.status(201).json({ message: "Set authors" });
});

// @desc Set books of an author
// @route POST /api/authors/:id/books
// @access private

const setAuthorBooks = asyncHandler(async (req, res) => {
  if (!req.body.books) {
    res.status(400);
    throw new Error("Please add an author");
  }

  const books = req.body.books;
  let objectBooks = [];
  books.map((i) => {
    objectBooks.push(mongoose.Types.ObjectId(i));
  });
  const addedAuthorBooks = await Author.findByIdAndUpdate(req.params.id, {
    $push: { books: { $each: objectBooks } },
  });
  res.status(201).json({ message: `Set author a book to author` });
});

// @desc Update a author
// @route PUT /api/authors/:id
// @access private

const updateAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);

  if (!author) {
    res.status(400);
    throw new Error("author not found");
  }

  const updatedAuthor = await Author.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedAuthor);
});

// @desc Delete a author
// @route DELETE /api/authors/:id
// @access private

const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);

  if (!author) {
    res.status(400);
    throw new Error("author not fund");
  }

  await author.remove();

  res.status(200).json({ message: `Delete author ${req.params.id}` });
});

// @desc Delete a author author
// @route DELETE /api/authors/:id/books/:idBook
// @access private

const deleteAuthorBook = asyncHandler(async (req, res) => {
  const book = mongoose.Types.ObjectId(req.params.idBook);
  const author = await Author.findByIdAndUpdate(req.params.id, {
    $pull: { books: book },
  });

  if (!author) {
    res.status(400);
    throw new Error("Author not fund");
  }

  res.status(200).json({ message: "Book deleted from author" });
});

module.exports = {
  getAuthors,
  getAuthor,
  getAuthorBooks,
  setAuthors,
  setAuthorBooks,
  updateAuthor,
  deleteAuthor,
  deleteAuthorBook,
};
