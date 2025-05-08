import Bookmark from "../models/bookmarks.schema.js";
import { getFavicon } from "../utils/getFevicon.js";
import { getPageTitle } from "../utils/getPageTitle.js";
import { summarizeWithJina } from "../utils/JinaAi.js";

// @desc    Create a new bookmark
// @route   POST /api/bookmarks
// @access  Private
export const createBookmark = async (req, res) => {
  const { url, tag } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    const title = await getPageTitle(url);
    const favicon = await getFavicon(url);
    const discription = await summarizeWithJina(url)

    const bookmark = new Bookmark({
      favicon,
      title,
      url,
      discription,
      tags: [tag],
      user: req.user.id,
    });

    const saved = await bookmark.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating bookmark:", err.message);
    res.status(500).json({ message: "Server error while saving bookmark" });
  }
};

// @desc    Get all bookmarks for logged-in user
// @route   GET /api/bookmarks
// @access  Private
export const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching bookmarks" });
  }
};

// @desc    Delete a bookmark
// @route   DELETE /api/bookmarks/:id
// @access  Private
export const deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    if (bookmark.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Bookmark.findByIdAndDelete(req.params.id);
    res.json({ message: "Bookmark deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error deleting bookmark" });
  }
};
