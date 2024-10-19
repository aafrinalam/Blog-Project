const blogModel = require("../models/blogModel");    //import blogModel
const authorModel = require("../models/authorModel");    //import authorModel

// Solution-1) by using post method to create the blog

const createBlog = async (req, res)=> {      //Arrow allow you to create function in a cleaner way,compared to regular functions.
  try {
    let blog = req.body;
    let authorId = blog.authorId;
    if (!authorId) {
      return res.status(400).send({ status: false, message: "please provide Id " });
    }
    console.log(authorId)
    if (!blog) {
      return res.status(400).send({ status: false, message: "Blog data required" });
    }

    let author = await authorModel.findById(authorId);
    if (!author)
      return res.status(404).send({ status: false, message: "Please provide valid Id" });

    let blogCreated = await blogModel.create(blog);
    res.status(201).send({ status: true, message: blogCreated });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


// Solution-2) By using get request fetch the data 

const getBlogs = async (req, res) => {
  try {
      const data = req.query
      const blogs = await blogModel.find({$and : [data, { isDeleted: false }, { isPublished: true }]}).populate("authorId")
      if (blogs.length == 0) return res.status(404).send({ status: false, msg: "No blogs Available." })
      res.status(200).send({ status: true, count: blogs.length, data: blogs });
  }
  catch (error) {
      res.status(500).send({ status: false, msg: error.message });
  }
}

// Solution-3) By using put request to update the blog

const updateBlog = async (req, res)=> {    //Arrow allow you to create function in a cleaner way,compared to regular functions.
  try {
    let blogId = req.params.blogId;
    const id = await blogModel.findById(blogId);

    if (!id) {
      return res.status(404).send({ msg: "data not found" });
    }
    let data = await blogModel.findOneAndUpdate(
      { _id: req.params.blogId },
      {
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags,
        subCategory: req.body.subCategory,
        PublishedAt: new Date(),
        isPublished: true,
      },
      { new: true }                 //It will show the updated output 
    );
    res.status(200).send({ message: "successfully updated", data: data });
  } catch (error) {
    res.status(500).send({ status: false, message: "error-response-status" });
  }
};

// Solution-4) By using delete request, delete blog by Id

const deleteBlog = async (req, res) =>{
  try {
    let blogsId = req.params.blogId;
    let present = await blogModel.findOneAndUpdate({
      $and: [{ _id: blogsId }, { isDeleted: false }],
      $set: { isDeleted: true },
      new: true,
    });
    res.status(200).send({ status: true, out: present });
  } catch (error) {
    res.status(500).send({ status: false, data: error.message });
  }
};

// Solution-5) By using delete request, delete blog by QueryParams

const deletedByQueryParams = async (req, res) =>{
  try {
    const data = req.query;
    if (Object.keys(data) == 0)    // it's a method to check the user gives input that present or not
      return res.status(400).send({ status: false, message: "No input provided" });
    const deleteByQuery = await blogModel.updateMany(data,{ isDeleted: true, deletedAt: new Date() },
      { new: true }               //It will show the updated output
    );
    if (!deleteByQuery)
      return res.status(404).send({ status: false, message: "No such blog found" });
    res.status(200).send({ status: true, message: deleteByQuery });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.createBlog = createBlog;     
module.exports.updateBlog = updateBlog;
module.exports.getBlogs = getBlogs;
module.exports.deleteBlog = deleteBlog;
module.exports.deletedByQueryParams = deletedByQueryParams;
