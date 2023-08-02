const Comment = require("../models/commentModel");

// Get all comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.getAllComments();
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get comment by Id
const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.getById(id);
    res.status(200).json(comment);
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ error: "Comment not found" });
  }
};

// Add a new comment
const createComment = async (req, res) => {
  try {
    const { name, comment, parent_id } = req.body;
    const newComment = await Comment.addComment(name, comment, parent_id);
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, comment, parent_id } = req.body;
    const updatedComment = await Comment.updateComment(id, name, comment, parent_id);
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Comment.deleteComment(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
