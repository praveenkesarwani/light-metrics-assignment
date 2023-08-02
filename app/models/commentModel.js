const { DataTypes } = require("sequelize");
const sequelize = require("../../config/config");

const Comment = sequelize.define(
  "comment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Comment.hasMany(Comment, { foreignKey: "parent_id", as: "children" });

Comment.getAllComments = async () => {
  const comments = await Comment.findAll({
    include: [
      {
        model: Comment,
        as: "children",
        attributes: ["id", "name", "comment", "created_at", "updated_at"],
      },
    ],
    attributes: ["id", "name", "comment", "created_at", "updated_at"],
    where: { parent_id: null },
    order: [
      ["id", "ASC"],
      [{ model: Comment, as: "children" }, "id", "ASC"],
    ],
  });
  return comments;
};

Comment.addComment = async (name, comment, parent_id) => {
  try {
    const newComment = await Comment.create({ name, comment, parent_id });
    return newComment;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error("Error creating comment: " + error.message);
  }
};

Comment.getById = async (id) => {
  try {
    const comment = await Comment.findByPk(id, {
      include: [
        {
          model: Comment,
          as: "children",
          attributes: ["id", "name", "comment", "created_at", "updated_at"],
        },
      ],
      attributes: ["id", "name", "comment", "created_at", "updated_at"],
      order: [
        ["id", "ASC"],
        [{ model: Comment, as: "children" }, "id", "ASC"],
      ],
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    return comment;
  } catch (error) {
    throw new Error("Error fetching comment: " + error.message);
  }
};

Comment.updateComment = async (id, name, comment, parent_id) => {
  try {
    const [updatedCount, updatedComments] = await Comment.update({ name, comment, parent_id }, { where: { id }, returning: true });
    if (updatedCount === 0) {
      throw new Error("Comment not found");
    }
    return updatedComments[0];
  } catch (error) {
    console.error("Error updating comment:", error);
    throw new Error("Error updating comment:", error);
  }
};

Comment.deleteComment = async (id) => {
  try {
    const deletedCommentCount = await Comment.destroy({ where: { id } });
    if (deletedCommentCount === 0) {
      throw new Error("Comment not found");
    }
    return deletedCommentCount;
  } catch (error) {
    throw new Error("Error deleting comment:", error);
  }
};

module.exports = Comment;
