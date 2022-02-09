const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookAuthors,
  getBook,
  setBookAuthors,
  deleteBookAuthor,
  deleteBook,
  updateBook,
  setBooks,
} = require("../controllers/bookController");

// router.get('/api/books', (req, res) => {
//     res.status(200).json({message: 'Get Books'})
// })

router.get("/", getBooks);

router.get("/:id", getBook);

router.get("/:id/authors", getBookAuthors);

router.post("/", setBooks);

router.post("/:id/authors", setBookAuthors);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

router.delete("/:id/authors/:idAuthor", deleteBookAuthor);

module.exports = router;
