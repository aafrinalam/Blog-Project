const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const blogController = require("../controller/blogController");
const mid1 = require("../middleware/authentication");
const mid2 = require("../middleware/authorization");



router.post("/createAuthors", authorController.createAuthor); //creating author
router.post("/loginUser", authorController.loginUser); //login author

router.post("/createBlogs",mid1.authentication,blogController.createBlog); //creating blog
router.get("/fetchBlogs",mid1.authentication,blogController.getBlogs); //fetch blogs
router.put("/updateBlogs/:blogId",mid1.authentication,mid2.authorization,blogController.updateBlog); //update blog

router.delete("/deleteById/:blogId",mid1.authentication,mid2.authorization, blogController.deleteBlog); //deleteById blog
router.delete("/deletedByQueryParams",mid1.authentication,blogController.deletedByQueryParams); //queryParams blog

module.exports = router;

