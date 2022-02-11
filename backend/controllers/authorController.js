const asyncHandler = require("express-async-handler");
const Author = require("../models/authorModel");

// @desc Get all authors
// @route GET /api/authors
// @access public

const getAuthors = asyncHandler(async (req, res) => {
  const author = await Author.find();
  res.status(200).json(author);
});

// @desc Get a author
// @route GET /api/authors/:id
// @access public

const getAuthor = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get author ${req.params.id}` });
});

// @desc Get authors of a author
// @route GET /api/authors/:id/authors
// @access public

const getAuthorBooks = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `author Authors` });
});

// @desc Set authors
// @route POST /api/authors
// @access private

const setAuthors = asyncHandler(async (req, res) => {
  if (!req.body.firstName) {
    //do zis better
    res.status(400);
    throw new Error("Please add a name");
  }
  const date = new Date(req.body.dob);
  console.log(date);
  const author = await Author.create({
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: date,
    books: req.body.books,
    image: req.body.image,
  });

  res.status(201).json({ message: "Set authors" });
});

// @desc Set books of an author
// @route POST /api/authors/:id/books
// @access private

const setAuthorBooks = asyncHandler(async (req, res) => {
  if (!req.body.authors) {
    res.status(400);
    throw new Error("Please add an author");
  }
  const author = await Author.create({
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    books: req.body.books,
    image: req.body.image,
  });

  res.status(201).json({ message: `Set author ${req.params.id} authors` });
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
  // const deletedauthor = await Author.remove(author); // deleteOne ,  deleteMany insted of remove

  res.status(200).json({ message: `Delete author ${req.params.id}` });
});

// @desc Delete a author author
// @route DELETE /api/authors/:idauthor/authors/:idAuthor
// @access private

const deleteAuthorBook = asyncHandler(async (req, res) => {
  //IMNPORTANT FINISH

  res.status(200).json({
    message: `Delete Author ${req.params.idAuthor} from author ${req.params.id}`,
  });
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
