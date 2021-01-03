const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        error: "Name is required",
      });
    }
    if (!req.body.email) {
      return res.status(400).json({
        error: "Email is required",
      });
    }
    if (!req.body.password) {
      return res.status(400).json({
        error: "Password is required",
      });
    }
    req.body["password"] = bcrypt.hashSync(req.body["password"], 10);
    console.log(req.body);
    await models.user.create(req.body);
    return res.status(200).json({
      message: "Signed up successfully",
    });
  } catch (error) {
    console.log("SERVER ERROR", error);
  }
};

exports.signin = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        error: "Email is required",
      });
    }
    if (!req.body.password) {
      return res.status(400).json({
        error: "Password is required",
      });
    }
    const user = await models.user.findOne({ email: req.body.email });
    const is_password_valid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    console.log(is_password_valid);
    if (is_password_valid) {
      console.log("Password is valid");
      let token = jwt.sign({ _id: user._id }, "shhh");
      return res.status(200).json({
        token: token,
      });
    }
    return res.status(403).json({
      error: "Invalid password",
    });
  } catch (error) {
    console.log("SERVER ERROR", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.change_password = async (req, res) => {
  try {
    if (!req.body.current_password) {
      return res.status(400).json({
        message: "Current password is required",
      });
    }
    if (!req.body.change_password) {
      return res.status(400).json({
        message: "Current password is required",
      });
    }
    const user = await models.user.findById({
      _id: req.user._id,
    });

    if (!user) {
      return res.status(404).json({
        message: "No user found",
      });
    }
    const is_password_valid = bcrypt.compareSync(
      req.body.current_password,
      user.password
    );

    console.log(is_password_valid);
    if (!is_password_valid) {
      return res.status(403).json({
        message: "Password is not valid",
      });
    }

    const new_hashed_password = bcrypt.hashSync(req.body.change_password, 10);
    await models.user.updateOne(
      { _id: req.user._id },
      { $set: { password: new_hashed_password } }
    );
    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log("SERVER ERROR OCCURED", error);
    return res.status(500).json({
      error: "Internal server error occured",
    });
  }
};
