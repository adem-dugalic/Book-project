const express = require("express");
const router = express.Router();
const {
  getAuthors,
  getAuthor,
  getAuthorBooks,
  setAuthors,
  setAuthorBooks,
  updateAuthor,
  deleteAuthor,
  deleteAuthorBook,
} = require("../controllers/authorController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getAuthors).post(protect, setAuthors);

router
  .route("/:id")
  .get(getAuthor)
  .put(protect, updateAuthor)
  .delete(protect, deleteAuthor);

router.route("/:id/books").get(getAuthorBooks).post(protect, setAuthorBooks);

router.delete("/:id/books/:idBook", protect, deleteAuthorBook);

module.exports = router;
