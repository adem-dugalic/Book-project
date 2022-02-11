const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");

// @desc Get all books
// @route GET /api/books
// @access public

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
});

// @desc Get a book
// @route GET /api/books/:id
// @access public

const getBook = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get Book ${req.params.id}` });
});

// @desc Get authors of a book
// @route GET /api/books/:id/authors
// @access public

const getBookAuthors = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Book Authors` });
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
    authors: req.body.authors,
    image: req.body.image,
  });

  res.status(201).json({ message: "Set Books" });
});

// @desc Set authors of a book
// @route POST /api/books/:id/authors
// @access private

const setBookAuthors = asyncHandler(async (req, res) => {
  if (!req.body.authors) {
    res.status(400);
    throw new Error("Please add an author");
  }
  const book = await Book.create({
    isbn: req.body.isbn,
    title: req.body.title,
    pages: req.body.pages,
    published: req.body.published,
    authors: req.body.authors,
    image: req.body.image,
  });

  res.status(201).json({ message: `Set Book ${req.params.id} authors` });
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
  //IMNPORTANT FINISH

  res.status(200).json({
    message: `Delete Author ${req.params.idAuthor} from book ${req.params.id}`,
  });
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
