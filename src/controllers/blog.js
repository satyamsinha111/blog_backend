const models = require("../models");

//Create a blog
exports.create_blog = async (req, res) => {
  try {
    console.log("Got data", req.body);
    if (!req.body.name) {
      return res.status(400).json({
        error: "Please enter the name of the blog",
      });
    }
    if (!req.body.content) {
      return res.status(400).json({
        error: "Please enter some content",
      });
    }
    const blog_created = await models.blog.create(req.body);
    const blog_id = blog_created._id;
    const user_id = req.user._id;
    //Save in mapping
    await models.data_mapping.create({
      user: user_id,
      blog: blog_id,
    });
    console.log(blog_created);
    res.status(200).json({
      message: "Blog created",
    });
  } catch (error) {
    console.log("SERVER ERROR", error);
  }
};

exports.update_blog = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        message: "Title is required",
      });
    }
    if (!req.body.content) {
      return res.status(400).json({
        message: "Content is required",
      });
    }
    const blog_id = req.params.id;
    const do_blog_exists = await models.blog.findById({
      _id: blog_id,
    });

    if (!do_blog_exists) {
      return res.status(400).json({
        message: "Blog doesn`t exists",
      });
    }

    await models.blog.findByIdAndUpdate(
      {
        _id: blog_id,
      },
      { $set: req.body }
    );
    return res.status(200).json({
      message: "Blog updated successfully",
    });
  } catch (error) {
    console.log("SERVER ERROR OCCURED", error);
    return res.status(500).json({
      error: "Internal server error occured",
    });
  }
};

exports.delete_blog = async (req, res) => {
  try {
    const blog_id = req.params.id;
    const do_blog_exists = await models.blog.findById({
      _id: blog_id,
    });

    if (!do_blog_exists) {
      return res.status(400).json({
        message: "Blog doesn`t exists",
      });
    }

    await models.blog.findByIdAndDelete({
      _id: blog_id,
    });

    return res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log("SERVER ERROR OCCURED", error);
    return res.status(500).json({
      message: "Internal server error occured",
    });
  }
};

exports.get_all_blogs = async (req, res) => {
  try {
    const blogs = await models.blog.find({});
    if (blogs.length === 0) {
      return res.status(404).json({
        message: "No blogs found",
      });
    }
    return res.status(200).json(blogs);
  } catch (error) {
    console.log("SERVER ERROR OCCURED", error);
    return res.status(500).json({
      error: "Internal server error occured",
    });
  }
};

exports.get_blogs_by_id = async (req, res) => {
  try {
    const blog = await models.blog.findById({
      _id: req.params.id,
    });
    if (!blog) {
      return res.status(404).json({
        message: "No blogs found",
      });
    }
    return res.status(200).json(blog);
  } catch (error) {
    console.log("SERVER ERROR OCCURED", error);
    return res.status(500).json({
      error: "Internal server error occured",
    });
  }
};
