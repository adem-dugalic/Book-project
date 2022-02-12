const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");
const mongoose = require("mongoose");

// @desc Get all books
// @route GET /api/books
// @access public

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find().populate({
    path: "authors",
    model: "Author",
  });
  res.status(200).json(books);
});

// @desc Get a book
// @route GET /api/books/:id
// @access public

const getBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate({
    path: "authors",
    model: "Author",
  });
  if (!book) {
    res.status(400);
    throw new Error("Book not foun");
  }
  res.status(200).json(book);
});

// @desc Get authors of a book
// @route GET /api/books/:id/authors
// @access public

const getBookAuthors = asyncHandler(async (req, res) => {
  const bookAuthors = await Book.findById(req.params.id).populate({
    path: "authors",
    model: "Author",
  });
  if (!bookAuthors) {
    res.status(400);
    throw new Error("Book does not exist");
  }
  res.status(200).json(bookAuthors.authors);
});

// @desc Set books
// @route POST /api/books
// @access private

const setBooks = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    //do zis better
    res.status(400);
    throw new Error("Please add a title");
  }
  const book = await Book.create({
    isbn: req.body.isbn,
    title: req.body.title,
    pages: req.body.pages,
    published: req.body.published,
    // authors: req.body.authors,
    image: req.body.image,
  });

  res.status(201).json({ message: "Set Book" });
});

// @desc Set authors of a book
// @route POST /api/books/:id/authors
// @access private

const setBookAuthors = asyncHandler(async (req, res) => {
  if (!req.body.author) {
    res.status(400);
    throw new Error("Please add an author");
  }
  const author = mongoose.Types.ObjectId(req.body.author);
  const addedBookAuthors = await Book.findByIdAndUpdate(req.params.id, {
    $push: { authors: author },
  });

  res.status(201).json({ message: `Set Book author` });
});

// @desc Update a book
// @route PUT /api/books/:id
// @access private

const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(400);
    throw new Error("Book not found");
  }

  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBook);
});

// @desc Delete a book
// @route DELETE /api/books/:id
// @access private

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(400);
    throw new Error("Book not fund");
  }

  await book.remove();
  // const deletedBook = await Book.remove(book); // deleteOne ,  deleteMany insted of remove

  res.status(200).json({ message: `Delete Book ${req.params.id}` });
});

// @desc Delete a book author
// @route DELETE /api/books/:idBook/authors/:idAuthor
// @access private

const deleteBookAuthor = asyncHandler(async (req, res) => {
  const authors = mongoose.Types.ObjectId(req.params.idAuthor);
  const book = await Book.findByIdAndUpdate(req.params.id, {
    $pull: { authors: authors },
  });

  if (!book) {
    res.status(400);
    throw new Error("Book not fund");
  }

  res.status(200).json({ message: "Author deleted from book" });
});

module.exports = {
  getBooks,
  getBook,
  getBookAuthors,
  setBooks,
  setBookAuthors,
  updateBook,
  deleteBook,
  deleteBookAuthor,
};
