// @desc Get all books
// @route GET /api/books
// @access public

const getBooks = (req, res) => {
  res.status(200).json({ message: "Get Books" });
};

// @desc Get a book
// @route GET /api/books/:id
// @access public

const getBook = (req, res) => {
  res.status(200).json({ message: `Get Book ${req.params.id}` });
};

// @desc Get authors of a book
// @route GET /api/books/:id/authors
// @access public

const getBookAuthors = (req, res) => {
  res.status(200).json({ message: `Book Authors` });
};

// @desc Set books
// @route POST /api/books
// @access private

const setBooks = (req, res) => {
  res.status(201).json({ message: "Set Books" });
};

// @desc Set authors of a book
// @route POST /api/books/:id/authors
// @access private

const setBookAuthors = (req, res) => {
  res.status(201).json({ message: `Set Book ${req.params.id} authors` });
};

// @desc Update a book
// @route PUT /api/books/:id
// @access private

const updateBook = (req, res) => {
  res.status(200).json({ message: `Update Book ${req.params.id}` });
};

// @desc Delete a book
// @route DELETE /api/books/:id
// @access private

const deleteBook = (req, res) => {
  res.status(200).json({ message: `Delete Book ${req.params.id}` });
};

// @desc Delete a book author
// @route DELETE /api/books/:idBook/authors/:idAuthor
// @access private

const deleteBookAuthor = (req, res) => {
  res.status(200).json({
    message: `Delete Author ${req.params.idAuthor} from book ${req.params.id}`,
  });
};

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
