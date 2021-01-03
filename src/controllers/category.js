const models = require("../models");

exports.create_category = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }
    await models.category.create(req.body);
    return res.status(201).json({
      message: "Category created successfully",
    });
  } catch (error) {
    console.log("SERVER ERROR", error);
    return res.status(500).json({
      error: "internal server error occured",
    });
  }
};

exports.update_category = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }
    const category = models.category.findById({
      _id: req.params.id,
    });
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    await models.category.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body }
    );
    return res.status(200).json({
      message: "Category updated successfully",
    });
  } catch (error) {
    console.log("SERVER ERROR", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.delete_category = async (req, res) => {
  try {
    const category = await models.category.findOne({
      _id: req.params.id,
    });
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    await models.category.findByIdAndDelete({
      _id: req.params._id,
    });
    return res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log("SERVER ERROR", error);
    return res.status(500).json({
      error: "Internal server error occured",
    });
  }
};

exports.get_all_categories = async (req, res) => {
  try {
    const categories = await models.category.find({});
    if (categories.length === 0) {
      return res.status(404).json({
        message: "No categories found",
      });
    }
    return res.status(200).json(categories);
  } catch (error) {
    console.log("Server error occured", error);
    return res.status(500).json({
      error: "Internal server error occured",
    });
  }
};

exports.get_category_by_id = async (req, res) => {
  try {
    const category_id = req.params.id;
    const category = await models.category.findById({
      _id: category_id,
    });
    if (!category) {
      return res.status(404).json({
        message: "No category found",
      });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.log("SERVER ERROR", error);
    return res.status(200).json({
      error: "Internal server error occured",
    });
  }
};
