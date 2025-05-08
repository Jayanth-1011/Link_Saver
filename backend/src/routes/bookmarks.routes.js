import express from "express";
import protect  from "../middleware/protect.js"; // Use 'protect' for auth middleware
import {
  createBookmark,
  getBookmarks,

  deleteBookmark
} from "../controllers/bookmarks.controllers.js";

const router = express.Router();

// Route to create a new bookmark
router.post("/", protect, createBookmark);

// Route to get all bookmarks for an authenticated user
router.get("/", protect, getBookmarks);


// Route to delete a bookmark
router.delete("/:id", protect, deleteBookmark);

export default router;
