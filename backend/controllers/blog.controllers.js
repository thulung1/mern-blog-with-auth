const mongoose = require("mongoose");
const Blog = require("../models/blog.models");
const jwt = require("jsonwebtoken");

const createBlog = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Token cookie is missing" });
    }

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err) {
        return res.status(401).json({
          err,
          message: "Token is not valid",
        });
      }
      const { title, description } = req.body;
      const file = req.file.path;
  
      await Blog.create({
        title,
        description,
        photo: file,
        createdBy: data._id,
      });
  
      return res.status(200).json({
        message: "Post created successfully",
      });
    });

  
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const fetchBlogs = async (req, res) => {
  try {
    const data = await Blog.find()
      .populate("createdBy", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const fetchSingleBlog = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Blog.findById(id).populate("createdBy", ["username"]);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateBlog = async (req, res) => {
  const token = req.cookies.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Token is not authorized",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(401).json(err);
    }
    const { id, title, description } = req.body;
    const file = req.file.path;
    const postDoc = await Blog.findById(id);

    const isCreatedBy =
      JSON.stringify(postDoc.createdBy) === JSON.stringify(data._id);
    if (!isCreatedBy) {
      return res.Status(400).json("You are not an author");
    }

    await Blog.findByIdAndUpdate(postDoc, {
      title,
      description,
      photo: file ? file : postDoc.photo,
    });
    return res.status(200).json(postDoc);
  });
};

module.exports = {
  createBlog,
  fetchBlogs,
  fetchSingleBlog,
  updateBlog,
};
