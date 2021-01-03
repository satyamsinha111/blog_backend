const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const middlewares = require("../middlewares");

router.post(
  "/blog",
  middlewares.auth.is_authenticated,
  controllers.blog.create_blog
);
router.put(
  "/blog/:id",
  middlewares.auth.is_authenticated,
  controllers.blog.update_blog
);

router.delete(
  "/blog/:id",
  middlewares.auth.is_authenticated,
  controllers.blog.delete_blog
);

router.get(
  "/blogs",
  middlewares.auth.is_authenticated,
  controllers.blog.get_all_blogs
);

router.get(
  "/blog/:id",
  middlewares.auth.is_authenticated,
  controllers.blog.get_blogs_by_id
);

module.exports = router;
