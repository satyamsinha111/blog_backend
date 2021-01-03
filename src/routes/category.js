const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const middlewares = require("../middlewares");
router.post(
  "/category",
  middlewares.auth.is_authenticated,
  controllers.category.create_category
);
router.put(
  "/category/:id",
  middlewares.auth.is_authenticated,
  controllers.category.update_category
);

router.delete(
  "/category/:id",
  middlewares.auth.is_authenticated,
  controllers.category.delete_category
);

router.get(
  "/categories",
  middlewares.auth.is_authenticated,
  controllers.category.get_all_categories
);

router.get(
  "/category/:id",
  middlewares.auth.is_authenticated,
  controllers.category.get_category_by_id
);

module.exports = router;
