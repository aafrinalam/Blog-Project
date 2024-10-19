const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");

let authorization = async (req, res, next) => {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res
        .status(400)
        .send({ status: false, msg: "token Must Be Present" });
    }

    let decodeToken = jwt.verify(token, "Secret-key");
    if (!decodeToken) {
      return res.status(401).send({ status: false, msg: "Invalid Token" });
    }

    let blogId = req.params.blogId;

    let blog = await blogModel.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .send({ status: false, msg: "Blog Not Found , Please Check Blog Id" });
    }

    let ownerOfBlog = blog.authorId;

    if (decodeToken.authorId != ownerOfBlog) {
      return res
        .status(403)
        .send({
          status: false,
          msg: "User logged is not allowed to modify the requested users data",
        });
    }

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};


module.exports.authorization = authorization;
