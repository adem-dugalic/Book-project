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
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getBooks).post(protect, setBooks);

router
  .route("/:id")
  .get(getBook)
  .put(protect, updateBook)
  .delete(protect, deleteBook);

router.route("/:id/authors").get(getBookAuthors).post(protect, setBookAuthors);

router.delete("/:id/authors/:idAuthor", protect, deleteBookAuthor);

// router.get("/", getBooks);

//router.get("/:id", getBook);

//router.get("/:id/authors", getBookAuthors);

// router.post("/", setBooks);

//router.post("/:id/authors", setBookAuthors);

//router.put("/:id", updateBook);

//router.delete("/:id", deleteBook);

module.exports = router;
