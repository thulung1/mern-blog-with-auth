const express = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const blogRouter = express.Router();

const { createBlog, fetchBlogs, fetchSingleBlog, updateBlog } = require("../controllers/blog.controllers");

blogRouter.post("/", upload.single("file"), createBlog);
blogRouter.get("/", fetchBlogs);
blogRouter.get("/:id", fetchSingleBlog);
blogRouter.put("/", upload.single("file"), updateBlog);

module.exports = blogRouter;
