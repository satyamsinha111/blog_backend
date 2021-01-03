const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const middlewares = require("../middlewares");
//Signup route
router.post("/signup", controllers.user.signup);
router.post("/signin", controllers.user.signin);

module.exports = router;
